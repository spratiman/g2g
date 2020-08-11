@extends('layouts.auth')

@section('body')
<div class=" pd-top-dynamic">
    <div class="container  login-container">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <h3 class=" text-dark font-weight-bold"> {{ __('Reset Password') }} </h3>
                <hr>
                <form method="POST" action="{{ route('password.update') }}">
                    @csrf
                    <input type="hidden" name="token" value="{{ $token }}">
                    
                    <div class="form-group">
                        <label for="email" class="text-dark">{{ __('E-Mail Address') }}</label>
                        <input type="email" class="form-control rounded @error('email') is-invalid @enderror" id="email" name="email" value="{{ $email ?? old('email') }}" required autocomplete="email" autofocus>
                        @error('email')
                            <span class="invalid-feedback" role="alert">
                                <strong>{{ $message }}</strong>
                            </span>
                        @enderror
                        
                    </div>
                    <div class="form-group">
                        <label for="password" class="text-dark">{{ __('Password') }}</label>
                        <input type="password" class="form-control rounded @error('password') is-invalid @enderror" id="password" name="password"  required autocomplete="new-password" >
                        @error('password')
                            <span class="invalid-feedback" role="alert">
                                <strong>{{ $message }}</strong>
                            </span>
                        @enderror
                        
                    </div>
                    <div class="form-group">
                        <label for="password-confirm" class="text-dark">{{ __('Confirm Password') }}</label>
                        <input type="password" class="form-control rounded" id="password-confirm" name="password_confirmation" required autocomplete="new-password">
                        
                    </div>
                    <div class="form-group text-center mt-3">
                        <button type="submit" class="btn btn-primary btn-block rounded">
                            {{ __('Reset Password') }}
                        </button>                                
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

@endsection
