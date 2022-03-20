// This file only to seed the DB.
// Run this file separately to populate the DB with new documents.

const mongoose = require('mongoose')

const Park = require('./dbmodels/park.js')
const Review = require('./dbmodels/review.js')
const User = require('./dbmodels/user.js')

const dbName = 'urbanParks'
mongoose.connect('mongodb://localhost:27017/' + dbName)
    .then(() => {
        console.log('MongoDB connection successful!')
    })
    .catch(err => {
        console.log('MongoDB connection ERROR')
        console.log(err)
    })

const seedDB = async () => {
    // crear User
    const adminUser = new User({email: 'alvarojordang@gmail.com', username: 'admin'})
    const password = 'telperion'
    await User.deleteMany({})
    await User.register(adminUser, password) // aca se guarda

    const seedParks = [
        {nombre: "Plaza de Armas de Alto Hospicio", region: "Región de Tarapacá", provincia: "Iquique", comuna: "Alto Hospicio", superficie: 5572, images: [{url: 'https://res.cloudinary.com/dpz0sgwyq/image/upload/v1647540512/ParquesChile/BD4A4CB9-FC2D-4642-89EB-2CEE97C7486B_xu7ah8_tqjg5v.jpg', filename: 'BD4A4CB9-FC2D-4642-89EB-2CEE97C7486B_xu7ah8_tqjg5v'}], author: adminUser, geometry: {type: 'Point', coordinates: [-70.101096,-20.2786867]}},
        {nombre: "Plaza de Armas de Taltal", region: "Región de Antofagasta", provincia: "Antofagasta", comuna: "Taltal", superficie: 16842, images: [{url: 'https://res.cloudinary.com/dpz0sgwyq/image/upload/v1647540552/ParquesChile/24232502_728984160645944_2394742412657571981_n_b5vpfh.jpg', filename: '24232502_728984160645944_2394742412657571981_n_b5vpfh'}], author: adminUser, geometry: {type: 'Point', coordinates: [-70.485829,-25.4079221]}},
        {nombre: "Plaza de Armas de Copiapó", region: "Región de Atacama", provincia: "Copiapó", comuna: "Copiapó", superficie: 13657, images: [{url: 'https://res.cloudinary.com/dpz0sgwyq/image/upload/v1647540582/ParquesChile/gfdgifdsnlgdld32ioej290fim3fjin439.jpg', filename: 'gfdgifdsnlgdld32ioej290fim3fjin439'}], author: adminUser, geometry: {type: 'Point', coordinates: [-70.3327638,-27.3668846]}, descripcion: 'La Plaza de Armas de Copiapó o también llamada Plaza Prat, está ubicada en el centro de la ciudad de Copiapó, capital de la Región de Atacama, Chile. Fue fundada en 1774​ como consecuencia del auge económico y el desarrollo urbanístico que la ciudad vivió a comienzos del siglo XIX. Destaca por su Fontana de la Minería, fuente de mármol que desde 1993 tiene la categoría de Monumento Histórico. Esta es una de las únicas plazas del país que mantiene casi intactas sus medidas y ubicación original.'},
        {nombre: "Plaza de Armas de Illapel", region: "Región de Coquimbo", provincia: "Choapa", comuna: "Illapel", superficie: 7075, images: [{url: 'https://res.cloudinary.com/dpz0sgwyq/image/upload/v1647540647/ParquesChile/fi3n394fv3mivm3r9jv309.jpg', filename: 'fi3n394fv3mivm3r9jv309'}], author: adminUser, geometry: {type: 'Point', coordinates: [-71.1688221,-31.633111]}},
        {nombre: "Plaza de Armas de Combarbalá", region: "Región de Coquimbo", provincia: "Limarí", comuna: "Combarbalá", superficie: 8471, images: [{url: 'https://res.cloudinary.com/dpz0sgwyq/image/upload/v1647540690/ParquesChile/gfdsbt3h5g6b56655h56h.jpg', filename: 'gfdsbt3h5g6b56655h56h'}], author: adminUser, geometry: {type: 'Point', coordinates: [-71.0024668,-31.178227]}},
        {nombre: "Plaza de Armas de La Serena", region: "Región de Coquimbo", provincia: "Elqui", comuna: "La Serena", superficie: 14503, images: [{url: 'https://res.cloudinary.com/dpz0sgwyq/image/upload/v1647540711/ParquesChile/gtriugn490tn403gn40fn90.jpg', filename: 'gtriugn490tn403gn40fn90'}], author: adminUser, geometry: {type: 'Point', coordinates: [-71.2520514,-29.9026873]}},
        {nombre: "Plaza de Armas de Petorca", region: "Región de Valparaíso", provincia: "Petorca", comuna: "Petorca", superficie: 9466, images: [{url: 'https://res.cloudinary.com/dpz0sgwyq/image/upload/v1647540742/ParquesChile/if0m93vj8mf9muv4r9mvrv.jpg', filename: 'if0m93vj8mf9muv4r9mvrv'}], author: adminUser, geometry: {type: 'Point', coordinates: [-70.9312091,-32.2517543]}},
        {nombre: "Plaza de Armas de Casablanca", region: "Región de Valparaíso", provincia: "Valparaíso", comuna: "Casablanca", superficie: 5878, images: [{url: 'https://res.cloudinary.com/dpz0sgwyq/image/upload/v1647540753/ParquesChile/42343432m4o32m4kl32moi.jpg', filename: '42343432m4o32m4kl32moi'}], author: adminUser, geometry: {type: 'Point', coordinates: [-71.4101226,-33.3205567]}},
        {nombre: "Plaza de Armas de San Esteban", region: "Región de Valparaíso", provincia: "Los Andes", comuna: "San Esteban", superficie: 12420, images: [{url: 'https://res.cloudinary.com/dpz0sgwyq/image/upload/v1647540780/ParquesChile/m54oimf5049m0rievfmf9.jpg', filename: 'm54oimf5049m0rievfmf9'}], author: adminUser, geometry: {type: 'Point', coordinates: [-70.5797208,-32.798991]}},
        {nombre: "Plaza de Armas de Nogales", region: "Región de Valparaíso", provincia: "Quillota", comuna: "Nogales", superficie: 6365, images: [{url: 'https://res.cloudinary.com/dpz0sgwyq/image/upload/v1647541535/ParquesChile/bt55tg5b5gbhtyj8i78km.jpg', filename: 'bt55tg5b5gbhtyj8i78km'}], author: adminUser, geometry: {type: 'Point', coordinates: [-71.2003782,-32.7364882]}},
        {nombre: "Plaza de Armas de La Cruz", region: "Región de Valparaíso", provincia: "Quillota", comuna: "La Cruz", superficie: 6427, images: [{url: 'https://res.cloudinary.com/dpz0sgwyq/image/upload/v1647541662/ParquesChile/84f388c2ae923f05b2343480380a87d0fdsfsgdz6ka.jpg', filename: '84f388c2ae923f05b2343480380a87d0fdsfsgdz6ka'}], author: adminUser, geometry: {type: 'Point', coordinates: [-71.2272884,-32.8279109]}},
        {nombre: "Plaza de Armas de La Ligua", region: "Región de Valparaíso", provincia: "PETORCA", comuna: "La Ligua", superficie: 6096, images: [{url: 'https://res.cloudinary.com/dpz0sgwyq/image/upload/v1647541752/ParquesChile/f4398j349fj484jf93fj.jpg', filename: 'f4398j349fj484jf93fj'}], author: adminUser, geometry: {type: 'Point', coordinates: [-71.2317469,-32.4494117]}},
        {nombre: "Plaza de Armas de San Clemente", region: "Región del Maule", provincia: "Talca", comuna: "San Clemente", superficie: 6891, images: [{url: 'https://res.cloudinary.com/dpz0sgwyq/image/upload/v1647541865/ParquesChile/frvry76i87o89089l8pl.jpg', filename: 'frvry76i87o89089l8pl'}], author: adminUser, geometry: {type: 'Point', coordinates: [-71.4860028,-35.5375236]}},
        {nombre: "Plaza de Armas de Parral", region: "Región del Maule", provincia: "Linares", comuna: "Parral", superficie: 15917, images: [{url: 'https://res.cloudinary.com/dpz0sgwyq/image/upload/v1647541949/ParquesChile/f3f54g65ji98l09c3m209c82rm90c0.jpg', filename: 'f3f54g65ji98l09c3m209c82rm90c0'}], author: adminUser, geometry: {type: 'Point', coordinates: [-71.8223569,-36.141405]}},
        {nombre: "Plaza de Armas de Cauquenes", region: "Región del Maule", provincia: "Cauquenes", comuna: "Cauquenes", superficie: 12268, images: [{url: 'https://res.cloudinary.com/dpz0sgwyq/image/upload/v1647542029/ParquesChile/ei2x8mde7x209rmr720qeq.jpg', filename: 'ei2x8mde7x209rmr720qeq'}], author: adminUser, geometry: {type: 'Point', coordinates: [-72.3155384,-35.9671892]}},
        // {nombre: "Plaza de Armas de Teno", region: "Región del Maule", provincia: "Curicó", comuna: "Teno", superficie: 17248, img: 'https://www.teno.cl/webteno/wp-content/uploads/2018/08/4747323345_14ea848782_b.jpg', author: adminUser, geometry: {type: 'Point', coordinates: []}},
        // {nombre: "Plaza de Armas de San Javier", region: "Región del Maule", provincia: "Linares", comuna: "San Javier", superficie: 13940, img: 'http://imgcf.ecn.cl/600/82/82ec3190a77c9760b5afc490778efdf103c24930.bin.jpg', author: adminUser, geometry: {type: 'Point', coordinates: []}},
        // {nombre: "Plaza de Armas de Talca", region: "Región del Maule", provincia: "Talca", comuna: "Talca", superficie: 11235, img: 'https://blogapi.uber.com/wp-content/uploads/2019/05/Plaza-de-Armas.png', author: adminUser, geometry: {type: 'Point', coordinates: []}},
        // {nombre: "Plaza de Armas de Linares", region: "Región del Maule", provincia: "Linares", comuna: "Linares", superficie: 14296, img: 'https://maulesur.cl/wp-content/uploads/linares.jpg', author: adminUser, geometry: {type: 'Point', coordinates: []}},
        // {nombre: "Plaza de Armas de Longaví", region: "Región del Maule", provincia: "Linares", comuna: "Longaví", superficie: 10440, img: 'https://maulealdia.cl/wp-content/uploads/2017/12/05-10.jpg', author: adminUser, geometry: {type: 'Point', coordinates: []}},
        // {nombre: "Plaza de Armas de Pinto", region: "Región del Biobío", provincia: "Ñuble", comuna: "Pinto", superficie: 18229, img: 'https://www.municipalidaddepinto.cl/fotos/_data/i/upload/2016/12/01/20161201192109-07b46748-me.jpg', author: adminUser, geometry: {type: 'Point', coordinates: []}},
        // {nombre: "Plaza de Armas de El Carmen", region: "Región del Biobío", provincia: "Ñuble", comuna: "El Carmen", superficie: 17680, img: 'https://2.bp.blogspot.com/-mXoaTVUOCiY/WrO8t3IaekI/AAAAAAAAMiU/ax1qWm-_iPsv1t8Yh888w0fMo2g_3jrrQCEwYBhgL/s1600/20180318_184353%255B1%255D.jpg', author: adminUser, geometry: {type: 'Point', coordinates: []}},
        // {nombre: "Plaza de Armas de Coelemu", region: "Región del Biobío", provincia: "Ñuble", comuna: "Coelemu", superficie: 13373, img: 'http://turismocoelemu.cl/wp-content/uploads/2019/08/coelemu-agosto-054-1024x768.jpg', author: adminUser, geometry: {type: 'Point', coordinates: []}},
        // {nombre: "Plaza de Armas de Tomé", region: "Región del Biobío", provincia: "Concepción", comuna: "Tomé", superficie: 6909, img: 'http://img.soy-chile.cl/Fotos/2013/08/06/file_20130806122259.jpg', author: adminUser, geometry: {type: 'Point', coordinates: []}},
        // {nombre: "Plaza de Armas de Los Ángeles", region: "Región del Biobío", provincia: "Biobío", comuna: "Los Ángles", superficie: 12207, img: 'https://media-cdn.tripadvisor.com/media/photo-s/09/38/18/a9/los-angeles.jpg', author: adminUser, geometry: {type: 'Point', coordinates: []}},
        // {nombre: "Plaza de Armas de San Rosendo", region: "Región del Biobío", provincia: "Biobío", comuna: "San Rosendo", superficie: 7956, img: 'https://mapio.net/images-p/27638795.jpg', author: adminUser, geometry: {type: 'Point', coordinates: []}},
        // {nombre: "Plaza de Armas de Talcahuano", region: "Región del Biobío", provincia: "Concepción", comuna: "Talcahuano", superficie: 6660, img: 'https://turismo.talcahuano.cl/wp-content/uploads/2021/01/PLAZA-DE-ARMAS.jpg', author: adminUser, geometry: {type: 'Point', coordinates: []}},
        // {nombre: "Plaza de Armas de Cañete", region: "Región del Biobío", provincia: "Arauco", comuna: "Cañete", superficie: 7374, img: 'https://municanete.cl/wp-content/uploads/2021/02/145790332_3748755448511467_8105534954580004648_o.jpg', author: adminUser, geometry: {type: 'Point', coordinates: []}},
        // {nombre: "Plaza de Armas de Mulchén", region: "Región del Biobío", provincia: "Biobío", comuna: "Mulchén", superficie: 7912, img: 'https://fastly.4sqi.net/img/general/width960/38595388_QKK146ogrZ-GQ1edKUrrfNVTBAfxzO-KoYirnpr6wNk.jpg', author: adminUser, geometry: {type: 'Point', coordinates: []}},
        // {nombre: "Plaza de Armas de Negrete", region: "Región del Biobío", provincia: "Biobío", comuna: "Negrete", superficie: 13108, img: 'https://i.ytimg.com/vi/2MiTzrqSvF8/maxresdefault.jpg', author: adminUser, geometry: {type: 'Point', coordinates: []}},
        // {nombre: "Plaza de Armas de Los Sauces", region: "Región de la Araucanía", provincia: "Malleco", comuna: "Los Sauces", superficie: 12274, img: 'https://mapio.net/images-p/54820541.jpg', author: adminUser, geometry: {type: 'Point', coordinates: []}},
        // {nombre: "Plaza de Armas de Pucón", region: "Región de la Araucanía", provincia: "Cautín", comuna: "Pucón", superficie: 22127, img: 'http://diconorrepuestos.cl/cabanas/wp-content/uploads/2016/12/plaza-de-armas-de-pucon.jpg', author: adminUser, geometry: {type: 'Point', coordinates: []}},
        // {nombre: "Plaza de Armas de Saavedra", region: "Región de la Araucanía", provincia: "Cautín", comuna: "Saavedra", superficie: 7666, img: 'https://mapio.net/images-p/47904332.jpg', author: adminUser, geometry: {type: 'Point', coordinates: []}},
        // {nombre: "Plaza de Armas de Traiguén", region: "Región de la Araucanía", provincia: "Malleco", comuna: "Traiguén", superficie: 11796, img: 'https://traiguencity.cl/wp-content/uploads/2016/01/kiosco-Plaza.jpg', author: adminUser, geometry: {type: 'Point', coordinates: []}},
        // {nombre: "Plaza de Armas de Purén", region: "Región de la Araucanía", provincia: "Malleco", comuna: "Purén", superficie: 12010, img: 'https://upload.wikimedia.org/wikipedia/commons/9/97/Plaza_de_Armas_de_Pur%C3%A9n.jpg', author: adminUser, geometry: {type: 'Point', coordinates: []}},
        // {nombre: "Plaza de Armas de Cholchol", region: "Región de la Araucanía", provincia: "Cautín", comuna: "Cholchol", superficie: 13357, img: 'https://i.ytimg.com/vi/yFrok7QePe4/maxresdefault.jpg', author: adminUser, geometry: {type: 'Point', coordinates: []}},
        // {nombre: "Plaza de Armas de Quintero", region: "Región de Valparaíso", provincia: "Valparaíso", comuna: "Quintero", superficie: 7922, img: 'https://www.muniquintero.cl/wp-content/uploads/2019/06/pza1.JPG', author: adminUser, geometry: {type: 'Point', coordinates: []}},
        // {nombre: "Plaza de Armas de Mejillones", region: "Región de Antofagasta", provincia: "Antofagasta", comuna: "Mejillones", superficie: 7972, img: 'https://cdn.plataformaurbana.cl/wp-content/uploads/2011/05/1304303359_dsc09616.jpg', author: adminUser, geometry: {type: 'Point', coordinates: []}},
    ]

    await Park.deleteMany({})
    await Review.deleteMany({})
    await Park.insertMany(seedParks)
    console.log('successfully inserted!')
}

seedDB()