var express = require('express');
var app  = express();
var path = require('path');
const bodyParser = require('body-parser');
var exphbs  = require('express-handlebars');
var SpellChecker = require('simple-spellchecker');

//view engine 
app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');
//midelware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json());




app.use(express.static('public'));

  


app.get('/',(req,res)=>{
	res.render('index');
});


app.post('/',(req,res)=>{
	
SpellChecker.getDictionary("en_US", function(err, dictionary) {
	if(err){console.log(err)};
    if(!err) {
    	 word = req.body.word;
    	 
        var misspelled = ! dictionary.spellCheck(word);
        
        
        if(misspelled) {
            var suggestions = dictionary.getSuggestions(word);
            
            res.render('index',{
            	data:suggestions
            })
        }
    }
});

})

app.listen(process.env.PORT || 3000,()=>{
	console.log('Server up on 3000')
});

