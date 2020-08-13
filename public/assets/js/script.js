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
    setProgressBar(current_step,current);

    scope.$apply(function(){
        // if(scope.questioniar_id != null){
        //     populateData(scope.state,scope.questioniar);
        //     if(scope.state > 1){
        //         if(scope.questioniar[1].value.indexOf(4) != -1){
        //             steps +=3;
        //             current = scope.state 
        //             current_step = scope.state;
        //             next = current + 1;
        //             setProgressBar(current_step,current,0);
        //             $("fieldset").hide();
        //             current_fs = $("#step"+current);
        //             current_fs.show();
        //         }else{
        //             current = parseInt(scope.state);
        //             next = current + 1;
        //             current_step = current - 3;
        //             $("fieldset").hide();
        //             current_fs = $("#step"+current);
        //             current_fs.show();
        //             setProgressBar(current_step,current,0);
        //         }
        //     }else{
        //         if(scope.questioniar[1].value.indexOf(4) != -1){
        //             steps +=3;
        //             current = scope.state 
        //             current_step = scope.state;
        //             next = current + 1;
        //             setProgressBar(current_step,current,0);
        //             $("fieldset").hide();
        //             current_fs = $("#step"+current);
        //             current_fs.show();
        //         }else{
                    
        //         }
        //     }
        // }
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

            saveQuestioniar(9,1);
            scope.$apply(function(){
                console.log(scope.questioniar);
            });
        }
        if(next == 14){
            saveQuestioniar(9,1,saved_responses);
            scope.$apply(function(){
                var keys = Object.keys(scope.questioniar);
                for (const key of keys) {
                    scope.q_ans.push({q:scope.questioniar[key].question, a:scope.questioniar[key].ans_text});
                    console.log(scope.questioniar[key].value);
                    if(key == 1 && scope.questioniar[key].value.indexOf(4) != -1 ){
                        var subKeys = Object.keys(scope.questioniar[key].sub_question);
                        for (const subKey of subKeys) {
                            scope.q_ans.push({q:scope.questioniar[key].sub_question[subKey].question, a:scope.questioniar[key].sub_question[subKey].ans_text});
                        }
                    }                        
                }
            });

            var keys = Object.keys(saved_responses.low.term_20);
            
            for (const key of keys) {
                if(saved_responses.low.term_20[key] == 1){
                    scope.$apply(function(){
                        scope.saved_recomendations.push({ level:"Low" ,type:"term 20",value: result_calculation.low.term_20[key].type +": "+result_calculation.low.term_20[key]['range']});
                    });
                }
            }
            var keys = Object.keys(saved_responses.medium.term_20);
            for (const key of keys) {
                if(saved_responses.medium.term_20[key] == 1){
               
                    scope.$apply(function(){
                        scope.saved_recomendations.push({ level:"Medium" ,type:"term 20",value:result_calculation.medium.term_20[key].type +": "+result_calculation.medium.term_20[key]['range'] });
                    });
                }
            }
            var keys = Object.keys(saved_responses.high.term_20);
            for (const key of keys) {
                if(saved_responses.high.term_20[key] == 1){
            
                    scope.$apply(function(){
                        scope.saved_recomendations.push({ level:"High" ,type:"term 20",value:result_calculation.high.term_20[key].type +": "+result_calculation.high.term_20[key]['range']});
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

        // scope.$apply(function(){
        //     if(scope.auth == 1 && current < 12 ){
        //         saveQuestioniar(current,0,null,scope.questioniar_id,0);
        //     }
        // });
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
                scope.questioniar[9].ans_text = $('input[name="q9-options"]:checked').val();
                scope.questioniar[9].value = $('input[name="q9-options"]:checked').val();
                scope.questioniar[9].coverage_amount = $('#q9-input2').val()
                scope.questioniar[9].insurance_plan = $('#q9-input1').val()
                    
            });
            return true;
        }else{
            
           $("#step12").find('.error-div').addClass('error');
        }
        return false;
    }


    function findRecommendationOption(){
        scope.$apply(function(){
            var range1 = Math.round(result_calculation.y2 / 12);
            var range2 = Math.round(result_calculation.y1 / 12) ;
            if(scope.questioniar[4].value == 'no'){
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
    }

    function lowRecommendationOption(){
        scope.$apply(function(){
        
            if(scope.questioniar[4].value == 'no'){
                result_calculation.low.premium.value = '$50-$100 / month';
            }else{
                result_calculation.low.premium.value = '$100-$200 / month';
                result_calculation.low.premium.note = 'These are higher premiums for smokers';
            }

            if(scope.questioniar[1].value.indexOf(1) != -1){
                result_calculation.low.term_20.push({value:1, range: "$" + result_calculation.x1 *10 + " - $" + result_calculation.x2 *10 , type: 'Life Insurance Coverage' , note:''});
            }
            if(scope.questioniar[1].value.indexOf(2) != -1){
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
                                            " <i class='fa fa-bookmark-o pull-right add-to-cart' aria-hidden='true' data-toggle='tooltip' title='Save Recommendation' data-value='"+index+"' data-field='low.term_20'></i></li>";
                });
                str += "</ul>"
                $("#low_term_20").append(str);
            }else{
                $("#low_term_20").append('--------');
            }
        });
    }

    function mediumRecommendationOption(){
        scope.$apply(function(){

            var calculate_pay_20 = false; 
            if(scope.questioniar[4].value == 'no'){
                result_calculation.medium.premium.value = '$150-$299 / month';
            }else{
                result_calculation.medium.premium.value = '$300-$600 / month';
                result_calculation.medium.premium.note = 'These are higher premiums for smokers';
            }

            if(scope.questioniar[1].value.indexOf(1) != -1){
                result_calculation.medium.term_20.push({ value:1, range: "$" + result_calculation.x1 *10 + " - $" +  result_calculation.x2 *10 , type: 'Life Insurance Coverage', note:''}) ;
                calculate_pay_20 = true; 
                
            }
            if(scope.questioniar[1].value.indexOf(2) != -1){
                result_calculation.medium.term_20.push({ value:2, range: "$" + result_calculation.x1 *5 + " - $" + result_calculation.x2 *5 , type:  'Critical Illness Insurance Coverage', note:''}) ;
                calculate_pay_20 = true; 
                
            }

            if(scope.questioniar[1].value.indexOf(3) != -1){
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
                                            "<i class='fa fa-bookmark-o pull-right add-to-cart' aria-hidden='true' data-toggle='tooltip' title='Save Recommendation' data-value='"+index+"' data-field='medium.term_20'></i> </li>";
                });
                str += "</ul>"
                $("#medium_term_20").append(str);    
            }
        });
    }

    function highRecommendationOption(){
        scope.$apply(function(){

            var calculate_pay_20 = false; 

            if(scope.questioniar[4].value == 'no'){
                result_calculation.high.premium.value = '$300+/ month';
            }else{
                result_calculation.high.premium.value = '$600+ / month';
                result_calculation.high.premium.note = 'These are higher premiums for smokers';
            }

            if(scope.questioniar[1].value.indexOf(1) != -1){
                result_calculation.high.term_20.push({ value:1, range: "$" + result_calculation.x2 *10 + " - $" + result_calculation.x1 *10 , type: 'Life Insurance Coverage', note:''}) ;
                calculate_pay_20 = true;
            }
            if(scope.questioniar[1].value.indexOf(2) != -1){
                result_calculation.high.term_20.push({value:2, range: "$" + result_calculation.x2 *5 + " - $" + result_calculation.x1 *5 , type: 'Critical Illness Insurance Coverage', note:''}) ;         
                calculate_pay_20 = true;
            }


            if(scope.questioniar[1].value.indexOf(3) != -1){
                result_calculation.high.term_20.push({value:3, range: "$800 - $1000/week" ,type:"Long Term Care Insurance", note: 'This Number varies by age and is same for Male and Female.'}) ; 
            }
        
            var high_premium_html = result_calculation.high.premium.value;
            if(result_calculation.high.premium.note != ''){
                high_premium_html += "<small class='pl-4 text-danger'> ( "+ result_calculation.high.premium.note+" )</small>";
            }  
            
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
                                            "<i class='fa fa-bookmark-o pull-right add-to-cart' aria-hidden='true' data-toggle='tooltip' title='Save Recommendation'  data-value='"+index+"' data-field='high.term_20'></i> </li>";
                });
                str += "</ul>"
                $("#high_term_20").append(str);    
            }
        });        
    }

    function saveQuestioniar(q_no = null,status = 0,saved_responses = null,q_id=null,set=1 ){
        url = $("#save-questioniar-url").val();

        var ans;
        if(set){
            scope.$apply(function(){
                ans = scope.questioniar;
            });    
        }else{
            ans = scope.questioniar;
        }
        
        data = {id:q_id, answers : JSON.stringify(ans),result_calculation:JSON.stringify(result_calculation),state:q_no, status:status,saved_recommendations:JSON.stringify(saved_responses)};

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

    function populateData(step,data){
        for (var i = 1 ; i <= step; i++) {
            switch(i) {
              case 1:
                populateQ1Data(data[1]);
                break;
              case 2:
                populateQ2Data(data[1].sub_question[1]);
                break;
              case 3:
                populateQ3Data(data[1].sub_question[2]);
              case 4:
                populateQ4Data(data[1].sub_question[3]);
              case 5:
                populateQ5Data(data[2]);
              case 6:
                populateQ6Data(data[3]);
              case 7:
                populateQ7Data(data[4]);
              case 8:
                populateQ8Data(data[5]);
              case 9:
                populateQ9Data(data[6]);
              case 10:
                populateQ10Data(data[7]);
              case 11:
                populateQ11Data(data[8]);
              case 12:
                populateQ12Data(data[9]);
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

    }
    function populateQ3Data(data){}
    function populateQ4Data(data){}
    function populateQ5Data(data){
        $("#q2-op1").val(data.value);
    }
    function populateQ6Data(data){
        $('input[name="q3-options"][value="' + data.value + '"]').prop('checked', true);
    }
    function populateQ7Data(data){}
    function populateQ8Data(data){}
    function populateQ9Data(data){}
    function populateQ10Data(data){}
    function populateQ11Data(data){}
    function populateQ12Data(data){}




});

