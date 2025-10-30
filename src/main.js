import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { engine } from "express-handlebars";
import path from "path";
import { STATUS_CODES } from "#@/_shared/enums/httpStatusCodes.js";
import connectDB from "#@/databases/connect-mongo.js";
import apiRoutes from "#@/routes/api/index.js";
import pageRoutes from "#@/routes/pages/index.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Set up Handlebars view engine
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "main",
    layoutsDir: path.join(process.cwd(), "src", "views", "layouts"),
    helpers: {
      eq: (a, b) => a === b,
    },
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(process.cwd(), "src", "views"));

// Load environment variables

// CORS middleware
app.use(cors());

// Parse JSON bodies (like request.body)
app.use(express.json());

// Parse URL-encoded bodies (like form data)
app.use(express.urlencoded({ extended: true }));

// Serve static files from the public folder
app.use(express.static("public"));

// Prevent caching of API responses
app.use("/api", (req, res, next) => {
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
  res.set("Pragma", "no-cache");
  res.set("Expires", "0");
  next();
});

// Custom middleware
app.use((req, _, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Load API Routes
app.use("/api", apiRoutes);

// Load Page Routes
app.use("/", pageRoutes);

app.use((err, req, res, next) => {
  res.status(STATUS_CODES.SERVER_ERROR).json({
    success: false,
    error: err.name || "Server Error",
    message: err.message || "Something went wrong!",
  });
});

async function startServer() {
  try {
    await connectDB();

    const server = app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });

    // Handle graceful shutdown on CTRL+C
    process.on("SIGINT", () => {
      console.log("\n🛑 Shutting down server...");
      server.close(() => {
        console.log("✅ Server closed successfully");
        process.exit(0);
      });
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

startServer();
