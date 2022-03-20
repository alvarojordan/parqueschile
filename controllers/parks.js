const Park = require('../dbmodels/park.js')
const { default: mongoose } = require('mongoose')
const ExpressError = require('../utils/ExpressError.js')
const { cloudinary } = require('../cloudinary/index.js')

module.exports.index = async (req,res) => {
    const parks = await Park.find({})
    // convert parks coordinates to geojson format to be expected by mapbox
    const geoJSONdata = {features: parks.map(park => {return {geometry: park.geometry, properties: {id: park._id, title: park.nombre}}})}
    res.render('parks/index.ejs',{parks,geoJSONdata})
}

module.exports.renderNewForm = (req,res) => {
    res.render('parks/new.ejs')
}

module.exports.createPark = async (req,res,next) => {
    const newParkData = req.body.park
    const newPark = new Park(newParkData)
    newPark.images = req.files.map(f => {return { url: f.path, filename: f.filename} })
    newPark.author = req.user._id
    newPark.geometry = {type: 'Point', coordinates: [req.body.longitude,req.body.latitude]}
    await newPark.save()
    req.flash('success','Parque agregado exitosamente')
    res.redirect('/parks/'+newPark._id)
}

module.exports.updatePark = async (req,res) => {
    const id = req.params.id
    const updatedParkData = req.body.park
    const updatedPark = await Park.findByIdAndUpdate(id,updatedParkData,{runValidators: true, new: true})

    // agregar imagenes subidas
    const arrayOfUploadedImages = req.files.map(f => {return { url: f.path, filename: f.filename} })
    updatedPark.images.push(...arrayOfUploadedImages)
    updatedPark.save()

    // eliminar imagenes seleccionadas
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename)
        }
        await updatedPark.updateOne({$pull: {images: {filename: {$in: req.body.deleteImages}}}})
    }

    req.flash('success','Parque actualizado')
    res.redirect('/parks/'+updatedPark._id)

}

module.exports.deletePark = async (req,res) => {
    const id = req.params.id
    const deletedPark = await Park.findByIdAndDelete(id)
    req.flash('success','Parque eliminado')
    res.redirect('/parks')
}

module.exports.showPark = async (req,res,next) => {
    const id = req.params.id
    const isValidId = mongoose.Types.ObjectId.isValid(id)
    if (!isValidId) return next(new ExpressError('404','Pagina no encontrada'))

    const park = await Park.findById(id)
        .populate({
            path: 'reviews',
            populate: {
                path: 'author'
            }
        })
        .populate('author')
    if (!park) next(new ExpressError('404','El parque solicitado ya no esta disponible')) // si el id es valido pero no se encuentra el parque

    res.render('parks/details.ejs',{park})
}

module.exports.renderEditForm = async (req,res,next) => {
    const id = req.params.id

    const isValidId = mongoose.Types.ObjectId.isValid(id)
    if (!isValidId) next(new ExpressError('404','Pagina no encontrada'))

    const park = await Park.findById(id)
    if (!park) next(new ExpressError('404','No se encontró el parque solicitado')) // si el id es valido pero no se encuentra el parque

    res.render('parks/edit.ejs',{park})
}