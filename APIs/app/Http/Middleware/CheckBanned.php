<?php

namespace App\Http\Middleware;

use Closure;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CheckBanned
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {

        try {
            $user = Auth::user();
            if($user->banned==0){
                return $next($request);
            }else{
                return response()->json([
                    'status' => 'error',
                    'message' => 'User is banned',
                ], 401);
            }
          } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'There is no Logged In User',
            ], 401);
          }

    }
}
