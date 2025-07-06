var http=require('http')
var fs=require('fs')
var path=require('path')

http.createServer(function(req,res) {
 if(req.url=='/') {
  res.writeHead(200,{'Content-Type':'text/html'})
  var html=fs.readFileSync(path.join(__dirname,'pages/index.html'))
  res.end(html)
 } else if(req.url=='/index2.html') {
  res.writeHead(200,{'Content-Type':'text/html'})
  var html=fs.readFileSync(path.join(__dirname,'pages/index2.html'))
  res.end(html)
 } else {
  res.writeHead(404)
  res.end('404 Not Found')
 }
}).listen(8080)
