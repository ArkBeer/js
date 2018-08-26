let len=0.8;
let angle=Math.random()*61;
let count=1+Math.floor(Math.random()*10);
let x0=200,y0=300,x1=200,y1=300-50;
window.onload=function(){
	var canvas = document.getElementById("tree");
	if (canvas.getContext){
		var ctx = canvas.getContext('2d');
	}
	draw(ctx,x0,y0,x1,y1);
	calc(ctx,x0,y0,x1,y1,count);
	}
function draw(ctx,x1,y1,x2,y2){
	let randomColor="#"+("000000"+(Math.random()*0xFFFFFF|0).toString(16)).slice(-6);
	ctx.beginPath();
	ctx.moveTo(x1,y1);
	ctx.lineTo(x2,y2);
	ctx.strokeStyle=randomColor;
	ctx.stroke();
}
function calc(ctx,x0,y0,x1,y1,count){
	let sin,cos,dx,dy;
	sin=Math.sin(angle*Math.PI/180);
	cos=Math.cos(angle*Math.PI/180);
	dx=len*(x1-x0);
	dy=len*(y1-y0);
	x0=x1,y0=y1;
	x1=x0+dx*cos-dy*sin;
	y1=y0+dx*sin+dy*cos;
	draw(ctx,x0,y0,x1,y1);
	if(count!=0){
		calc(ctx,x0,y0,x1,y1,--count);
		++count;
	}
	x1=x0+dx*cos+dy*sin;
	y1=y0-dx*sin+dy*cos;
	draw(ctx,x0,y0,x1,y1);
	if(count!=0)calc(ctx,x0,y0,x1,y1,--count);
}