var key = "zrdfb8pppypw";
//var url = 
//var url = "";
    

/*$.ajax({
	url: "http://www.fantasyfootballnerd.com/service/players/json/zrdfb8pppypw/QB/",
	type: 'GET',
	dataType: "json"
})
.done(function(data){
	console.log(data);
	//model.firstDataInfo().push(data);

	//firstData.init();
	//filter.init();
	//filter.init();
});*/

//var invocation = new XMLHttpRequest();
$.ajax({
         url: "http://www.fantasyfootballnerd.com/service/players/json/zrdfb8pppypw/",
         dataType: "json",
         success: function(done) { console.log(done) }
      });