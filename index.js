var http=require('http')
var fs=require('fs')
var path=require('path')

http.createServer(function(req,res) {
 if(req.url=='/') {
  res.writeHead(200,{'Content-Type':'text/html'})
  var html=readPageWithContent('index','features')
  res.end(html)
 }else if(req.url=='/index2.html') {
  res.writeHead(200,{'Content-Type':'text/html'})
  var html=readPageWithContent('index2','features')
  res.end(html)
 }else if(req.url.startsWith('/rucode')) {
  if(req.url=='/rucode'){
   var html=readPageWithContent('index2','rucode')
  }else {
   var html=readPageWithContent('index2','rucode-0')
  }
  res.writeHead(200,{'Content-Type':'text/html'})
  res.end(html)
 }else if(req.url.endsWith('.css')) {
  try{
   var PATH=path.join(__dirname,'/',req.url)
   console.log('css',PATH)
   var css=fs.readFileSync(PATH)
   res.writeHead(200,{'Content-Type':'text/css'})
   res.end(css)
  }catch(er) {
   res.writeHead(500)
   res.end('o_o')
  }
 }else if(req.url.endsWith('.js')) {
  try{
   var PATH=path.join(__dirname,'/',req.url)
   console.log(PATH)
   var js=fs.readFileSync(PATH)
   res.writeHead(200,{'Content-Type':'application/javascript'})
   res.end(js)
  }catch(er) {
   res.writeHead(500)
   res.end('o_o')
  }
  // readPageWithContent('pages',path.basename(req.url))
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