var http=require('http')
var fs=require('fs')
var path=require('path')
var mime = require('mime-types'); // Import the mime-types library

// pages
// index.html
//
http.createServer(function(req,res) {
 if(req.url=='/'||req.url=='/index.html') {
  res.writeHead(200,{'Content-Type':'text/html'})
  var html=readPageWithContent('index','features')
  res.end(html)
 }else if(req.url=='/games.html') {
  res.writeHead(200,{'Content-Type':'text/html'})
  var html=readPageWithContent('index','games')
  res.end(html)
 }else if(req.url=='/docs') {
  res.writeHead(200,{'Content-Type':'text/html'})
  var html=readPageWithContent('index','games')
  res.end(html)
 }else if(req.url=='/scripts') {
  res.writeHead(200,{'Content-Type':'text/html'})
  var html=readPageWithContent('index','scripts')
  res.end(html)
 }else if(req.url=='/guides') {
  res.writeHead(200,{'Content-Type':'text/html'})
  var html=readPageWithContent('index','guides')
  res.end(html)
 }else if(req.url.startsWith('/rucode')) {
  if(req.url=='/rucode'){
   var html=readPageWithContent('index','rucode')
  }else {
   var html=readPageWithContent('index','rucode-0')
  }
  res.writeHead(200,{'Content-Type':'text/html'})
  res.end(html)
 } else if (req.url.endsWith('.css') || req.url.endsWith('.js') || req.url.endsWith('.png')) {
  try {
    var filePath = path.join(__dirname, req.url);
    var fileExtension = path.extname(filePath).toLowerCase();

    // Use mime-types to determine the appropriate content type
    var mimeType = mime.lookup(fileExtension);

    if (!mimeType) {
      res.writeHead(415); // Unsupported Media Type
      res.end('Unsupported file type');
      return;
    }

    var fileContent = fs.readFileSync(filePath);

    res.writeHead(200, { 'Content-Type': mimeType });
    res.end(fileContent);
  } catch (er) {
    res.writeHead(500);
    res.end('Internal server error');
  }
}else {
  res.writeHead(404)
  res.end('404 Not Found')
 }
}).listen(8080)

var readPageWithContent=(template,content)=>{
 var html=fs.readFileSync(path.join(__dirname,'pages',template+'.html'))+''
 if(content) try {
  var html2=fs.readFileSync(path.join(__dirname,'content',content+'.html'))
 }catch(er) {
  var html2='failed to load content'
 }else {
  var html2=''
 }

 if(html2){
  if(!html.includes('{CONTENT}')){
   console.warn('Template does not have {CONTENT} placeholder')
  }
  else html=html.replace(/{CONTENT}/,html2)
 }

 return html
}