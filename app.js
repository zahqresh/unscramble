var express = require('express');
var app  = express();
var path = require('path');
const bodyParser = require('body-parser');
var exphbs  = require('express-handlebars');
var SpellChecker = require('simple-spellchecker');
var axios = require('axios');

const arr = [];
var two = [];
var three = [];
var four = [];
var five = [];
var six = [];
var seven = [];
var eight = [];
var nine = [];
var ten = [];
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
	var word = req.body.word;
axios.get(`http://www.anagramica.com/all/:${word}`)
.then((response)=>{
	for(let x=0;x<response.data.all.length;x++){
       if(response.data.all[x].length==10){
		ten.push(' '+response.data.all[x]);
	}
	if(response.data.all[x].length==9){
		nine.push(' '+response.data.all[x]);
	}
	if(response.data.all[x].length==8){
		eight.push(' '+response.data.all[x]);
	}
	if(response.data.all[x].length==7){
		seven.push(' '+response.data.all[x]);
	}
	if(response.data.all[x].length==6){
		six.push(' '+response.data.all[x]);
	}
	if(response.data.all[x].length==5){
		five.push(' '+response.data.all[x]);
	}
	if(response.data.all[x].length==4){
		four.push(' '+response.data.all[x]);
	}
	if(response.data.all[x].length==3){
		three.push(' '+response.data.all[x]);
	}
	if(response.data.all[x].length==2){
		two.push(' '+response.data.all[x]);
	}
}
	
console.log(arr);
	res.render('index',{
		two:two,
		three:three,
		four:four,
		five:five,
		six:six,
		seven:seven,
		eight:eight,
		nine:nine,
		ten:ten,
		bol:1,
		scram:req.body.word
	});

 two = [];
 three = [];
 four = [];
 five = [];
 six = [];
 seven = [];
 eight = [];
 nine = [];
 ten = [];

 
})
.catch((err)=>{
	console.log(err);
})
})

app.listen(process.env.PORT || 3000,()=>{
	console.log('Server up on 3000')
});

