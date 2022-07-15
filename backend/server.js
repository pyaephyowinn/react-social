import express from "express";
import "dotenv/config";
import path, { dirname } from "path"

import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";

import { fileURLToPath } from 'url';


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectDB();

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

// Serve frontend

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    )
  );
} else {
  app.get('/', (req, res) => res.send('Please set to production'));
}

app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
