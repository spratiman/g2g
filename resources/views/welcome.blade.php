@extends('layouts.auth')

@section('body')
<div class="site-blocks-cover testimonial-wrap bg-light " style="overflow: hidden;">
   <div class="container">
      <div class="row align-items-center justify-content-center">
         <div class="col-md-12" style="position: relative;" data-aos="fade-up" data-aos-delay="200">
            <img src="{{ asset(config('custom.asset-path').'images/collage.png') }}" alt="Image" class="img-fluid img-absolute">
            <div class="row mb-4" data-aos="fade-up" data-aos-delay="200">
               <div class="col-lg-6 mr-auto">
                  <h2 class="white">An investment for all</h2>
                  <p class="mb-5 white">Whether you are investing $100 or $5,000 a month, we make it incredibly easy for you to become the beginning of generational wealth regardless of your age</p>
                  <div>
                     <a href="{{ route('questioniar') }}" class="btn btn-primary mr-2 mb-2"> <i class="fa fa-money" style="color:#fff"></i>  Free Recommendation</a>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
<div class="feature-big">
   <div class="container">
      <div class="row mb-5 site-section">
         <div class="col-lg-7" data-aos="fade-right">
            <img src="{{ asset(config('custom.asset-path').'images/undraw_gift_card_6ekc.svg') }}" alt="Image" class="img-fluid">
         </div>
         <div class="col-lg-5 pl-lg-5 ml-auto mt-md-5">
            <h2 class="text-black">Life changing advice</h2>
            <p class="mb-4">Free professional recommendation in minutes to see how YOU can acquire and provide financial security for your loved ones</p>
            <div class="author-box" data-aos="fade-left">
               <div class="d-flex mb-4">
                  <div class="mr-3">
                     <img src="{{ asset(config('custom.asset-path').'images/person_4.jpg') }}" alt="Image" class="img-fluid rounded-circle">
                  </div>
                  <div class="mr-auto text-black">
                     <strong class="font-weight-bold mb-0">Samuel John</strong> <br>
                     Co-Founder, XYZ Inc.
                  </div>
               </div>
               <blockquote>&ldquo;A comment from a satisfied customer/user will go here.&rdquo;</blockquote>
            </div>
         </div>
      </div>
      <div class="mt-5 row mb-5 site-section ">
         <div class="col-lg-7 order-1 order-lg-2" data-aos="fade-left">
            <img src="{{ asset(config('custom.asset-path').'images/undraw_metrics_gtu7.svg') }}" alt="Image" class="img-fluid">
         </div>
         <div class="col-lg-5 pr-lg-5 mr-auto mt-5 order-2 order-lg-1">
            <h2 class="text-black">Peace of mind</h2>
            <p class="mb-4">Protect, control, and enjoy your life no matter what may happen along the way</p>
            <div class="author-box" data-aos="fade-right">
               <div class="d-flex mb-4">
                  <div class="mr-3">
                     <img src="{{ asset(config('custom.asset-path').'images/person_1.jpg') }}" alt="Image" class="img-fluid rounded-circle">
                  </div>
                  <div class="mr-auto text-black">
                     <strong class="font-weight-bold mb-0">Kimberly Gush</strong> <br>
                     Co-Founder, XYZ Inc.
                  </div>
               </div>
               <blockquote>
               &ldquo;A comment from a satisfied customer/user will go here.&rdote>
            </div>
         </div>
      </div>
      <div class="row mb-5 site-section">
         <div class="col-lg-7" data-aos="fade-right">
            <img src="{{ asset(config('custom.asset-path').'images/undraw_gift_card_6ekc.svg') }}" alt="Image" class="img-fluid">
         </div>
         <div class="col-lg-5 pl-lg-5 ml-auto mt-md-5">
            <h2 class="text-black">Investment as an accessory</h2>
            <p class="mb-4">To make a bold social statement by having the ultimate portfolio that will truly support you when it matters most </p>
            <div class="author-box" data-aos="fade-left">
               <div class="d-flex mb-4">
                  <div class="mr-3">
                     <img src="{{ asset(config('custom.asset-path').'images/person_4.jpg') }}" alt="Image" class="img-fluid rounded-circle">
                  </div>
                  <div class="mr-auto text-black">
                     <strong class="font-weight-bold mb-0">Grey Simpson</strong> <br>
                     Co-Founder, XYZ Inc.
                  </div>
               </div>
               <blockquote>&ldquo; A comment from a satisfied customer/user will go here. &rdquo;</blockquote>
            </div>
         </div>
      </div>
      <div class="mt-5 row mb-5 site-section ">
         <div class="col-lg-7 order-1 order-lg-2" data-aos="fade-left">
            <img src="{{ asset(config('custom.asset-path').'images/undraw_metrics_gtu7.svg') }}" alt="Image" class="img-fluid">
         </div>
         <div class="col-lg-5 pr-lg-5 mr-auto mt-5 order-2 order-lg-1">
            <h2 class="text-black">Lifestyle and estate solutions made easy</h2>
            <p class="mb-4">Professional ongoing portfolio management and support from some of Canada’s most renowned financial advisors/ consultants</p>
            <div class="author-box" data-aos="fade-right">
               <div class="d-flex mb-4">
                  <div class="mr-3">
                     <img src="{{ asset(config('custom.asset-path').'images/person_1.jpg') }}" alt="Image" class="img-fluid rounded-circle">
                  </div>
                  <div class="mr-auto text-black">
                     <strong class="font-weight-bold mb-0">Kimberly Gush</strong> <br>
                     Co-Founder, XYZ Inc.
                  </div>
               </div>
               <blockquote>
               &ldquo;A comment from a satisfied customer/user will go here.&rdote>
            </div>
         </div>
      </div>
   </div>
</div>
<div class="site-section" id="features-section">
   <div class="container">
      <div class="row justify-content-md-center">
         <div class="col col-lg-2">
         </div>
         <div class="col-md-auto">
            <h2>What is {{config('app.name')}}?</h2>
         </div>
         <div class="col col-lg-2">
         </div>
      </div>
      <div class="row justify-content-md-center">
         <div class="col col-lg-2">
         </div>
         <div class="col-md-auto">
            <h6>A digital solution to provide you with financial security, the confidence to enjoy your money, and a safety net to maintain your current lifestyle.</h6>
         </div>
         <div class="col col-lg-2">
         </div>
      </div>
   </div>
</div>
@endsection
