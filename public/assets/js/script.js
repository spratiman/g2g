$(document).ready(function() {
    var answers = {
        q1:[],
        q2:'',
        q3:'',
        q4:'',
        q5:0,
        q6:'',
        q7:'',
        q8:'',
        q9:{
            value:'',
            coverage_amount:'',
            insurance_plan:'',
            insurance_document:''
        },
    };

    var result_calculation = {
        x1:0,
        x2:0,
        y1:0,
        y2:0,
        recommended_option:'',
        low:{
            premium:{
                value:'',
                note:'',
            },
            term_20:[],
            pay_20:{
                value:'',
                note:''
            }
        },
        medium:{
            premium:{
                value:'',
                note:'',
            },
            term_20:[],
            pay_20:{
                value:'',
                note:''
            }
        },
        high:{
            premium:{
                value:'',
                note:'',
            },
            term_20:[],
            pay_20:{
                value:'',
                note:''
            }
        }
    }
    var saved_responses = {
        low:{
         
            term_20:{
                1:0,
                2:0,
                3:0
            },
            pay_20:0
        },
        medium:{
            
            term_20:{
                1:0,
                2:0,
                3:0
            },
            pay_20:0
        },
        high:{
            
            term_20:{
                1:0,
                2:0,
                3:0
            },
            pay_20:0
        }   
    }
    var current_fs, next_fs, previous_fs; //fieldsets
    var opacity;
    var current = 1;
    var current_step = 1;
    var next = current + 1;
    var steps = 11;//$("fieldset").length;
    setProgressBar(current_step);

    $(".next").click(function() {

    	var check = validateQuestions(current);
    	if(check == false){
    		return false;
    	}
        
        current_fs = $("#step"+current);
        next_fs = $("#step"+next);
        if(next == 13){
            findRecommendationOption();
            lowRecommendationOption();
            mediumRecommendationOption();
            highRecommendationOption();
            $("."+result_calculation.recommended_option+"-recommend-lable").show();

            saveQuestioniar();

        }
        if(next == 14){
            var scope = angular.element($("#myAppCtrl")).scope();
            var keys = Object.keys(saved_responses.low.term_20);
            for (const key of keys) {
                if(saved_responses.low.term_20[key] == 1){
                    scope.$apply(function(){
                        scope.saved_recomendations.push({ level:"Low" ,type:"term 20",value:result_calculation.low.term_20[key]['type'] +": "+result_calculation.low.term_20[key]['range']});
                    });
                }
            }
            var keys = Object.keys(saved_responses.medium.term_20);
            for (const key of keys) {
                if(saved_responses.medium.term_20[key] == 1){
               
                    scope.$apply(function(){
                        scope.saved_recomendations.push({ level:"Medium" ,type:"term 20",value:result_calculation.medium.term_20[key]['type'] +": "+result_calculation.medium.term_20[key]['range'] });
                    });
                }
            }
            var keys = Object.keys(saved_responses.high.term_20);
            for (const key of keys) {
                if(saved_responses.high.term_20[key] == 1){
            
                    scope.$apply(function(){
                        scope.saved_recomendations.push({ level:"High" ,type:"term 20",value:result_calculation.high.term_20[key]['type'] +": "+result_calculation.high.term_20[key]['range']});
                    });
                }
            }; 

            if(saved_responses.medium.pay_20 == 1){
                scope.$apply(function(){
                    scope.saved_recomendations.push({ level:"Medium" ,type:"Pay 20",value:result_calculation.medium.pay_20.value});
                });
            }
            if(saved_responses.high.pay_20 == 1){
                scope.$apply(function(){
                    scope.saved_recomendations.push({ level:"High" ,type:"Pay 20",value:result_calculation.high.pay_20.value});
                });
            } 


        }
        //Add Class Active
        // $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

        //show the next fieldset
        next_fs.show();
        //hide the current fieldset with style
        current_fs.animate({
            opacity: 0
        }, {
            step: function(now) {
                // for making fielset appear animation
                opacity = 1 - now;
                current_fs.css({
                    'display': 'none',
                    'position': 'relative'
                });

                next_fs.css({
                    'opacity': opacity
                });
            },
            duration: 500
        });
        current = next;
        next = current +1;
        current_step++;

        setProgressBar(current_step,current);
    
    });

    $(".skip").click(function() {

        current_fs = $("#step"+current);
        next_fs = $("#step"+next);
        
        //Add Class Active
        // $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

        //show the next fieldset
        next_fs.show();
        //hide the current fieldset with style
        current_fs.animate({
            opacity: 0
        }, {
            step: function(now) {
                // for making fielset appear animation
                opacity = 1 - now;
                current_fs.css({
                    'display': 'none',
                    'position': 'relative'
                });

                next_fs.css({
                    'opacity': opacity
                });
            },
            duration: 500
        });
        current = next;
        next = current +1;
        current_step++;
        setProgressBar(current_step,current);
     
    });

    $(".previous").click(function() {

        current_fs = $("#step"+current);
        var previous = current - 1;
        if(current == 5){
            if($("#q1-op4").prop('checked') == true){
            }else{
                previous = current- 4;
            }
        }
        previous_fs = $("#step"+previous);

        //Remove class active
        $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

        //show the previous fieldset
        previous_fs.show();

        //hide the current fieldset with style
        current_fs.animate({
            opacity: 0
        }, {
            step: function(now) {
                // for making fielset appear animation
                opacity = 1 - now;

                current_fs.css({
                    'display': 'none',
                    'position': 'relative'
                });
                previous_fs.css({
                    'opacity': opacity
                });
            },
            duration: 500
        });
        current = previous;
        next= current +1;
        setProgressBar(--current_step,current);
    });

    function setProgressBar(curStep,q_no) {
        var scope = angular.element($("#myAppCtrl")).scope();
        scope.$apply(function(){
            scope.step_number = curStep;
        });
        // var percent = parseFloat(100 / steps) * curStep;
        // percent = percent.toFixed();
        // $(".progress-bar")
        //     .css("width", percent + "%")
        if(q_no >=1 && q_no <= 4){

            $('#products-step').addClass('active');
            $('#personal-step').removeClass('active');
            $('#financial-step').removeClass('active');
            $('#recommendation-step').removeClass('active');
            $('#review-step').removeClass('active');
            $('#registration-step').removeClass('active');

        }else if(q_no >=5 && q_no <= 8){
            $('#products-step').addClass('active');
            $('#personal-step').addClass('active');
            $('#financial-step').removeClass('active');
            $('#recommendation-step').removeClass('active');
            $('#review-step').removeClass('active');
            $('#registration-step').removeClass('active');
        }else if(q_no >=9 && q_no <= 12){
            $('#products-step').addClass('active');
            $('#personal-step').addClass('active');
            $('#financial-step').addClass('active');
            $('#recommendation-step').removeClass('active');
            $('#review-step').removeClass('active');
            $('#registration-step').removeClass('active');
        }else if(q_no ==13){
            $('#products-step').addClass('active');
            $('#personal-step').addClass('active');
            $('#financial-step').addClass('active');
            $('#recommendation-step').addClass('active');
            $('#review-step').removeClass('active');
            $('#registration-step').removeClass('active');

        }else if(q_no ==14){
            $('#products-step').addClass('active');
            $('#personal-step').addClass('active');
            $('#financial-step').addClass('active');
            $('#recommendation-step').addClass('active');
            $('#review-step').addClass('active');
            $('#registration-step').removeClass('active');

        }else if(q_no ==15 ){
            $('#products-step').addClass('active');
            $('#personal-step').addClass('active');
            $('#financial-step').addClass('active');
            $('#recommendation-step').addClass('active');
            $('#review-step').addClass('active');
            $('#registration-step').addClass('active');
        }
        
    }

    $(".submit").click(function() {
        return false;
    });

    function validateQuestions(question){

        console.log(question);
        if(question == 1){
            return question1validation();
        }else if(question == 2){
            return question2validation();
        }else if(question == 3){
            return question3validation();
        }else if(question == 4){
            return question4validation();
        }else if(question == 5){
            return question5validation();
        }else if(question == 6){
            return question6validation();
        }else if(question == 7){
            return question7validation();
        }else if(question == 8){
            return question8validation();
        }else if(question == 9){
            return question9validation();
        }else if(question == 10){
            return question10validation();
        }else if(question == 11){
            return question11validation();
        }else if(question == 12){
            return question12validation();
        }else{
           
        }
        
        return true;
    }

    function question1validation(){
        var q1_ans = [];
        answers.q1 = [];
        var scope = angular.element($("#myAppCtrl")).scope();
        var ans = [];
        if($("#q1-op1").prop('checked') == true){
            q1_ans.push(1);
            answers['q1'].push(1);
            ans.push("Life Insurance");
        }

        if($("#q1-op2").prop('checked') == true){
            q1_ans.push(2);
            answers['q1'].push(2);
            ans.push("Critical Illness Insurance");

        }

        if($("#q1-op3").prop('checked') == true){
            q1_ans.push(3);
            answers['q1'].push(3);
            ans.push("Long Term Care Insurance");
            
        }

        if($("#q1-op4").prop('checked') == true){
            q1_ans.push(4);
            ans.push("I don't know");


            // if($('input[name="sq1"]:checked').length == 0 && $('input[name="sq2"]:checked').length == 0 && $('input[name="sq3"]:checked').length == 0){
            //     q1_ans = [];
            // }
   //          else{
            //  if($("#sq1-op2").prop('checked') == true){
            //      q1_ans.push(0);
            //  }
            //  if($("#sq2-op2").prop('checked') == true){
            //      q1_ans.push(1);
            //  }
            //  if($("#sq3-op2").prop('checked') == true){
            //      q1_ans.push(2);
            //  }
            //  if($("#sq1-op1").prop('checked') == true && $("#sq1-op1").prop('checked') == true && $("#sq1-op1").prop('checked') == true){
            //      q1_ans.push(3);
            //  }
            // }
            steps+=3;
        }else{
            steps = 11; 
            
        }
        if($("#q1-op1").prop('checked') == true || $("#q1-op2").prop('checked') == true ||$("#q1-op3").prop('checked') == true){
            next +=3;
        }

        if(q1_ans.length > 0)
        {
            scope.$apply(function(){
                scope.q_ans.push({q: 'Which insurance product are you interested in?', ans: ans.join()})   ;
            });
            $("#q1").val(JSON.stringify(q1_ans));   
            $("#step1").find('.error-div').removeClass('error');
            return true;
        }else{
            $("#step1").find('.error-div').addClass('error');
        }
        return false;
    }

    function question2validation(){

        if($('input[name="sq1"]:checked').length != 0){
            var scope = angular.element($("#myAppCtrl")).scope();
            var ans = {q:'Are you interested in securing your family’s financial stability and lifestyle once you pass away?',ans:''};
            if($("#sq1-op2").prop('checked') == true){
                $("#q1-sq1").val(1);   
                answers.q1.push(1);
                ans.ans = 'Yes';
                
            }else{
                $("#q1-sq3").val('');
                ans.ans = 'No';
            } 
            scope.$apply(function(){
                scope.q_ans.push(ans)   ;
            });
            $("#step2").find('.error-div').removeClass('error');  
            return true; 
        }else{
             $("#step2").find('.error-div').addClass('error');
        }
        return false;
    }

    function question3validation(){
        if($('input[name="sq2"]:checked').length != 0){
            var scope = angular.element($("#myAppCtrl")).scope();
            var ans = {q:'Are you interested in securing your financial stability against critical illnesses in the event of hospitalization?',ans:''};

            if($("#sq2-op2").prop('checked') == true){
                $("#q1-sq2").val(2);
                answers.q1.push(2); 
                ans.ans = 'Yes';    
            }else{
                $("#q1-sq3").val('');
                ans.ans = 'No';
            }
            scope.$apply(function(){
                scope.q_ans.push(ans)   ;
            });
            $("#step3").find('.error-div').removeClass('error');
            return true;
        }else{
           $("#step3").find('.error-div').addClass('error');
        }
        return false;
    }
    function question4validation(){
        if($('input[name="sq3"]:checked').length != 0){
            var scope = angular.element($("#myAppCtrl")).scope();
            var ans = {q:'Are you interested in receiving an income for as long as you are disabled should you lose the ability to satisfy 2/6 daily living activities (eating, bathing, toileting, holding continence, mobility and clothing yourself without assistance)?',ans:''};

            if($("#sq3-op2").prop('checked') == true){
                $("#q1-sq3").val(3);
                ans.ans = 'Yes';
                answers.q1.push(3); 
            }else{
                ans.ans = 'No';
                $("#q1-sq3").val('');
            }
            scope.$apply(function(){
                scope.q_ans.push(ans)   ;
            });
            $("#step4").find('.error-div').removeClass('error');
            return true;
        }else{
            $("#step4").find('.error-div').addClass('error');
        }
        return false;
    }

    function question5validation(){
        

        if($("#q2-op1").val() != '' && $("#q2-op1").val() != undefined ){
            $("#q2").val($("#q2-op1").val());
            
            answers.q2 = $("#q2-op1").val();  
            var scope = angular.element($("#myAppCtrl")).scope();
            scope.$apply(function(){
                scope.q_ans.push({q: 'What is your date of birth?', ans: answers.q2})   ;
            }); 
            $("#step5").find('.error-div').removeClass('error');
            return true;
        }else{
            $("#q2").val('');
            $("#step5").find('.error-div').addClass('error');
        }
        return false;
    }

    function question6validation(){
        
        if($('input[name="q3-options"]:checked').length != 0){
             $("#q3").val($('input[name="q3-options"]:checked').val()); 
            answers.q3 = $('input[name="q3-options"]:checked').val();   
            var scope = angular.element($("#myAppCtrl")).scope();
            scope.$apply(function(){
                scope.q_ans.push({q: 'What is your gender?', ans: answers.q3.toUpperCase()})   ;
            });
            $("#step6").find('.error-div').removeClass('error');
            return true;
        }else{
            $("#step6").find('.error-div').addClass('error');
        }
        return false;
    }
    
    function question7validation(){
        if($('input[name="q4-options"]:checked').length != 0){
            $("#q4").val($('input[name="q4-options"]:checked').val());
            answers.q4 = $('input[name="q4-options"]:checked').val();   
            var scope = angular.element($("#myAppCtrl")).scope();
            scope.$apply(function(){
                scope.q_ans.push({q: 'Are you a smoker?', ans: answers.q4.toUpperCase()})   ;
            });
            $("#step7").find('.error-div').removeClass('error');
            return true;
        }else{
            $("#step7").find('.error-div').addClass('error');
        }
        return false;
    }
    function question8validation(){
        var scope = angular.element($("#myAppCtrl")).scope();
        var ans = {q: 'Do you have any children?', ans: ''};  
        if($('input[name="q5-options"]:checked').length != 0){
             if($('input[name="q5-options"]:checked').val() == 1){
                if($('#q5-input').val() == '' || $('#q5-input').val() == undefined){
                    $("#step8").find('.error-div').text('Please provide a response');
                    $("#step8").find('.error-div').addClass('error');
                    return false;
                }else{
                    $("#q5").val($('#q5-input').val());    
                    answers.q5 = $('#q5-input').val();
                    ans.ans = "Yes ("+answers.q5+")";   
                }

             }else{
                $("#q5").val(0);

                answers.q5 = 0;
                ans.ans = "NO";   
             }
            scope.$apply(function(){
                scope.q_ans.push(ans)   ;
            });
            $("#step8").find('.error-div').removeClass('error');
            return true;
        }else{
            $("#step8").find('.error-div').text('*Please provide a response');
            $("#step8").find('.error-div').addClass('error');
        }
        return false;
    }

    function question9validation(){
        if($("#q6-op1").val() != '' && $("#q6-op1").val() != undefined ){
            $("#q6").val($("#q6-op1").val());
            answers.q6 = $("#q6-op1").val();  
            var ans = $("#q6-op1").children("option:selected").text(); 
            var answer_options = answers.q6.split("-");
            result_calculation.x1 = answer_options[0];
            result_calculation.x2 = answer_options[1];
            result_calculation.y1 = answer_options[0] * 0.05;
            result_calculation.y2 = answer_options[1] * 0.05;
            var scope = angular.element($("#myAppCtrl")).scope();
            scope.$apply(function(){
                scope.q_ans.push({q: 'What is your annual income?', ans: ans})   ;
            });
            $("#step9").find('.error-div').removeClass('error');
            return true;
        }else{
            $("#q6").val('');
            $("#step9").find('.error-div').addClass('error');
        }
        return false;
    }

    function question10validation(){
        if($('input[name="q7-options"]:checked').length != 0){
            var ans = '';
             if($('input[name="q7-options"]:checked').val() == 1){
            
                if($('#q7-input').val() == '' || $('#q7-input').val() == undefined){
                    $("#step10").find('.error-div').text('Please Enter Valid Value');
                    $("#step10").find('.error-div').addClass('error');
                    return false;
                }else{
                    $("#q7").val($('#q7-input').val());
                    answers.q7 = $("#q7-input").val();   
                    ans = answers.q7;
                }
             }else{
                $("#q7").val(0);   
                ans = 'No mortgage';
            }
            var scope = angular.element($("#myAppCtrl")).scope();
            scope.$apply(function(){
                scope.q_ans.push({q: 'What is the cost of your monthly mortgage payments?', ans: ans})   ;
            });
            $("#step10").find('.error-div').removeClass('error');
            return true;
        }else{
            $("#step10").find('.error-div').text('*Please provide a response');
            $("#step10").find('.error-div').addClass('error');
        }
        return false;
    }

    function question11validation(){
        

        if($("#q8-op1").val() != '' && $("#q8-op1").val() != undefined ){
            $("#q8").val($("#q8-op1").val());   
            answers.q8 = $("#q8-op1").val();   
            var scope = angular.element($("#myAppCtrl")).scope();
            scope.$apply(function(){
                scope.q_ans.push({q: 'Approximately what is your total monthly expense?', ans: answers.q8})   ;
            });

            $("#step11").find('.error-div').removeClass('error');
            return true;
        }else{
            $("#q8").val('');
            $("#step11").find('.error-div').addClass('error');
        }
        return false;
    }

    function question12validation(){
        if($('input[name="q9-options"]:checked').length != 0){

            if($('input[name="q9-options"]:checked').val() == 1){

                if( $('#q9-input1').val() == ''){
                  
                   $("#step12").find('.error-div').addClass('error');
                    return false;
                }
                if($('#q9-input2').val() == '' ){
                   $("#step12").find('.error-div').addClass('error');
                    return false;
                }
            }
            $("#q9").val($('input[name="q9-options"]:checked').val());
            answers.q9.value = $('input[name="q9-options"]:checked').val();   
            answers.q9.coverage_amount = $('#q9-input2').val();  
            answers.q9.insurance_plan = $('#q9-input1').val();   
            
            $("#step12").find('.error-div').removeClass('error');
            var scope = angular.element($("#myAppCtrl")).scope();
            scope.$apply(function(){
                scope.q_ans.push({q: 'Do you have any existing individual or group insurance policies?', ans: answers.q8})   ;
            });
            return true;
        }else{
            
           $("#step12").find('.error-div').addClass('error');
        }
        return false;
    }


    function findRecommendationOption(){
        var range1 = Math.round(result_calculation.y2 / 12);
        var range2 = Math.round(result_calculation.y1 / 12) ;
        if(answers.q4 == 'no'){
            if(range1 >= 50 && range2 <= 100 ){
                result_calculation.recommended_option = 'low';
            }else if(range1 >= 101 && range2 <= 299 ){
                result_calculation.recommended_option = 'medium';
            }else if (range1 >= 300){
                result_calculation.recommended_option = 'high';
            }

        }else{
            if(range1 >= 100 && range2 <= 200 ){
                result_calculation.recommended_option = 'low';
            }else if(range1 >= 201 && range2 <= 600 ){
                result_calculation.recommended_option = 'medium';
            }else if (range1 > 600){
                result_calculation.recommended_option = 'high';
            }
        }
    }

    function lowRecommendationOption(){
        if(answers.q4 == 'no'){
            result_calculation.low.premium.value = '$50-$100 / month';
        }else{
            result_calculation.low.premium.value = '$100-$200 / month';
            result_calculation.low.premium.note = 'These are higher premiums for smokers';
        }

        if(answers.q1.indexOf(1) != -1){
            result_calculation.low.term_20.push({value:1, range: "$" + result_calculation.x1 *10 + " - $" + result_calculation.x2 *10 , type: 'Life Insurance Coverage' , note:''});
        }
        if(answers.q1.indexOf(2) != -1){
            result_calculation.low.term_20.push({value:2, range: "$" + result_calculation.x1 *2 + " - $" + result_calculation.x2 *2 , type: 'Critical Illness Insurance Coverage', note:''}) ;            
        }
        
        var low_premium_html = result_calculation.low.premium.value;
        if(result_calculation.low.premium.note != ''){
            low_premium_html += "<small class='pl-4 text-danger'> ( "+ result_calculation.low.premium.note+" )</small>";
        }  
        // low_premium_html += "<i class='fa fa-bookmark-o pull-right add-to-cart' aria-hidden='true' data-toggle='tooltip' title='Save Recommendation'></i>";
        $("#low_premium").html(low_premium_html);
        if(result_calculation.low.term_20.length > 0){
            var str = "<ul class='ml-4 pl-4'>";
            result_calculation.low.term_20.forEach(function (value, index, array) {
                str += "<li>"+ value.type + 
                                        ": " +value.range +
                                        " <i class='fa fa-bookmark-o pull-right add-to-cart' aria-hidden='true' data-toggle='tooltip' title='Save Recommendation' data-value='"+value.value+"' data-field='low.term_20'></i></li>";
            });
            str += "</ul>"
            $("#low_term_20").append(str);
        }else{
            $("#low_term_20").append('--------');
        }
        
    }

    function mediumRecommendationOption(){
        var calculate_pay_20 = false; 
        if(answers.q4 == 'no'){
            result_calculation.medium.premium.value = '$150-$299 / month';
        }else{
            result_calculation.medium.premium.value = '$300-$600 / month';
            result_calculation.medium.premium.note = 'These are higher premiums for smokers';
        }

        if(answers.q1.indexOf(1) != -1){
            result_calculation.medium.term_20.push({ value:1, range: "$" + result_calculation.x1 *10 + " - $" +  result_calculation.x2 *10 , type: 'Life Insurance Coverage', note:''}) ;
            calculate_pay_20 = true; 
            
        }
        if(answers.q1.indexOf(2) != -1){
            result_calculation.medium.term_20.push({ value:2, range: "$" + result_calculation.x1 *5 + " - $" + result_calculation.x2 *5 , type:  'Critical Illness Insurance Coverage', note:''}) ;
            calculate_pay_20 = true; 
            
        }

        if(answers.q1.indexOf(3) != -1){
            result_calculation.medium.term_20.push({value:3, range: "$400 - $1000 / week" , type:"Long Term Care Insurance",  note: 'This Number varies by age and is same for Male and Female.'}) ;
            
        }    

        
        var medium_premium_html = result_calculation.medium.premium.value;
        if(result_calculation.medium.premium.note != ''){
            medium_premium_html += "<small class='pl-4 text-danger'> ( "+ result_calculation.medium.premium.note+" )</small>";
        }  
        // medium_premium_html += "<i class='fa fa-bookmark-o pull-right add-to-cart' aria-hidden='true' data-toggle='tooltip' title='Save Recommendation'></i>";

        $("#medium_premium").html(medium_premium_html);

        if(calculate_pay_20 == true){
            result_calculation.medium.pay_20.value = '$100k' ;
            result_calculation.medium.pay_20.note = 'This is a fixed option';
            var medium_pay_20_html = result_calculation.medium.pay_20.value;
            if(result_calculation.medium.pay_20.note != ''){
                medium_pay_20_html += "<small class='pl-4 text-danger'> ( "+ result_calculation.medium.pay_20.note+" )</small>";
            } 
            medium_pay_20_html += "<i class='fa fa-bookmark-o pull-right add-to-cart' aria-hidden='true' data-toggle='tooltip' title='Save Recommendation'  data-field='medium.pay_20'></i>";

            $("#medium_pay_20").html(medium_pay_20_html);
            $("#medium_pay_20_div").removeClass('d-none');    

        }
    
        if(result_calculation.medium.term_20.length > 0){
            var str = "<ul class='ml-4 pl-4'>";
            result_calculation.medium.term_20.forEach(function (value, index, array) {
                str += "<li>"+ value.type + 
                                        ": " +value.range +
                                        "<i class='fa fa-bookmark-o pull-right add-to-cart' aria-hidden='true' data-toggle='tooltip' title='Save Recommendation' data-value='"+value.value+"' data-field='medium.term_20'></i> </li>";
            });
            str += "</ul>"
            $("#medium_term_20").append(str);    
        }

    }

    function highRecommendationOption(){
        var calculate_pay_20 = false; 

        if(answers.q4 == 'no'){
            result_calculation.high.premium.value = '$300+/ month';
        }else{
            result_calculation.high.premium.value = '$600+ / month';
            result_calculation.high.premium.note = 'These are higher premiums for smokers';
        }

        if(answers.q1.indexOf(1) != -1){
            result_calculation.high.term_20.push({ value:1, range: "$" + result_calculation.x2 *10 + " - $" + result_calculation.x1 *10 , type: 'Life Insurance Coverage', note:''}) ;
            calculate_pay_20 = true;
        }
        if(answers.q1.indexOf(2) != -1){
            result_calculation.high.term_20.push({value:2, range: "$" + result_calculation.x2 *5 + " - $" + result_calculation.x1 *5 , type: 'Critical Illness Insurance Coverage', note:''}) ;         
            calculate_pay_20 = true;
        }


        if(answers.q1.indexOf(3) != -1){
            result_calculation.high.term_20.push({value:3, range: "$800 - $1000/week" ,type:"Long Term Care Insurance", note: 'This Number varies by age and is same for Male and Female.'}) ;
 
        }

    
        var high_premium_html = result_calculation.high.premium.value;
        if(result_calculation.high.premium.note != ''){
            high_premium_html += "<small class='pl-4 text-danger'> ( "+ result_calculation.high.premium.note+" )</small>";
        }  
        // high_premium_html += "<i class='fa fa-bookmark-o pull-right add-to-cart' aria-hidden='true'  data-toggle='tooltip' title='Save Recommendation'></i>";

        $("#high_premium").html(high_premium_html);

        if(calculate_pay_20 == true){
            result_calculation.high.pay_20.value = '$500k' ;
            result_calculation.high.pay_20.note = 'This is a fixed option';  

            var high_pay_20_html = result_calculation.high.pay_20.value;
            if(result_calculation.high.pay_20.note != ''){
                high_pay_20_html += "<small class='pl-4 text-danger'> ( "+ result_calculation.high.pay_20.note+" )</small>";
            }
            high_pay_20_html += "<i class='fa fa-bookmark-o pull-right add-to-cart' aria-hidden='true' data-toggle='tooltip' title='Save Recommendation' data-field='high.pay_20'></i>";

            $("#high_pay_20").html(high_pay_20_html);
            $("#high_pay_20_div").removeClass('d-none');    
        }
        
        if(result_calculation.high.term_20.length > 0){
            var str = "<ul class='ml-4 pl-4'>";
            result_calculation.high.term_20.forEach(function (value, index, array) {
                str += "<li>"+ value.type + 
                                        ": " +value.range +
                                        "<i class='fa fa-bookmark-o pull-right add-to-cart' aria-hidden='true' data-toggle='tooltip' title='Save Recommendation'  data-value='"+value.value+"' data-field='high.term_20'></i> </li>";
            });
            str += "</ul>"
            $("#high_term_20").append(str);    
        }
        
    }

    function saveQuestioniar(){
        url = $("#save-questioniar-url").val();
        data = {answers : answers ,result_calculation:result_calculation};

        $('.loading').show();
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });

        $.ajax({
            url: url,
            type: 'POST',
            data: data,
            success: function(result){
                $('.loading').hide();
            },
            error:function(result){
                $('.loading').hide();
            }      
        });
    }

    $('body').on('click','.add-to-cart', function(){
        if($(this).hasClass('fa-bookmark-o')){
            $(this).removeClass('fa-bookmark-o');
            $(this).addClass('fa-bookmark');
            
            var field = $(this).attr('data-field');
            if(field.indexOf(".term_20") != -1){
                field = field.split('.');
                var index = $(this).attr('data-value');
                saved_responses[field[0]][field[1]][index] = 1;
            }else{
                field = field.split('.');
                saved_responses[field[0]][field[1]] = 1;
            }
            


        }else if($(this).hasClass('fa-bookmark')){
            $(this).removeClass('fa-bookmark');
            $(this).addClass('fa-bookmark-o');
            var field = $(this).attr('data-field');
            if(field.indexOf(".term_20") != -1){
                field = field.split('.');
                var index = $(this).attr('data-value');
                saved_responses[field[0]][field[1]][index] = 0;
            }else{
                field = field.split('.');
                saved_responses[field[0]][field[1]] = 0;
            }
        }

    });
});

