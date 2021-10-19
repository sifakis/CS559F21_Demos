function setup() {
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    var slider1 = document.getElementById('slider1');
    slider1.value = 0;
    var slider2 = document.getElementById('slider2');
    slider2.value = 0;

    function draw() {
	canvas.width = canvas.width;

	// use the sliders to get the angles
	var tParam = slider1.value*0.01;

	var viewAngle = slider2.value*0.02*Math.PI;
	var locCamera = vec3.create();
	var distCamera = 400.0;
	locCamera[0] = distCamera*Math.sin(viewAngle);
	locCamera[1] = 100;
	locCamera[2] = distCamera*Math.cos(viewAngle);
	var TlookAt = mat4.create();
	mat4.lookAt(TlookAt, locCamera, [0,0,0], [0,1,0]);
	
	function moveToTx(loc,Tx)
	{var res=vec3.create(); vec3.transformMat4(res,loc,Tx); context.moveTo(res[0],res[1]);}

	function lineToTx(loc,Tx)
	{var res=vec3.create(); vec3.transformMat4(res,loc,Tx); context.lineTo(res[0],res[1]);}
	
	function drawObject(color,Tx) {
	    context.beginPath();
	    context.fillStyle = color;
	    moveToTx([-5,-5,0],Tx);
	    lineToTx([-5,5,0],Tx);
            lineToTx([5,5,0],Tx);
      	    lineToTx([10,0,0],Tx);
	    lineToTx([5,-5,0],Tx);
	    context.closePath();
	    context.fill();
	}
	
	function drawAxes(color,Tx) {
	    context.strokeStyle=color;
	    context.beginPath();
	    // Axes
	    moveToTx([120,0,0],Tx);lineToTx([0,0,0],Tx);lineToTx([0,120,0],Tx);
	    // Arrowheads
	    moveToTx([110,5,0],Tx);lineToTx([120,0,0],Tx);lineToTx([110,-5,0],Tx);
	    moveToTx([5,110,0],Tx);lineToTx([0,120,0],Tx);lineToTx([-5,110,0],Tx);
	    // X-label
	    moveToTx([130,0,0],Tx);lineToTx([140,10,0],Tx);
	    moveToTx([130,10,0],Tx);lineToTx([140,0,0],Tx);
	    context.stroke();
	}

	var Hermite = function(t) {
	    return [
		2*t*t*t-3*t*t+1,
		t*t*t-2*t*t+t,
		-2*t*t*t+3*t*t,
		t*t*t-t*t
	    ];
	}

	var HermiteDerivative = function(t) {
            return [
		6*t*t-6*t,
		3*t*t-4*t+1,
		-6*t*t+6*t,
		3*t*t-2*t
            ];
	}

	function Cubic(basis,P,t){
	    var b = basis(t);
	    var result=vec3.create();
	    vec3.scale(result,P[0],b[0]);
	    vec3.scaleAndAdd(result,result,P[1],b[1]);
	    vec3.scaleAndAdd(result,result,P[2],b[2]);
	    vec3.scaleAndAdd(result,result,P[3],b[3]);
	    return result;
	}
	
	var p0=[0,0,0];
	var d0=[100,300,0];
	var p1=[100,100,0];
	var d1=[-100,300,0];
	var p2=[200,200,0];
	var d2=[0,300,0];

	var P0 = [p0,d0,p1,d1]; // First two points and tangents
	var P1 = [p1,d1,p2,d2]; // Last two points and tangents

	var C0 = function(t_) {return Cubic(Hermite,P0,t_);};
	var C1 = function(t_) {return Cubic(Hermite,P1,t_);};

	var C0prime = function(t_) {return Cubic(HermiteDerivative,P0,t_);};
	var C1prime = function(t_) {return Cubic(HermiteDerivative,P1,t_);};

	var Ccomp = function(t) {
            if (t<1){
		var u = t;
		return C0(u);
            } else {
		var u = t-1.0;
		return C1(u);
            }          
	}

	var Ccomp_tangent = function(t) {
            if (t<1){
		var u = t;
		return C0prime(u);
            } else {
		var u = t-1.0;
		return C1prime(u);
            }          
	}

	function drawTrajectory(t_begin,t_end,intervals,C,Tx,color) {
	    context.strokeStyle=color;
	    context.beginPath();
            moveToTx(C(t_begin),Tx);
            for(var i=1;i<=intervals;i++){
		var t=((intervals-i)/intervals)*t_begin+(i/intervals)*t_end;
		lineToTx(C(t),Tx);
            }
            context.stroke();
	}

	// make sure you understand these    

	drawAxes("black", mat4.create());
	

	var Tgrey_to_canvas = mat4.create();
	mat4.fromTranslation(Tgrey_to_canvas,[200,300,0]);
	mat4.scale(Tgrey_to_canvas,Tgrey_to_canvas,[1,-1,-1]); // Flip the Y-axis
	mat4.multiply(Tgrey_to_canvas,Tgrey_to_canvas,TlookAt);
	drawAxes("grey",Tgrey_to_canvas);

	drawTrajectory(0.0,1.0,100,C0,Tgrey_to_canvas,"red");
	drawTrajectory(0.0,1.0,100,C1,Tgrey_to_canvas,"blue");
	
	var Tgreen_to_grey = mat4.create();
	mat4.fromTranslation(Tgreen_to_grey,Ccomp(tParam));
	var Tgreen_to_canvas = mat4.create();
	var tangent = Ccomp_tangent(tParam);
	var angle = Math.atan2(tangent[1],tangent[0]);
	mat4.rotateZ(Tgreen_to_grey,Tgreen_to_grey,angle);
	mat4.multiply(Tgreen_to_canvas, Tgrey_to_canvas, Tgreen_to_grey);
	drawObject("green",Tgreen_to_canvas);
    }
    
    slider1.addEventListener("input",draw);
    slider2.addEventListener("input",draw);
    draw();
}
window.onload = setup;

