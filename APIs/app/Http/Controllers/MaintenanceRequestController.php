<?php

namespace App\Http\Controllers;

use App\Models\Maintenance_Request;
use App\Models\Room;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use stdClass;

class MaintenanceRequestController extends Controller
{
    public function addRequest(Request $request){
        $user = Auth::user();
        $maintenancereq=Maintenance_Request::create([
            'customer_id'=>$user->id,
            'reservation_id'=>$request->reservation_id,
            'room_id'=>$request->room_id,
            'employee_id'=> 0,
            'status'=>'pending',
        ]);
        return response()->json([
            'message'=>'success',
            'maintenance_object'=>$maintenancereq,
            'customer_object'=> User::join('customers','customers.user_id','=','users.id')
                                    ->where('users.id','=',$maintenancereq->customer_id)->get(),
            'reservation_object'=> DB::table('customer_reserves_room')->where('customer_reserves_room.id','=',$maintenancereq->reservation_id)->get(),
            'room_object'=>Room::find($maintenancereq->room_id)



        ]);
    }
    public function completeRequest($requestid){
        $maintenancereq=Maintenance_Request::find($requestid);
        $maintenancereq->status="completed";
        $maintenancereq->save();
        return response()->json([
            'message'=>'success',
            'maintenance_object'=>$maintenancereq,
            'customer_object'=> User::join('customers','customers.user_id','=','users.id')
                                    ->where('users.id','=',$maintenancereq->customer_id)->get(),
            'reservation_object'=> DB::table('customer_reserves_room')->where('customer_reserves_room.id','=',$maintenancereq->reservation_id)->get(),
            'room_object'=>Room::find($maintenancereq->room_id),
            'employee_object'=>User::join('staff','staff.user_id','=','users.id')
            ->where('users.id','=',$maintenancereq->customer_id)->get()


        ]);
    }
    public function assignEmployee(Request $request){
        $maintenancereq = Maintenance_Request::find($request->requestid);
        $maintenancereq->employee_id = $request->employee_id;
        $maintenancereq->status = "completed";
        if($maintenancereq->save()){
            return response()->json([
                'message'=>'success',
                'maintenance_object'=>$maintenancereq,
                'customer_object'=> User::join('customers','customers.user_id','=','users.id')
                                        ->where('users.id','=',$maintenancereq->customer_id)->first(),
                'reservation_object'=> DB::table('customer_reserves_room')->where('customer_reserves_room.id','=',$maintenancereq->reservation_id)->first(),
                'room_object'=>Room::find($maintenancereq->room_id),
                'employee_object'=>User::join('staff','staff.user_id','=','users.id')
                ->where('users.id','=',$request->employee_id)->first()


            ]);
        }
    }

    public function getPendingRequests(){
        $maintenanceRequests = Maintenance_Request::where('status', '=', 'pending')->paginate(14);
        foreach($maintenanceRequests as $mainreq){
            $mainreq['customer_object']=User::join('customers','customers.user_id','=','users.id')
            ->where('users.id','=',$mainreq->customer_id)->first();
            $mainreq['reservation_object'] =DB::table('customer_reserves_room')->where('customer_reserves_room.id','=',$mainreq->reservation_id)->first();
            $mainreq['room_object']=Room::find($mainreq->room_id);
        }
        return $maintenanceRequests;
    }
    public function getCompletedRequests(){
        $maintenanceRequests=Maintenance_Request::where('status','=','completed')->paginate(14);
        foreach($maintenanceRequests as $mainreq){
            $mainreq['customer_object']=User::join('customers','customers.user_id','=','users.id')
            ->where('users.id','=',$mainreq->customer_id)->first();
            $mainreq['reservation_object'] =DB::table('customer_reserves_room')->where('customer_reserves_room.id','=',$mainreq->reservation_id)->first();
            $mainreq['room_object']=Room::find($mainreq->room_id);
            $mainreq['employee_object']=User::join('staff','staff.user_id','=','users.id')
                                        ->where('users.id','=',$mainreq->employee_id)->first();
        }
        return $maintenanceRequests;
    }
    public function getEmployeeRequests(){
        $user = Auth::user();
        $requests = Maintenance_Request::where('employee_id','=',$user->id)->get();
        return $requests;

    }
}
