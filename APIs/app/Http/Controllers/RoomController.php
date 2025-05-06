<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Image;
use App\Models\Room;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use stdClass;

class RoomController extends Controller
{
    public function addRoom(Request $request){
        //admin function
        $room = new Room();
        $room->title = $request->title;
        $room->description = $request->description;
        $room->rent = $request->rent;
        $room->discount = $request->discount;
        $room->size = $request->size;
        $room->guests = $request->guests;
        $room->floor = $request->floor;
        $room->beds = $request->beds;
        $room->wifi = $request->wifi;
        $room->tv = $request->tv;
        $room->shower = $request->shower;
        $room->towels = $request->towels;
        $room->mini_bar = $request->mini_bar;
        $room->desk = $request->desk;
        $room->breakfast = $request->breakfast;
        $room->pets = $request->pets;
        $room->featured = false;
        $room->discount = 0;
        if($room->save()){
            $roomid = $room->id;
            $images = $request->images;
            $imagearray=array();
            if(!empty($images)){
                ;
                for($i=0;$i<sizeof($images);$i++){
                    $base64Image = $images[$i];
                    $imageData = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $base64Image));
                    $filename = uniqid() . '.png';
                    $folderPath = 'roomimages/';

                    Storage::disk('s3')->put($folderPath . $filename, $imageData);
                    $url = Storage::disk('s3')->url($folderPath . $filename);
                    $image=Image::create([
                        "room_id"=>$roomid,
                        "image_url"=>$url

                    ]);
                    array_push($imagearray,$image);
                }
            }
            return response()->json([
                'message'=>'room added successfully',
                'room'=>$room,
                'images'=>$imagearray

            ]);
        }
    }
    public function removeRoom($roomid){
        //admin function

        if(Room::find($roomid)->delete()){

            $images = Image::where('room_id',$roomid)->get();
            if(!empty($images)){
                for($i=0;$i<sizeof($images);$i++){
                    $image = $images[$i];
                    $url = $image->image_url;
                    if (preg_match('/([\w]+.(png|jpg|jpeg|gif))/', $url, $matches)) {

                        $objectKey = str_replace("https://hotel-images-bucket.s3.eu-north-1.amazonaws.com/", '', $url);

                        // Delete the object using Laravel's Storage facade
                        Storage::disk('s3')->delete($objectKey);
                        $image->delete();
                    }

                }
            }
            return response()->json([
                'message'=>'room deleted successfully'
            ]);
        }
    }
    public function editRoom(Request $request){
        //admin function
        $room = Room::find($request->room_id);
        if($request->has("title")){
            $room->title=$request->title;
        }
        if($request->has('description')){
            $room->description=$request->description;
        }
        if($request->has("rent")){
            $room->rent=$request->rent;
        }
        if($request->has("discount")){
            $room->discount=$request->discount;
        }
        if($request->has("size")){
            $room->size=$request->size;
        }
        if($request->has("guests")){
            $room->guests=$request->guests;
        }
        if($request->has("floor")){
            $room->floor=$request->floor;
        }
        if($request->has("beds")){
            $room->beds=$request->beds;
        }
        if($request->has("tv")){
            $room->tv=$request->tv;
        }
        if($request->has("shower")){
            $room->shower=$request->shower;
        }
        if($request->has("wifi")){
            $room->wifi=$request->wifi;
        }
        if($request->has("towels")){
            $room->towels=$request->towels;
        }
        if($request->has("mini_bar")){
            $room->mini_bar=$request->mini_bar;
        }
        if($request->has("desk")){
            $room->desk=$request->desk;
        }
        if($request->has("pets")){
            $room->pets=$request->pets;
        }
        if($request->has("breakfast")){
            $room->breakfast=$request->breakfast;
        }

        if($room->save()){
            return response()->json([
                'message'=>'room added successfully',
                'room'=>$room
            ]);
        }
    }

    public function getRooms(){
        //customer and admin function
        //returns all rooms with their schedule
        // Get all the rooms
        // Get all the rooms
        $rooms = Room::all();

        // Get reservations for all rooms for the next week
        $reservations = DB::table("customer_reserves_room")->get();
        // Initialize an array to store the occupied and free dates for each room
        $roomDates = [];

        // Loop through all the rooms and find the free and occupied dates for each room
        foreach ($rooms as $room) {
            // Get the reservations for this room for the next week
            $roomReservations = $reservations->where('room_id', $room->id);

            // Initialize arrays to store the occupied and free dates for this room
            $occupiedDates = [];
            $freeDates = [];

            // Loop through each day of the next week and check if it's occupied
            $currentDate = Carbon::today();

            $endDate = Carbon::today()->addDays(50);
            while ($currentDate <= $endDate) {
                $isOccupied = false;
                foreach ($roomReservations as $reservation) {
                    $reservationDates = CarbonPeriod::create($reservation->reservation_date, $reservation->reservation_end)->toArray();

                    if (in_array($currentDate, $reservationDates)) {

                        $occupiedDates[] = $currentDate->format('Y-m-d');
                        $isOccupied = true;
                        break;
                    }
                }
                if (!$isOccupied) {
                    $freeDates[] = $currentDate->format('Y-m-d');
                }
                $currentDate->addDay();
            }
            $images = Image::where('room_id',$room->id)->get();
            // Add the occupied and free dates for this room to the roomDates array
            $roomDates[] = [
                'room' => $room,
                'occupied_dates' => $occupiedDates,
                'free_dates' => $freeDates,
                'images'=>$images

            ];
        }

        // Return the roomDates array as JSON
        return response()->json($roomDates);

    }
    public function getRoomCount(){
        $count = Room::count();
        return response()->json([
            'room_count'=>$count
        ]);
    }
    public function getReservations(){
        $reservations = DB::table('customer_reserves_room')->paginate(10);
        foreach($reservations as $reservation){
            $customer = Customer::join('users','users.id','=','customers.user_id')->where('users.id','=',$reservation->customer_id)->first();
            $room = Room::find($reservation->room_id);
            $reservation->customer_object = $customer;
            $reservation->room_object=$room;
            $images = Image::where('room_id','=',$reservation->room_id)->get();
            $reservation->images = $images;

        }
        return response()->json([
            'reservations'=>$reservations
        ]);
    }
    public function getReservationsCount(){
        $count = DB::table('customer_reserves_room')->count();
        return response()->json([
            'reservation_count'=>$count
        ]);
    }
    public function searchReservation(Request $request){
        $reservations = DB::table('customer_reserves_room')->where('id',"like",'%'.$request->search_query.'%')->get();
        foreach($reservations as $reservation){
            $customer = Customer::join('users','users.id','=','customers.user_id')->where('users.id','=',$reservation->customer_id)->first();
            $room = Room::find($reservation->room_id);
            $reservation->customer_object = $customer;
            $reservation->room_object=$room;
            $images = Image::where('room_id','=',$reservation->room_id)->get();
            $reservation->images = $images;
        }
        return response()->json([
            'reservations'=>$reservations
        ]);
    }
    public function getCustomerReservations(){
        $user = Auth::user();

        $reservations=DB::table('customer_reserves_room')->where('customer_reserves_room.customer_id','=',$user->id)->get();
        $output = array();
        foreach($reservations as $reservation){
            $object = new stdClass();
            $object->id = $reservation->id;
            $object->reservation_date = $reservation->reservation_date;
            $object->reservation_end = $reservation->reservation_end;
            $object->room_id = $reservation->room_id;
            $room = Room::find($reservation->room_id);
            $roomReservations = DB::table('customer_reserves_room')->where('customer_reserves_room.room_id','=',$room->id)->get();
            $object->title = $room->title;
            $occupiedDates = [];
            $freeDates = [];

            $currentDate = Carbon::today();

            $endDate = Carbon::today()->addDays(50);
            while ($currentDate <= $endDate) {
                $isOccupied = false;
                foreach ($roomReservations as $Reservation) {
                    $reservationDates = CarbonPeriod::create($Reservation->reservation_date, $Reservation->reservation_end)->toArray();

                    if (in_array($currentDate, $reservationDates)) {

                        $occupiedDates[] = $currentDate->format('Y-m-d');
                        $isOccupied = true;
                        break;
                    }
                }
                if (!$isOccupied) {
                    $freeDates[] = $currentDate->format('Y-m-d');
                }
                $currentDate->addDay();
            }




            $object->occupied_dates=$occupiedDates;
            $object->free_dates=$freeDates;
            array_push($output,$object);

        }
        return $output;
    }


}
