if(typeof dwork !== "undefined"){
    tryResponse();
}

function tryResponse(){
    if(!doStuff(dwork)){
        setTimeout(function(){
            tryResponse();
        }, 100);
    }
}