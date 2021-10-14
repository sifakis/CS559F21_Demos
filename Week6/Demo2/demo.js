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
	
	function drawPoint(color,pos,Tx) {
	    context.beginPath();
	    context.fillStyle = color;
	    moveToTx([-.03+pos[0],-.03+pos[1]],Tx);
	    lineToTx([-.03+pos[0],.03+pos[1]],Tx);
	    lineToTx([.03+pos[0],.03+pos[1]],Tx);
	    lineToTx([.03+pos[0],-.03+pos[1]],Tx);
	    context.closePath();
	    context.fill();
	}

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


	var Bspline = function(t) {
	    return [
		(1./6.)*(-t*t*t+3*t*t-3*t+1),
		(1./6.)*(3*t*t*t-6*t*t+4),
		(1./6.)*(-3*t*t*t+3*t*t+3*t+1),
		(1./6.)*t*t*t
	    ];
	}

	function Cubic(basis,P,t){
	    var b = basis(t);
	    var result=vec2.create();
	    vec2.scale(result,P[0],b[0]);
	    vec2.scaleAndAdd(result,result,P[1],b[1]);
	    vec2.scaleAndAdd(result,result,P[2],b[2]);
	    vec2.scaleAndAdd(result,result,P[3],b[3]);
	    return result;
	}
	
	var p0=[1+Math.cos(5.*Math.PI/5.),Math.sin(5.*Math.PI/5.)];
	var p1=[1+Math.cos(4.*Math.PI/5.),Math.sin(4.*Math.PI/5.)];
	var p2=[1+Math.cos(3.*Math.PI/5.),Math.sin(3.*Math.PI/5.)];
	var p3=[1+Math.cos(2.*Math.PI/5.),Math.sin(2.*Math.PI/5.)];
	var p4=[1+Math.cos(1.*Math.PI/5.),Math.sin(1.*Math.PI/5.)];
	var p5=[1+Math.cos(0.*Math.PI/5.),Math.sin(0.*Math.PI/5.)];

	var P0 = [p0,p1,p2,p3];
	var P1 = [p1,p2,p3,p4];
	var P2 = [p2,p3,p4,p5];
	
	var C0 = function(t_) {return Cubic(Bspline,P0,t_);};
	var C1 = function(t_) {return Cubic(Bspline,P1,t_);};
	var C2 = function(t_) {return Cubic(Bspline,P2,t_);};

	var Ccomp = function(t) {
            if (t<1){
		var u = t;
		return C0(u);
            } else if (t<2){
		var u = t-1.0;
		return C1(u);
            } else {
		var u = t-2.0;
		return C2(u);
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

	drawPoint("grey",p0,Tblue_to_canvas);
	drawPoint("grey",p1,Tblue_to_canvas);
	drawPoint("grey",p2,Tblue_to_canvas);
	drawPoint("grey",p3,Tblue_to_canvas);
	drawPoint("grey",p4,Tblue_to_canvas);
	drawPoint("grey",p5,Tblue_to_canvas);

	drawTrajectory(0.0,1.0,100,C0,Tblue_to_canvas,"red");
	drawTrajectory(0.0,1.0,100,C1,Tblue_to_canvas,"blue");
	drawTrajectory(0.0,1.0,100,C2,Tblue_to_canvas,"brown");  

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


