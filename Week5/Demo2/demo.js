function setup() {
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    var slider1 = document.getElementById('slider1');
    slider1.value = -25;

    function draw() {
	canvas.width = canvas.width;
	// use the sliders to get the angles
	var tParam = slider1.value*0.01;
	
	function moveToTx(loc,Tx)
	{var res=vec2.create(); vec2.transformMat3(res,loc,Tx); context.moveTo(res[0],res[1]);}

	function lineToTx(loc,Tx)
	{var res=vec2.create(); vec2.transformMat3(res,loc,Tx); context.lineTo(res[0],res[1]);}
	
	function drawObject(color,Tx) {
	    context.beginPath();
	    context.fillStyle = color;
	    moveToTx([-.05,-.05],Tx);
	    lineToTx([-.05,.05],Tx);
	    lineToTx([.05,.05],Tx);
	    lineToTx([.05,-.05],Tx);
	    context.closePath();
	    context.fill();
	}
	
	function drawAxes100unit(color,Tx) {
	    context.strokeStyle=color;
	    context.beginPath();
	    // Axes
	    moveToTx([120,0],Tx);lineToTx([0,0],Tx);lineToTx([0,120],Tx);
	    // Arrowheads
	    moveToTx([110,5],Tx);lineToTx([120,0],Tx);lineToTx([110,-5],Tx);
	    moveToTx([5,110],Tx);lineToTx([0,120],Tx);lineToTx([-5,110],Tx);
	    // X-label
	    moveToTx([130,0],Tx);lineToTx([140,10],Tx);
	    moveToTx([130,10],Tx);lineToTx([140,0],Tx);
	    context.stroke();
	}

	function drawAxes1unit(color,Tx) {
	    context.strokeStyle=color;
	    context.beginPath();
	    // Axes
	    moveToTx([1.20,0],Tx);lineToTx([0,0],Tx);lineToTx([0,1.20],Tx);
	    // Arrowheads
	    moveToTx([1.10,.05],Tx);lineToTx([1.20,0],Tx);lineToTx([1.10,-.05],Tx);
	    moveToTx([.05,1.10],Tx);lineToTx([0,1.20],Tx);lineToTx([-.05,1.10],Tx);
	    // X-label
	    moveToTx([1.30,0],Tx);lineToTx([1.40,.10],Tx);
	    moveToTx([1.30,.10],Tx);lineToTx([1.40,0],Tx);
	    context.stroke();
	}


	var C0 = function(t) {
            var x = t;
            var y = t*t;
            return [x,y];
	}

	var C1a = function(t) { // discontinuity at t=1
            var x = t*(t-1);
            var y = t;
            return [x,y];
	}

	var C1b = function(t) { // C0 continuity at t=1
            var x = t*t-3*t+3;
            var y = t;
            return [x,y];
	}

	var C1c = function(t) { // C1 continuity at t=1
            var x = t;
            var y = -t*t+4*t-2;
            return [x,y];
	}

	var C1d = function(t) { // G1 continuity at t=1
            var x = 0.25*(t+3);
            var y = -0.0625*(t+3)*(t+3)+(t+3)-2;
            return [x,y];
	}

	var C1e = function(t) { // C2 continuity at t=1
            var x = t;
            var y = t*t-2*(t-1)*(t-1)*(t-1);
            return [x,y];
	}

	var C1 = C1e;
	
	var Ccomp = function(t) {
            if(t<1) {
		return C0(t);
            }else{
		return C1(t);
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

	drawAxes100unit("black", mat3.create());
	
	var Tblue_to_canvas = mat3.create();
	mat3.fromTranslation(Tblue_to_canvas,[50,350]);
	mat3.scale(Tblue_to_canvas,Tblue_to_canvas,[150,-150]); // Flip the Y-axis
	drawAxes1unit("grey",Tblue_to_canvas);
	
	drawTrajectory(0.0,1.0,100,C0,Tblue_to_canvas,"red");
	drawTrajectory(1.0,2.0,100,C1,Tblue_to_canvas,"blue");
	var Tgreen_to_blue = mat3.create();
	mat3.fromTranslation(Tgreen_to_blue,Ccomp(tParam));
	var Tgreen_to_canvas = mat3.create();
	mat3.multiply(Tgreen_to_canvas, Tblue_to_canvas, Tgreen_to_blue);
	drawObject("green",Tgreen_to_canvas);
    }

    slider1.addEventListener("input",draw);
    draw();
}
window.onload = setup;
