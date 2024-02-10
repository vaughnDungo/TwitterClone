import express from "express";

import cors from "cors";
import dotenv from "dotenv";

import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

import authRoutes from "./routes/AuthRoutes.js";
import postsRoutes from "./routes/PostsRoutes.js";
import followersRoutes from "./routes/FollowersRoutes.js";

const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(YAML.load("./docs/openapi.yaml"))
);

app.get("/", (req, res) => {
  res.send("Hello world. The API is up and running");
});
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/posts", postsRoutes);
app.use("/api/v1/users", followersRoutes);

const port = 3000;
app.listen(port, () => {
  console.log(`Application started listening on port ${port}`);
});
