'use strict';

var db = require('./db');

module.exports = {
			getCollections: function (query, page_no, callback) {
	                        		db.find('collection', query, page_no, callback);
			},	

			getArticle:	function(query, callback) {
						db.findOne('collection', query, callback);
                	},
			updateArticle: function(query, update, callback) {
						db.update('collection', query, update, callback);
			}
}
