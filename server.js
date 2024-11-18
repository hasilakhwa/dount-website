const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); // Serve static files like HTML, CSS

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/repliesDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a Schema for Replies
const replySchema = new mongoose.Schema({
  message: String,
  reply: String,
});
const Reply = mongoose.model("Reply", replySchema);

// Serve Message Page
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// Handle Reply Submission
app.post("/submit-reply", (req, res) => {
  const newReply = new Reply({
    message: "Tum mujhe bohot yaad aa rahe ho!", // Static message (customize kar sakte ho)
    reply: req.body.reply,
  });

  newReply.save((err) => {
    if (err) {
      console.log(err);
    } else {
      res.send("<h1>Reply Saved Successfully!</h1><a href='/'>Go Back</a>");
    }
  });
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
