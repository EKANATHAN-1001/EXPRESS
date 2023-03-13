var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/get.html', function (req, res) {
   res.sendFile( __dirname + "/" + "get.html" );
})

app.get('/process_get', function (req, res) {
   // Prepare output in JSON format
   response = {
      first_name:req.query.first_name,
      last_name:req.query.last_name
   };
   console.log(response);
   res.end(JSON.stringify(response));
})

var fs = require("fs");

var bodyParser = require('body-parser');
var multer  = require('multer');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
var multer = require('multer');
var upload = multer({ dest: './uploads' });
app.use(multer({ dest: './uploads'}).single('file'));
app.get('/upload.html', function (req, res) {
   res.sendFile( __dirname + "/" + "upload.html" );
})

app.post('/file_upload', function (req, res) {
   console.log("hai");
   console.log(req.file.name);
   console.log("hai");
   console.log(req.file.path);
   console.log(req.file.type);
   var file = __dirname + "/" + req.file.name;
   
   fs.readFile( req.file.path, function (err, data) {
      fs.writeFile(file, data, function (err) {
         if( err ) {
            console.log( err );
            } else {
               response = {
                  message:'File uploaded successfully',
                  filename:req.file.name
               };
            }
         
         console.log( response );
         res.end( JSON.stringify( response ) );
      });
   });
})

var bodyParser = require('body-parser');

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('public'));
app.get('/post.html', function (req, res) {
   res.sendFile( __dirname + "/" + "post.html" );
})

app.post('/process_post', urlencodedParser, function (req, res) {
   // Prepare output in JSON format
   response = {
      first_name:req.body.first_name,
      last_name:req.body.last_name
   };
   console.log(response);
   res.end(JSON.stringify(response));
})

app.get('/listuser', function (req, res) {
   fs.readFile( __dirname + "/" + "user.json", 'utf8', function (err, data) {
      console.log( data );
      res.end( data );
   });
})


var users = {
   "user4" : {
      "name" : "mohit",
      "password" : "password4",
      "profession" : "teacher",
      "id": 4
   }
}

app.post('/addUser', function (req, res) {
   // First read existing user.
   fs.readFile( __dirname + "/" + "user.json", 'utf8', function (err, data) {
      data = JSON.parse( data );
      data["user4"] = users["user4"];
      console.log( data["user4"] );
      res.end( JSON.stringify(data));
   });
})

app.get('/:id', function (req, res) {
   // First read existing user.
   fs.readFile( __dirname + "/" + "user.json", 'utf8', function (err, data) {
      var user = JSON.parse( data );
      var user = user["user" + req.params.id] 
      console.log( user );
      res.end( JSON.stringify(user));
   });
})


var id = 2;

app.delete('/deleteUser', function (req, res) {
   // First read existing user.
   fs.readFile( __dirname + "/" + "user.json", 'utf8', function (err, data) {
      data = JSON.parse( data );
      delete data["user2"];
       
      console.log( data );
      res.end( JSON.stringify(data));
   });
})


   var server = app.listen(3000, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})
