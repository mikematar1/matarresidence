<?php

namespace App\Http\Controllers;

use App\Mail\ContactFormEmailSender;
use App\Mail\EmailMarketingSender;
use App\Mail\PasswordRenewal;
use App\Models\EmailSender;
use App\Models\ForgottenPasswordSender;
use App\Models\Staff;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Password;

class EmailController extends Controller
{
    public function sendEmailToUsers(Request $request)
    {
        $users = User::where('type','=',0);

        foreach ($users as $user) {
            $user->subject = $request->subject;
            $user->body = $request->body;
            $response= Mail::to($user->email)->send(new EmailMarketingSender($user));
        }

        return response()->json(['message' => 'Emails sent successfully']);
    }
    public function sendEmailContactForm(Request $request)
    {
        $employee = Staff::join('users','users.id','=','staff.user_id')->where('staff.position','=',1)->where('users.id','=','11')->first();
        $data = [
            'name'=>$request->name,
            'email'=>$request->email,
            'subject'=>$request->subject,
            'message'=>$request->message
        ];
        $response=Mail::to($employee->email)->send(new ContactFormEmailSender($data));



        return response()->json(['message' => 'Email sent successfully']);
    }


    public function sendForgottenPassword(Request $request)
{
    $this->validate($request, ['email' => 'required|email']);

    $response = Password::broker()->sendResetLink($request->only('email'));

    if ($response == Password::RESET_LINK_SENT) {
        Mail::to($request->email)->send(new PasswordRenewal(Auth::user(), $response));
        return redirect()->back()->with('status', trans($response));
    }

    return redirect()->back()->withErrors(
        ['email' => trans($response)]
    );
}


}
