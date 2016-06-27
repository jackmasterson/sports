

	$(document).ready(function() {
		$.ajax({
			url: "http://localhost:3000/",
			dataType: "json",
			success: function(data){
				console.log(data);
			}
		});
	});
