<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Questioniar; 

class QuestioniarController extends Controller
{
    public function index(){

        $questioniar = null;
        if(auth()->id() != null){
            $q_id = null;
            $q_id = session()->get('q_id');
            $questioniar =  Questioniar::where('user_id',auth()->id());
            if(isset($q_id)){
                $questioniar = $questioniar->where('id',$q_id);
            }
            $questioniar = $questioniar->where('status',0)->get()->last();
        }
    	return view('questioniar',compact('questioniar'));
    }
    
    public function save(Request $request){
    	if($request->id){
    		$questioniar =  Questioniar::find($request->id);
    		
    	}else{
    		$questioniar =  new Questioniar();
		}

        $questioniar->user_id = auth()->id() ?? null;
    	$questioniar->ip_address = $request->ip();
    	$questioniar->answers = $request->answers;
    	$questioniar->recommendations = $request->result_calculation;
        $questioniar->saved_recommendations = $request->saved_recommendations != null  ? $request->saved_recommendations:$questioniar->saved_recommendations;
    	$questioniar->status = $request->status ?? 0;
        $questioniar->state = $request->state < $questioniar->state == false ? $request->state : $questioniar->state;
    	$questioniar->save();

    	if($request->ajax()){
    		return response()->json(['data' => $questioniar->toArray()], 200);
    	}else{
    		return redirect('home');
    	}
    }

    public function show($id) {
        $questioniar =  Questioniar::findOrFail($id);
        return view('questioniar_detail',compact('questioniar'));
    }
}
