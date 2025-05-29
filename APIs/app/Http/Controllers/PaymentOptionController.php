<?php

namespace App\Http\Controllers;

use App\Models\Payment_Option;
use Illuminate\Http\Request;

class PaymentOptionController extends Controller
{
    public function addPaymentOption(Request $request){
        //admin function
        $payment_option = new Payment_Option();
        $payment_option->name = $request->name;
        $payment_option->isavailable = $request->isavailable;
        $payment_option->isdeafult = $request->isdefault;
        if($payment_option->save()){
            return response()->json([
                'message'=>"successful",
                'payment_option'=>$payment_option
            ],200);
        }

    }
    public function setavailability($payment_option_id){
        $payment_option = Payment_Option::find($payment_option_id);
        if($payment_option->isavailable){
            $payment_option->isavailable=0;
        }else{
            $payment_option->isavailable = 1;
        }
        if($payment_option->save()){
            return $payment_option;
        }
    }
    public function selectOptions(Request $request){
        $selections = $request->selections;
        foreach ($selections as $key) {
            $payment_option = Payment_Option::find($key);
            if($payment_option->isavailable){
                $payment_option->isavailable=0;
            }
            else{
                $payment_option->isavailable=1;
            }
            $payment_option->save();

        }
        return "Success";
    }


    public function getPaymentOptions(){
        return Payment_Option::all();
    }
    public function getAvailablePaymentOptions(){
        return Payment_Option::where('isavaliable','=',true);
    }
}
