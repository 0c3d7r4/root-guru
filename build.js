var fs=require('fs')
var path=require('path')
var {mkdir,writeFile}=fs.promises

var baseURL='http://localhost:8080'
var outputDir='docs'

var routes=['/','/guides','/scripts','/rucode']

function ensurePath(p) {
 var dir=path.dirname(p)
 return mkdir(dir,{recursive:true})
}

async function fetchAndSave(route) {
 try {
  var res=await fetch(baseURL+route)
  var html=await res.text()
  var dest=path.join(outputDir,route=='/'?'index.html':route+'')
  await ensurePath(dest)
  await writeFile(dest,html)
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