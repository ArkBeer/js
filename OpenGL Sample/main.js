let gl, shaderProgram, vertices, vertexCount=30,matrix=mat4.create();

initGL();
createShaders();
createVertices();
draw();

function initGL(){
  let canvas=document.getElementById("canvas");
  gl=canvas.getContext("webgl");
  gl.viewport(0,0,canvas.width,canvas.height);
  gl.clearColor(0,0,0.4,1);
}

function createShaders(){
  let vertexShader=getShader(gl,"shader-vs");
  let fragmentShader=getShader(gl, "shader-fs");

  shaderProgram=gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);
  gl.useProgram(shaderProgram);
}

function createVertices(){
  vertices=[];
  for(let i=0;i<vertexCount;++i){
    vertices.push(Math.random()*2-1);
    vertices.push(Math.random()*2-1);
    vertices.push(Math.random()*2-1);
  }
  let buffer=gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer); //vertex color
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices),gl.STATIC_DRAW); //vertex coords.
  let coords=gl.getAttribLocation(shaderProgram, "coords");
  //gl.vertexAttrib3f(coords, 0, 0, 0);
  gl.vertexAttribPointer(coords, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(coords);
  //gl.bindBuffer(gl.ARRAY_BUFFER, null);
  let pointSize=gl.getAttribLocation(shaderProgram, "pointSize");
  gl.vertexAttrib1f(pointSize, 1);
  let color=gl.getUniformLocation(shaderProgram, "color");
  gl.uniform4f(color, 0.5, 1, 0.8, 1);
}

function draw(){
  mat4.rotateX(matrix,matrix,0.007);
  mat4.rotateY(matrix,matrix,0.014);
  mat4.rotateZ(matrix,matrix,0.01);
  let transformMatrix=gl.getUniformLocation(shaderProgram, "transformMatrix");
  gl.uniformMatrix4fv(transformMatrix, false,matrix);

  gl.bufferSubData(gl.ARRAY_BUFFER, 0, new Float32Array(vertices));
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, vertexCount);
  requestAnimationFrame(draw);
}

function getShader(gl, id){
  let shaderScript, theSource, currentChild, shader;
  shaderScript=document.getElementById(id);
  if(!shaderScript){
    return null;
  }
  theSource="";
  currentChild=shaderScript.firstChild;
  while(currentChild){
    if(currentChild.nodeType==currentChild.TEXT_NODE){
      theSource+=currentChild.textContent;
    }
    currentChild=currentChild.nextSibling;
  }
  if(shaderScript.type=="x-shader/x-fragment"){
    shader=gl.createShader(gl.FRAGMENT_SHADER);
  }else if(shaderScript.type=="x-shader/x-vertex"){
    shader=gl.createShader(gl.VERTEX_SHADER);
  }else{
    return null;
  }
  gl.shaderSource(shader, theSource);
  gl.compileShader(shader);
  
  if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
    alert("error, failed to compile shader:"+gl/getShaderInfoLog(shader));
    return null;
  }
  return shader;
}