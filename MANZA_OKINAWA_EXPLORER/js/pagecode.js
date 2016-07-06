var prmStr = window.location.search;	
var pagecode = -1;
var sid = -1;
if(prmStr != ""){
	prmStr = prmStr.substring(1);			
	var prmArr = prmStr.split("&");
	for(var i=0; i < prmArr.length; i++){			
		var prmKey = prmArr[i].split("=")[0];				
		switch(prmKey){
			case "pagecode":
				pagecode = prmArr[i].split("=")[1];
				break;
			case "sid":
				sid = prmArr[i].split("=")[1];
				break;
		}								
	}
}	

var paramStr = "?encrypted=0";		
if(pagecode != -1){
	paramStr = paramStr + '&pagecode=' + pagecode;		
}
if(sid != -1){
	paramStr = paramStr + '&sid=' + sid;	
}

function preOpenMain(){
	if(pagecode != -1 && sid != -1){
		WindowOpenMain(1000,670,'_blank',{'resizable':'yes','pagecode':pagecode,'sid':sid});
	}else if(pagecode == -1 && sid != -1){
		WindowOpenMain(1000,670,'_blank',{'resizable':'yes','sid':sid});
	}else if(pagecode != -1 && sid == -1){
		WindowOpenMain(1000,670,'_blank',{'resizable':'yes','pagecode':pagecode});
	}else{
		WindowOpenMain(1000,670,'_blank',{'resizable':'yes'});
	}	
}
