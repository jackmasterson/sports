var model = {
	info: ko.observableArray(),
	college: ko.observableArray(),
	header: ko.observableArray()
}

var viewModel = {
	init: function(){
		ajax.init();
	}
}
var ajax = {

	init: function() {
		$.ajax({
			url: "http://localhost:3000/",
			dataType: "json",
			success: function(data){
				model.info.push(data);
			}
		});
	}
};


var map, geocoder, latlng;

 var mapped = {

    initMap: function() {
  		var that = this;
	    geocoder = new google.maps.Geocoder();
	    latlng = new google.maps.LatLng(37.09024, -95.712891);
	    var mapOptions = {
	      zoom: 4,
	      center: latlng,
	      scrollwheel: false,
	      draggable: false
	    }
	    map = new google.maps.Map(document.getElementById("map"), mapOptions);
		
	},

	getVal: function() {
		mapped.posVal = (document.getElementsByClassName('filter')[0]).value;
		mapped.getPoints();
		model.header.push(' ' +mapped.posVal);

	},

    getPoints: function() {
    	console.log('getpoints run');

    	var that = this;
    	var address;
		var info = model.info()[0];

		this.queryArr = [];

		info.forEach(function(data){
			//console.log(mapped.posVal);
			var pos = data.position;
			if(pos === mapped.posVal){
				that.queryArr.push(data);
		
			}

		});
			 	
		 this.getPointInfo();
	},

	getPointInfo: function() {
		var that = this;
		var address;
		var heatmap = ko.observable();
		mapped.heatData = ko.observableArray();
		console.log(heatmap());
				    if(heatmap() !== undefined) {
		          		heatmap.setMap(null);
		          	}

			that.queryArr.forEach(function(info){
				address = info.college;


			    geocoder.geocode( { 'address': address }, function(results, status) {

			      if (status === google.maps.GeocoderStatus.OK) {
					
					for (var i = 0; i < results.length; i++) {

			          	var lat = results[i].geometry.location.lat();
			          	var lng = results[i].geometry.location.lng();
				            
				        mapped.heatData.push( new google.maps.LatLng(lat, lng) );

		          	}

		          	heatmap = ko.observable(new google.maps.visualization.HeatmapLayer({
			          data: mapped.heatData(),
			          map: map
			        }));

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

			        heatmap().set('gradient', heatmap().get('gradient') ? null : gradient);

			      } 
			      else {

			        alert("Geocode was not successful for the following reason: " + status);
			      
			      }

			    });
			});
		$(".positions").show();



			//console.log('empty!');
			
	},

	clearMap: function() {
	//	console.log(mapped.heatData);
	//	mapped.posVal = "Choose";
	//	console.log(mapped.heatData());
	//	var remove = mapped.heatData();
	//	remove = [];
	//	mapped.getPointInfo();
	console.log('figure out how to clear the map!');

	}
};

ko.applyBindings(viewModel.init());

