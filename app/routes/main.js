const express          = require("express"),
      router           = express.Router(),
      librosController = require("./../controllers/libros"),
      morgan           = require("morgan"),
      {uploadFile}     = require("./../controllers/libros")


// Middleware para mostrar las peticiones de la app
router.use(morgan("dev"))

/*
|--------------------------------------------------------------------------|
|  Rutas de la aplicación                                                  |
|--------------------------------------------------------------------------|
*/

router.get("/", (req, res) => {
    res.render("book-list")
});

router.get("/book-new", (req, res) => {
    res.render("book-new")
});

router.post('/subir-un-libro', uploadFile().single('archivo'), function (req, res) {
    librosController.subirLibroFs(req)
    res.redirect('/')
})

module.exports = router;