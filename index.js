var express        =        require('express')
var bodyParser     =        require("body-parser");
var app            =        express();
var path           =        require('path');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'Frontend')));	
app.set('port', (process.env.PORT || 5000))


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'Frontend/index.html'));
})

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// ---------------------------------------------- Sample App API'S -----------------------------------------------

app.use('/sample/scripts', express.static(__dirname + '/Frontend/Sample_ReactApp/'));

app.get('/Sample',function(req,res){
  res.sendFile(path.join(__dirname, 'Frontend/Sample_ReactApp/index.html'));
});

app.use('/api/categories',require('./route/categories.js'));

app.use('/api/models',require('./route/models.js'));

//----------------------------------------------------  END -------------------------------------------------------

//-------------------------------------------  Review Restaurant API'S --------------------------------------------

app.use('/review_restaurant/scripts', express.static(__dirname + '/Frontend/ReviewRestaurant/'));
app.use('/review_restaurant/images', express.static(__dirname + '/Frontend/ReviewRestaurant/Images/'));

app.get('/ReviewRestaurant',function(req,res){
  res.sendFile(path.join(__dirname, 'Frontend/ReviewRestaurant/index.html'));
});

app.use('/api/review_restaurant',require('./route/review_restaurant.js'));

//----------------------------------------------------  END -------------------------------------------------------

var server = app.listen(app.get('port'), function () {
   console.log("App is listening at localhost:"+app.get('port'));
})
