const express = require("express");
const router = express.Router();
const fs = require("fs");

const getVideos = () => {
  const videos = fs.readFileSync("./data/videos.json");
  return JSON.parse(videos);
};

router.get("/", (req, res) => {
  let formattedVideos = getVideos().map((video) => {
    return {
      id: video.id,
      title: video.title,
      channel: video.channel,
      image: video.image,
    };
  });
  res.status(200).json(formattedVideos);
});

router.get("/:id", (req, res) => {
  const individualVideo = getVideos().find(video => video.id === req.params.id);

    if (!individualVideo) {
        res.status(404).json({
            message: "Team not found"
        })
        return;
    }
    
    res.status(200).json(individualVideo)
});



router.delete("/:id", (req, res) => {
  res.send("test id");
});

module.exports = router;
