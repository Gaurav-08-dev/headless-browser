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
        Runtime
    } = protocol;


    await Promise.all([Page.enable(), Runtime.enable(), DOM.enable()]);

    Page.navigate({
        url: customUrl ? customUrl : ' https://developer.chrome.com/blog/headless-chrome/'
    });

    const resultPromise = new Promise(resolve => {
        setTimeout(() => Page.loadEventFired(async () => {
            const script1 = "document.querySelector('*').innerHTML"

            const result = await Runtime.evaluate({
                expression: script1
            });

            protocol.close();
            chrome.kill();
            resolve(result.result.value)

        }
        ), 2000)
    })

    return resultPromise

};

export default fetchFromURL



