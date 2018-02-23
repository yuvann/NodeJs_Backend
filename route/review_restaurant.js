var express = require('express');
var router = express.Router();

const { Pool }= require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://hovyhhivbrdrii:fcd66b27281e3b988191182971a9799330774d56dfae461ee76ef3dc0084a8d4@ec2-184-73-174-171.compute-1.amazonaws.com:5432/d9ivpkdnc1lg54';


router.post('/create', function(req, res) {

  var {username , rating , comment }= req.body;
  
  const pool = new Pool({
    connectionString: connectionString,
  })
  console.log(JSON.stringofy(req.body))
  pool.query('INSERT into review_restaurant values ($1,NOW(),$2,$3)',[username,comment, rating], (err, result) => {
      if( err ) 
	    handleErr(res,pool);
      else 
      {
          res.status(200).send(result);
          pool.end();
      }   
  });

});

function handleErr(res,pool){
   console.log("DB ERR");
   res.status(503).send(JSON.stringify({"error":JSON.stringify(res)}));
   pool.end();
}

module.exports = router;
