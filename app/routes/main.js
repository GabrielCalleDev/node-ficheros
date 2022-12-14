const express          = require("express"),
      router           = express.Router(),
      librosController = require("./../controllers/libros"),
      books            = require("./../controllers/libros"),
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

router.post('/books/save-fs', books.uploadFileFs)

router.post('/books/save-db', uploadPdfFile, async (req, res) => {
    try {
        if(!req.file) res.render("error",{ mensaje:"No has seleccionado ningún fichero" })

        await librosController.newBookDb(req)
        res.redirect('/')
        
    } catch (error) {
        res.render("error",{ mensaje: err })
    }
})

router.get('/books/download/:id', (req, res) => {
    console.log(req.params)
    res.send(req.params)
})

module.exports = router
