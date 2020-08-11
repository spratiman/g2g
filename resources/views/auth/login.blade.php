@extends('layouts.auth')

@section('body')
<div class=" pd-top-dynamic">
    <div class="container login-container">
        <div class="row ">
            <div class="col-md-5 offset-md-2">
                <!-- <div class="card"> -->
                    <!-- <div class="card-header text-dark font-weight-bold">{{ __('Sign In') }}</div> -->
                    <h3 class=" text-dark font-weight-bold"> {{ __('Sign In') }} </h3>
                    <hr>
                    <!-- <div class="card-body"> -->
                        <form method="POST" action="{{ route('login') }}">
                            @csrf
                            <div class="form-group">
                                <label for="" class="text-dark">{{ __('E-Mail Address') }}</label>
                                <input type="email" class="form-control rounded @error('email') is-invalid @enderror" id="" name="email" value="{{ old('email') }}" required autocomplete="email" autofocus>
                                @error('email')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                                
                            </div>
                            <div class="form-group">
                                <label for="" class="text-dark">{{ __('Password') }}</label>
                            
                                <div class="input-group mb-3">
                                    <input id="password" type="password" class="form-control rounded-left @error('password') is-invalid @enderror" name="password" required autocomplete="current-password">
                                    <div class="input-group-append">
                                        <button class="btn btn-secondary rounded-right p-2" type="button" id="show-password">Show</button>
                                    </div>
                                </div>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>
                                <label class="form-check-label text-dark" for="remember" >
                                    {{ __('Remember Me') }}

                                </label>
                                <label class="form-check-label text-dark float-right" >
                                    @if (Route::has('password.request'))
                                     <a class="" href="{{ route('password.request') }}">
                                        {{ __('Forgot Your Password?') }}
                                    </a>
                                    @endif
                                </label>
                            </div>
                            <div class="form-group text-center mt-3">
                                <button type="submit" class="btn btn-primary btn-block rounded">
                                    {{ __('Login') }}
                                </button>                                
                            </div>

                            <div class="form-group text-center mt-3">
                                <a href="{{route('register')}}" class="btn btn-outline-primary btn-block rounded">
                                    {{ __('Register') }}
                                </a>                                
                            </div>

                            <!-- <div class="form-group text-center ">
                                @if (Route::has('password.request'))
                                    <a class="btn btn-link" href="{{ route('password.request') }}">
                                        {{ __('Forgot Your Password?') }}
                                    </a>
                                @endif
                            </div> -->
                            
                            <!--  <div class="form-group row">
                                <label for="email" class="col-md-4 col-form-label text-md-right">{{ __('E-Mail Address') }}</label>

                                <div class="col-md-6">
                                    <input id="email" type="email" class="form-control @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email" autofocus>

                                    @error('email')
                                        <span class="invalid-feedback" role="alert">
                                            <strong>{{ $message }}</strong>
                                        </span>
                                    @enderror
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="password" class="col-md-4 col-form-label text-md-right">{{ __('Password') }}</label>

                                <div class="col-md-6">
                                    <input id="password" type="password" class="form-control @error('password') is-invalid @enderror" name="password" required autocomplete="current-password">

                                    @error('password')
                                        <span class="invalid-feedback" role="alert">
                                            <strong>{{ $message }}</strong>
                                        </span>
                                    @enderror
                                </div>
                            </div>

                            <div class="form-group row">
                                <div class="col-md-6 offset-md-4">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>

                                        <label class="form-check-label" for="remember">
                                            {{ __('Remember Me') }}
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group row mb-0">
                                <div class="col-md-8 offset-md-4">
                                    <button type="submit" class="btn btn-primary">
                                        {{ __('Login') }}
                                    </button>

                                    @if (Route::has('password.request'))
                                        <a class="btn btn-link" href="{{ route('password.request') }}">
                                            {{ __('Forgot Your Password?') }}
                                        </a>
                                    @endif
                                </div>
                            </div> -->
                        </form>
                   <!--  </div>
                </div> -->
            </div>
            <div class="col-md-4 ">
                <img class="img-fluid rounded  img-thumbnail mt-4 p-4" src="{{ asset(config('custom.asset-path').'images/img3.jpg')}}">
            </div>
        </div>
    </div>
</div>
@endsection
