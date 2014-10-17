var express = require('express')
var app = express();

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
  response.send('Hello World!')
})

app.get('/spellcheck/:id',function(request,response){

var SpellCheck = require('spellcheck'),
      base = __dirname + (process.platform === 'win32' ? '\\' : '/'),
      spell = new SpellCheck(base + 'en_US/en_US.aff', base + 'en_US/en_US.dic');

spell.check(request.params.id, function(err, correct, suggestions) {
    if (err) throw err;
    if (correct)
      response.send(
		  '{"isMisspelled":false}'
	  );
    else
      response.send(
		   '{"isMisspelled":true}'
	  );
});

})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
