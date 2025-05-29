<?php

namespace App\Http\Controllers;

use App\Models\Currency;
use DateTime;
use Exception;
use Illuminate\Http\Request;

class CurrencyController extends Controller
{
    public function addCurrency(Request $request){
        //admin function
        $currency = new Currency();
        $currency->name = $request->name;
        $currency->code = $request->code;
        $currency->symbol = $request->symbol;
        $currency->isavailable = 1;
        $currency->isdefault = $request->isdefault;
        $currency->exchange_rate = 0;
        $currency->exchange_rate=$this->getExchangeRate([$currency])[$currency->symbol];
        if($currency->save()){

            return response()->json([
                'message'=>"successful",
                'currency' => $currency
            ],200);
        }

    }
    public function setavailability($currencyid){
        $currency = Currency::find($currencyid);
        if($currency->isavailable){
            $currency->isavailable=0;
        }else{
            $currency->isavailable = 1;
        }
        if($currency->save()){
            return $currency;
        }
    }
    public function selectOptions(Request $request){
        $selections = $request->selections;
        foreach ($selections as $key) {
            $currency = Currency::find($key);
            if($currency->isavailable){
                $currency->isavailable=0;
            }
            else{
                $currency->isavailable=1;
            }
            $currency->save();
        }
        return "Success";
    }
    function getExchangeRate($currencies) {
        $apiKey = "36cad445b8d04af79f3b23769b6a6221";
        $input = "";
        foreach ($currencies as $currency) {
            $input .= $currency->symbol . ",";
        }
        $url = "https://api.currencyfreaks.com/v2.0/rates/latest?apikey=$apiKey&symbols=$input";
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        $result = curl_exec($ch);
        curl_close($ch);
        $data = json_decode($result, true);
        return $data['rates'];
    }

    public function getCurrencies(){
        $currencies = Currency::all();
        return $currencies;

    }
    public function getAvailableCurrencies(){
        return Currency::where('isavailable','=',1)->get();
    }

}
