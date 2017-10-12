let split = window.location.toString().split('/');
let mySplit = [];
let shouldAdd = false;

console.log(dog);

for (let i = 0; i < split.length; i++) {
    if (split[i] !== '') {
        if (split[i] === "github.com") {
            shouldAdd = true;
            continue;
        }

        if (shouldAdd) {
            mySplit.push(split[i]);
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

if (mySplit.length >= 2) {
    fetch('https://api.github.com/repos/' + mySplit[0] + '/' + mySplit[1] + '/contents/', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    }).then(function (response) {
        response.json().then((responseJson) => {
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
    })
        .catch((error) => {
            alert("Internal Error" + JSON.stringify(error));
        });
}

let dwork;

function doStuff(framework) {
    console.log("FRAMEWORK IS: " + framework['FRAME']);
    dwork = framework;

    let number_summary = document.getElementById('topics-list-container');

    if (typeof number_summary === "undefined" || number_summary === null) {
        return false;
    }

    let group = number_summary.getElementsByClassName('list-topics-container');


    if (group.length < 1) {
        number_summary.innerHTML = "";
        number_summary.innerHTML += '<div class="list-topics-container f6 mt-1">';
        number_summary.innerHTML += '<a href="/search?q=topic%3Apython3&amp;type=Repositories" style="background-color: aquamarine" class="topic-tag topic-tag-link" data-ga-click="Topic, repository page" data-octo-click="topic_click" data-octo-dimensions="topic:python3">' + framework['FRAME'] + '</a>' + number_summary.innerHTML;
        number_summary.innerHTML += '<button type="button" class="btn-link f6 lh-condensed js-repo-topics-form-toggle js-details-target" aria-expanded="false">Add topics</button></div>';
    } else {
        group[0].innerHTML = '<a href="/search?q=topic%3Apython3&amp;type=Repositories" class="topic-tag topic-tag-link" data-ga-click="Topic, repository page" data-octo-click="topic_click" data-octo-dimensions="topic:python3">' + framework['FRAME'] + '</a>' + group[0].innerHTML;
    }


    console.log("DOG");
    console.dir(number_summary);

    return true;
}

// store url on load
let currentPage = window.location.href;

// listen for changes
// setInterval(function () {
//     if (currentPage !== window.location.href) {
//         // page has changed, set new page as 'current'
//         currentPage = window.location.href;
//
//         // do your thing..
//         console.log("HERE" + dwork);
//         setTimeout(function () {
//             doStuff(dwork);
//         }, 100)
//     }
// }, 500);
