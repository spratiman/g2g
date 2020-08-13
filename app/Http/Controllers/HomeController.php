<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Questioniar; 

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        $questionairs = Questioniar::where('user_id',auth()->id())->latest()->get();
        return view('home',compact('questionairs'));
    }
}
