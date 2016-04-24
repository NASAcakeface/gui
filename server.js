var http = require('http'),
    fs = require('fs');

var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');



/*// index page 
app.get('/', function(req, res) {
    res.render('index');
});
*/
app.listen(8080);

/*fs.readFile('./index.html', function (err, html) {
    if (err) {
        throw err; 
    }       
    http.createServer(function(request, response) {  
        response.writeHeader(200, {"Content-Type": "text/html"});  
        response.write(html);  
        response.end();  
    }).listen(8000);
});*/

