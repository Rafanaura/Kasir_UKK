const express = require ("express")
const router = express()
router.use(express.json())
const auth = require("../auth")
const model = require("../models/index").meja
const modelMeja = model
const access = require("../akses/hak-akses");

router.get("/", auth, async (req, res) => {
    let granted = await access.admin(req)
    if(!granted.status){  // jika status tidak true
        return res.status(403).json(granted.message)
    }
    modelMeja.findAll()
        .then(result => {
            res.json({
                meja : result
            })
        })
        .catch(err => {
            res.json({
                message : err.message
            })
        })
})

router.post("/tambah-meja", auth, async (req, res) => {
    let granted = await access.admin(req)
    if(!granted.status){  // jika status tidak true
        return res.status(403).json(granted.message)
    }
    let meja = {
        nomor_meja : req.body.nomor_meja,
        status : req.body.status
    }
    modelMeja.create(meja)
       .then(result => {
        return res.json({
            message : "success add meja",
            meja
        })
       })
       .catch(err => {
            return res.json({
                message : err.message
            })
       })
})

router.put("/:id_meja", auth, async (req, res) => {
    let granted = await access.admin(req)
    if(!granted.status){  // jika status tidak true
        return res.status(403).json(granted.message)
    }
    let id_meja = req.params.id_meja
    let meja = {
        nomor_meja : req.body.nomor_meja,
        status : req.body.status
    }
    modelMeja.update(meja, {where : {id_meja : id_meja}})
    .then(result => {
        return res.json({
            message : "success edit meja",
            meja
        })
    })
    .catch(err => {
        return res.json({
            message : err.message
        })
    })
})

router.delete("/:id_meja", auth, async (req, res) => {
    let granted = await access.admin(req)
    if(!granted.status){  // jika status tidak true
        return res.status(403).json(granted.message)
    }
    let id_meja = req.params.id_meja
    modelMeja.destroy({ where: { id_meja: id_meja} })
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