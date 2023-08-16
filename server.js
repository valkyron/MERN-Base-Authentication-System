const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const colors = require("colors");
const connectDb = require("./config/connectDb");
const deserializeUser = require("./middlewares/deserializeUser");
const mongoose = require("mongoose"); // Import mongoose
const crypto = require('crypto');

// const cookieParser = require("cookie-parser");

//config dot env file
dotenv.config()

//database call
connectDb();

//rest object
const app = express();

const multer = require('multer');
const upload = multer();
// const GridFsStorage = require('multer-gridfs-storage'); 
// const Grid = require('gridfs-stream'); 
// const methodOverride = require('method-override');
// const bodyParser = require('body-parser');

// //middleware
// app.use(bodyParser.json);
// app.use(methodOverride('_method'));

// Create a GridFS instance
let gfs;
const db = mongoose.connection;
db.once("open", () => {
  gfs = new mongoose.mongo.GridFSBucket(db.db, {
    bucketName: "uploads", // Collection name for file uploads
  });
});

//middlewares
app.use(cors());
app.use(express.json());
app.use(cors());
app.use(deserializeUser);

//routes
app.use('/api/v1/users', require('./routes/userRoute'))
app.use('/api/v1/proposals', require('./routes/proposalRoute'))

// app.use('/api/v1', createProxyMiddleware({
//   target: 'https://localhost:8080',
//   changeOrigin: true,
//   agent,
//   pathRewrite: {
//       [`^/api/v1`]: '',
//   },
//   router: {
//       // add your route and the corresponding target here
//   }
// }, require('./routes/userRoute')));

//port
const PORT = 8080 || process.env.PORT;

//listen server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.post("/upload", upload.single('newFile'), (req, res) => {
  console.log(req.body);
  const fileType = req.body.fileType;
  const userID = req.body.userID;

  // Create a write stream to upload the file
  const filename = crypto.randomBytes(16).toString("hex") + ".pdf";
  const writeStream = gfs.openUploadStream(filename, {
    contentType: req.get("content-type"),
    metadata: {
      fileType: fileType,
      userID: userID,
    },
  });

  // Pipe the file data to the write stream
  req.pipe(writeStream);

  writeStream.on("finish", () => {
    console.log("File uploaded");
    return res.status(200).json({ result: true, msg: "file uploaded" });
  });

  writeStream.on("error", (err) => {
    console.error("Error uploading file:", err);
    return res.status(500).json({ result: false, msg: "file upload failed" });
  });

  // setTimeout(() => {
  //   console.log("File uploaded")
  //   return res.status(200).json({result: true, msg:'file uploaded'})
  // }, 3000)
})

// app.delete("/upload/:userId/:fileType/:fileId", (req, res) => {
//   const userId = req.params.userId;
//   const fileType = req.params.fileType;
//   const fileId = new mongoose.Types.ObjectId(req.params.fileId);

//   // You should implement logic to check if the userId is valid
//   // For simplicity, I'm assuming you have a User model and you're checking if the user exists
//   User.findById(userId, (err, user) => {
//     if (err || !user) {
//       return res.status(404).json({ result: false, msg: "User not found" });
//     }

//     // Delete the file from GridFS based on fileType and _id
//     gfs.delete({ _id: fileId, "metadata.fileType": fileType }, (err) => {
//       if (err) {
//         console.error("Error deleting file:", err);
//         return res.status(500).json({ result: false, msg: "file deletion failed" });
//       }
//       console.log("File deleted");
//       return res.status(200).json({ result: true, msg: "file deleted" });
//     });
//   });
// });


app.delete("/upload", (req, res) => {
  // const fileId = new mongoose.Types.ObjectId(req.params.fileId);
  // console.log(fileId);

  // // Delete the file from GridFS
  // gfs.delete(fileId, (err) => {
  //   if (err) {
  //     console.error("Error deleting file:", err);
  //     return res.status(500).json({ result: false, msg: "file deletion failed" });
  //   }
  //   console.log("File deleted");
  //   return res.status(200).json({ result: true, msg: "file deleted" });
  // });
  console.log(`File deleted`)
  return res.status(200).json({ result: true, msg: 'file deleted' });
});