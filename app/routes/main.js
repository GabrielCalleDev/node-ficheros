const express          = require("express"),
      router           = express.Router(),
      librosController = require("./../controllers/libros"),
      {uploadFile}     = require("./../controllers/libros"),
      morgan           = require("morgan")

// Middleware para mostrar las peticiones de la app
router.use(morgan("dev"))

/*
|--------------------------------------------------------------------------|
|  Rutas de la aplicación                                                  |
|--------------------------------------------------------------------------|
*/

router.get("/", (req, res) => {
    res.redirect("/books/list")
});

router.get("/books/list", async (req, res) => {
    const libros = await librosController.getAll()
    res.render("book-list", { libros: libros })
});

router.get("/books/new", (req, res) => {
    res.render("book-new")
});

router.post('/books/save-fs', uploadFile().single('archivo'), async (req, res) => {
    const libro = await librosController.newBookFs(req)
    if(libro) res.redirect('/')
    else res.render("error",{ mensaje:"No se ha subido ningún fichero" })
})

router.post('/books/save-db', uploadFile().single('archivo'), async (req, res) => {
    const libro = await librosController.newBookDb(req)
    if(libro) res.redirect('/')
    else res.render("error",{ mensaje:"No se ha subido ningún fichero" })
})

module.exports = router