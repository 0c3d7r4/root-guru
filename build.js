var fs=require('fs')
var path=require('path')
var {mkdir,writeFile}=fs.promises

var baseURL='http://localhost:8080'
var outputDir='docs'

var routes=[
 '/','/guides','/scripts','/rucode',
 '/pages/style.css','/pages/matrix.js','/pages/favicon-32.png'
]

function ensurePath(p) {
 var dir=path.dirname(p)
 return mkdir(dir,{recursive:true})
}

async function fetchAndSave(route) {
 try {
  var res=await fetch(baseURL+route)
  var contentType=res.headers.get('content-type')||''
  var isHTML=contentType.includes('text/html')
  var dest=path.join(outputDir,route=='/'?'index.html':route+'')

  var buf=Buffer.from(await res.arrayBuffer())

  if(isHTML) {
   var html=buf.toString()
   html=html.replace(/<link[^>]+href="\/pages\/([^"]+\.css)"[^>]*>/g,function(_,file) {
    try {
     var css=fs.readFileSync(path.join('pages',file),'utf8')
     return '<style>'+css+'</style>'
    } catch(e) {
     console.error('Missing CSS:',file)
     return ''
    }
   })
   buf=Buffer.from(html)
  }

  await ensurePath(dest)
  await writeFile(dest,buf)
  console.log('Saved',route,'->',dest)
 } catch(err) {
  console.error('Fail',route,err.message)
 }
}


async function build() {
 await mkdir(outputDir,{recursive:true})
 for(var route of routes) await fetchAndSave(route)
}

build()