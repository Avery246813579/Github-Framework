chrome.tabs.onUpdated.addListener(
    function(tabId, changeInfo, tab) {
        window.console.log('updated from contentscript');
    }
);


let split = window.location.toString().split('/');
let mySplit = [];
let shouldAdd = false;

for (let i = 0; i < split.length; i++) {
    if (split[i] !== '') {
        if (split[i] === "github.com") {
            shouldAdd = true;
            continue;
        }

        if (shouldAdd) {
            if (mySplit.length < 2) {
                mySplit.push(split[i]);
            }
        }
    }
}

let frames = {
    "PACKAGE.JSON": [
        {
            FRAME: "React",
            CONTAINS: "react-dom",
            LINK: "https://reactjs.org/"
        },
        {
            FRAME: "React-Native",
            CONTAINS: "react-native",
            LINK: "https://facebook.github.io/react-native/"
        }
    ]
};

if (mySplit.length === 2) {
    fetch('https://api.github.com/repos/' + mySplit[0] + '/' + mySplit[1] + '/contents/', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    }).then((response) => response.json())
        .then((responseJson) => {
            console.dir(responseJson);
            let dFiles = responseJson;

            for (let j = 0; j < dFiles.length; j++) {
                let currentFrame = frames[dFiles[j]['name'].toUpperCase()];
                let breakOut = false;

                if (typeof currentFrame !== "undefined") {
                    fetch(dFiles[j]['download_url']).then((response) => response.text())
                        .then((text) => {
                            for (let key of currentFrame) {
                                if (text.includes(key['CONTAINS'])) {
                                    doStuff(key);
                                    breakOut = true;
                                    break;
                                }
                            }

                            try {
                                console.dir(JSON.parse(text));
                            } catch (e) {
                                console.log("NOT JSON");
                            }
                        })
                        .catch((error) => {
                            alert("Internal Error" + JSON.stringify(error));
                        });
                }

                if (breakOut) {
                    break;
                }
            }
        })
        .catch((error) => {
            alert("Internal Error" + JSON.stringify(error));
        });
}

function doStuff(framework){
    console.log("FRAMEWORK IS: " + framework['FRAME']);

    let number_summary = document.getElementsByClassName('numbers-summary');

    if(typeof number_summary !== "undefined"){
        number_summary[0].innerHTML += "<li style='min-width: 200px; !important;'> <a data-pjax=\"\" style='min-width: 200px !important;' href=\"" + framework["LINK"] + "\"> <svg aria-hidden=\"true\" class=\"octicon octicon-file\" height=\"16\" version=\"1.1\" viewBox=\"0 0 14 16\" width=\"14\"><path fill-rule=\"evenodd\" d=\"M6 5H2V4h4v1zM2 8h7V7H2v1zm0 2h7V9H2v1zm0 2h7v-1H2v1zm10-7.5V14c0 .55-.45 1-1 1H1c-.55 0-1-.45-1-1V2c0-.55.45-1 1-1h7.5L12 4.5zM11 5L8 2H1v12h10V5z\"></path></svg> Framework: <span class=\"num text-emphasized\"> " + framework["FRAME"] + "</span> </a> </li>"
        // console.dir(number_summary[0].children)
        // number_summary[0].children.push(create("<li class=\"commits\">\n" +
        //     "     <a data-pjax=\"\" href=\"https://facebook.github.io/react-native/\">\n" +
        //     "     <svg aria-hidden=\"true\" class=\"octicon octicon-file\" height=\"16\" version=\"1.1\" viewBox=\"0 0 14 16\" width=\"14\"><path fill-rule=\"evenodd\" d=\"M8 13H6V6h5v2H8v5zM7 1C4.81 1 2.87 2.02 1.59 3.59L0 2v4h4L2.5 4.5C3.55 3.17 5.17 2.3 7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-.34.03-.67.09-1H.08C.03 7.33 0 7.66 0 8c0 3.86 3.14 7 7 7s7-3.14 7-7-3.14-7-7-7z\"></path></svg>\n" +
        //     "     Framework: <span class=\"num text-emphasized\">React</span></a>\n" +
        //     "     </li>"))
        // number_summary[0].appendChild(number_summary[0][2]);
    }

    console.log("DOG");
    console.dir(number_summary);
}