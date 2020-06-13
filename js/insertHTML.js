//partially inspired by the w3 article www.w3schools.com/howto/howto_html_include.asp

//create a include-html-file attribute in div

function includeHTML(){
	var z, i, elmnt, file, xhttp;
	
	z=document.getElementsByTagName("*");
	
	for  (i=0; i<z.length; i++){
		
		elmnt = z[i];
		
		file = elmnt.getAttribute("include-html-file");
		
		if(file){
			
			xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function(){
				
				if(this.readyState == 4){
					
					
					if(this.status == 200){elmnt.innerHTML = this.responsetext;}
					if(this.status == 404){elmnt.innerHTML = "page not found";}
					
					elmnt.removeAttribute("include-html-file");
					includeHTML();
				}
			}
		
		xhttp.open("GET",file,true);
		xhttp.send();
		
		return;	
		}	
	}
}

includeHTML();