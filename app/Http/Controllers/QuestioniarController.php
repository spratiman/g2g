<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Questioniar; 

class QuestioniarController extends Controller
{
    public function index(){

        $questioniar = null;
        if(auth()->id() != null){
            $questioniar =  Questioniar::where('user_id',auth()->id())->where('status',0)->get()->last();
        }
    	return view('questioniar',compact('questioniar'));
    }
    
    public function save(Request $request){
    	if($request->id){
    		$questioniar =  Questioniar::firstOrNew(['id' => $request->id]);
    		
    	}else{
    		$questioniar =  new Questioniar();
		}

        $questioniar->user_id = auth()->id() ?? null;
    	$questioniar->ip_address = $request->ip();
    	$questioniar->answers = $request->answers;
    	$questioniar->recommendations = $request->result_calculation;
        $questioniar->saved_recommendations = $request->saved_recommendations ?? null;
    	$questioniar->status = $request->status ?? 0;
        $questioniar->state = $request->state ?? 0;
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
