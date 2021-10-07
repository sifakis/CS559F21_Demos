function setup() {
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    var slider1 = document.getElementById('slider1');
    slider1.value = 0;

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
	    moveToTx([-5,-5],Tx);
	    lineToTx([-5,5],Tx);
            lineToTx([5,5],Tx);
      	    lineToTx([10,0],Tx);
	    lineToTx([5,-5],Tx);
	    context.closePath();
	    context.fill();
	}
	
	function drawAxes(color,Tx) {
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

	var Rstart = 50.0;
	var Rslope = 25.0;
	var Cspiral = function(t) {
	    var R = Rslope * t + Rstart;
	    var x = R * Math.cos(2.0 * Math.PI * t);
	    var y = R * Math.sin(2.0 * Math.PI * t);
	    return [x,y];
	}
	var Cspiral_tangent = function(t) {
	    var R = Rslope * t + Rstart;
	    var Rprime = Rslope;
	    var x = Rprime * Math.cos(2.0 * Math.PI * t)
                - R * 2.0 * Math.PI * Math.sin(2.0 * Math.PI * t);
	    var y = Rprime * Math.sin(2.0 * Math.PI * t)
                + R * 2.0 * Math.PI * Math.cos(2.0 * Math.PI * t);
	    return [x,y];
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

	drawAxes("black", mat3.create());
	
	var Tred_to_canvas = mat3.create();
	mat3.fromTranslation(Tred_to_canvas,[25,25]);
	drawAxes("red",Tred_to_canvas);
	drawObject("red",Tred_to_canvas);

	var Tblue_to_canvas = mat3.create();
	mat3.fromTranslation(Tblue_to_canvas,[150,175]);
	mat3.scale(Tblue_to_canvas,Tblue_to_canvas,[1,-1]); // Flip the Y-axis
	drawAxes("blue",Tblue_to_canvas);
	
	drawTrajectory(0.0,2.0,100,Cspiral,Tblue_to_canvas,"brown");
	var Tgreen_to_blue = mat3.create();
	mat3.fromTranslation(Tgreen_to_blue,Cspiral(tParam));
	var tangent = Cspiral_tangent(tParam);
	var angle = Math.atan2(tangent[1],tangent[0]);
	mat3.rotate(Tgreen_to_blue,Tgreen_to_blue,angle);
	var Tgreen_to_canvas = mat3.create();
	mat3.multiply(Tgreen_to_canvas, Tblue_to_canvas, Tgreen_to_blue);
	// drawAxes("green",Tgreen_to_canvas); // Un-comment this to view axes
	drawObject("green",Tgreen_to_canvas);
    }

    slider1.addEventListener("input",draw);
    draw();
}
window.onload = setup;
