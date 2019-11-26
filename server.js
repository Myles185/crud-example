// Step 1: To use express
const express = require('express');
// Helps Express read data from forms
const bodyParser= require('body-parser');
// Using mongodb - adding a database
// const MongoClient = require('mongodb').MongoClient
var db;

const app = express();
app.set('view engine', 'ejs')

// Express allows us to add middleware with the use method.
app.use(bodyParser.urlencoded({extended: true}))


// Step 3: Reading to browser with GET req
app.get('/', (req, res) => {
	db.collection('quotes').find().toArray((err, result) => {
		if (err) return console.log(err)
		// renders index.ejs
		res.render('index.ejs', {quotes: result})
	  })
  })

// Step 4: Create with POST
app.post('/quotes', (req, res) => {
	db.collection('quotes').save(req.body, (err, result) => {
		if (err) return console.log(err)

		console.log('saved to database')
		res.redirect('/')
	  })
  })

//  SHOW
app.get('/', (req, res) => {
	var cursor = db.collection('quotes').find()
	db.collection('quotes').find().toArray(function(err, results) {
		console.log(results)
		// send HTML file populated with quotes here
	  })
  })


// Step 2: Create server for browsers to connect to
const MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://Myles:quoteDB19@ds125872.mlab.com:25872/quote-machine', (err, client) => {
	if (err) return console.log(err)
	db = client.db('quote-machine') // whatever your database name is
	app.listen(3000, () => {
	  console.log('listening on 3000')
	})
  })
