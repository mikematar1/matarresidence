<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReviewController extends Controller
{
    public function addReview(Request $request){
        $user = Auth::user();
        Review::create([
            'customer_id'=>$user->id,
            'rating'=>$request->rating,
            'comment'=>$request->comment,
            'featured'=>false
        ]);
        return "success";
    }
    public function editReview(Request $request){
        $review = Review::find($request->review_id);
        if($request->has("rating")){
            $review->rating = $request->rating;
        }
        if($request->has("comment")){
            $review->comment=$request->comment;
        }
        if($review->save()){
            return response()->json([
                'message'=>'review editted succesfully'
            ]);
        }
    }
    public function deleteReview($review_id){
        Review::find($review_id)->delete();
        return "success";
    }
    public function getReviews(){
        return Review::join('users', 'reviews.customer_id', '=', 'users.id')
                     ->select('reviews.*', 'users.email')
                     ->paginate(14);
    }

    public function featureReview($reviewid){
        $review = Review::find($reviewid);
        if($review->featured){
            $review->featured = false;
        }else{
            $review->featured = true;
        }
        if($review->save()){
            $review = Review::join('customers', 'customers.user_id', '=', 'reviews.customer_id')
                            ->join('users', 'users.id', '=', 'reviews.customer_id')
                            ->where('reviews.id', '=', $reviewid)
                            ->select('users.email', 'reviews.*')
                            ->first();
            return $review;
        }else{
            return "failed";
        }

    }

    public function getFeaturedReviews()
    {
        $reviews = Review::join('customers', 'customers.user_id', '=', 'reviews.customer_id')
                            ->join('users', 'users.id', '=', 'customers.user_id')
                            ->where('reviews.featured', '=', 1)
                            ->select('users.username', 'reviews.*')
                            ->get();
        return $reviews;
    }


}
