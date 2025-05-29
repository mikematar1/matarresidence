<?php

namespace App\Http\Controllers;

use App\Models\Regulation;
use Illuminate\Http\Request;

class RegulationController extends Controller
{
    public function addRegulation(Request $request){
        //admin function
        $regulation = new Regulation();
        $regulation->text = $request->text;
        $regulation->title = $request->title;
        if($regulation->save()){
            return response()->json([
                'message'=>"successful",
                'data'=>$regulation
            ],200);
        }

    }
    public function editRegulation(Request $request){
        //admin function
        $regulation = Regulation::find($request->regulationid);

        if($request->has("text")){
            $regulation->text = $request->text;
        }
        if($request->has("title")){
            $regulation->title = $request->title;
        }
        if($regulation->save()){
            return response()->json([
                'message'=>"regulation editted successfuly",
                'data'=>$regulation
            ],200);
        }
    }
    public function removeRegulation($regulationid){
        //admin function
        if(Regulation::find($regulationid)->delete()){
            return response()->json([
                'message'=>"regulation removed successfuly"
            ],200);
        }
    }
    public function getRegulations(){
        return Regulation::all();
    }
}
