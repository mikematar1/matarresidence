<?php

namespace App\Http\Controllers;

use App\Models\Staff;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class StaffController extends Controller
{

    public function editInformation(Request $request){
        $userinfo = User::find($request->employeeid);
        $employee = Staff::find($request->employeeid);
        if($request->has("username")){
            $userinfo->username=$request->username;
        }
        if($request->has("name")){
            $userinfo->name=$request->name;
        }
        if($request->has("password")){
            $userinfo->password=$request->password;
        }
        if($request->has("email")){
            $userinfo->email=$request->email;
        }
        if($request->has("dob")){
            $userinfo->dob=$request->dob;
        }
        if($request->has("gender")){
            $userinfo->gender=$request->gender;
        }
        if($request->has("position")){
            $employee->position = $request->position;
        }
        if($userinfo->save() || $employee->save()){
            return response()->json([
                'message'=>"eddited succesfully",
                "user"=>$userinfo,
                "staff"=>$employee,
            ]);
        }
    }
    public function banEmployee($employeeid){
            $target = User::find($employeeid);
            $employee = Staff::find($target->id);
            if($target->banned==1){
                $target->banned=0;
            }else{
                $target->banned=1;
            }

            if($target->save()){
                return response()->json([
                    'message'=>"banned succesfully",
                    "user"=>$target,
                    "staff"=>$employee,
                ]);
            }
            return "Failed";
    }
    public function getRevenue(){
        $revenue = DB::table('customer_reserves_room')->join("rooms",'rooms.id','=','customer_reserves_room.room_id')
                    ->sum("rooms.rent");
        return $revenue;
    }
    public function searchEmployee(Request $request){ //name or username
        $query = $request->search_query;

        $employees = Staff::join('users', 'staff.user_id', '=', 'users.id')
        ->where('users.name', 'like', '%'.$query.'%')
        ->orWhere('users.username', 'like', '%'.$query.'%')
        ->get();

        if ($employees->isEmpty()) {
        return response()->json(['error' => 'No employees found']);
        }

        return response()->json(['employees' => $employees]);
    }
    public function getEmployees(){
        $user = Auth::user();
        return Staff::join('users','staff.user_id','=','users.id')->where('users.id','!=', $user->id)->paginate(14);
    }
    public function getInformation(){
        $user = Auth::user();
        $employee = Staff::where('user_id',$user->id)->first();
        return response()->json([
            'user'=>$user,
            'staff'=>$employee,
        ]);
    }
    public function addEmployee(Request $request){
        $validation = Validator::make($request->all(), [
            'username' => 'required|string|min:6',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:6',

        ]);
        if ($validation->fails()) {
            return response()->json([
                 "status"=> "error",
                 "message"=>$validation->errors(),
             ]);
         }
         $user = User::create([
            'username' => $request->username,
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'type'=>1,
            'dob'=>$request->dob,
            'gender'=>$request->gender,
            'banned'=>0
        ]);
        $staff = Staff::create([
            'user_id'=>$user->id,
            'position'=>$request->position
        ]);
        return response()->json([
            'status' => 'success',
            'message' => 'User created successfully',
            'user' => $user,
            'staff'=>$staff,
        ]);

    }


}
