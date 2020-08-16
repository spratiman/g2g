@extends('layouts.auth')
@section('header-script')
<script src="{{ asset(config('custom.asset-path').'js/angular.min.js')}}"></script>
@endsection
@section('body')
<div class=" pd-top-dynamic" >
<div class="container-fluid  pd-top-dynamic" ng-app="myApp" ng-controller="myCtrl" id="myAppCtrl">
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
						    <th style="width:6%">#</th>
						    <th style="width:65%">Question</th>
						    <th style="width:29%">Answer</th>
						  </tr>
						  <tr ng-repeat="(key, value) in q_ans">
						    <td>Q<% key+1 %></td>
						    <td><% value.q %></td>
						    <td>
                                <% 
                                    value.a
                                %>
                                <span ng-if="value.c_amount != undefined">
                                   <br>
                                   <b> Coverage Amount</b> : <% value.c_amount %> 
                                   <br>
                                   <b> Insurance Plan</b> : <% value.insurance_plan %> 
                                </span>
                                <span ng-if="value.insurance_document != undefined">
                                    <br>
                                    <b> Insurance Document</b> <br> 
                                    <img src="<% value.insurance_document %>" class="showImage" style="width:125px;">
                                </span>
                            </td>  
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
            $scope.saved_recomendations = [];
            var saved_responses = @json(json_decode($questioniar->saved_recommendations));
            var result_calculation = @json(json_decode($questioniar->recommendations));
            $scope.questioniar = @json(json_decode($questioniar->answers));

            var keys = Object.keys( $scope.questioniar);
            for (const key of keys) {
                if(key == 9){
                    if($scope.questioniar[key].value == 0){
                        ans_text = 'No';
                        $scope.q_ans.push({q:$scope.questioniar[key].question, a:ans_text});
                    }else if ($scope.questioniar[key].value == 1){
                        ans_text = 'Yes';
                        $scope.q_ans.push({q:$scope.questioniar[key].question, a:ans_text,c_amount:$scope.questioniar[key].coverage_amount,insurance_plan: $scope.questioniar[key].insurance_plan});
                    }else if ($scope.questioniar[key].value == 2){
                        ans_text = 'Not Sure';
                        $scope.q_ans.push({q:$scope.questioniar[key].question, a:ans_text,insurance_document:$scope.questioniar[key].insurance_document});
                    }
                    
                }else{

                    $scope.q_ans.push({q: $scope.questioniar[key].question, a: $scope.questioniar[key].ans_text});
                    if(key == 1 &&  $scope.questioniar[key].value.indexOf(4) != -1 ){
                        var subKeys = Object.keys( $scope.questioniar[key].sub_question);
                        for (const subKey of subKeys) {
                             $scope.q_ans.push({q: $scope.questioniar[key].sub_question[subKey].question, a: $scope.questioniar[key].sub_question[subKey].ans_text});
                        }
                    }
                }
                                        
            }

            var keys = Object.keys(saved_responses.low.term_20);
            
            for (const key of keys) {
                if(saved_responses.low.term_20[key] == 1){
                    $scope.saved_recomendations.push({ level:"Low" ,type:"term 20",value: result_calculation.low.term_20[key].type +": "+result_calculation.low.term_20[key]['range']});
                    
                }
            }
            var keys = Object.keys(saved_responses.medium.term_20);
            for (const key of keys) {
                if(saved_responses.medium.term_20[key] == 1){
               
                    $scope.saved_recomendations.push({ level:"Medium" ,type:"term 20",value:result_calculation.medium.term_20[key].type +": "+result_calculation.medium.term_20[key]['range'] });
                    
                }
            }
            var keys = Object.keys(saved_responses.high.term_20);
            for (const key of keys) {
                if(saved_responses.high.term_20[key] == 1){
            
                    $scope.saved_recomendations.push({ level:"High" ,type:"term 20",value:result_calculation.high.term_20[key].type +": "+result_calculation.high.term_20[key]['range']});
                    
                }
            }; 

            if(saved_responses.medium.pay_20 == 1){
                $scope.saved_recomendations.push({ level:"Medium" ,type:"Pay 20",value:result_calculation.medium.pay_20.value});
                
            }
            if(saved_responses.high.pay_20 == 1){
                $scope.saved_recomendations.push({ level:"High" ,type:"Pay 20",value:result_calculation.high.pay_20.value});      
            }
        });
    </script>
@endsection
