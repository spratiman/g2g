@extends('layouts.app')
@section('header-script')
<script src="{{ asset(config('custom.asset-path').'js/angular.min.js')}}"></script>
@endsection
@section('content')
<div class="container" ng-app="myApp" ng-controller="myCtrl" id="myAppCtrl">
    <div class="row justify-content-center">
        <div class="col-md-10">
            <div class="card">
                <div class="card-header">{{ __('Questioniar Details') }}</div>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif

                    <div class="table-responsive mb-4">
                  		<table class="table table-bordered">
						  <tr>
						    <th style="width:10%">#</th>
						    <th style="width:70%">Question</th>
						    <th style="width:20%">Answer</th>
						  </tr>
						  <tr ng-repeat="(key, value) in q_ans">
						    <td>Q<% key+1 %></td>
						    <td><% value.q %></td>
						    <td><% value.a %></td>  
						  </tr>
						</table>
					</div>
					<hr>
					<h4 class="text-center"> Saved Recommendations</h4>
					<div class="table-responsive mb-4">
                  		<table class="table table-bordered">
                  			<tr>
							    <th style="width:20%">Level</th>
							    <th style="width:20%">Type</th>
							    <th style="width:60%">Recomendation</th>
							 </tr>
						  	<tr ng-repeat="(key, value) in saved_recomendations">
						    	<td><% value.level %></td>
						    	<td><%value.type %></td>
						    	<td><%value.value%></td>
						 	</tr>					  
						</table>
					</div>
            	</div>
        	</div>
    	</div>
	</div>
</div>
@endsection

@section('script')
    <script>
        var app = angular.module('myApp', [], function($interpolateProvider) {
            $interpolateProvider.startSymbol('<%');
            $interpolateProvider.endSymbol('%>');
        });

        app.controller('myCtrl', function($scope) {
            $scope.q_ans = [];
            $scope.saved_recomendations = @json(json_decode($questioniar->recommendation));
            $scope.questioniar = @json(json_decode($questioniar->answers));
            var keys = Object.keys( $scope.questioniar);
            for (const key of keys) {
                 $scope.q_ans.push({q: $scope.questioniar[key].question, a: $scope.questioniar[key].ans_text});
                console.log( $scope.questioniar[key].value);
                if(key == 1 &&  $scope.questioniar[key].value.indexOf(4) != -1 ){
                    var subKeys = Object.keys( $scope.questioniar[key].sub_question);
                    for (const subKey of subKeys) {
                         $scope.q_ans.push({q: $scope.questioniar[key].sub_question[subKey].question, a: $scope.questioniar[key].sub_question[subKey].ans_text});
                    }
                }                        
            }
        });
    </script>
@endsection
