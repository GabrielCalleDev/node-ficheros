const mongoose = require("mongoose"),
      Schema   = mongoose.Schema
    
const LibroSchema = new Schema({
    nombre      : { type:String, required:false },
    descripcion : { type:String, required:false },
    editorial   : { type:String, required:false },
    originalName: { type:String, required:false },
    file        : { type:Buffer, required:false }
})

LibroSchema.set('timestamps', true)

module.exports = mongoose.model("Libro", LibroSchema)