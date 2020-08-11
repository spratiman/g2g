@extends('layouts.auth')

@section('body')
<div class=" pd-top-dynamic">
    <div class="container  login-container">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <h3 class=" text-dark font-weight-bold"> {{ __('Reset Password') }} </h3>
                <hr>
                <form method="POST" action="{{ route('password.email') }}">
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
                    <div class="form-group text-center mt-3">
                        <button type="submit" class="btn btn-primary btn-block rounded">
                            {{ __('Send Password Reset Link') }}
                        </button>                                
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
@endsection
