<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class GetUsersEmailsController extends Controller{
    public function getEmails(){
        $emails = DB::table('users')->pluck('email');
        return response()->json($emails);
    }
}
