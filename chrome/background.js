// let url = "";
// chrome.tabs.onUpdated.addListener(function () {
//     alert(chrome.tabs.location);
//     if (url !== window.location) {
//         alert('updated from background');
//         url = window.location;
//     }
// });

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    // if (tab.url.includes("github.com") && typeof changeInfo !== "undefined" && tab.status === "complete" && typeof changeInfo.url === "undefined") {
    //     alert(tab.url + " " + tab.status);
    // }

    // alert(changeInfo.status);
    if (typeof changeInfo.url !== "undefined" && changeInfo.url.includes("github.com")) {
        // alert(changeInfo.state + " " + tab.url.state);

        if (getSplit(changeInfo.url).length === 2) {
            chrome.tabs.executeScript({
                file: "test.js"
            });
        }
    }

    if (typeof changeInfo.url !== "undefined" && url.state === "complete" && changeInfo.url.includes("github.com")) {
        alert(changeInfo.state + " " + tab.url.state);

        // chrome.tabs.executeScript({
        //     file: "test.js"
        // });
    }
});

function getSplit(url) {
    let split = url.toString().split('/');
    let mySplit = [];
    let shouldAdd = false;

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

    return mySplit;
}

// chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
//     alert("I")
// });
