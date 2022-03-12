const express = require("express");
const app = express();
const routes = require("./routes/videos");
const cors = require("cors");

app.use(cors());
app.use(express.static('public'))

app.use("/videos", routes);

app.listen(8080, () => {
  console.log("server test 8080");
});
