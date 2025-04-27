const express = require("express");
const session = require("express-session");
const catchError = require("./lib/catch-error");
const MongoStore = require("connect-mongo");
const MongoPersistence = require("./lib/mongo_persistence");

const buildingsRouter = require("./routes/buildings");
const vehiclesRouter = require("./routes/vehicles");

const app = express();
const port = 3000;
const host = "localhost";

app.set("views", "./views"); // tells the app what file path to find the views in
app.set("view engine", "pug"); // tells the app to use pug as the view engine

// Middleware and session setup
app.use(express.urlencoded({ extended: false }));
app.use(session({
  name: "logistics-sessions-id",
  secret: "changethistosomethingsecure",
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: "mongodb://localhost:27017/company",
    collectionName: "sessions"
  }),
  cookie: {
    httpOnly: true,
    path: "/",
    secure: false,
    maxAge: 1 * 1 * 10 * 60 * 1000 // session duration of 10 minutes in milliseconds (days, hours, minutes, seconds, milliseconds)
  }
}));

// // Test middleware to ensure client is sending back session cookie (this can be deleted if clogging console output)
// app.use((req, res, next) => {
//   console.log("Session ID:", req.sessionID);
//   next();
// });

// Middleware to create a new datastore (attach session-specific persistence layer)
app.use((req, res, next) => {
  if (req.session) {
    res.locals.db = new MongoPersistence(req.sessionID);
  }
  next();
});

// Test route to trigger an error
app.get("/test-error", catchError(async (req, res) => {
  throw new Error("This is a test error!");
}));

// Redirect root to home page
app.get("/", (req, res) => {
  res.redirect("/home");
});

// Render home page
app.get("/home", catchError (async (req, res) => {
  const buildings = await res.locals.db.getAllBuildings();
  const vehicles = await res.locals.db.getAllVehicles();
  
  res.render("home", {
    buildings,
    vehicles,
  });
}));

// Use modular routers
app.use("/home/buildings", buildingsRouter);
app.use("/home/vehicles", vehiclesRouter);

// Generic global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Listener
app.listen(port, host, () => {
  console.log(`The app is listening on port ${port} of ${host}!`);
});