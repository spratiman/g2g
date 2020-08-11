
$(document).ready(function(){
	console.log('in');
	
})

$("body").on('click','#show-password', function(event){
	if ($("#password").attr('type') == "password") {
    	$("#password").attr('type',"text");
  	} else {
    	$("#password").attr('type',"password")  ;
  	}
});


$("body").on('change','input[type=radio][name=q9-options]', function(event){
	if($('input[name="q9-options"]:checked').val() == 2){
        $("#q9-file-section").show();
	}else{
		$("#q9-file-section").hide();
	}
});

$("body").on('click','.q1-options', function(event){
		$("#q1-op4").prop('checked',false);
});
$("body").on('click','#q1-op4', function(event){
        $(".q1-options").prop('checked',false);
});

function reload(url =''){
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    
    if(url != ''){
        window.location.href = url;    
    }else{
        location.reload();    
    }
    
}

$("body").on('click','.register-btn', function(event){
	event.preventDefault();
    url = $(this).parents('form').attr('action');
    form = $(this).parents('form').get(0);
    data = new FormData(form);
    $(form).find('.is-invalid').removeClass('is-invalid');
	$.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        url: url,
        type: 'POST',
        data: data,
        processData: false,
        contentType: false,
        success: function(result){
            reload('/home');
        },
        error:function(result){
           errors = result.responseJSON.errors;
            // err_str = "<ul>";
            for (var key in errors) {
                $(form).find("#"+key).addClass('is-invalid');
                console.log(errors[key]);
                $("#"+key+"_msg").text(errors[key]);
            }
        }      
    });
});

