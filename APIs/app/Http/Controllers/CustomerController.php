<?php

namespace App\Http\Controllers;

use App\Models\Staff;
use App\Models\Customer;
use App\Models\Room;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class CustomerController extends Controller
{
    public function getInformation(){
        $user = Auth::user();
        $customer = Customer::where("user_id",$user->id)->first();

        if($user && $customer){
            return response()->json([
                'status' => 'success',
                'user' => $user,
                'user_details' => $customer,
            ]);
        }
        return response()->json([
            'status' => 'error',
            'message' => 'No user found',
        ], 404);
    }
    public function editInformation(Request $request){
        //username,email,password for user
        //phone_number for customer
        $user = Auth::user();
        $customer = Customer::where("user_id",$user->id)->first();
        $userinfo = User::find($user->id);
        if($request->has("username")){
            $userinfo->username = $request->username;
        }
        if($request->has("name")){
            $userinfo->name = $request->name;
        }
        if($request->has("email")){
            // check if the new email already exists in the database
            $existingUser = User::where('email', $request->email)->first();
            if ($existingUser && $existingUser->id !== $userinfo->id) {
                return response()->json([
                    'message'=>"This email is already taken."
                ], 409);
            } else {
                $userinfo->email = $request->email;
            }
        }
        if($request->has("password")){
            $userinfo->password = Hash::make($request->password);
        }
        if($request->has("dob")){
            $userinfo->dob = $request->dob;
        }
        if($request->has("gender")){
            $userinfo->gender = $request->gender;
        }
        if($request->has("phone_number")){
            $customer->phone_number = $request->phone_number;
        }
        if($customer->save() && $userinfo->save()){
            return response()->json([
                'message'=>"Editted successfuly",
                'customer'=>$customer,
                'user'=>$user
            ]);
        }
    }
    public function reserveRoom(Request $request){
        $user = Auth::user();
        $reservation=DB::table("customer_reserves_room")->insert([
            'customer_id' => $user->id,
            'room_id'=>$request->room_id,
            'reservation_date'=> $request->reservation_date,
            'reservation_end'=>$request->reservation_end,
            'requests'=>$request->requests,
            'status'=>"pending"

        ]);
        return response()->json([
            'status'=>"success",
            'reservation'=>$reservation,
            'room' => Room::find($request->room_id),
            'customer' => Customer::join('user','users.id','=','customers.user_id')
                                ->where('users.id',$user->id)

        ]);
    }

    public function cancelReservation($reservationid){
        DB::table("customer_reserves_room")->where("id",$reservationid)->delete();
        return "success";
    }
    public function editReservation(Request $request){
        DB::table("customer_reserves_room")->where("id",$request->reservation_id)->update([
            'reservation_date'=> $request->reservation_date,
            'reservation_end'=>$request->reservation_end
        ]);
        return DB::table("customer_reserves_room")->where("id",$request->reservation_id)->first();
    }
    public function banCustomer($customerid){
        $target=User::find($customerid);
        if($target->banned == 1){
            $target->banned=0;
            if($target->save()){
              return $target;
            }
        }else{
            $target->banned=1;
            if($target->save()){
                return $target;
            }
        }
        return "error";
    }

    public function getCustomerCount(){
        $count = Customer::count();
        return response()->json([
            'customer_count'=>$count
        ]);
    }

    public function searchCustomer(Request $request){
        $query = $request->search_query;

        $customer = Customer::join('users', 'customers.user_id', '=', 'users.id')
        ->where('users.name', 'like', '%'.$query.'%')
        ->orWhere('users.username', 'like', '%'.$query.'%')
        ->get();

        if ($customer->isEmpty()) {
        return response()->json(['error' => 'No customers found']);
        }

        return response()->json(['customers' => $customer]);
    }

    public function removeAccount(){
        $user = Auth::user();

        // Delete all customer reservations
        DB::table('customer_reserves_room')->where('customer_id', $user->id)->delete();
        DB::table('reviews')->where('customer_id', $user->id)->delete();

        // Delete customer details
        Customer::where('user_id', $user->id)->delete();

        // Delete user account
        User::where('id', $user->id)->delete();

        // Logout user
        Auth::logout();

        return response()->json([
            'message' => 'Account removed successfully'
        ]);
    }
    public function getCustomers(){
        $customers = Customer::join('users','users.id','=','customers.user_id')->paginate(14);
        return $customers;
    }




}
