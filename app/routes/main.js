const express = require("express"),
    router    = express.Router(),
    books     = require("./../controllers/libros"),
    morgan    = require("morgan")

// Middleware para mostrar las peticiones de las rutas de este archivo
router.use(morgan("dev"))

/*-------------------------------------------------------------------------|
|  Rutas de la aplicación                                                  |
|-------------------------------------------------------------------------*/

router.get("/", (req, res) => { res.redirect("/books/list") });

router.get("/books/new", (req, res) => { res.render("book-new")});

router.get("/books/list", books.getAll);

router.get('/books/download/:id', books.downloadFile)

router.get('/books/delete/:id', books.deleteFile)

router.post('/books/save', books.uploadFile)

module.exports = router
