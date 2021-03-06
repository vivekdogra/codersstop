var Db = require('mongodb').Db
   ,Connection = require('mongodb').Connection
   ,Server = require('mongodb').Server;

var envHost = process.env['MONGO_NODE_DRIVER_HOST']
   ,envPort = process.env['MONGO_NODE_DRIVER_PORT']

  ,host = envHost != null ? envHost: 'localhost'
  ,port = envPort != null ? envPort: Connection.DEFAULT_PORT;

var db = new Db('cdstp'
  ,new Server(host, port, {})
  ,{native_parser:false});

module.exports = {
	find: function(name, query, limit, callback) {
		db.collection(name).find(query)
		.sort({_id: -1})
		.limit(limit)	
		.toArray(callback);
	       },
	
	findOne: function(name, query, callback) {
			db.collection(name).findOne(query, callback);
 	         },
	
	insert: function(name, items, callback) {
			db.collection(name).insert(items, callback);
                },

	insertOne: function(name, item, callback) {
			module.exports.insert(name, item, function(err, items) {
				callback(err, items[0]);
	                });
	          },

	update: function(name, query, updateQuery, callback) {
			db.collection(name).update(query, updateQuery, callback);
		
		},

	open: function(callback) {
		db.open(callback);
	     }	
}
