var express = require('express');
var router = express.Router();

const { Pool }= require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://hovyhhivbrdrii:fcd66b27281e3b988191182971a9799330774d56dfae461ee76ef3dc0084a8d4@ec2-184-73-174-171.compute-1.amazonaws.com:5432/d9ivpkdnc1lg54';


router.post('/create', function(req, res) {

  var {username , rating , comment ,id ,date }= req.body;
  
  const pool = new Pool({
    connectionString: connectionString,
  })
  pool.query('INSERT into review_restaurant values ($1,$2,$3,$4,$5)',[username,comment, rating ,id,date], (err, result) => {
      if( err ) 
	    handleErr(res,pool,err);
      else 
      {
          res.status(200).send(result);
          pool.end();
      }   
  });

});

router.post('/reviews', function(req, res) {

  var { id }= req.body;
  
  const pool = new Pool({
    connectionString: connectionString,
  })
  pool.query('SELECT * from review_restaurant where restaurant_id = $1',[id], (err, result) => {
      if( err ) 
	    handleErr(res,pool,err);
      else 
      {
          res.status(200).send(result);
          pool.end();
      }   
  });

});

function handleErr(res,pool,err){
   console.log(JSON.stringify(err));
   res.status(503).send( {"error":"SEVER ERROR , Try Again Please ","value":err});
   pool.end();
}

module.exports = router;
