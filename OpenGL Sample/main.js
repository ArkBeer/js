let gl, shaderProgram, vertices, vertex_colors, vertexCount=30,matrix=mat4.create();

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
  setVertexBuffer(vertices, gl.ARRAY_BUFFER, gl.STATIC_DRAW, "coords", 3);
  
  vertex_colors=[];
  for(let i=0;i<vertexCount;i+=3){
    //vertex_colors.push(Math.random());
    //vertex_colors.push(Math.random());
    //vertex_colors.push(Math.random());
    let tmp_r=Math.random();
    let tmp_g=Math.random();
    let tmp_b=Math.random();
    vertex_colors.push(tmp_r);
    vertex_colors.push(tmp_g);
    vertex_colors.push(tmp_b);
    vertex_colors.push(1.0);
    vertex_colors.push(tmp_r);
    vertex_colors.push(tmp_g);
    vertex_colors.push(tmp_b);
    vertex_colors.push(1.0);
    vertex_colors.push(tmp_r);
    vertex_colors.push(tmp_g);
    vertex_colors.push(tmp_b);
    vertex_colors.push(1.0);
  }
  setVertexBuffer(vertex_colors, gl.ARRAY_BUFFER, gl.STATIC_DRAW, "colors", 4);
  let pointSize=gl.getAttribLocation(shaderProgram, "pointSize");
  gl.vertexAttrib1f(pointSize, 1);
}

function draw(){
  mat4.rotateX(matrix,matrix,0.007);
  mat4.rotateY(matrix,matrix,0.014);
  mat4.rotateZ(matrix,matrix,0.01);
  let transformMatrix=gl.getUniformLocation(shaderProgram, "transformMatrix");
  gl.uniformMatrix4fv(transformMatrix, false,matrix);

  gl.bufferSubData(gl.ARRAY_BUFFER, 0, new Float32Array(vertices));
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, vertices.length/3);
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

function setVertexBuffer(ArrayBufferView, target, usage, location, index){
  let buffer=gl.createBuffer();
  gl.bindBuffer(target, buffer);
  gl.bufferData(target, new Float32Array(ArrayBufferView),usage); //vertex coords.
  let coords=gl.getAttribLocation(shaderProgram, location);
  gl.vertexAttribPointer(coords, index, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(coords);
  gl.bindBuffer(target, null);
}
