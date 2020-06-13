//start 

function main(){
	const canvas = document.querySelector("#canvas");
	
	//initialize gl context
	const gl = canvas.getContext("webgl");
	
	//error if broken
	if (gl === null){
		alert("webGL not working");
		return;
	}
	
	gl.clearColor(0.0,1.0,0.0,0.5);
	gl.clear(gl.COLOR_BUFFER_BIT);
	
}

window.onload = main;
