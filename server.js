var http = require('http');
var path = require ('path');
var fs = require ('fs');
var img = 'https://upload.wikimedia.org/wikipedia/commons/4/47/American_Eskimo_Dog.jpg';

var hostname = 'localhost';
var port = 3000;

var server = http.createServer((req, res) => {
    console.log(`Request for ${req.url} by method ${req.method}`);

    if(req.method === 'GET') {
        var fileUrl = req.url;
        if (fileUrl === '/') {     //http://http://localhost:3000/
          fileUrl = "/index.html"; //http://http://localhost:3000/index.html
        }

        //define the path to the public folder
        var filePath = path.resolve('./' + fileUrl);
        var fileExt = path.extname(filePath);

        if(fileExt === '.html') {
            fs.readFile(filePath, function(err,data) {
                if (err) {
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/html');
                    res.end(`<html><body><h1>Error 404: ${fileUrl} not found</h1></body></html>`);
                    return;
                }
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                // fs.createReadStream(filePath).pipe(res);  createReadStream默认载入在最下面
                res.write(data);
                res.write(`<p>444</p>`);
                res.write("<img src=" + img + " width=500px" + ">");
                res.write("<br>")
                res.write("He is an american eskimos");
            });
        } else {
            res.statusCode = 404;
            res.setHeader("Content-Type", "text/html");
            res.end(`<html><body><h1>Error 404: ${fileUrl} is not an HTML file</h1></body></html>`);
        }
    } else {
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/html");
        res.end(`<html><body><h1>Error 404: ${req.method} not supported</h1></body></html>`);
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http:// ${hostname}: ${port}/`);  //不是''  是``
});