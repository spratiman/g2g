<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="description" content="">
  <meta name="author" content="">
   <meta name="csrf-token" content="{{ csrf_token() }}">

  <title>{{config('app.name')}}</title>
  <!-- Bootstrap core CSS -->
    <link href="https://fonts.googleapis.com/css?family=Nunito:300,400,700" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

    <link rel="stylesheet" href="{{ asset(config('custom.asset-path').'fonts/icomoon/style.css')}}">
    <link rel="stylesheet" href="{{ asset(config('custom.asset-path').'css/bootstrap.min.css')}}">
    <link rel="stylesheet" href="{{ asset(config('custom.asset-path').'css/jquery-ui.css')}}">
    <link rel="stylesheet" href="{{ asset(config('custom.asset-path').'css/owl.carousel.min.css')}}">
    <link rel="stylesheet" href="{{ asset(config('custom.asset-path').'css/owl.theme.default.min.css')}}">
    <link rel="stylesheet" href="{{ asset(config('custom.asset-path').'css/owl.theme.default.min.css')}}">
    <link rel="stylesheet" href="{{ asset(config('custom.asset-path').'css/jquery.fancybox.min.css')}}">
    <link rel="stylesheet" href="{{ asset(config('custom.asset-path').'css/bootstrap-datepicker.css')}}">
    <link rel="stylesheet" href="{{ asset(config('custom.asset-path').'fonts/flaticon/font/flaticon.css')}}">
    <link rel="stylesheet" href="{{ asset(config('custom.asset-path').'css/aos.css')}}">
    <link rel="stylesheet" href="{{ asset(config('custom.asset-path').'css/style.css')}}">
    <link rel="stylesheet" href="{{ asset(config('custom.asset-path').'css/custom.css')}}">
    <link rel="stylesheet" href="{{ asset(config('custom.asset-path').'css/loading.css')}}">

<link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.0.0/animate.min.css"
  />
    @yield('style')
    @yield('header-script')

  </head>
  <body data-spy="scroll" data-target=".site-navbar-target" data-offset="300">
    <div class="loading">Loading&#8230;</div>
    <div id="overlayer"></div>
    <div class="loader">
      <div class="spinner-border text-primary" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <div class="site-wrap"  id="home-section">

    <div class="site-mobile-menu site-navbar-target">
      <div class="site-mobile-menu-header">
        <div class="site-mobile-menu-close mt-3">
          <span class="icon-close2 js-menu-toggle"></span>
        </div>
      </div>
      <div class="site-mobile-menu-body"></div>
    </div>
  	@include('partials.header')
  	@yield('body')  
  	@include('partials.footer')	 
    <!-- Modal  -->
  <!-- Trigger the modal with a button -->
  <script src="{{ asset(config('custom.asset-path').'js/jquery-3.3.1.min.js') }}"></script>
  <script src="{{ asset(config('custom.asset-path').'js/jquery-ui.js') }}"></script>
  <script src="{{ asset(config('custom.asset-path').'js/popper.min.js') }}"></script>
  <script src="{{ asset(config('custom.asset-path').'js/bootstrap.min.js') }}"></script>
  <script src="{{ asset(config('custom.asset-path').'js/owl.carousel.min.js') }}"></script>
  <script src="{{ asset(config('custom.asset-path').'js/jquery.countdown.min.js') }}"></script>
  <script src="{{ asset(config('custom.asset-path').'js/bootstrap-datepicker.min.js') }}"></script>
  <script src="{{ asset(config('custom.asset-path').'js/jquery.easing.1.3.js') }}"></script>
  <script src="{{ asset(config('custom.asset-path').'js/aos.js') }}"></script>
  <script src="{{ asset(config('custom.asset-path').'js/jquery.fancybox.min.js') }}"></script>
  <script src="{{ asset(config('custom.asset-path').'js/jquery.sticky.js') }}"></script>

  
  <script src="{{ asset(config('custom.asset-path').'js/main.js') }}"></script>
  <script src="{{ asset(config('custom.asset-path').'js/custom.js') }}"></script>

  @yield('script')
  </body>
</html>
