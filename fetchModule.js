import { launch } from 'chrome-launcher';
import CDP from 'chrome-remote-interface';


async function fetchFromURL(customUrl) {


    async function launchChrome() {
        return await launch({
            chromeFlags: [
                '--disable-gpu',
                '--headless'
            ]
        });
    };
    const chrome = await launchChrome();
    const protocol = await CDP({
        port: chrome.port
    });

    const {
        DOM,
        Page,
        Emulation,
        Runtime,
        Network
    } = protocol;


    await Promise.all([Network.enable(),Page.enable(), Runtime.enable(), DOM.enable()]);

    const apiCalls = [];
    Page.navigate({
        url: customUrl ? customUrl : ' https://developer.chrome.com/blog/headless-chrome/'
    });
    Network.requestWillBeSent(params => {
        apiCalls.push({url:params.request.url, payload:params.request.postData});
    });



    const resultPromise = new Promise(resolve => {
        Page.loadEventFired(async () => {

            const script1 = "document.querySelector('*').innerHTML";
            const script2="JSON.stringify(window.pbjs)"
            // "document.querySelector('*').innerHTML"
            // "JSON.stringify(window.pbjs)"
            const result = await Runtime.evaluate({
                expression: script1
            });

            const adData = await Runtime.evaluate({
                expression: script2
            });


            // await Page.addScriptToEvaluateOnNewDocument({ source: `fetch('http://localhost:4000/prebid.js').then(response => console.log("---->", response.text())).then(eval);` })
            // await Page.waitForSelector('.ad-banner', { timeout: 5000 });

            // console.log("window object", result.result)
            protocol.close();
            chrome.kill();
            // resolve(result.result.value)
            // console.log({apiCalls:apiCalls, ad:adData.result.value, web:result.result.value})
            resolve({apiCalls:apiCalls, ad:adData.result.value, web:result.result.value})

        }
        )
    })

    return resultPromise

};

export default fetchFromURL



