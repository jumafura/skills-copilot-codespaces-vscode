// Create web server

// Import modules
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Set up the server
var server = app.listen(3000, function() {
	console.log('server is running on port 3000');
});

// Import comments.js
var comments = require('./comments.js');

// Get comments
app.get('/comments', function(req, res) {
	res.json(comments.getComments());
});

// Post comments
app.post('/comments', function(req, res) {
	var comment = req.body;
	comments.addComment(comment);
	res.json(comment);
});

// Delete comments
app.delete('/comments/:id', function(req, res) {
	var id = req.params.id;
	comments.deleteComment(id);
	res.json(id);
});

// Put comments
app.put('/comments/:id', function(req, res) {
	var id = req.params.id;
	var comment = req.body;
	if (comments.updateComment(id, comment)) {
		res.json(id);
	} else {
		res.status(404).send('Not found');
	}
});

// Use comments.js
comments.addComment({author: 'me', body: 'hello'});
comments.addComment({author: 'me', body: 'world'});
console.log(comments.getComments());
comments.deleteComment(1);
console.log(comments.getComments());
comments.updateComment(2, {author: 'me', body: 'hello world'});
console.log(comments.getComments());
comments.updateComment(2, {author: 'me', body: 'hello world'});
console.log(comments.getComments());
comments.deleteComment(2);
console.log(comments.getComments());
comments.deleteComment(2);
console.log(comments.getComments());
comments.updateComment(2, {author: 'me', body: 'hello world'});
console.log(comments.getComments());