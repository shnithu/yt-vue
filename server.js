const express = require("express");
const app = express();
const cors = require('cors')
const port = 3000
const ytdl = require("ytdl-core");

app.use(cors())
app.get('/', (req, res) => {
    res.send('Hello YT!')
})

app.get("/video/:vid", async(req, res) => {
    const info = await ytdl.getInfo(req.params.vid);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.json(info)
});


app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})