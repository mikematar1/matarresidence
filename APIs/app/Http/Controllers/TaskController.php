<?php

namespace App\Http\Controllers;

use App\Models\Staff;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class TaskController extends Controller
{
    public function addTask(Request $request){
        //admin function
        $task = new Task();
        $task->title = $request->title;
        $task->startDate = $request->startDate;
        $task->endDate = $request->endDate;
        if($task->save()){
            return response()->json([
                'message'=>"successful",
                'task'=>$task
            ],200);
        }

    }
    public function editTask(Request $request){
        //admin function
        $task = Task::find($request->taskid);
        if($request->has("title")){
            $task->title = $request->title;
        }
        if($request->has("startDate")){
            $task->startDate=$request->startDate;
        }
        if($request->has("endDate")){
            $task->endDate=$request->endDate;
        }
        if($task->save()){
            return response()->json([
                'message'=>"task editted successfuly",
                'task'=>$task
            ],200);
        }
    }
    public function removeTask($taskid){
        //admin function
        if(Task::find($taskid)->delete()){
            return response()->json([
                'message'=>"task removed successfuly"
            ],200);
        }
    }
    public function getTasks(){
        $tasks=Task::all();
        return $tasks;
    }
    public function getEmployeeTasks(){
        $tasks=Task::all();
        return $tasks;
    }
}
