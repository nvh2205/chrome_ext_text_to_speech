// const api = 'https://tts-app.site/main/v1'
const api = `http://localhost:3030/main/v1`
//when istall chrome 
chrome.runtime.onInstalled.addListener(async () => {
    const res = await getFetch("premium/1");
    chrome.storage.local.set({ charPerReq: res.charPerRequest, titlePremium: res.titlePremium });
})

//Inject foreground
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (tab.url?.startsWith("chrome://")) return undefined;
    if (changeInfo.status === 'complete' && tab.active) {
        chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                files: ['./foreground.bundle.js']
            })
                .then(() => {
                    console.log("INJECTED THE FOREGROUND SCRIPT.");
                })
                .catch(err => console.log(err));
        });
    }
});

//Get storage
const getStorage = async () => {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get(["token", "charPerReq", "charPerMonth", "userName", "avatarUrl"], function (value) {
            resolve(value);
        });
    });
}

//http method get
async function getFetch(endPoint) {
    const storage = await getStorage();
    const token = storage ? storage["token"] : null;

    const response = await fetch(`${api}/${endPoint}`, {
        method: "GET",
        headers: token ? {
            "Content-Type": "application/json",
            "Authorization": `bearer ${token}`,
        } : {
            "Content-Type": "application/json",
        },
    });
    return response.json();
}

//http method post
async function postFetch(endPoint, data) {
    const storage = await getStorage();
    const token = storage ? storage["token"] : null;
    const response = await fetch(`${api}/${endPoint}`, {
        method: "POST",
        headers: token ? {
            "Content-Type": "application/json",
            "Authorization": `bearer ${token}`,
        } : {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return response.json();
}

//Call api
// chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
//     const result = await getStorage();
//     const { event, data } = request;
//     switch (event) {
//         case 'audio':
//             let endPoint = result["token"] ? 'audio/login-audio' : 'audio/not-login-audio'
//             let res = await postFetch(endPoint, data);
//             sendResponse(res);
//     }
// })

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.event === 'audio') {
        const { data } = request;
        getStorage().then((result) => {
            let endPoint = result["token"] ? 'audio/login-audio' : 'audio/not-login-audio'
            let userCode = result["userCode"] ? result["userCode"] : null;
            data.userCode = userCode;
            postFetch(endPoint, data).then((response) => {
                sendResponse(response);
            })
        })
    } else if (request.event === 'info') {
        //Get storage info user
        getStorage().then((result) => {
            const { fullName, avtarUrl } = result;
            const dataInfo = { fullName, avtarUrl };
            sendResponse(dataInfo);
        })
    }
    return true;
});