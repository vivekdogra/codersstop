var collectionlib = require('../lib/collectionlib')
	, getCommentUpdateQuery = require('./getCommentUpdateQuery')
	, fs = require('fs');
	
// redirects to correct view

module.exports = {
        getCollections:  function(req, res) {
				var limit = 10;
				var num_of_articles_to_fetch;
		
				if (req.params.page_no == null) 
					req.params.page_no = 1;
				
				num_of_articles_to_fetch = req.params.page_no * limit;
				collectionlib.getCollections({}, num_of_articles_to_fetch, function(err, articles) {
		
					if(err) res.send(err);
					else {
						var start = limit * (req.params.page_no - 1);
						res.render('../views/home',{documents:articles}); 
					}
                		});
					
			},

	getArticle:     function(req, res) {
				var file = __dirname + '/articlePaths.json';
                                fs.readFile(file, 'utf8', function (err, data) {
                                        if(err){
                                                console.log(err);
                                                return;
                                        }
					else {
                                        	data = JSON.parse(data);
						var path =  req.params.article;
						var articleJade = data[path].jade;
						var articleID   = data[path].articleId;
                                		collectionlib.getArticle({articleId:articleID},function(err, art) {
							if(err) res.send(err);
							else{
					        		res.render('../views/'+ articleJade, {article:art});
							}
						});
					}
				});
			},
	
	addComment: function(req, res) {
				var store = ' ';
		
				res.writeHead(200, {"Content-Type": "text/json"});
				req.on('data', function(data) {
					store += data;
				});
	
				
			        req.on('end', function() {
					var info = JSON.parse(store);
					if (info.parentID == 'article-container') {
						getCommentUpdateQuery.getQuery(info, function(searchQuery,
											newComment) {
									collectionlib.updateArticle(searchQuery, 
									{ $push:newComment },  function(err, art) {
                                                        			if(err) res.send(err);
                                                  		}); 
						});


					}
					else {
						var newComment = {"comments.$.children":{"author":info.userName, "date":"29th September, 2013", "text":info.userMessage}};						  
						var searchQuery= {articleId:info.articleID, "comments.id":info.parentID};
					
						collectionlib.updateArticle(searchQuery, { $push:newComment },  function(err, art) {
							if(err) res.send(err);
							else{
							
							}
						});
					}
					res.end(store);
				});
			}


}
