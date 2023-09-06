import express from "express";
import fetchFromURL from "./fetchModule.js";
import axios from 'axios';
import jsdom from "jsdom";
const { JSDOM } = jsdom;
const app = express();
const port = 4000; // You can change this to any port you prefer

 // Define a route
// app.get('/', async (req, res) => {
//     try {
//         const result = await fetchFromURL('https://mathup.com/games/crossbit');
//         console.log(result)
        // console.log(JSON.parse(result))
        // res.send(JSON.parse(result));
//         res.send(result)
//     } catch (error) {
//         console.log(error)
//     }
// });
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.get('/fetch-url/:scrapUrl', async(req, res) => {
    const urlData = req.params.scrapUrl;
    // Process the userId and send a response
    try {
        const result = await fetchFromURL(urlData);
        const sanitizedContent = result.web.replace(/&(?!#?\w+;)/g, '&amp;');
        const dom = new JSDOM(result.web);
        const document = dom.window.document;
        const scriptTag = document.getElementsByTagName('script');
        // console.log(document)
        // console.log(scriptTag, "test")
        const scriptdata = [];
        for (let i = 0; i < scriptTag.length; i++) {
            const url = scriptTag[i].src; // Replace with the actual URL of the JS file you want to download
            if (url.includes('https')) {
            const response = await axios.get(url);

            // Set appropriate headers to indicate that this is a JavaScript file
            res.setHeader('Content-Type', 'application/javascript');
            scriptdata.push(response.data);
            
            }
        }
        res.send(scriptdata);
        // res.send(result);
    } catch (error) {
        console.log(error)
    }
  });

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});



