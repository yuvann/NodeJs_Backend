var express        =        require('express')
var bodyParser     =        require("body-parser");
var app            =        express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname+'Frontend'));	
app.set('port', (process.env.PORT || 5000))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function (req, res) {
  res.send('/Sample         -> React Sample App with HTTP Calls<br>	    /ReviewRestaurant -> View Hotels around your area , Review them , Taste it ( React JS )')
})
app.get('/Sample',function(req,res){
  res.sendFile('Sample_ReactApp/index.html');
});

app.use('/api/categories',require('./route/categories.js'));

app.use('/api/models',require('./route/models.js'));

var server = app.listen(app.get('port'), function () {
   console.log("App is listening at localhost:"+app.get('port'));
})
