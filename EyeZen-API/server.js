const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const helmet = require("helmet");

const app = express();
const port = process.env.PORT || 5000;

// Middleware

// Cross-Domain Misconfiguration (CORS) fix
const allowedOrigins = ["https://eyezen.vercel.app", "http://localhost:3000"];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Enable passing cookies and other credentials
  optionsSuccessStatus: 200, // Default status for successful OPTIONS requests
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Content Security Policy (CSP) fix
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],  // Restricts everything to same-origin
    scriptSrc: ["'self'", "https://trusted-scripts-source.com"],  // Trusted scripts sources
    styleSrc: ["'self'", "https://trusted-styles-source.com"],  // Trusted style sources
    imgSrc: ["'self'", "data:", "https://trusted-images.com"],  // Images from self or data URIs
    fontSrc: ["'self'", "https://trusted-fonts-source.com"],  // Trusted fonts sources
    connectSrc: ["'self'", "https://api.yourdomain.com"],  // Where your app can fetch data from
    frameSrc: ["'none'"],  // Prevent framing by other sites
    objectSrc: ["'none'"],  // Disallow objects and plugins
    baseUri: ["'self'"],  // Prevent base tag hijacking
    upgradeInsecureRequests: [],  // Automatically upgrade http requests to https
  },
}));

// Missing Anti-clickjacking Header (X-Frame-Options) fix
app.use(helmet.frameguard({ action: "deny" }));

// Server Leaks Version Information via “Server” HTTP Response Header Field fix
app.use(helmet.hidePoweredBy());

// Strict-Transport-Security Header (HSTS) fix
app.use(helmet.hsts({
  maxAge: 63072000,  // 2 years
  includeSubDomains: true,
  preload: true,
}));

// X-Content-Type-Options Header fix
app.use(helmet.noSniff());  // Fix for X-Content-Type-Options header

// Timestamp Disclosure fix (ETag and Last-Modified headers)
app.disable('etag');  // Disable ETag
app.use((req, res, next) => {
  res.removeHeader("Last-Modified");  // Remove Last-Modified header
  next();
});

// Database Connection
const connectDB = require("./config/db");
connectDB();

// Routes
const userRoutes = require("./routes/userRoutes");
const treatmentRoutes = require("./routes/treatmentRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const videoTutorialRoutes = require("./routes/videoTutorialRoutes");
const sightedTestRoutes = require("./routes/sightedTestRoutes");
const infantQuizRouter = require("./routes/infantQuiz");
const wordRoutes = require("./routes/wordRoutes");
const infantFactRouter = require("./routes/infantFact");
const mainQuizRoute = require("./routes/mainQuiz/MainQuizRoute");
const visionGame = require("./routes/game/visionGameRoute");

const base = "/api/v1";

app.use("/api/treatments", treatmentRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/videoTutorial", videoTutorialRoutes);
app.use("/api/word", wordRoutes);

// Routes
app.use(`${base}/sighted`, sightedTestRoutes);
app.use("/api/infantQuiz", infantQuizRouter);
app.use("/api/word", wordRoutes);

// Infant Eye Care Facts routes
app.use("/api/infantFact", infantFactRouter);

// Quiz
app.use(`/api/mainQuiz`, mainQuizRoute);
// Game
app.use("/api/game", visionGame);

// User
app.use("/api/auth", require("./routes/authRoutes"));

// Error Middleware
const { notFound, errorHandler } = require("./Middlewares/errorMiddleware");
app.use(notFound);
app.use(errorHandler);

// Start the Server
const server = app.listen(port, () =>
  console.log(`Server running on port ${port} 🔥`)
);
