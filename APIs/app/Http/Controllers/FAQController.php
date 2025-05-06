<?php

namespace App\Http\Controllers;

use App\Models\FAQ;
use Illuminate\Http\Request;

class FAQController extends Controller
{
    public function addFAQ(Request $request){
        $faq = new FAQ();
        $faq->question = $request->question;
        $faq->answer = $request->answer;
        if($faq->save()){
            return response()->json([
                'message'=>"successful",
                "data"=>$faq
            ],200);
        }

    }
    public function editFAQ(Request $request){
        $faq = FAQ::find($request->faq_id);
        if($request->has("question")){
            $faq->question = $request->question;
        }
        if($request->has("answer")){
            $faq->answer = $request->answer;
        }
        if($faq->save()){
            return response()->json([
                'message'=>"faq editted successfuly",
                'data'=>$faq
            ],200);
        }
    }
    public function removeFAQ($faqid){
        if(FAQ::find($faqid)->delete()){
            return response()->json([
                'message'=>"faq removed successfuly"
            ],200);
        }
    }
    public function getFAQs(){
        return FAQ::all();
    }
}
