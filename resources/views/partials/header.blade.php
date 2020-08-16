<header class="site-navbar py-2 js-sticky-header site-navbar-target" role="banner">

  <div class="container">
    <div class="row align-items-center">
      
      <div class="col-4 col-md-4 col-xl-4  d-block">
        <a href="{{ url('/') }}" class="text-white h2 mb-0">
          <h2 class="mb-0 mt-1 site-logo white">{{config('app.name')}}</h2>
          <h4 class="mb-0 ">{{config('app.desc')}}</h4>
        </a>
      </div>

      <div class="col-12 col-md-8 col-xl-8 main-menu">
        <nav class="site-navigation position-relative text-right" role="navigation">

          <ul class="site-menu main-menu js-clone-nav mr-auto d-none d-lg-block ml-0 pl-0">
           <li>
              <a href="{{ route('questioniar') }}" class="nav-link white">
                <b><i class="fa fa-calculator" style="color:#fff"></i> Free Recommendation</b>
              </a>
            </li>
            <li>
              <a href="#" class="nav-link white">
                <b><i class="fa fa-question-circle" style="color:#fff"> Why {{config('app.name')}} </i> </b>
              </a>
            </li>
            <li>
            @guest
              <a href="{{ route('login') }}" class="nav-link white"><b><i class="fa fa-user" style="color:#fff"></i> Login</b></a>
              @else

              <a href="{{ route('home') }}" class="nav-link white"><b><i class="fa fa-home" style="color:#fff"></i> Dashboard</b></a>
              <a class="nav-link white" href="{{ route('logout') }}" onclick="event.preventDefault();
                  document.getElementById('logout-form').submit();">
                    
                  <b><i class="fa fa-home" style="color:#fff"></i> {{ __('Logout') }}</b>
              </a>
              <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                  @csrf
              </form>
            @endguest
            </li>
            
          </ul>
        </nav>
      </div>


      <div class="col-6 col-md-9 d-inline-block d-lg-none ml-md-0" ><a href="#" class="site-menu-toggle js-menu-toggle text-black float-right"><span class="icon-menu h3"></span></a></div>

    </div>
  </div>
  
</header>