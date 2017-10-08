console.log("Test");

let split = window.location.toString().split('/');
let mySplit = [];
let shouldAdd = false;

for(let i = 0; i < split.length; i++){
    if(split[i] !== ''){
        if(split[i] === "github.com"){
            shouldAdd = true;
            continue;
        }

        if(shouldAdd){
            if(mySplit.length < 2){
                mySplit.push(split[i]);
            }
        }
    }
}

if(mySplit.length === 2){
    fetch('https://api.github.com/repos/' + mySplit[0] + '/' + mySplit[1] + '/contents/', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    }).then((response) => response.json())
        .then((responseJson) => {
            console.dir(responseJson)
        })
        .catch((error) => {
            alert("Internal Error" + JSON.stringify(error));
        });
}

fetch('https://raw.githubusercontent.com/Avery246813579/Commservus-Website/master/package.json').then((response) => response.text())
    .then((text) => {
        console.dir(text);

        try{
            console.dir(JSON.parse(text));
        }catch(e){
            console.log("NOT JSON");
        }
    })
    .catch((error) => {
        alert("Internal Error" + JSON.stringify(error));
    });


console.dir(mySplit);