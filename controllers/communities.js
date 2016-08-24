var https = require('https')
	, xmlreader = require('xmlreader')
	;

module.exports = {
	getInfo: function (req, res) {
		//var basicAuth = new Buffer("vmarenas@serviciosnutresa.com:snsh201607.").toString('base64');
		//var basicAuth = new Buffer("felipeflorez@ibmrenovations.com:felnel1901").toString('base64');
		//var basicAuth = new Buffer(req.user+":"+req.password).toString('base64');
		//console.log('Token BASE 64:::', basicAuth);
		var options = {
			hostname: 'apps.na.collabserv.com',
  			port: 443,
  			path: '/communities/service/atom/communities/all?ps=10000',
  			method: 'GET',
  			headers: { 'Authorization': req.headers.authorization }
		};

		var req = https.request(options, function(respuesta) {
			var body = '';
		  	respuesta.on('data', (d) => {
		    	body += d;
		  	}).on('end', function(){
		  		if (respuesta.statusCode == 200) {
		  			var totales = {};
		  			xmlreader.read(body, function (err, xml){
    					if(err) {
    						return console.log(err);
    					} else {
    						xml.feed.entry.each(function (i, entry){
    							//console.log(entry["snx:communityType"].text());
    							if (totales.hasOwnProperty(entry["snx:communityType"].text()))
    								totales[entry["snx:communityType"].text()]++;
    							else
    								totales[entry["snx:communityType"].text()] = 1;
						    });
						    //console.log("totales: ",totales);
						    res.status(200).json({org: xml.feed.title.text(), values: totales});
						    //res.header('Content-Type','text/xml').send(body);
			        		return;
    					}
    				});
		  			
		  		} else {
		  			console.log("Body error 401:", body);
					res.status(respuesta.statusCode).send(body);
		  		}
		  	});
		});
		req.end();

		req.on('error', (e) => {
			console.error(e);
		  	res.status(500).json({
	        	"message": "Error buscando información de stream de comunidad, por favor intente de nuevo!"
	        });
		});
	}
	, auth: function (username, password, callback) {
		//var basicAuth = new Buffer("vmarenas@serviciosnutresa.com:snsh201607.").toString('base64');
		//var basicAuth = new Buffer("felipeflorez@ibmrenovations.com:felnel1901").toString('base64');
		var basicAuth = new Buffer(username+":"+password).toString('base64');
		//console.log('Token BASE 64:::', basicAuth);
		var options = {
			hostname: 'apps.na.collabserv.com',
  			port: 443,
  			path: '/connections/opensocial/basic/rest/activitystreams/@me/@all',
  			method: 'GET',
  			headers: { 'Authorization': 'Basic ' + basicAuth }
		};

		var req = https.request(options, function(respuesta) {
			var body = '';
		  	respuesta.on('data', (d) => {
		    	body += d;
		  	}).on('end', function(){
		  		if (respuesta.statusCode == 200) {
		  			callback(false);
		  		} else {
		  			callback(true);
		  		}
		  	});
		});
		req.end();

		req.on('error', (e) => {
			console.error(e);
		  	res.status(500).json({
	        	"message": "Error buscando información de stream de comunidad, por favor intente de nuevo!"
	        });
		});
	}
}