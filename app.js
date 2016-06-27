var http = require('http');
var ejs = require('ejs');
var express = require('express');
var app = express();

path = require('path');

var fs = require('fs');
var FFNerd = require('fantasy-football-nerd');
var ff = new FFNerd({ api_key:  "zrdfb8pppypw"});
var playersArr = [];

ff.players(function(players){
    console.log('Got players');
  	for(var i=0; i<players.Players.length; i++){

  		var info = players.Players[i];
  		playersArr.push({"name": info.displayName,
						 "position": info.position,
						 "college": info.college});

  	}
});


//playersArr = require('/.script.js');

var url = 'http://www.fantasyfootballnerd.com/service/players/json/zrdfb8pppypw/QB/';

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(req, res, next){
	res.json(playersArr);
});

console.log('listening on 3000!');
app.listen(3000);

