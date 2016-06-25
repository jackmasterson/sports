var FFNerd = require('fantasy-football-nerd');
var ff = new FFNerd({ api_key:  "zrdfb8pppypw"});
 
ff.players(function(players){
    console.log('Got players');
    console.log(players);
});

module.exports = userRepository;
