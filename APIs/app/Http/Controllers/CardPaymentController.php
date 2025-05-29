<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Stripe\StripeClient;
use Stripe\PaymentIntent;

class CardPaymentController extends Controller{
    public function cardPay(Request $request){
        $stripe = new StripeClient(env('STRIPE_SECRET_KEY'));

        $amount = $request->amount * 100; // in cents

        
         $paymentIntent = $stripe->paymentIntents->create([
                'amount' => $amount,
                'currency' => 'usd',
                'automatic_payment_methods' => [
                    'enabled' => true,
                ],
                'description' => 'Payment for ' . $request->amount . ' USD',
            ]);

       return response()->json([
                'clientSecret' => $paymentIntent->client_secret,
                'paymentIntentId' => $paymentIntent->id,
            ]);
    }
}
