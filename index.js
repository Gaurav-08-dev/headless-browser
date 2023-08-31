import express from "express";
import fetchFromURL from "./fetchModule.js";
const app = express();
const port = 4000; // You can change this to any port you prefer

// Define a route
// app.get('/', async (req, res) => {
//     res.send('pass the url');
// });

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
