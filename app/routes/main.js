const express = require("express"),
    router    = express.Router(),
    books     = require("./../controllers/libros"),
    morgan    = require("morgan")

// Middleware para mostrar las peticiones de la app
router.use(morgan("dev"))

/*-------------------------------------------------------------------------|
|  Rutas de la aplicación                                                  |
|-------------------------------------------------------------------------*/

router.get("/", (req, res) => { res.redirect("/books/list") });

router.get("/books/list", books.getAll);

router.get("/books/new", books.newBook);

router.get('/books/download/:id', books.downloadFile)

router.post('/books/save', books.uploadFile)

module.exports = router
