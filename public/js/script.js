var model = {
	info: ko.observableArray()
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
        var pyrmont = {lat: 37.09024, lng: -95.712891};

        map = new google.maps.Map(document.getElementById('map'), {
          center: pyrmont,
          zoom: 4
        });

        var request = {
        	location: pyrmont,
        	radius: '1500',
        	query: 'ucla'
        };

        infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map);
        service.textSearch(request, callback);

      function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
        	console.log(results);
          for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
          }
        }
      }

      function createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(place.name);
          infowindow.open(map, this);
        });
      }
  }
};

ko.applyBindings(viewModel.init());

