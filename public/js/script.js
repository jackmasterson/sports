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
				console.log(model.info());
				rest.init();
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

var map;
var service;
var infowindow;



 var map;
 var infowindow;

 var mapped = {

      initMap: function() {
      	var that = this;
        that.pyrmont = {lat: 37.09024, lng: -95.712891};

        map = new google.maps.Map(document.getElementById('map'), {
          center: that.pyrmont,
          zoom: 4//,
         // mapTypeId: google.maps.MapTypeId.SATELLITE
        });



        this.getPoints();
    },

    getPoints: function() {
    //	console.log('place');
    	//console.log(model.info()[0]);
    	var that = this;
		 var info = model.info()[0];
		 this.queryArr = [];
		 info.forEach(function(data){
		 	 var name = data.name;
			 var college = data.college;
			 var position = data.position;
			// console.log(college);
			 if(college !== ''){
			 //	console.log(data);
			 	that.queryArr.push(data);
			 //	console.log(this.queryArr);
			//	model.college()[0].push(data);

			 }
			 
		 });

		 that.getPointInfo();
	},

	getPointInfo: function() {
		console.log(this.queryArr);
    	var that = this;
    	var service = new google.maps.places.PlacesService(map);
        that.queryArr.forEach(function(data){
			that.request = {
	        	location: that.pyrmont,
	        	radius: '1500',
	        	query: data.college
	        };
	        service.textSearch(that.request, that.callback);
		});


//        infowindow = new google.maps.InfoWindow();
        
        
	//	this.callback();
 /*       return [
          new google.maps.LatLng(37.782551, -122.445368),
          new google.maps.LatLng(37.751266, -122.403355)
        ];*/
     //    	return that.getHeat();
        
    },

    callback: function(results, status) {
    	console.log('place');
    	var that = this;

        if (status === google.maps.places.PlacesServiceStatus.OK) {
        	console.log(results);

          for (var i = 0; i < results.length; i++) {
	          	console.log(results[i]);
	          	var lat = results[i].geometry.location.lat();
	          	var lng = results[i].geometry.location.lng();
	          //	console.log(lat, lng);
	           // mapped.createMarker(results[i]);
	            function heatSpot(){
	            	console.log(lat, lng);
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

	      }
        
    },
	
	createMarker: function(place) {
		console.log('place');
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(place.name);
          infowindow.open(map, this);
        });
    },

    getHeat: function(place){
    	console.log(place)
    	     return [
	          new google.maps.LatLng(37.782551, -122.445368),
	          new google.maps.LatLng(37.751266, -122.403355)
	        ];
    }
};

ko.applyBindings(viewModel.init());

