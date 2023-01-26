import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";

/* Imports for popuating mongodb */
// import User from "./models/User.js";
// import Post from "./models/Post.js";
// import { users, posts } from "./data/index.js";

/* EXPRESS CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
// app.use("/assets", express.static(path.join(__dirname, "public/assets")));
import fs from "fs";
app.get("/assets/:file", (req, res) => {
  const filePath = path.join(__dirname, "public/assets", req.params.file);

  fs.readFile(filePath, (err, data) => {
      if (err) {
          res.status(404).send("File not found.");
      } else {
          const base64 = Buffer.from(data).toString("base64");
          res.send(base64);
      }
  });
});

/* SWAGGER */
// TODO: Implement swagger
// import swaggerAutogen from "swagger-autogen";
// const outputFile = "./swagger.json";
// const endpointsFiles = ["./controllers/auth.js", "./routes/auth.js"];
// swaggerAutogen(outputFile, endpointsFiles);

// import swaggerUi from "swagger-ui-express";
// import swaggerDocument from "./swagger.json";
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/* FILE STORAGE  */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

/* ROUTES WITH FILES */
app.post("/auth/register", upload.single("picture"), register); // middleware happens before register endpoint aka controller
app.post("/posts", verifyToken, upload.single("picture"), createPost);

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.get("/", async (req, res, next) => {
  res.status(200).send("Hello World! I am healthyyy");
});

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 3001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* ADD DATA ONE TIME */
    // User.insertMany(users);
    // Post.insertMany(posts);
  })
  .catch((error) => console.log(`${error} did not connect`));

/* LAMBDA Configuations */
import sls from "serverless-http";
export const server = sls(app);
// const sls = require('serverless-http')
// module.exports.server = sls(app)
