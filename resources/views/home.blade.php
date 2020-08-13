@extends('layouts.app')
@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('Questioniars') }}</div>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif

                    <div class="table-responsive mb-4">
                        <table class="table table-bordered">
                          <tr>
                            <th>#</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                          @foreach($questionairs as $questioniar)
                          <tr>
                            <td> {{$loop->index + 1}}</td>
                            <td> {{$questioniar->created_at->format('F d-Y') }} </td>
                            <td> {{$questioniar->status == 1 ? 'Completed': 'Review' }} </td>
                            <td> 
                                <a href="{{route('questioniar.view',$questioniar->id)}}"> View Questioniar </a>
                            </td>  
                          </tr>
                          @endforeach
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
