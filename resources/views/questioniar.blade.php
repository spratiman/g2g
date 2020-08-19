@extends('layouts.auth')
@section('style')
    <link rel="stylesheet" href="{{ asset(config('custom.asset-path').'css/style1.css')}}">
    

    <style type="text/css">
    	.abc{
    		width: 100%;
    		text-align: left;
    		color: gray;
    	}
    	.abc:before {
   font-family: 'Glyphicons Halflings';
   content: "\e113";
   float: right;
   transition: all 0.75s;
}
.abc.collapsed:before {

	font-family: 'Glyphicons Halflings';
   content: "\e114";
   float: right;
   transition: all 0.75s;
	/*-webkit-transform: rotate(180deg);
	-moz-transform: rotate(180deg);
	transform: rotate(180deg);*/
} 
.accordion>.card .card-header {
    margin-bottom: 1px;
    background-color: #fff;
    border-bottom: 2px solid lightgrey;
}

.accordion>.card .card-header:hover{
	background-color: #f8f9fa;
}
.abc:hover,.abc:focus {
    text-decoration: none !important;
}
.recommended-label{
	background: grey;
    padding: 1% 2%;
    border-radius: 60px;
    color: white;
    margin-left: 5%;
    display:none;
}
</style>
@endsection
@section('header-script')
<script src="{{ asset(config('custom.asset-path').'js/angular.min.js')}}"></script>
@endsection


@section('body')
	<input type="hidden" id="save-questioniar-url" value="{{route('questioniar.save')}}" >
	<div class=" pd-top-dynamic" ng-app="myApp" ng-controller="myCtrl" id="myAppCtrl">
	   <div class="container-fluid">
	      <div class="row justify-content-center" >
	         <div class="col-11 col-sm-10 col-md-10  {{auth()->check() ? 'col-lg-6 col-xl-6':'col-lg-8 col-xl-8' }}  text-center p-0 mt-3 mb-4" >
	            <div class="card px-0 pt-4 pb-0 mt-3 mb-3" >
	               <h2 id="heading">Main Heading will go here</h2>
	               <p>Sub heading will go here</p>
	               	<form id="msform" method="POST" action="{{ route('register') }}">
	               		@csrf
	                	<input type="hidden" name="questioniar_id" value="" id="questioniar_id">
   					
   					<!-- progressbar -->
	                <ul id="progressbar">
                        <li class="active confirm {{auth()->check() ? 'width-20':'' }}" id="products-step"><strong>Products</strong></li>
                        <li class="confirm {{auth()->check() ? 'width-20':'' }}" id="personal-step"><strong>Personal</strong></li>
                        <li class="confirm {{auth()->check() ? 'width-20':'' }}" id="financial-step"><strong>Financial Status</strong></li>
                        <li class="confirm {{auth()->check() ? 'width-20':'' }}" id="recommendation-step"><strong>Recommendation</strong></li>
                        <li class="confirm {{auth()->check() ? 'width-20':'' }}" id="review-step"><strong>Review</strong></li>
                        @guest
                         <li class="confirm" id="registration-step"><strong>Registration</strong></li>
                      	@endguest
                    </ul>

	                 <!--  <div class="progress">
	                     <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuemin="0" aria-valuemax="100"></div>
	                  </div> -->
	                  <br> <!-- fieldsets -->
	                  <!-- <fieldset id="step1">
	                     <div class="form-card ">
	                        <div class="accordion" id="recommndationAccordion">
							  <div class="card">
							    <div class="card-header" id="headingOne">
							      <h2 class="mb-0">
							        <button class="btn btn-link collapsed abc" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
							          Low  <span class="recommended-label low-recommend-lable">Recommended</span>
							        </button>

							      </h2>
							    </div>

							    <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#recommndationAccordion">
							      <div class="card-body">
							        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
							      </div>
							    </div>
							  </div>
							  <div class="card">
							    <div class="card-header" id="headingTwo">
							      <h2 class="mb-0">
							        <button class="btn btn-link collapsed abc" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
							          Medium  <span class="recommended-label medium-recommend-lable">Recommended</span>
							        </button>
							      </h2>
							    </div>
							    <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#recommndationAccordion">
							      <div class="card-body">
							        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
							      </div>
							    </div>
							  </div>
							  <div class="card">
							    <div class="card-header" id="headingThree">
							      <h2 class="mb-0">
							        <button class="btn btn-link collapsed abc" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
							          High <span class="recommended-label high-recommend-lable">Recommended</span>
							        </button>
							      </h2>
							    </div>
							    <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#recommndationAccordion">
							      <div class="card-body">
							        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
							      </div>
							    </div>
							  </div>
							</div>
	                     </div>
	                     <input type="button" name="next" class="next action-button" value="Next" />
	                  </fieldset> -->

	                  <fieldset id="step1">
	                     <div class="form-card pr-4 pl-4">
	                        <div class="row">
	                           <div class="col-7">
	                              <h2 class="fs-title">Question <%step_number%>:  </h2>
	                              <small class="error-div "> *Please provide a response</small> 
	                           </div>
	                        </div>
	                        <p>Which insurance product are you interested in?</p>
	                        <div class="custom-control custom-checkbox">
	                           <input type="checkbox" class="custom-control-input q1-options" id="q1-op1" >
	                           <label class="custom-control-label" for="q1-op1">Life Insurance </label>    
	                           <a href="#" data-toggle="tooltip" data-placement="right" title="When you die this allows you to care for your loved ones and family members after your death."><i class="fa fa-question-circle" aria-hidden="true"></i></a>
	                        </div>
	                        <div class="custom-control custom-checkbox">
	                           <input type="checkbox" class="custom-control-input q1-options" id="q1-op2">
	                           <label class="custom-control-label" for="q1-op2">Critical Illness Insurance </label>  
	                           <a href="#" data-toggle="tooltip" data-placement="right" title="When you become extremely sick but you don’t die. The big three examples are heart attacks, strokes, and cancer. This allows you to pay for your medical bills.">
	                           <i class="fa fa-question-circle" aria-hidden="true"></i></a>
	                        </div>
	                        <div class="custom-control custom-checkbox">
	                           <input type="checkbox" class="custom-control-input q1-options" id="q1-op3">
	                           <label class="custom-control-label" for="q1-op3">Long Term Care Insurance </label>  
	                           <a href="#" data-toggle="tooltip" data-placement="right" title="When  you do not satisfy 2/6 daily living activities (eating, bathing, toileting, holding continence, mobility and clothing yourself without assistance) you are deemed disabled regardless of your age."><i class="fa fa-question-circle" aria-hidden="true"></i></a>
	                        </div>
	                        <div class="custom-control custom-checkbox">
	                           <input type="checkbox" class="custom-control-input" id="q1-op4">
	                           <label class="custom-control-label" for="q1-op4">I don't know</label>
	                        </div>
	                     </div>
	                     <input type="button" name="next" class="next action-button" value="Next" />
	                  </fieldset>
	                  <fieldset id="step2">
	                     <div class="form-card pr-4 pl-4">
	                        <div class="row">
	                           <div class="col-7">
	                              <h2 class="fs-title">Question <%step_number%> :</h2>
	                              <small class="error-div "> *Please provide a response</small> 
	                           </div>
	                        </div>
	                        <p> 
	                        	Are you interested in securing your family’s financial stability and lifestyle once you pass away?
	                        </p>
	                        <div class="custom-control custom-radio">
	                           <input type="radio" class="custom-control-input sq-options" id="sq1-op1" name="sq1" value="">
	                           <label class="custom-control-label" for="sq1-op1">No</label>
	                        </div>
	                        <!-- Group of default radios - option 2 -->
	                        <div class="custom-control custom-radio">
	                           <input type="radio" class="custom-control-input sq-options" id="sq1-op2" name="sq1" value="1">
	                           <label class="custom-control-label" for="sq1-op2">Yes</label>
	                        </div>
	                     </div>
	                     <input type="button" name="next" class="next action-button" value="Next"/> <input type="button" name="previous" class="previous action-button-previous" value="Previous" />
	                  </fieldset>
	                  <fieldset id="step3">
	                     <div class="form-card pr-4 pl-4">
	                        <div class="row">
	                           <div class="col-7">
	                              <h2 class="fs-title">Question <%step_number%> :</h2>
	                              <small class="error-div "> *Please provide a response</small> 
	                           </div>
	                        </div>
	                        <p>
	                        	Are you interested in securing your financial stability against critical illnesses in the event of hospitalization?
	                        </p>
	                        <div class="custom-control custom-radio">
	                           <input type="radio" class="custom-control-input sq-options" id="sq2-op1" name="sq2" value="">
	                           <label class="custom-control-label" for="sq2-op1">No</label>
	                        </div>
	                        <!-- Group of default radios - option 2 -->
	                        <div class="custom-control custom-radio">
	                           <input type="radio" class="custom-control-input sq-options" id="sq2-op2" name="sq2" value="2">
	                           <label class="custom-control-label" for="sq2-op2">Yes</label>
	                        </div>
	                     </div>
	                     <input type="button" name="next" class="next action-button" value="Next" /> <input type="button" name="previous" class="previous action-button-previous" value="Previous"  />
	                  </fieldset>
	                  <fieldset id="step4">
	                     <div class="form-card pr-4 pl-4">
	                        <div class="row">
	                           <div class="col-7">
	                              <h2 class="fs-title">Question <%step_number%> :</h2>
	                              <small class="error-div "> *Please provide a response</small> 
	                           </div>
	                        </div>
	                        <p>
	                        	Are you interested in receiving an income for as long as you are disabled should you lose the ability to satisfy 2/6 daily living activities (eating, bathing, toileting, holding continence, mobility and clothing yourself without assistance)?
	                        </p>
	                        <div class="custom-control custom-radio">
	                           <input type="radio" class="custom-control-input sq-options" id="sq3-op1" name="sq3" value="">
	                           <label class="custom-control-label" for="sq3-op1">No</label>
	                        </div>
	                        <!-- Group of default radios - option 2 -->
	                        <div class="custom-control custom-radio">
	                           <input type="radio" class="custom-control-input sq-options" id="sq3-op2" name="sq3" value="3">
	                           <label class="custom-control-label" for="sq3-op2">Yes</label>
	                        </div>
	                     </div>
	                     <input type="button" name="next" class="next action-button" value="Next" /> <input type="button" name="previous" class="previous action-button-previous" value="Previous" />
	                  </fieldset>

	                  <fieldset id="step5">
	                     <div class="form-card pr-4 pl-4">
	                        <div class="row">
	                           <div class="col-7">
	                              <h2 class="fs-title">Question <%step_number%>:</h2>
	                              <small class="error-div "> *Please Enter Date Of Birth</small> 
	                           </div>
	                        </div>
	                        <p>What is your date of birth?</p>
	                        <div>
	                        	<input class="datepicker form-control" id="q2-op1" data-date-format="mm/dd/yyyy" placeholder="mm/dd/yyyy">
	                           <!-- <input type="date" class="form-control" id="q2-op1" format="mm-dd-yyyy" > -->
	                        </div>
	                     </div>
	                     <input type="button" name="next" class="next action-button" value="Next" /> <input type="button" name="previous" class="previous action-button-previous" value="Previous" />
	                  </fieldset>
	                  <fieldset id="step6">
	                     <div class="form-card pr-4 pl-4">
	                        <div class="row">
	                           <div class="col-7">
	                              <h2 class="fs-title">Question <%step_number%>:</h2>
	                              <small class="error-div "> *Please Select Gender</small> 
	                           </div>
	                        </div>
	                        <p>What is your gender?</p>
	                        <div class="custom-control custom-radio">
	                           <input type="radio" class="custom-control-input" id="q3-op1" name="q3-options" value="Male">
	                           <label class="custom-control-label" for="q3-op1">Male</label>
	                        </div>
	                        <div class="custom-control custom-radio">
	                           <input type="radio" class="custom-control-input" id="q3-op2" name="q3-options" value="Female" >
	                           <label class="custom-control-label" for="q3-op2">Female</label>
	                        </div>
	                     </div>
	                     <input type="button" name="next" class="next action-button" value="Next"  /> <input type="button" name="previous" class="previous action-button-previous" value="Previous"  />
	                  </fieldset>
	                  <fieldset id="step7">
	                     <div class="form-card pr-4 pl-4">
	                        <div class="row">
	                           <div class="col-7">
	                              <h2 class="fs-title">Question <%step_number%>:</h2>
	                              <small class="error-div "> *Please provide a response</small> 
	                           </div>
	                        </div>
	                        <p>Are you a smoker?</p>
	                        <!-- Group of default radios - option 1 -->
	                        <div class="custom-control custom-radio">
	                           <input type="radio" class="custom-control-input" id="q4-op1" name="q4-options" value="No">
	                           <label class="custom-control-label" for="q4-op1">No</label>
	                        </div>
	                        <!-- Group of default radios - option 2 -->
	                        <div class="custom-control custom-radio">
	                           <input type="radio" class="custom-control-input" id="q4-op2" name="q4-options" value="Yes" >
	                           <label class="custom-control-label" for="q4-op2">Yes</label>
	                        </div>
	                     </div>
	                     <input type="button" name="next" class="next action-button" value="Next" /> <input type="button" name="previous" class="previous action-button-previous" value="Previous" />
	                  </fieldset>
	                  <fieldset id="step8">
	                     <div class="form-card pr-4 pl-4">
	                        <div class="row">
	                           <div class="col-7">
	                              <h2 class="fs-title">Question <%step_number%>:</h2>
	                              <small class="error-div "> *Please provide a response</small> 
	                           </div>
	                        </div>
	                        <p>Do you have any children?</p>
	                        <!-- Group of default radios - option 1 -->
	                        <div class="custom-control custom-radio">
	                           <input type="radio" class="custom-control-input" id="q5-op1" name="q5-options" value="0" ng-click="haveChildren = 0">
	                           <label class="custom-control-label" for="q5-op1">No</label>
	                        </div>
	                        <div class="custom-control custom-radio">
	                           <input type="radio" class="custom-control-input" id="q5-op2" name="q5-options" value="1" ng-click="haveChildren = 1">
	                           <label class="custom-control-label" for="q5-op2">Yes</label>

	                        </div>
	                        <div class="custom-control" >
	                           <!-- <input type="number" class="form-control" id="q5-input" min="1" step="1" placeholder="Enter Value" ng-show="haveChildren"> -->
	                           <select class="form-control" id="q5-input" ng-show="haveChildren">
	                           		<option value="">Select number of children</option>
	                              	<option value="1">1</option>
	                              	<option value="2">2</option>
									<option value="3">3</option>
									<option value="4">4</option>
									<option value="5">5</option>
									<option value="6">6</option>
									<option value="7">7</option>
									<option value="8">8</option>
									<option value="9">9</option>
									<option value="10">10</option>		                            	  
	                            </select>
	                        </div>

	                        <!-- Group of default radios - option 2 -->
	                        <!-- <div class="custom-control custom-radio">
	                           <input type="radio" class="custom-control-input" id="q5-op2" name="q5-options" value="1" >
	                           <label class="custom-control-label q5-op2" for="q5-op2">
	                           		<input type="number" class="form-control" id="q5-input" min="1" step="1" placeholder="Enter Value">
	                           </label>
	                        </div> -->
	                     </div>
	                     <input type="button" name="next" class="next action-button" value="Next"/> <input type="button" name="previous" class="previous action-button-previous" value="Previous"/>
	                  </fieldset>
	                  <fieldset id="step9">
	                     <div class="form-card pr-4 pl-4">
	                        <div class="row">
	                           <div class="col-7">
	                              <h2 class="fs-title">Question <%step_number%>:</h2>
	                              <small class="error-div "> *Please provide a response</small> 
	                           </div>
	                        </div>
	                        <p>What is your annual income?</p>
	                        <div >
	                           <select class="form-control" id="q6-op1">
	                              <option value="">Select Income</option>
	                              <option value="30000-40000">$30K-$40K</option>
	                              <option value="40000-50000">$40K-$50K</option>
	                              <option value="50000-60000">$50K-$60K</option>
	                              <option value="60000-70000">$60K-$70K</option>
	                              <option value="70000-80000">$70K-$80K</option>
	                              <option value="80000-90000">$80K-$90K</option>
	                              <option value="90000-100000">$90K-$100K</option>
	                              <option value="100000-120000">$100K-$120K</option>
	                              <option value="120000-140000">$120K-$140K</option>
	                              <option value="140000-160000">$140K-$160K</option>
	                              <option value="160000-180000">$160K-$180K</option>
	                              <option value="180000-200000">$180K-$200K</option>
	                              <option value="200000-250000"> >$200K+</option>
	                            </select>
	                        </div>
	                     </div>
	                     <input type="button" name="next" class="next action-button" value="Next"/> <input type="button" name="previous" class="previous action-button-previous" value="Previous"/>
	                  </fieldset>

	                  <fieldset id="step10">
	                     <div class="form-card pr-4 pl-4">
	                        <div class="row">
	                           <div class="col-7">
	                              <h2 class="fs-title">Question <%step_number%>:</h2>
	                              <small class="error-div "> *Please Select Option</small> 
	                           </div>
	                        </div>
	                        <p>What is the cost of your monthly mortgage payments?</p>
	                        <!-- Group of default radios - option 1 -->
	                        <div class="custom-control custom-radio">
	                           <input type="radio" class="custom-control-input" id="q7-op1" name="q7-options" value="1">
	                           <label class="custom-control-label q7-op1" for="q7-op1">
	                           		<input type="text" class="form-control" id="q7-input" pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$" value="" data-type="currency" placeholder="Enter Value">
	                           </label>
	                        </div>
	                        <!-- Group of default radios - option 2 -->
	                        <div class="custom-control custom-radio">
	                           <input type="radio" class="custom-control-input" id="q7-op2" name="q7-options" value="0" >
	                           <label class="custom-control-label" for="q7-op2">No mortgage</label>
	                        </div>
	                        <!-- Group of default radios - option 2 -->
	                       <!--  <div class="custom-control custom-radio">
	                           <input type="radio" class="custom-control-input" id="q7-op3" name="groupOfDefaultRadios" checked>
	                           <label class="custom-control-label" for="q7-op3">Skip</label>
	                        </div> -->
	                     </div>
	                     <input type="button" name="next" class="next action-button" value="Next" />
	                     <input type="button" name="skip" class="skip action-button-skip" value="Skip" />
	                     <input type="button" name="previous" class="previous action-button-previous" value="Previous"/>
	                    
	                  </fieldset>

	                  <fieldset id="step11">
	                     <div class="form-card pr-4 pl-4">
	                        <div class="row">
	                           <div class="col-7">
	                              <h2 class="fs-title">Question <%step_number%>:</h2>
	                              <small class="error-div "> *Please Enter Value</small> 
	                           </div>
	                        </div>
	                        <p>Approximately what is your total monthly expense?</p>
	                        <div >
	                           <input type="text" class="form-control" id="q8-op1" pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$" value="" data-type="currency" placeholder="Enter monthly expense">
	                        </div>
	                     </div>
	                     <input type="button" name="next" class="next action-button" value="Next" /> 
	                     <input type="button" name="skip" class="skip action-button-skip" value="Skip"/>
	                     <input type="button" name="previous" class="previous action-button-previous" value="Previous" />
	                  </fieldset>
	                  <fieldset id="step12">
	                     <div class="form-card pr-4 pl-4">
	                        <div class="row">
	                           <div class="col-7">
	                              <h2 class="fs-title">Question <%step_number%>:</h2>
	                              <small class="error-div "> *Please provide a response</small> 
	                           </div>
	                        </div>
	                        <p>Do you have any existing individual or group insurance policies?</p>
	                        <!-- Group of default radios - option 1 -->
	                        <div class="custom-control custom-radio">
	                           <input type="radio" class="custom-control-input" id="q9-op1" name="q9-options" value="0"  ng-click="havePolicy = 0">
	                           <label class="custom-control-label" for="q9-op1">
	                           		No
	                           </label>
	                        </div>
	                        <!-- Group of default radios - option 2 -->
	                        <div class="custom-control custom-radio">
	                           <input type="radio" class="custom-control-input" id="q9-op2" name="q9-options" value="1"  ng-click="havePolicy = 1">
	                           <label class="custom-control-label" for="q9-op2">Yes</label>
	                        </div>
	                        <!-- Group of default radios - option 2 -->
	                        <div class="custom-control custom-radio">
	                           <input type="radio" class="custom-control-input" id="q9-op3" name="q9-options" value="2"  ng-click="havePolicy = 2">
	                           <label class="custom-control-label" for="q9-op3">Not Sure</label>
	                        </div>
	                     </div>
	                     <div ng-show="havePolicy == 2">
	                     	<label class="fieldlabels">Upload any group benefit document, if you have</label> <input type="file" name="pic" id="insurance_document" accept="image/*"> 
	                     </div>
	                     <div ng-show="havePolicy == 1">
	                     	<div class="custom-control pb-2"  >
	                           <select class="form-control" id="q9-input1" >
	                           		<option value="">Select your insurance plan</option>
	                              	<option value="Individual">Individual</option>
	                              	<option value="Group">Group</option>                            	  
	                            </select>
	                        </div>
	                        <div class="custom-control" >
	                           <input type="text" class="form-control" id="q9-input2" pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$" value="" data-type="currency" placeholder="Enter Coverage Amount">
	                        </div>	
	                     </div>

	                     <input type="button" name="next" class="next action-button" value="Next" /> <input type="button" name="previous" class="previous action-button-previous" value="Previous"  />
	                     
	                     

	                  </fieldset>
	                  <fieldset id="step13">
	                     <!-- <div class="form-card"> -->
	                        <!-- <div class="row">
	                           <div class="col-7">
	                              <h2 class="fs-title">Finish:</h2>
	                           </div>
	                           <div class="col-5">
	                              <h2 class="steps">Final Step</h2>
	                           </div>
	                        </div> -->
	                        <!-- <br><br>
	                        <h2 class="purple-text text-center"><strong>You Have Successfully Submitted the Answers!</strong></h2>
	                        <br>
	                        <div class="row justify-content-center">
	                           <div class="col-3"> <img src="{{ asset(config('custom.asset-path').'images/GwStPmg.png') }}" class="fit-image"> </div>
	                        </div>
	                        <br><br>
	                        <div class="row justify-content-center">
	                           <div class="col-7 text-center">
	                              <h5 class="purple-text text-center"> Recommendation Will Be Provided Soon.</h5>
	                           </div>
	                        </div>
	                     </div>
	                     @guest
	                     	<input type="button" name="next" class="next action-button gotoregister" value="Go to registration" /> 
	                     @endguest
	                     <input type="button" name="previous" class="previous action-button-previous" value="Previous"  /> -->

	                     <div class="form-card  pr-4 pl-4 mb-4">
	                        <div class="accordion" id="recommndationAccordion">
							  <div class="card">
							    <div class="card-header" id="headingOne">
							      <h2 class="mb-0">
							        <button class="btn btn-link collapsed abc" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
							          Low  <span class="recommended-label low-recommend-lable">Recommended</span>
							        </button>

							      </h2>
							    </div>

							    <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#recommndationAccordion">
							      <div class="card-body">
							         <div class="form-group row p-1">
									    <label class="control-label pr-0 col-sm-2 recommendation-label-color" ><b> Premium:</b></label>
									    <div class="col-sm-10 pl-0 " id="low_premium">
									      	
									    </div>
									  </div>
									  <div class="form-group p-1">
									    <label class="control-label recommendation-label-color" > <b>Term 20: </b></label>
									    <ul class='ml-4 pl-4' id="low_term_20">
									    </ul>
									    
									  </div>
							      </div>
							    </div>
							  </div>
							  <div class="card">
							    <div class="card-header" id="headingTwo">
							      <h2 class="mb-0">
							        <button class="btn btn-link collapsed abc" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
							          Medium  <span class="recommended-label medium-recommend-lable">Recommended</span>
							        </button>
							      </h2>
							    </div>
							    <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#recommndationAccordion">
							      <div class="card-body">
							      	<div class="form-group row p-1">
									    <label class="control-label pr-0 col-sm-2 recommendation-label-color" > <b>Premium:</b></label>
									    <div class="col-sm-10 pl-0" id="medium_premium">
									      	
									    </div>
									  </div>
									  <div class="form-group p-1" >
									    <label class="control-label recommendation-label-color" > <b>Term 20:</b></label>
									    <ul class='ml-4 pl-4' id="medium_term_20">
									    </ul>
									    
									  </div>
									  <div class="form-group d-none p-1" id="medium_pay_20_div">
									    <label class="control-label  recommendation-label-color" ><b>20 Pay:</b></label>
									    <ul class='ml-4 pl-4' id="medium_pay_20">
									    </ul>
									  </div>
							      </div>
							    </div>
							  </div>
							  <div class="card">
							    <div class="card-header" id="headingThree">
							      <h2 class="mb-0">
							        <button class="btn btn-link collapsed abc" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
							          High <span class="recommended-label high-recommend-lable">Recommended</span>
							        </button>
							      </h2>
							    </div>
							    <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#recommndationAccordion">
							      	<div class="card-body">
							       	<div class="form-group row  p-1">
									    <label class="control-label pr-0 col-sm-2 recommendation-label-color" ><b>Premium:</b></label>
									    <div class="col-sm-10 pl-0" id="high_premium">
									      	
									    </div>

									  </div>
									  <div class="form-group p-1" >
									    <label class="control-label recommendation-label-color " ><b>Term 20:</b></label>
									    <ul class='ml-4 pl-4' id="high_term_20">
									    </ul>
									    
									  </div>
									  <div class="form-group d-none p-1" id="high_pay_20_div">
									    <label class="control-label recommendation-label-color" ><b> 20 Pay:</b></label>
									    <ul class='ml-4 pl-4' id="high_pay_20">
									    </ul>
									  </div>
							       	</div>
							    </div>
							  </div>
							</div>
	                     </div>
	                     @guest
	                  		 <input type="button" name="next" class="next action-button gotoregister width-97" value="Review Your Recommendations" /> 
	                  	@else
	                  		<input type="button" name="next" class="next action-button gotoregister width-97" value="Review And Save Your Recommendations" style="margin-top: 5% !important;"/>
	                  	
	                  	@endguest 
	                    
	                    
	                  </fieldset>
	                  <fieldset id="step14">
	                  	<div class="form-card  pr-4 pl-4">
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
								    <td>
								    	<% value.a %>
								    	<span ng-if="value.c_amount != undefined">
		                                   <br>
		                                   <b> Coverage Amount</b> : <% value.c_amount %> 
		                                   <br>
		                                   <b> Insurance Plan</b> : <% value.insurance_plan %> 
		                                </span>
		                                <span ng-if="value.insurance_document != undefined">
		                                   <br>
		                                   <b> Insurance Document</b> <br> 
                                        	<img  ng-if="value.insurance_document != undefined" src="<% value.insurance_document %>" class="showImage" style="width:125px;">   
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
	                  	@guest
	                  	<input type="button" name="next" class="next action-button gotoregister width-97" value="Register to Save Your Recommendations" />
	                  	@else
	                  		<a href="{{route('home')}}" class="action-button gotoregister width-97" >Go To Dashboard</a>
	                  	
	                  	@endguest 
	                  </fieldset>
	                  @guest
	                  <fieldset id="step15">
	                  	<div class="form-card pr-4 pl-4">
	                     	<div class="row">
	                           <div class="col-7">
	                              <h2 class="fs-title">Register Yourself: <small>(optional)</small></h2>
	                           </div>
	                        </div>
	                        <div class="form-group row">
	                            <label for="first_name" class="col-md-4 col-form-label text-md-right">
	                            	{{ __('First Name') }}
	                        	</label>

	                            <div class="col-md-6">
	                                <input id="first_name" type="text" class="form-control " name="first_name" value="" required >

                                    <span class="invalid-feedback" role="alert">
                                        <strong id="first_name_msg"> </strong>
                                    </span>
	                                
	                            </div>
	                        </div>
	                        <div class="form-group row">
	                            <label for="name" class="col-md-4 col-form-label text-md-right">
	                            	{{ __('Last Name') }}
	                        	</label>

	                            <div class="col-md-6">
	                                <input id="last_name" type="text" class="form-control " name="last_name" value="" required >

                                    <span class="invalid-feedback" role="alert">
                                        <strong id="last_name_msg"> </strong>
                                    </span>
	                                
	                            </div>
	                        </div>

	                        <div class="form-group row">
	                            <label for="email" class="col-md-4 col-form-label text-md-right">{{ __('E-Mail Address') }}</label>

	                            <div class="col-md-6">
	                                <input id="email" type="email" class="form-control " name="email" value="" required>

	                                <span class="invalid-feedback" role="alert">
                                        <strong id="email_msg"> </strong>
                                    </span>
	                            </div>
	                        </div>
	                        <div class="form-group row">
	                            <label for="phone_number" class="col-md-4 col-form-label text-md-right">{{ __('Phone Number') }}</label>

	                            <div class="col-md-6">
	                                <input id="phone_number" type="text" class="form-control " name="phone_number" value="">

	                                <span class="invalid-feedback" role="alert">
                                        <strong id="phone_number_msg"> </strong>
                                    </span>
	                            </div>
	                        </div>

	                        <div class="form-group row">
	                            <label for="password" class="col-md-4 col-form-label text-md-right">{{ __('Password') }}</label>

	                            <div class="col-md-6">
	                                <input id="password" type="password" class="form-control " name="password" required autocomplete="new-password">

	                                <span class="invalid-feedback" role="alert">
                                        <strong id="password_msg"> </strong>
                                    </span>
	                            </div>
	                        </div>

	                        <div class="form-group row">
	                            <label for="password-confirm" class="col-md-4 col-form-label text-md-right">{{ __('Confirm Password') }}</label>

	                            <div class="col-md-6">
	                                <input id="password-confirm" type="password" class="form-control" name="password_confirmation" required autocomplete="new-password">
	                            </div>
	                        </div>
                        </div>
                        <button type="button" class="action-button register-btn" >
                            {{ __('Register') }}
                        </button>
                                  
	                  </fieldset>
	                  @endguest
	              	</form>
	            </div>
	         </div>
	      </div>
	   </div>
	</div>
@endsection
@section('script')
  <script src="{{ asset(config('custom.asset-path').'js/script.js') }}"></script>
  <script>
  	$(document).ready(function(){
	  $('[data-toggle="tooltip"]').tooltip();   
	});
  	
  	var app = angular.module('myApp', [], function($interpolateProvider) {
        $interpolateProvider.startSymbol('<%');
        $interpolateProvider.endSymbol('%>');
    });

	app.controller('myCtrl', function($scope) {
	  $scope.step_number = 1;
	  $scope.haveChildren = 0;
	  $scope.havePolicy = 0;
	  $scope.q_ans = [];
	  $scope.saved_recomendations = [];
	  $scope.questioniar_id = null;
	  $scope.state = 0;
	  $scope.auth = "{{ auth()->check() ? 1:0 }}";
	  @if($questioniar == null)
	  	$scope.questioniar = @json(config('questions'));
	  @else
	  	$scope.questioniar = @json(json_decode($questioniar->answers));
	  	$scope.recommendations = @json(json_decode($questioniar->recommendations));
	  	$scope.questioniar_id = "{{$questioniar->id}}";
	  	$scope.state = parseInt("{{ $questioniar->state }}");
	  @endif
	});

	$("body").on('change','input[type=radio][name=q7-options]', function(event){
	    if($('input[name="q7-options"]:checked').val() == 0){
	        $("#q7-input").val('');
	        // $("#q7-input").attr('disabled','disabled');
	    }
	});

	$("body").on('focus','#q7-input', function(event){
	    $('#q7-op1').click();
	});

	$("body").on('keyup',"input[data-type='currency']", function(event){
	      formatCurrency($(this));
	});
	$("body").on('blur',"input[data-type='currency']", function(event){
	      formatCurrency($(this), "blur");
	});

	function formatNumber(n) {
	  // format number 1000000 to 1,234,567
	  return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
	}


function formatCurrency(input, blur) {
  // appends $ to value, validates decimal side
  // and puts cursor back in right position.
  
  // get input value
  var input_val = input.val();
  
  // don't validate empty input
  if (input_val === "") { return; }
  
  // original length
  var original_len = input_val.length;

  // initial caret position 
  var caret_pos = input.prop("selectionStart");
    
  // check for decimal
  if (input_val.indexOf(".") >= 0) {

    // get position of first decimal
    // this prevents multiple decimals from
    // being entered
    var decimal_pos = input_val.indexOf(".");

    // split number by decimal point
    var left_side = input_val.substring(0, decimal_pos);
    var right_side = input_val.substring(decimal_pos);

    // add commas to left side of number
    left_side = formatNumber(left_side);

    // validate right side
    right_side = formatNumber(right_side);
    
    // On blur make sure 2 numbers after decimal
    if (blur === "blur") {
      right_side += "00";
    }
    
    // Limit decimal to only 2 digits
    right_side = right_side.substring(0, 2);

    // join number by .
    input_val = "$" + left_side + "." + right_side;

  } else {
    // no decimal entered
    // add commas to number
    // remove all non-digits
    input_val = formatNumber(input_val);
    input_val = "$" + input_val;
    
    // final formatting
    if (blur === "blur") {
      input_val += ".00";
    }
  }
  
  // send updated string to input
  input.val(input_val);

  // put caret back in the right position
  var updated_len = input_val.length;
  caret_pos = updated_len - original_len + caret_pos;
  input[0].setSelectionRange(caret_pos, caret_pos);
}
</script>
@endsection