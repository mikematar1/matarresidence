<?php

namespace App\Http\Controllers;

use App\Models\Image;
use App\Models\Room;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DiscountController extends Controller
{
    public function addWholeDiscount(Request $request){//size/discount
        $rooms = Room::where('size',$request->size);
        for($i=0;$i<sizeof($rooms);$i++){
            $room = $rooms[$i];
            $room->discount = $request->discount;
            $room->save();
        }

        return response()->json([
            'message'=>'discount added successfuly'
        ]);

    }
    public function addRoomDiscount(Request $request){//room_id,discount
        $room = Room::find($request->room_id);
        $room->discount= $request->discount;

        if($room->save()){
            return response()->json([
                'message'=>`discount added to all rooms of size $request->size`
            ]);
        }
    }
    public function removeWholeDiscount($size){
        $rooms = Room::where('size',$size);
        for($i=0;$i<sizeof($rooms);$i++){
            $room = $rooms[$i];
            $room->discount = 0;
            $room->save();
        }

        return response()->json([
            'message'=>`Discount removed from all rooms of size $size`
        ]);

    }
    public function removeRoomDiscount($room_id){
        $room = Room::find($room_id);
        $room->discount=0;
        if($room->save()){
            return response()->json([
                'message'=>'discount removed successfuly'
            ]);
        }
    }
    public function getDiscountedRooms(){
        $rooms = Room::where("discount",">",0)->get();

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
}
