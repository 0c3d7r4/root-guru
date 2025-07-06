var canvas=document.getElementById('matrixCanvas')
var ctx=canvas.getContext('2d')
canvas.width=window.innerWidth
canvas.height=window.innerHeight

var chars='アァイゥエオカキクケコサシスセソタチツテトナニヌネノABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('')
var fontSize=16
var columns=Math.floor(canvas.width/fontSize)
var drops=Array(columns).fill(1)

var mouseX=0
window.addEventListener('mousemove',function(e) {
 mouseX=e.clientX
})

function draw() {
 ctx.fillStyle='rgba(0,0,0,0.05)'
 ctx.fillRect(0,0,canvas.width,canvas.height)
 ctx.fillStyle='#0f0'
 ctx.font=fontSize+'px monospace'

 var speed=1+mouseX/canvas.width*2

 for(var i=0;i<columns;i++) {
  var text=chars[Math.floor(Math.random()*chars.length)]
  var x=i*fontSize
  var y=drops[i]*fontSize
  ctx.fillText(text,x,y)
  if(y>canvas.height && Math.random()>0.975) drops[i]=0
  drops[i]+=speed
 }
 requestAnimationFrame(draw)
}

draw()

window.addEventListener('resize',function() {
 canvas.width=window.innerWidth
 canvas.height=window.innerHeight
 columns=Math.floor(canvas.width/fontSize)
 drops=Array(columns).fill(1)
})
