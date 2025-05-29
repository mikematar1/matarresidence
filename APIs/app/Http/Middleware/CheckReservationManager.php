<?php

namespace App\Http\Middleware;

use App\Models\Staff;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CheckReservationManager
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user=Auth::user();

        if($user->type == 1 && $user->banned==0){
            $employee = Staff::where('user_id',$user->id)->first();
            if($employee->position==4 || $employee->position==1){
                return $next($request);
            }else{
                return response()->json([
                    'status' => 'error',
                    'message' => 'Not a reservation manager',
                ], 401);
            }

        }else{
            return response()->json([
                'status' => 'error',
                'message' => 'Not an Employee',
            ], 401);
        }
    }
}
