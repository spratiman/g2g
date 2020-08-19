@extends('layouts.auth')
@section('body')
<div class=" pd-top-dynamic" >
<div class="container-fluid  pd-top-5-per">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('Saved Recommendation') }}</div>

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
                          @if(count($questionairs) > 0)
                                @foreach($questionairs as $questioniar)
                                  <tr>
                                    <td> {{$loop->index + 1}}</td>
                                    <td> {{$questioniar->created_at->format('F d-Y H:i') }} </td>
                                    @if($questioniar->status == 1)
                                    <td> Completed </td>
                                    <td> 
                                        <a href="{{route('questioniar.view',$questioniar->id)}}"> View Questioniar </a>
                                    </td>
                                    @else
                                    <td> Open </td>
                                    <td> 
                                        @php
                                            session()->flash('q_id',$questioniar->id);
                                        @endphp
                                        <a href="{{route('questioniar')}}"> Open Questioniar </a>
                                    </td>
                                    @endif  
                                  </tr>
                                @endforeach
                            @else
                                <tr>
                                    <td colspan="4" class="text-center">
                                       <h5> No Recommendation Yet.</h5><a href="{{ route('questioniar') }}" class="btn btn-primary mr-2 mb-2"> <i class="fa fa-money" style="color:#fff"></i> Get Free Recommendation</a>
                                    </td>
                                </tr>
                            @endif
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
@endsection
