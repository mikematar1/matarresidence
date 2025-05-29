<?php

namespace App\Http\Controllers;

use App\Models\Feedback;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FeedbackController extends Controller
{
    public function addFeedback(Request $request){
        $user = Auth::user();
        //admin function
        $feedback = new Feedback();
        $feedback->text = $request->text;
        $feedback->customer_id = $user->id;

        if($feedback->save()){
            return response()->json([
                'message'=>"successful",
                'feedback'=>$feedback
            ],200);
        }

    }

    public function getFeedbacks(){
        $feedbacks = Feedback::paginate(14);
        return response()->json([
            $feedbacks
        ],200);
    }
}
