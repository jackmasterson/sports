var model = {
	info: ko.observableArray(),
	college: ko.observableArray(),
	header: ko.observableArray(),
	queryArr: ko.observableArray()
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
	    
	    latlng = new google.maps.LatLng(37.09024, -95.712891);
	    mapped.mapOptions = {
	      zoom: 4,
	      center: latlng,
	      scrollwheel: false,
	      draggable: false
	    }
	    map = new google.maps.Map(document.getElementById("map"), mapped.mapOptions);

	},

	getVal: function() {
		mapped.posVal = ko.observable((document.getElementsByClassName('filter')[0]).value);
		
		mapped.getPoints();
		model.header.push(' ' +mapped.posVal());

	},

    getPoints: function() {
    	console.log('getpoints run');
 	//	model.queryArr.removeAll();
 		console.log(model.queryArr());
 		console.log(mapped.posVal());
    	var that = this;
    	var address;
		var info = model.info()[0];

		
		if(mapped.posVal() !== "Choose" || undefined){

			info.forEach(function(data){

				//console.log(mapped.posVal);
				var pos = data.position;
				if(pos === mapped.posVal()){
					model.queryArr.push(data);
			
				}

			});
		}
		console.log(model.queryArr());
		
		this.getPointInfo();
		 
	},

	getPointInfo: function() {
		var that = this;
		var address;
	//	var heatmap = ko.observable();
		mapped.heatData = ko.observableArray();
	//	console.log(geocoder);
		//geocoder = '';
		mapped.geocoder = new google.maps.Geocoder();
		//console.log(mapped.geocoder);
		//console.log(model.queryArr());
//console.log(model.queryArr()[0]);

	
			model.queryArr().forEach(function(info){
				console.log('queeerie-eached!');
				address = info.college;


			    mapped.geocoder.geocode( { 'address': address }, function(results, status) {

			      if (status === google.maps.GeocoderStatus.OK) {
					
					for (var i = 0; i < results.length; i++) {

			          	var lat = results[i].geometry.location.lat();
			          	var lng = results[i].geometry.location.lng();
				            
				        mapped.heatData.push( new google.maps.LatLng(lat, lng) );

		          	}

		          	mapped.heatmap = new google.maps.visualization.HeatmapLayer({
			          data: mapped.heatData(),
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

			        mapped.heatmap.set('gradient', mapped.heatmap.get('gradient') ? null : gradient);
			      //  mapped.heatmap.setMap(map);
			      } 
			      else {

			        alert("Geocode was not successful for the following reason: " + status);
			      
			      }
			    });


			});


			    //  heatmap().setMap(null);
		$(".positions").show();
	



			//console.log('empty!');
			
	},

	clearMap: function() {
		console.log(mapped.heatmap);
		mapped.heatmap.setMap(null);
		mapped.heatmap.setData([]);
	//	mapped.heatmap.setMap(map);
	//	mapped.heatmap = {};
	//	mapped.geocoder = {};
	//	console.log(mapped.geocoder);
		console.log(mapped.heatmap);
		
	//	console.log(mapped.posVal());
		mapped.posVal("Choose");
	//	console.log(mapped.posVal());
		model.queryArr.removeAll();
	//	console.log(model.queryArr());
		mapped.getPoints();
		console.log('figure out how to clear the map!');

	}
};

ko.applyBindings(viewModel.init());

