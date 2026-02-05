const express = require("express");
const app = express();
const path = require("path");

// Serve public folder (CSS & JS)
app.use(express.static(path.join(__dirname, "public")));

// Serve main page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// Start server
app.listen(3000, () => {
  console.log("Masjidul Hasanath website is running on http://localhost:3000");
});
