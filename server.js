const express = require("express");
const app = express();

const routes = require("./routes/videos")

app.use("/videos", routes)

app.listen(8080, () => {
  console.log("server test");
});
