const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

router.use(express.json());


const getVideos = () => {
  const videos = fs.readFileSync("./data/videos.json");
  return JSON.parse(videos);
};

const saveVideos = (videos) => {
  fs.writeFileSync("./data/videos.json", JSON.stringify(videos));
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
  const individualVideo = getVideos().find((video) => video.id === req.params.id);

  if (!individualVideo) {
    res.status(404).json({
      message: "Team not found",
    });
    return;
  }

  res.status(200).json(individualVideo);
});

router.post("/:id/comments", (req, res) => {
  let videos = getVideos();
  const currentDate = new Date();

  let newVideo = videos.find((video) => video.id === req.params.id);
  // id: uuidv4(),
    newVideo.comments.push({
    id: uuidv4(),
    name: req.body.name,
    comment: req.body.comment,
    likes: 0,
    timestamp: currentDate.getTime(),
  });

  let newVideoList = (videos.map((video)=>{
    if(video.id === req.params.id){
      
      return newVideo
    }
  
    return video
  }))
  saveVideos(newVideoList);
  res.status(200).json(newVideoList);
});

router.delete("/:id/comments/:commentId", (req, res) => {
  let videos = getVideos();
  let newVideos = videos.map((video) => {
    let newComments = video.comments.filter((comment) => {
      if (comment.id !== req.params.commentId) {
        return comment;
      }
    });
    video.comments = newComments;
    return video;
  });
  console.log(newVideos);
  saveVideos(newVideos);
  res.status(200).json(newVideos);
});

module.exports = router;
