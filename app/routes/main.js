const express          = require("express"),
      router           = express.Router(),
      librosController = require("./../controllers/libros"),
      Upload           = require("./../controllers/upload"),
      morgan           = require("morgan"),
      path             = require("path")

/*-------------------------------------------------------------------------|
|  Configuración subir archivos                                            |
|-------------------------------------------------------------------------*/
const uploadFolder  = path.join(__dirname,"../public/uploads")
const uploadPdfFile = new Upload('archivo', uploadFolder, 'application/pdf')

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

router.post('/books/save-fs', uploadPdfFile, async (req, res) => {
    const libro = await librosController.newBookFs(req)
    if(libro) res.redirect('/')
    else res.render("error",{ mensaje:"No se ha subido ningún fichero" })
})

router.post('/books/save-db', uploadPdfFile, async (req, res) => {
    const libro = await librosController.newBookDb(req)
    if(libro) res.redirect('/')
    else res.render("error",{ mensaje:"No se ha subido ningún fichero" })
})

router.get('/books/download/:id', (req, res) => {
    console.log(req.params)
    res.send(req.params)
})

module.exports = router