var express = require('express')
	, router = express.Router()
	, communities = require('../../../controllers/communities')
	, auth = require('http-auth')
	;

var basic = auth.basic({
        realm: "Admin Area"
    }, function (username, password, callback) { 
    	communities.auth(username, password, function(error){
    		if (error){
    			callback(false);
    		} else {
    			return callback(true);	
    		}
    	});
    }
);

/* GET home page. */
router.get('/', auth.connect(basic), function(req, res) {
	communities.getInfo(req, res);
});

module.exports = router;