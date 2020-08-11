<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Questioniar; 

class QuestioniarController extends Controller
{
    public function index(){
    	return view('questioniar');
    }
    
    public function save(Request $request){
    	if(auth()->check()){
    		$questioniar =  Questioniar::firstOrNew(['user_id' => auth()->id(), 'status' => 0]);
    		$questioniar->user_id = auth()->id();

    	}else{
    		$questioniar =  new Questioniar();
		}

    	$questioniar->ip_address = $request->ip();
    	$questioniar->answers = $request->answers;
    	$questioniar->recommendation = $request->result_calculation;
    	$questioniar->status = $request->status ?? 0;
    	// $questioniar->save();

    	if($request->ajax()){
    		return response()->json(['data' => $questioniar->toArray()], 200);
    	}else{

    		return redirect('home');
    	}
    }
}
