@extends('layouts.app')

@section('body')
    @include('partials.header')    
	@yield('content')
	@include('partials.footer')	 
@endsection