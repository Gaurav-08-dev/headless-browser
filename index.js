import express from "express";
import fetchFromURL from "./fetchModule.js";
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
        console.log(result)
        res.send(result);
    } catch (error) {
        console.log(error)
    }
  });

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});



