const port = 3000,
  express  = require("express"),
  mongoose = require('mongoose'),
  app      = express(),
  server   = require("http").createServer(app),
  path     = require("path")

// Server starting at port 3000
server.listen(port, (err, res) => {
  if (err) console.log(`ERROR: Connecting APP ${err}`)
  else console.log(`Server is running on port ${port}`)
});

// Connection to MongoDB
mongoose.connect(
  `mongodb://root:pass12345@mongodb:27017/ficheros?authSource=admin`,
  { useCreateIndex: true, useUnifiedTopology: true, useNewUrlParser: true },
  (err) => {
    if (err) console.log(`ERROR: connecting to Database.  ${err}`)
    else console.log(`Database Online`)
  }
);

// view engine setup and other configurations
app.set("views", path.join(__dirname,"views"))
app.set("view engine", "pug")
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))

// Import routes of our app
const routes = require("./routes/main")
// mount the routes on the app
app.use("/", routes)

// Page not found
app.use((req, res) => {
  res.status(404).render("404")
})

module.exports = app
