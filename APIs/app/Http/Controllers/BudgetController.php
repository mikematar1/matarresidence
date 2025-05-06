<?php

namespace App\Http\Controllers;

use App\Models\Budget;
use Illuminate\Http\Request;

class BudgetController extends Controller
{
    public function addBudget(Request $request){

        $budget = new Budget();
        $budget->name = $request->name;
        $budget->amount = $request->amount;

        if($budget->save()){
            return response()->json([
                'message'=>"successful",
                'budget'=>$budget
            ],200);
        }

    }

    public function removeBudget($budgetid){
        if(Budget::find($budgetid)->delete()){
            return response()->json([
                'message'=>"budget removed successfuly"
            ],200);
        }
    }
    public function getBudgets(){
        return Budget::all();
    }
}
