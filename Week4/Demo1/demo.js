function setup() {
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    var slider1 = document.getElementById('slider1');
    slider1.value = -25;
    var slider2 = document.getElementById('slider2');
    slider2.value = 50;
    var slider3 = document.getElementById('slider3');
    slider3.value = -50;
    var slider4 = document.getElementById('slider4');
    slider4.value = 25;

    function draw() {
	canvas.width = canvas.width;
	// use the sliders to get the angles
	var theta1 = slider1.value*0.005*Math.PI;
	var phi1 = slider2.value*0.005*Math.PI;
	var phi2 = slider3.value*0.005*Math.PI;
	var theta2 = slider4.value*0.005*Math.PI;
	
    var stack = [ mat3.create() ]; // Initialize stack with identity on top
      
    function moveToTx(x,y)  
	{var res=vec2.create(); vec2.transformMat3(res,[x,y],stack[0]); context.moveTo(res[0],res[1]);}

	function lineToTx(x,y)
	{var res=vec2.create(); vec2.transformMat3(res,[x,y],stack[0]); context.lineTo(res[0],res[1]);}
	
	function linkage(color) {
	    context.beginPath();
	    context.fillStyle = color;
	    moveToTx(0,0);
	    lineToTx(10,5);
	    lineToTx(90,5);
	    lineToTx(100,0);
	    lineToTx(90,-5);
	    lineToTx(10,-5);
	    context.closePath();
	    context.fill();
	    axes(color);
	}
	
	function axes(color) {
	    context.strokeStyle=color;
	    context.beginPath();
	    // Axes
	    moveToTx(120,0);lineToTx(0,0);lineToTx(0,120);
	    // Arrowheads
	    moveToTx(110,5);lineToTx(120,0);lineToTx(110,-5);
	    moveToTx(5,110);lineToTx(0,120);lineToTx(-5,110);
	    // X-label
	    moveToTx(130,-5);lineToTx(140,5);
	    moveToTx(130,5);lineToTx(140,-5);
	    // Y-label
	    moveToTx(-5,130);lineToTx(0,135);lineToTx(5,130);
	    moveToTx(0,135);lineToTx(0,142);
	    context.stroke();
	}

	// make sure you understand these    

	var Tblue_to_canvas = mat3.create();
	mat3.fromTranslation(Tblue_to_canvas,[50,150]);
	mat3.multiply(stack[0],stack[0],Tblue_to_canvas);
    linkage("blue");
	
	stack.unshift(mat3.clone(stack[0])); // "save" (note: you *need* to clone)
    var Tgreen_to_blue = mat3.create();
	mat3.fromTranslation(Tgreen_to_blue,[100,0]);
	mat3.rotate(Tgreen_to_blue,Tgreen_to_blue,theta1);
	mat3.multiply(stack[0],stack[0],Tgreen_to_blue);
    linkage("green");

	stack.unshift(mat3.clone(stack[0])); // "save"
    var Tred_to_green = mat3.create();
	mat3.fromTranslation(Tred_to_green,[100,0]);
	mat3.rotate(Tred_to_green,Tred_to_green,phi1);
	mat3.scale(Tred_to_green,Tred_to_green,[0.5,1]);
	mat3.multiply(stack[0],stack[0],Tred_to_green);
    linkage("red");
    stack.shift();          // "restore"
    
	stack.unshift(mat3.clone(stack[0])); // "save"
	var Torange_to_green = mat3.create();
	mat3.fromTranslation(Torange_to_green,[100,0]);
	mat3.rotate(Torange_to_green,Torange_to_green,phi2);
	mat3.scale(Torange_to_green,Torange_to_green,[0.5,1]);
	mat3.multiply(stack[0],stack[0],Torange_to_green);
    linkage("orange");
    stack.shift();          // "restore"
    stack.shift();          // "restore"

	stack.unshift(mat3.clone(stack[0])); // "save"
    var Tbrown_to_blue = mat3.create();
	mat3.fromTranslation(Tbrown_to_blue,[100,0]);
	mat3.rotate(Tbrown_to_blue,Tbrown_to_blue,theta2);
	mat3.multiply(stack[0],stack[0],Tbrown_to_blue);
    linkage("brown");
    stack.shift();          // "restore"
    }

    slider1.addEventListener("input",draw);
    slider2.addEventListener("input",draw);
    slider3.addEventListener("input",draw);
    slider4.addEventListener("input",draw);
    draw();
}
window.onload = setup;

