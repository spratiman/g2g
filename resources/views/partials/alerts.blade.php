
@if (session('success'))
	<div class="alert alert-success alert-dismissible">
        {{ session('success') }}
        <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
    </div>
@endif

@if (session('failure'))
	
    <div class="alert alert-danger alert-dismissible">
        {{ session('failure') }}
        <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
    </div>
@endif

