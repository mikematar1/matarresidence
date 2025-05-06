<?php

namespace App\Http\Controllers;

use App\Models\Policy;
use Illuminate\Http\Request;

class PolicyController extends Controller
{
    public function addPolicy(Request $request){
        //admin function
        $policy = new Policy();
        $policy->text = $request->text;
        $policy->title = $request->title;
        if($policy->save()){
            return response()->json([
                'message'=>"successful",
                'data'=>$policy
            ],200);
        }

    }
    public function editPolicy(Request $request){
        //admin function
        $policy = Policy::find($request->policy_id);
        if($request->has("text")){
            $policy->text = $request->text;
        }
        if($request->has("title")){
            $policy->title = $request->title;
        }
        if($policy->save()){
            return response()->json([
                'message'=>"policy editted successfuly",
                'data'=>$policy
            ],200);
        }
    }
    public function removePolicy($policyid){
        //admin function
        if(Policy::find($policyid)->delete()){
            return response()->json([
                'message'=>"policy removed successfuly"
            ],200);
        }
    }
    public function getPolicies(){
        return Policy::all();
    }
}
