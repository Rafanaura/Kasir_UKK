const express = require ("express")
const router = express()
const multer = require("multer")
const path = require("path")
const auth = require("../auth")
const fs = require("fs")
router.use(express.json())
const model = require("../models/index").menu
const modelMenu = model
const access = require("../akses/hak-akses");

const storage = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null,"./gambar/menu")
    },
    filename: (req,file,cb) => {
        cb(null, "img-" + Date.now() + path.extname(file.originalname))
    }
})
let upload = multer({storage: storage})

router.get("/", auth, async (req, res) => {
    let granted = await access.admin(req)
    if(!granted.status){  // jika status tidak true
        return res.status(403).json(granted.message)
    }
    modelMenu.findAll()
        .then(result => {
            res.json({
                menu : result
            })
        })
        .catch(err => {
            res.json({
                message : err.message
            })
        })
})

router.post("/tambah-menu", upload.single("gambar"), auth, async (req, res) =>{
    let granted = await access.admin(req)
    if(!granted.status){  // jika status tidak true
        return res.status(403).json(granted.message)
    }

    if (!req.file) {
        res.json({
            message: "No uploaded file"
        })
    } else {
        let menu = {
            nama_menu : req.body.nama_menu,
            jenis: req.body.jenis,
            deskripsi: req.body.deskripsi,
            gambar: req.file.filename,
            harga: req.body.harga,
        }
        modelMenu.create(menu)
        .then(result => {
            res.json({
                message: "data has been inserted",
                menu
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
    }
})



router.put("/:id_menu", upload.single("gambar"), auth, async (req, res) =>{
    let granted = await access.admin(req)
    if(!granted.status){  // jika status tidak true
        return res.status(403).json(granted.message)
    }
    let param = { id_menu: req.params.id_menu}
    let menu = {
        nama_menu : req.body.nama_menu,
        jenis : req.body.jenis,
        deskripsi : req.body.deskripsi,
        gambar : req.file.filename,
        harga : req.body.harga
    }
    if (req.file) {
        // get menu by id
        const row = modelMenu.findOne({where: param})
        .then(result => {
            let oldFileName = result.gambar
           
            // delete old file
            let dir = path.join(__dirname,"../gambar/menu",oldFileName)
            fs.unlink(dir, err => console.log(err))
        })
        .catch(error => {
            console.log(error.message);
        })

        // set new filename
        menu.gambar = req.file.filename
    }

    modelMenu.update(menu, {where: param})
        .then(result => {
            res.json({
                message: "menu has been updated",
                menu
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})



router.delete("/:id_menu", auth, async (req, res) => {
    let granted = await access.admin(req)
    if(!granted.status){  // jika status tidak true
        return res.status(403).json(granted.message)
    }
    let id_menu = req.params.id_menu
    modelMenu.destroy({ where: { id_menu: id_menu} })
        .then(result => {
            return res.json({
                message: "data deleted"
            })
        })
        .catch(err => {
            return res.json({
                message: err.message
            })
        })
})

module.exports = router