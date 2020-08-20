$(document).ready(function() {
    var scope = angular.element($("#myAppCtrl")).scope();
    
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
            pay_20:[],
        },
        medium:{
            premium:{
                value:'',
                note:'',
            },
            term_20:[],
            pay_20:[],
        },
        high:{
            premium:{
                value:'',
                note:'',
            },
            term_20:[],
            pay_20:[],
        }
    }
    var saved_responses = {
        low:{
         
            term_20:{
                1:0,
                2:0,
                3:0
            },
            pay_20:{
                1:0,
                2:0,
                3:0
            }
        },
        medium:{
            
            term_20:{
                1:0,
                2:0,
                3:0
            },
            pay_20:{
                1:0,
                2:0,
                3:0
            }
        },
        high:{
            
            term_20:{
                1:0,
                2:0,
                3:0
            },
            pay_20:{
                1:0,
                2:0,
                3:0
            }
        }   
    }
    var current_fs, next_fs, previous_fs; //fieldsets
    var opacity;
    var current = 1;
    var current_step = 1;
    var next = current + 1;
    var steps = 11;//$("fieldset").length;
    setProgressBar(current_step,current);

    scope.$apply(function(){
        if(scope.questioniar_id != null){
            console.log(scope.state,scope.questioniar);
            populateData(scope.state,scope.questioniar);
            
            if(scope.state < 13){

                if(scope.questioniar[1].value.indexOf(4) != -1){
                    steps +=3;
                    current = parseInt(scope.state) + 1;
                    current_step = current;
                    next = current + 1;
                    setProgressBar(current_step,current,0);
                    $("fieldset").hide();
                    current_fs = $("#step"+current);
                    current_fs.show();
                    console.log('if');
                }else{
                    current = parseInt(scope.state);
                    if(current == 1){
                        current = parseInt(scope.state) + 4;
                    }else{
                        current = parseInt(scope.state) + 1;  
                    }
                    next = current + 1  ;
                    current_step = current - 3;
                    $("fieldset").hide();
                    current_fs = $("#step"+current);
                    current_fs.show();
                    setProgressBar(current_step,current,0);
                }
                if(scope.state == 12){
                    result_calculation = scope.recommendations;
                    findRecommendationOption(0);
                    populateLowRecommendation();
                    populateMediumRecommendation();
                    populateHighRecommendation();
                    $("."+result_calculation.recommended_option+"-recommend-lable").show();

                }
            }
            // else if(scope.state < 12){
            //     if(scope.questioniar[1].value.indexOf(4) != -1){
            //         steps +=3;
            //         current = parseInt(scope.state) + 1;
            //         current_step = scope.state;
            //         next = current + 1;
            //         setProgressBar(current_step,current,0);
            //         $("fieldset").hide();
            //         current_fs = $("#step"+current);
            //         current_fs.show();
            //     }else{
                    
            //     }
            // }


        }
    });

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

            saveQuestioniar(12,0);
            scope.$apply(function(){
                // console.log(scope.questioniar);
            });
            console.log(saved_responses);
        }
        if(next == 14){
            saveQuestioniar(12,1,saved_responses);
            console.log(saved_responses);
            scope.saved_recomendations = [];
            scope.$apply(function(){
                scope.q_ans = [];
                var keys = Object.keys(scope.questioniar);
                for (const key of keys) {
                    if(key == 9){
                        if(scope.questioniar[key].value == 0){
                            ans_text = 'No';
                            scope.q_ans.push({q:scope.questioniar[key].question, a:ans_text});
                        }else if (scope.questioniar[key].value == 1){
                            ans_text = 'Yes';
                            scope.q_ans.push({q:scope.questioniar[key].question, a:ans_text,c_amount:scope.questioniar[key].coverage_amount,insurance_plan: scope.questioniar[key].insurance_plan});
                        }else if (scope.questioniar[key].value == 2){
                            ans_text = 'Not Sure';
                            scope.q_ans.push({q:scope.questioniar[key].question, a:ans_text,insurance_document:scope.questioniar[key].insurance_document});
                        }
                        
                    }else{
                        scope.q_ans.push({q:scope.questioniar[key].question, a:scope.questioniar[key].ans_text});
                        if(key == 1 && scope.questioniar[key].value.indexOf(4) != -1 ){
                            var subKeys = Object.keys(scope.questioniar[key].sub_question);
                            for (const subKey of subKeys) {
                                scope.q_ans.push({q:scope.questioniar[key].sub_question[subKey].question, a:scope.questioniar[key].sub_question[subKey].ans_text});
                            }
                        }    
                    }                      
                }
            });

            var keys = Object.keys(saved_responses.low.term_20);
            
            for (const key of keys) {
                if(saved_responses.low.term_20[key] == 1){
                    scope.$apply(function(){
                        scope.saved_recomendations.push({ level:"Low" ,type:"Term 20",value: result_calculation.low.term_20[key].type +": "+result_calculation.low.term_20[key]['range']});
                    });
                }
            }
            var keys = Object.keys(saved_responses.medium.term_20);
            for (const key of keys) {
                if(saved_responses.medium.term_20[key] == 1){
               
                    scope.$apply(function(){
                        scope.saved_recomendations.push({ level:"Medium" ,type:"Term 20",value:result_calculation.medium.term_20[key].type +": "+result_calculation.medium.term_20[key]['range'] });
                    });
                }
            }
            var keys = Object.keys(saved_responses.high.term_20);
            for (const key of keys) {
                if(saved_responses.high.term_20[key] == 1){
            
                    scope.$apply(function(){
                        scope.saved_recomendations.push({ level:"High" ,type:"Term 20",value:result_calculation.high.term_20[key].type +": "+result_calculation.high.term_20[key]['range']});
                    });
                }
            }; 

            var pay_20_keys = Object.keys(saved_responses.medium.pay_20);
            for (const pay_20_key of pay_20_keys) {
                if(saved_responses.medium.pay_20[pay_20_key] == 1){
            
                    scope.$apply(function(){
                        scope.saved_recomendations.push({ level:"Medium" ,type:"Pay 20",value:result_calculation.medium.pay_20[pay_20_key].type +": "+result_calculation.medium.pay_20[pay_20_key]['value']});
                    });
                }
            }; 

            var pay_20_keys = Object.keys(saved_responses.high.pay_20);
            for (const pay_20_key of pay_20_keys) {
                if(saved_responses.high.pay_20[pay_20_key] == 1){
            
                    scope.$apply(function(){
                        scope.saved_recomendations.push({ level:"High" ,type:"Pay 20",value:result_calculation.high.pay_20[pay_20_key].type +": "+result_calculation.high.pay_20[pay_20_key]['value']});
                    });
                }
            }; 
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
        
        scope.$apply(function(){
            if(scope.auth == 1 && current <= 12 ){
                saveQuestioniar(current,0,null,0);
            }
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

    function setProgressBar(curStep,q_no,set =1) {
        if(set){
            scope.$apply(function(){
                scope.step_number = curStep;
            });    
        }else{
            scope.step_number = curStep;
        }
        
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
        var ans = [];
        if($("#q1-op1").prop('checked') == true){
            q1_ans.push(1);
            ans.push("Life Insurance");
        }

        if($("#q1-op2").prop('checked') == true){
            q1_ans.push(2);
            ans.push("Critical Illness Insurance");

        }

        if($("#q1-op3").prop('checked') == true){
            q1_ans.push(3);
            ans.push("Long Term Care Insurance");
            
        }

        if($("#q1-op4").prop('checked') == true){
            q1_ans.push(4);
            ans.push("I don't know");
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
                scope.questioniar[1].ans_text = ans.join();
                scope.questioniar[1].value = q1_ans;
                if(q1_ans.indexOf(4) == -1){
                    scope.questioniar[1]["sub_question"][1].value = '';
                    scope.questioniar[1]["sub_question"][1].ans_text = '';
                    scope.questioniar[1]["sub_question"][2].value = '';
                    scope.questioniar[1]["sub_question"][2].ans_text = '';
                    scope.questioniar[1]["sub_question"][3].value = '';
                    scope.questioniar[1]["sub_question"][3].ans_text = '';
                }
            });
            $("#step1").find('.error-div').removeClass('error');
            return true;
        }else{
            $("#step1").find('.error-div').addClass('error');
        }
        return false;
    }

    function question2validation(){

        if($('input[name="sq1"]:checked').length != 0){
            var ans = {text:'',value:''};
            if($("#sq1-op2").prop('checked') == true){
                $("#q1-sq1").val(1);   
                ans.text = 'Yes';
                ans.value = 1;
                
            }else{
                $("#q1-sq3").val('');
                ans.text = 'No';
            } 
            scope.$apply(function(){
                scope.questioniar[1]["sub_question"][1].ans_text = ans.text;
                scope.questioniar[1]["sub_question"][1].value = ans.value;
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
            var ans = {text:'',value:''};
            if($("#sq2-op2").prop('checked') == true){
                $("#q1-sq2").val(2);
                ans.text = 'Yes';
                ans.value = 2;    
            }else{
                $("#q1-sq3").val('');
                ans.text = 'No';
            }
            scope.$apply(function(){
                scope.questioniar[1]["sub_question"][2].ans_text = ans.text;
                scope.questioniar[1]["sub_question"][2].value = ans.value;
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
            var ans = {text:'',value:''};
            
            if($("#sq3-op2").prop('checked') == true){
                $("#q1-sq3").val(3);
                ans.text = 'Yes';
                ans.value = 3; 
            }else{
                ans.text = 'No';
                $("#q1-sq3").val('');
            }
            scope.$apply(function(){
                scope.questioniar[1]["sub_question"][3].ans_text = ans.text;
                scope.questioniar[1]["sub_question"][3].value = ans.value;
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
            
            scope.$apply(function(){
                scope.questioniar[2].ans_text = $("#q2-op1").val();
                scope.questioniar[2].value = $("#q2-op1").val();
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
            var val = $('input[name="q3-options"]:checked').val();
            scope.$apply(function(){
                scope.questioniar[3].ans_text = val;
                scope.questioniar[3].value = val;
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
            var val = $('input[name="q4-options"]:checked').val();
            scope.$apply(function(){
                scope.questioniar[4].ans_text = val;
                scope.questioniar[4].value = val;
            });
            $("#step7").find('.error-div').removeClass('error');
            return true;
        }else{
            $("#step7").find('.error-div').addClass('error');
        }
        return false;
    }
    function question8validation(){
        var ans = {value:'', text: ''};  
        if($('input[name="q5-options"]:checked').length != 0){
             if($('input[name="q5-options"]:checked').val() == 1){
                if($('#q5-input').val() == '' || $('#q5-input').val() == undefined){
                    $("#step8").find('.error-div').text('Please provide a response');
                    $("#step8").find('.error-div').addClass('error');
                    return false;
                }else{
                    $("#q5").val($('#q5-input').val());    
                    var val = $('#q5-input').val();
                    ans.text = "Yes ( "+val+" )"; 
                    ans.value = val;
                }

             }else{
                $("#q5").val(0);
                ans.text = "NO";
                ans.value = 0;
             }
            scope.$apply(function(){
                scope.questioniar[5].ans_text = ans.text;
                scope.questioniar[5].value = ans.value;
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
            var val = $("#q6-op1").val();
            var ans = $("#q6-op1").children("option:selected").text(); 
            var answer_options = val.split("-");
            result_calculation.x1 = answer_options[0];
            result_calculation.x2 = answer_options[1];
            result_calculation.y1 = answer_options[0] * 0.05;
            result_calculation.y2 = answer_options[1] * 0.05;
            

            scope.$apply(function(){
                scope.questioniar[6].ans_text = ans;
                scope.questioniar[6].value = val;
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
            var ans = {value:'' ,text:''};
             if($('input[name="q7-options"]:checked').val() == 1){
            
                if($('#q7-input').val() == '' || $('#q7-input').val() == undefined){
                    $("#step10").find('.error-div').text('Please Enter Valid Value');
                    $("#step10").find('.error-div').addClass('error');
                    return false;
                }else{
                    $("#q7").val($('#q7-input').val());
                    var val = $("#q7-input").val();
                    ans.text = val;
                    ans.value = val;
                }
             }else{
                $("#q7").val(0);   
                ans.text = 'No mortgage';
                ans.value = 0;
            }
            
            scope.$apply(function(){
                scope.questioniar[7].ans_text = ans.text;
                scope.questioniar[7].value = ans.value;
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
            var val = $("#q8-op1").val();
            scope.$apply(function(){
                scope.questioniar[8].ans_text = val;
                scope.questioniar[8].value = val;
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
            $("#step12").find('.error-div').removeClass('error');
            
            scope.$apply(function(){
                scope.questioniar[9].ans_text = $('input[name="q9-options"]:checked').text();
                scope.questioniar[9].value = $('input[name="q9-options"]:checked').val();
                scope.questioniar[9].coverage_amount = $('#q9-input2').val()
                scope.questioniar[9].insurance_plan = $('#q9-input1').val();
                
            });
            return true;
        }else{
            
           $("#step12").find('.error-div').addClass('error');
        }
        return false;
    }


    function findRecommendationOption(scope_initialize = 1){
        if(scope_initialize){
            scope.$apply(function(){
                var val = scope.questioniar[6].value;
                var answer_options = val.split("-");
                result_calculation.x1 = answer_options[0];
                result_calculation.x2 = answer_options[1];
                result_calculation.y1 = answer_options[0] * 0.05;
                result_calculation.y2 = answer_options[1] * 0.05;
                
                var range1 = Math.round(result_calculation.y2 / 12);
                var range2 = Math.round(result_calculation.y1 / 12) ;
                if(scope.questioniar[4].value == 'No'){
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
            });
        }else{
            var val = scope.questioniar[6].value;
            var answer_options = val.split("-");
            result_calculation.x1 = answer_options[0];
            result_calculation.x2 = answer_options[1];
            result_calculation.y1 = answer_options[0] * 0.05;
            result_calculation.y2 = answer_options[1] * 0.05;
            
            var range1 = Math.round(result_calculation.y2 / 12);
            var range2 = Math.round(result_calculation.y1 / 12) ;
            if(scope.questioniar[4].value == 'No'){
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
        
    }

    function lowRecommendationOption(scope_initialize = 1){
        if(scope_initialize){
            scope.$apply(function(){
                result_calculation.low.term_20 = [];
                if(scope.questioniar[4].value == 'No'){
                    result_calculation.low.premium.value = '$50-$100 / month';
                }else{
                    result_calculation.low.premium.value = '$100-$200 / month';
                    result_calculation.low.premium.note = 'These are higher premiums for smokers';
                }
                if(scope.questioniar[1].value.indexOf(4) == -1){
                    if(scope.questioniar[1].value.indexOf(1) != -1){
                        result_calculation.low.term_20.push({value:1, range: formatingCurrency(result_calculation.x1 *10 , "blur")  + " - " + formatingCurrency(result_calculation.x2 *10,"blur") , type: 'Life Insurance Coverage' , note:''});
                    }
                    if(scope.questioniar[1].value.indexOf(2) != -1){
                        result_calculation.low.term_20.push({value:2, range: formatingCurrency(result_calculation.x1 *2, "blur") + " - " + formatingCurrency(result_calculation.x2 *2, "blur") , type: 'Critical Illness Insurance Coverage', note:''}) ;            
                    }
                }else{
                    if(scope.questioniar[1].sub_question[1].value == 1){
                        result_calculation.low.term_20.push({value:1, range: formatingCurrency(result_calculation.x1 *10 , "blur")  + " - " + formatingCurrency(result_calculation.x2 *10,"blur") , type: 'Life Insurance Coverage' , note:''});
                    }
                    if(scope.questioniar[1].sub_question[2].value == 2){
                        result_calculation.low.term_20.push({value:2, range: formatingCurrency(result_calculation.x1 *2, "blur") + " - " + formatingCurrency(result_calculation.x2 *2, "blur") , type: 'Critical Illness Insurance Coverage', note:''}) ;            
                    }
                }
                
                populateLowRecommendation();
                
            });    
        }
        
    }

    function populateLowRecommendation(){
        var low_premium_html = result_calculation.low.premium.value;
        if(result_calculation.low.premium.note != ''){
            low_premium_html += "<br> <small class='pl-4 text-danger'> ( "+ result_calculation.low.premium.note+" )</small>";
        }  
        // low_premium_html += "<i class='fa fa-bookmark-o pull-right add-to-cart' aria-hidden='true' data-toggle='tooltip' title='Save Recommendation'></i>";
        $("#low_premium").html(low_premium_html);
        if(result_calculation.low.term_20.length > 0){
            var str = "";
            result_calculation.low.term_20.forEach(function (value, index, array) {
                str += "<li class'mb-2'>"+ value.type + 
                                        ": " +value.range +
                                        " <i class='fa fa-bookmark-o pull-right add-to-cart' aria-hidden='true' data-toggle='tooltip' title='Save Recommendation' data-value='"+index+"' data-field='low.term_20'></i> <span class='clearfix'></span> </li>";
            });
            str += "";
            $("#low_term_20").html(str);
        }else{
            $("#low_term_20").parent('div').html('');
        }
    }
    function mediumRecommendationOption(scope_initialize = 1){
        if(scope_initialize){
            scope.$apply(function(){
                result_calculation.medium.term_20 = [];
                result_calculation.medium.pay_20 = [];
                if(scope.questioniar[4].value == 'No'){
                    result_calculation.medium.premium.value = '$150-$299 / month';
                }else{
                    result_calculation.medium.premium.value = '$300-$600 / month';
                    result_calculation.medium.premium.note = 'These are higher premiums for smokers';
                }
                if(scope.questioniar[1].value.indexOf(4) == -1){
                    if(scope.questioniar[1].value.indexOf(1) != -1){
                        result_calculation.medium.term_20.push({ value:1, range: formatingCurrency(result_calculation.x1 *10, "blur") + " - " +  formatingCurrency(result_calculation.x2 *10, "blur") , type: 'Life Insurance Coverage', note:''}) ;
                        result_calculation.medium.calculate_pay_20 = true; 
                        result_calculation.medium.pay_20.push({id:1, value:'$100k', type: 'Life Insurance Coverage', note:'This is a fixed and the most cost effective option' });                    
                    }
                    if(scope.questioniar[1].value.indexOf(2) != -1){
                        result_calculation.medium.term_20.push({ value:2, range: formatingCurrency(result_calculation.x1 *5, "blur") + " - " + formatingCurrency(result_calculation.x2 *5, "blur") , type:  'Critical Illness Insurance Coverage', note:''}) ;
                        result_calculation.medium.pay_20.push({ id:2, value:'$100k', type: 'Critical Illness Insurance Coverage', note:'This is a fixed and the most cost effective option' });                     
                        
                    }

                    if(scope.questioniar[1].value.indexOf(3) != -1){
                        result_calculation.medium.term_20.push({value:3, range: "$400 - $1000 / week" , type:"Long Term Care Insurance",  note: 'This Number varies by age and is same for Male and Female.'}) ;
                        
                    }
                }else{
                    if(scope.questioniar[1].sub_question[1].value == 1){
                        result_calculation.medium.term_20.push({ value:1, range: formatingCurrency(result_calculation.x1 *10, "blur") + " - " +  formatingCurrency(result_calculation.x2 *10, "blur") , type: 'Life Insurance Coverage', note:''}) ;
                        result_calculation.medium.pay_20.push({ id:1, value:'$100k', type: 'Life Insurance Coverage', note:'This is a fixed and the most cost effective option' });                     
                        
                    }
                    if(scope.questioniar[1].sub_question[2].value == 2){
                        result_calculation.medium.term_20.push({ value:2, range: formatingCurrency(result_calculation.x1 *5, "blur") + " - " + formatingCurrency(result_calculation.x2 *5, "blur") , type:  'Critical Illness Insurance Coverage', note:''}) ;
                        result_calculation.medium.pay_20.push({ id:2, value:'$100k', type: 'Critical Illness Insurance Coverage', note:'This is a fixed and the most cost effective option' });                     
                        
                    }

                    if(scope.questioniar[1].sub_question[3].value == 3){
                        result_calculation.medium.term_20.push({value:3, range: "$400 - $1000 / week" , type:"Long Term Care Insurance",  note: 'This Number varies by age and is same for Male and Female.'}) ;
                        
                    }
                }    
               populateMediumRecommendation(); 
            });    
        }
        
    }
    function populateMediumRecommendation(){
        var medium_premium_html = result_calculation.medium.premium.value;
        if(result_calculation.medium.premium.note != ''){
            medium_premium_html += "<br> <small class='pl-4 text-danger'> ( "+ result_calculation.medium.premium.note+" )</small>";
        }  
        
        $("#medium_premium").html(medium_premium_html);

        

        // if(result_calculation.medium.calculate_pay_20 == true){
        //     result_calculation.medium.pay_20.value = '$100k' ;
        //     result_calculation.medium.pay_20.note = 'This is a fixed and the most cost effective option';
        //     var medium_pay_20_html = result_calculation.medium.pay_20.value;
        //     if(result_calculation.medium.pay_20.note != ''){
        //         medium_pay_20_html += "<small class='pl-4 text-danger'> ( "+ result_calculation.medium.pay_20.note+" )</small>";
        //     } 
        //     medium_pay_20_html += "<i class='fa fa-bookmark-o pull-right add-to-cart' aria-hidden='true' data-toggle='tooltip' title='Save Recommendation'  data-field='medium.pay_20'></i> <span class='clearfix'></span>";

        //     $("#medium_pay_20").html(medium_pay_20_html);
                

        // }


        if(result_calculation.medium.pay_20.length > 0){
            var str = "";
            result_calculation.medium.pay_20.forEach(function (value, index, array) {
                str += "<li class='mb-2'>"+ value.type + 
                                        ": " +value.value ;
                if(value.note != ''){
                    str += " <br> <small class='pl-4 text-danger'> ( "+ value.note+" )</small>";
                }                      

                str += "<i class='fa fa-bookmark-o pull-right add-to-cart' aria-hidden='true' data-toggle='tooltip' title='Save Recommendation'  data-field='medium.pay_20'  data-value='"+index+"'></i> <span class='clearfix'></span>";
            });
            $("#medium_pay_20").html(str);
            $("#medium_pay_20_div").removeClass('d-none');    
        }




        if(result_calculation.medium.term_20.length > 0){
            var str = "";
            result_calculation.medium.term_20.forEach(function (value, index, array) {
                str += "<li class='mb-2'>"+ value.type + 
                                        ": " +value.range +
                                        "<i class='fa fa-bookmark-o pull-right add-to-cart' aria-hidden='true' data-toggle='tooltip' title='Save Recommendation' data-value='"+index+"' data-field='medium.term_20'></i><span class='clearfix'></span> </li>";
            });
            str += ""
            $("#medium_term_20").html(str);    
        }else{
            $("#medium_term_20").parent('div').html('');
        }
    }

    function highRecommendationOption(scope_initialize = 1){
        if(scope_initialize){
            scope.$apply(function(){
                result_calculation.high.term_20 = [];

                if(scope.questioniar[4].value == 'No'){
                    result_calculation.high.premium.value = '$300+/ month';
                }else{
                    result_calculation.high.premium.value = '$600+ / month';
                    result_calculation.high.premium.note = 'These are higher premiums for smokers';
                }
                if(scope.questioniar[1].value.indexOf(4) == -1){
                    if(scope.questioniar[1].value.indexOf(1) != -1){
                        result_calculation.high.term_20.push({ value:1, range: formatingCurrency(result_calculation.x1 *10, "blur") + " - " + formatingCurrency(result_calculation.x2 *10, "blur") , type: 'Life Insurance Coverage', note:''}) ;
                        result_calculation.high.pay_20.push({ id:1, value:'$500k', type: 'Life Insurance Coverage', note:'This is a fixed option' });                     
                        
                    }
                    if(scope.questioniar[1].value.indexOf(2) != -1){
                        result_calculation.high.term_20.push({value:2, range: formatingCurrency(result_calculation.x1 *5, "blur") + " - " + formatingCurrency(result_calculation.x2 *5, "blur") , type: 'Critical Illness Insurance Coverage', note:''}) ;         
                        result_calculation.high.pay_20.push({ id:2, value:'$500k', type: 'Critical Illness Insurance Coverage', note:'This is a fixed option'});                     
                        
                    }


                    if(scope.questioniar[1].value.indexOf(3) != -1){
                        result_calculation.high.term_20.push({value:3, range: "$800 - $1000/week" ,type:"Long Term Care Insurance", note: 'This Number varies by age and is same for Male and Female.'}) ; 
                    }    
                }else{
                    if(scope.questioniar[1].sub_question[1].value == 1){
                        result_calculation.high.term_20.push({ value:1, range: formatingCurrency(result_calculation.x1 *10, "blur") + " - " + formatingCurrency(result_calculation.x2 *10, "blur") , type: 'Life Insurance Coverage', note:''}) ;
                        result_calculation.high.pay_20.push({ id:1, value:'$500k', type: 'Life Insurance Coverage', note:'This is a fixed option' });                     
                        
                    }
                    if(scope.questioniar[1].sub_question[2].value == 2){
                        result_calculation.high.term_20.push({value:2, range: formatingCurrency(result_calculation.x1 *5, "blur") + " - " + formatingCurrency(result_calculation.x2 *5, "blur") , type: 'Critical Illness Insurance Coverage', note:''}) ;         
                        result_calculation.high.pay_20.push({ id:2, value:'$500k', type: 'Critical Illness Insurance Coverage', note:'This is a fixed option' });                     
                    }

                    if(scope.questioniar[1].sub_question[3].value == 3){
                        result_calculation.high.term_20.push({value:3, range: "$800 - $1000/week" ,type:"Long Term Care Insurance", note: 'This Number varies by age and is same for Male and Female.'}) ; 
                    }
                }
               populateHighRecommendation();
            });    
        }
    }
    function populateHighRecommendation(){
        var high_premium_html = result_calculation.high.premium.value;
        if(result_calculation.high.premium.note != ''){
            high_premium_html += "<br> <small class='pl-4 text-danger'> ( "+ result_calculation.high.premium.note+" )</small>";
        }  
        
        $("#high_premium").html(high_premium_html);

        // if(result_calculation.high.calculate_pay_20 == true){
        //     result_calculation.high.pay_20.value = '$500k' ;
        //     result_calculation.high.pay_20.note = 'This is a fixed option';  

        //     var high_pay_20_html = result_calculation.high.pay_20.value;
        //     if(result_calculation.high.pay_20.note != ''){
        //         high_pay_20_html += "<small class='pl-4 text-danger'> ( "+ result_calculation.high.pay_20.note+" )</small>";
        //     }
        //     high_pay_20_html += "<i class='fa fa-bookmark-o pull-right add-to-cart' aria-hidden='true' data-toggle='tooltip' title='Save Recommendation' data-field='high.pay_20'></i><span class='clearfix'></span>";

        //     $("#high_pay_20").html(high_pay_20_html);
        //     $("#high_pay_20_div").removeClass('d-none');    
        // }

        if(result_calculation.high.pay_20.length > 0){
            var str = "";
            result_calculation.high.pay_20.forEach(function (value, index, array) {
                str += "<li class='mb-2'>"+ value.type + 
                                        ": " +value.value ;
                if(value.note != ''){
                    str += " <br> <small class='pl-4 text-danger'> ( "+ value.note+" )</small>";
                }                      

                str += "<i class='fa fa-bookmark-o pull-right add-to-cart' aria-hidden='true' data-toggle='tooltip' title='Save Recommendation'  data-field='high.pay_20'  data-value='"+index+"'></i> <span class='clearfix'></span>";
            });
            $("#high_pay_20").html(str);
            $("#high_pay_20_div").removeClass('d-none');    
        }

        if(result_calculation.high.term_20.length > 0){
            var str = "";
            result_calculation.high.term_20.forEach(function (value, index, array) {
                str += "<li class='mb-2'>"+ value.type + 
                                        ": " +value.range +
                                        "<i class='fa fa-bookmark-o pull-right add-to-cart' aria-hidden='true' data-toggle='tooltip' title='Save Recommendation'  data-value='"+index+"' data-field='high.term_20'></i><span class='clearfix'></span> </li>";
            });
            $("#high_term_20").html(str);    
        }else{
            $("#high_term_20").parent('div').html('');
        }
    }

    function saveQuestioniar(q_no = null,status = 0,saved_res = null,set=1 ){
        url = $("#save-questioniar-url").val();
        var ans;
        var q_id;

        if(set){
            q_id = scope.questioniar_id;
            scope.$apply(function(){
                ans = scope.questioniar;
            });    
        }else{
            q_id = scope.questioniar_id;
            ans = scope.questioniar;
        }
        if(saved_res != null){
            saved_res = JSON.stringify(saved_res);
        }
        data = {id:q_id, answers : JSON.stringify(ans),result_calculation:JSON.stringify(result_calculation),state:q_no, status:status,saved_recommendations:saved_res};

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
                var data = result.data;
                $('#questioniar_id').val(data.id);
                if(set){
                    scope.$apply(function(){
                        scope.questioniar_id = data.id;
                    });    
                }else{
                    scope.questioniar_id = data.id;
                }

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
            // if(field.indexOf(".term_20") != -1){
                field = field.split('.');
                var index = $(this).attr('data-value');
                saved_responses[field[0]][field[1]][index] = 1;
            // }else{
            //     field = field.split('.');
            //     saved_responses[field[0]][field[1]] = 1;
            // }

        }else if($(this).hasClass('fa-bookmark')){
            $(this).removeClass('fa-bookmark');
            $(this).addClass('fa-bookmark-o');
            var field = $(this).attr('data-field');
            // if(field.indexOf(".term_20") != -1){
                field = field.split('.');
                var index = $(this).attr('data-value');
                saved_responses[field[0]][field[1]][index] = 0;
            // }else{
            //     field = field.split('.');
            //     saved_responses[field[0]][field[1]] = 0;
            // }
        }
    });

    function populateData(step,data){
        for (var i = 1 ; i <= step; i++) {
            switch(i) {
              case 1:
                populateQ1Data(data[1]);
                break;
              case 2:
                populateQ2Data(data[1]);
                break;
              case 3:
                populateQ3Data(data[1]);
                break;
              case 4:
                populateQ4Data(data[1]);
                break;
              case 5:
                populateQ5Data(data[2]);
                break;
              case 6:
                populateQ6Data(data[3]);
                break;
              case 7:
                populateQ7Data(data[4]);
                break;
              case 8:
                populateQ8Data(data[5]);
                break;
              case 9:
                populateQ9Data(data[6]);
                break;
              case 10:
                populateQ10Data(data[7]);
                break;
              case 11:
                populateQ11Data(data[8]);
                break;
              case 12:
                populateQ12Data(data[9]);
                break;
              default:
                // code block
            }

        }
    }
    function populateQ1Data(data){

        data.value.forEach(function (value, index, array) {
            $("#q1-op"+value).prop('checked','checked');
        });    
    }

    function populateQ2Data(data){
        if(data.value.indexOf(4) != -1){
            if(data.sub_question[1].value == ''){
                $('#sq1-op1').prop('checked','checked');    
            }else{
                $('#sq1-op2').prop('checked','checked');    
            }    
        }           
    }
    function populateQ3Data(data){
        if(data.value.indexOf(4) != -1){
            if(data.sub_question[2].value == ''){
                $('#sq2-op1').prop('checked','checked');    
            }else{
                $('#sq2-op2').prop('checked','checked');    
            }    
        }
    }
    function populateQ4Data(data){
        if(data.value.indexOf(4) != -1){
            if(data.sub_question[3].value == ''){
                $('#sq3-op1').prop('checked','checked');    
            }else{
                $('#sq3-op2').prop('checked','checked');    
            }
        }
    }
    function populateQ5Data(data){
        $("#q2-op1").val(data.value);
    }
    function populateQ6Data(data){
        $('input[name="q3-options"][value="' + data.value + '"]').prop('checked', true);
    }
    function populateQ7Data(data){
        $('input[name="q4-options"][value="' + data.value + '"]').prop('checked', true);
    }
    function populateQ8Data(data){
        if(data.value == 0){
            $('#q5-op1').prop('checked','checked');    
        }else{
            $('#q5-op2').prop('checked','checked');    
            scope.haveChildren = 1;
            $('#q5-input').val(data.value);    
        }
    }
    function populateQ9Data(data){
        $('#q6-op1').val(data.value);    
    }
    function populateQ10Data(data){
       if(data.value == 0){
            $('#q7-op2').prop('checked','checked');    
        }else if(data.value != ''){

            $('#q7-op1').prop('checked','checked');    
            $('#q7-input').val(data.value);    
        }else{

        }
    }
    function populateQ11Data(data){
        if(data.value != ''){
            $("#q8-op1").val(data.value);    
        }
    }
    function populateQ12Data(data){
        if(data.value == 0){
            $('#q9-op1').prop('checked','checked');    
            scope.havePolicy = 0;
        }else if(data.value == 1){
            // $('#q9-op2').click();
            $('#q9-op2').prop('checked','checked');  
            $('#q9-input1').val(data.insurance_plan);
            $('#q9-input2').val(data.coverage_amount);    
            scope.havePolicy = 1;
        }else{
            $('#q9-op3').prop('checked','checked');   
            scope.havePolicy = 2;
        }
    }

    $("body").on('change','#insurance_document', function(event){
        var file =  event.target.files[0];
        if(file != null || file != undefined || file != ''){
            reader = new FileReader();
            reader.onloadend = function () {
                scope.$apply(function(){
                    scope.questioniar[9].insurance_document = reader.result;
                    console.log(scope.questioniar[9].insurance_document);
                });  
                
            };
            reader.readAsDataURL(file);
        }   
    });
});

function formatingCurrency(input_val, blur) {
  // appends $ to value, validates decimal side
  // and puts cursor back in right position.
  
  input_val = String(input_val);
  // don't validate empty input
  if (input_val === "") { return; }
  
  // original length
  var original_len = input_val.length;

  // initial caret position 
  // var caret_pos = input.prop("selectionStart");
    
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
  return input_val;
  // send updated string to input
  // input.val(input_val);

  // put caret back in the right position
  // var updated_len = input_val.length;
  // caret_pos = updated_len - original_len + caret_pos;
  // input[0].setSelectionRange(caret_pos, caret_pos);
}


