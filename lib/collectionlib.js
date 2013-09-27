'use strict';

var db = require('./db');

module.exports = {
			getCollections: function (query, page_no, callback) {
	                        		db.find('collection', query, page_no, callback);
			},	

			getArticle:	function(query, callback) {
						db.findOne('collection', query, callback);
                	}
}
