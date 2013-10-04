'use strict';

var collectionlib = require('../lib/collectionlib');

module.exports = {
                        getQuery: function (commentJSON ,callback) {
					collectionlib.getArticle({articleId:commentJSON.articleID},function(err, art) {
                                                        if(err) res.send(err);
                                                        else{
								var newCommentID, searchQuery, newComment;
                                                                searchQuery = {articleId:commentJSON.articleID};
								newCommentID = (art.comments.length).toString();
								
								newComment = {"comments" :{"id":newCommentID, "author":commentJSON.userName, "date":"29th September, 2013", "text":commentJSON.userMessage, "children":[]}};
								
								callback(searchQuery, newComment);
                                                        }
                                                }); 
              					
                        }
}

