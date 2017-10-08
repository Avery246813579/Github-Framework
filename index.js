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

console.dir(mySplit);