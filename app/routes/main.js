"use strict"

const express          = require("express"),
      router           = express.Router(),
      librosController = require("./../controllers/libros"),
      morgan           = require("morgan")

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

module.exports = router;