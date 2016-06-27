var model = {
	info: ko.observableArray(),
	college: ko.observableArray()
}

var viewModel = {
	init: function(){
		ajax.init();
	//	mapped.initMap();
	}
}
var ajax = {

	init: function() {
		$.ajax({
			url: "http://localhost:3000/",
			dataType: "json",
			success: function(data){
		//		console.log(data);
				model.info.push(data);
		//		console.log(model.info());
				//rest.init();
		//		mapped.initMap();
			}
		});
	}
};

var rest = {

	init: function() {

		 var info = model.info()[0];
		 info.forEach(function(data){
		 	 var name = data.name;
			 var college = data.college;
			 var position = data.position;
			// console.log(college);
			 if(college !== ''){
//			 	console.log(data);
			//	model.college()[0].push(data);

			 }

		 })

		 //console.log()
	}
};

var geocoder;
  var map;

 var mapped = {

    initMap: function() {
  		var that = this;
	    geocoder = new google.maps.Geocoder();
	    var latlng = new google.maps.LatLng(37.09024, -95.712891);
	    var mapOptions = {
	      zoom: 4,
	      center: latlng
	    }
	    map = new google.maps.Map(document.getElementById("map"), mapOptions);
		this.getPoints();
		//this.codeAddress();
	},

    getPoints: function() {
    //	console.log('place');
    	//console.log(model.info()[0]);
    	var that = this;
    	var address;
		 var info = model.info()[0];
		 this.queryArr = [];
		 info.forEach(function(data){
		 	 var name = data.name;
			 var college = data.college;
			 var position = data.position;
			
			 if(college !== ''){
			 	that.queryArr.push(college);
			 }

		 });
			 	

		 this.getPointInfo();
	},

	getPointInfo: function() {
		var that = this;
		console.log(this.queryArr);
		var address;
		that.queryArr.forEach(function(info){
			address = info;
			console.log(address)
    //	var that = this;

    	
	    geocoder.geocode( { 'address': address }, function(results, status) {

	      if (status == google.maps.GeocoderStatus.OK) {

			for (var i = 0; i < results.length; i++) {
				     //     	console.log(results[i]);
          	var lat = results[i].geometry.location.lat();
          	var lng = results[i].geometry.location.lng();
          	console.log(lat, lng);
            function heatSpot(){
	            return [
		          new google.maps.LatLng(lat, lng),
		        //  new google.maps.LatLng(37.751266, -122.403355)
		        ];
            }
          }

	    	 heatmap = new google.maps.visualization.HeatmapLayer({
	          data: heatSpot(),
	          map: map
	        });

	        var gradient = [
	          'rgba(0, 255, 255, 0)',
	          'rgba(0, 255, 255, 1)',
	          'rgba(0, 191, 255, 1)',
	          'rgba(0, 127, 255, 1)',
	          'rgba(0, 63, 255, 1)',
	          'rgba(0, 0, 255, 1)',
	          'rgba(0, 0, 223, 1)',
	          'rgba(0, 0, 191, 1)',
	          'rgba(0, 0, 159, 1)',
	          'rgba(0, 0, 127, 1)',
	          'rgba(63, 0, 91, 1)',
	          'rgba(127, 0, 63, 1)',
	          'rgba(191, 0, 31, 1)',
	          'rgba(255, 0, 0, 1)'
	        ]
	        heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
	            //mapped.createHeat(results[i]);

	      
	      } else {
	        alert("Geocode was not successful for the following reason: " + status);
	      }
	      })
	    });

	}
};

ko.applyBindings(viewModel.init());

