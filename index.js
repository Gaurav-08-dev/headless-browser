import express from "express";
import fetchFromURL from "./fetchModule.js";
const app = express();
const port = 4000; // You can change this to any port you prefer

// Define a route
app.get('/', async (req, res) => {
    try {
        const result = await fetchFromURL('https://mathup.com/games/crossbit');
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
