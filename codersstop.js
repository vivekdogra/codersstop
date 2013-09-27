
/**
 * Module dependencies.
 */

var express = require('express')
  , ejs = require('ejs')
  , cdstproutes = require('./routes/cdstproutes.js')
  , db = require('./lib/db')
  , timeFloor = 500
  , timeRange = 1000;
var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.set('view options', {
        layout: false
});
app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

db.open(function(err){
    if(err) throw err;

    app.listen(3000);
});

// Routes

app.get('/',cdstproutes.getCollections);
app.get('/page/:page_no',cdstproutes.getCollections);
app.get('/java/:article', cdstproutes.getArticle);
app.post('/addComment', cdstproutes.addComment);
/*db.open(function(err){
    if(err) throw err;

    app.listen(3000);
});*/
//console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
