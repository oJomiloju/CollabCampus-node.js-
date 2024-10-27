import express from "express";
import postRoutes from "./routes/posts.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";

const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());
app.use(cookieParser());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });
app.post('/api/upload',upload.single('file'),function(req,res){
    const file = req.file;
    res.status(200).json(file.filename);
})



// Use CORS to allow requests from the frontend (localhost:5173)
app.use(
  cors({
    origin: "http://localhost:5173", // Allow only this origin
    methods: ["GET", "POST", "PUT", "DELETE"], 
    credentials: true, // If you need to send cookies or headers with credentials
  })
);


// Route handling
app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Test route
app.get("/test", (req, res) => {
  res.json("Hello, this is the backend");
});

// Listen on port 8800
app.listen(8800, () => {
  console.log("Connected to backend");
});
