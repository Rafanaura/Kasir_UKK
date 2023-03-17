const express = require("express");
const moment = require("moment");
const auth = require("../auth")
const router = express();
router.use(express.json());
const modelT = require('../models/index').transaksi
const modelTransaksi = modelT
const modelDT = require('../models/index').detail_transaksi
const modelDetailTransaksi = modelDT
const modelM = require('../models/index').meja
const modelMeja = modelM
const modelU = require('../models/index').user
const modelUser = modelU
const access = require("../akses/hak-akses");
const {Op} = require("sequelize")

router.get("/", auth, async (req, res) => {
  let granted = await access.manajer(req)
    if(!granted.status){  // jika status tidak true
        return res.status(403).json(granted.message)
    }
  try {
    let result = await modelTransaksi.findAll({
      include: [
        "user",
        {
          model: modelDetailTransaksi,
          as: "detail_transaksi",
          include: ["menu"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    return res.json({
      message: "show all data transaksi",
      transaksi : result
    });
  } catch (err) {
    return res.json({
      message: err.message,
    });
  }
});

router.get ("/:id_transaksi", auth, async (req,res) => {
  let granted = await access.kasir(req)
    if(!granted.status){  // jika status tidak true
        return res.status(403).json(granted.message)
    }
  let param = { id_transaksi: req.params.id_transaksi}
  let result = await modelTransaksi.findOne({
      where: param,
      include: [
          "user",
          {
            model: modelDetailTransaksi,
            as: "detail_transaksi",
            include: ["menu"]
          },
      ],
  })
  let totalAkhir = await modelTransaksi.sum("totalAkhir", {
    where : param
})
  res.json({
    transaksi : result,
    totalAkhir : totalAkhir
})
})

router.get ("/user/:id_user", auth, async (req,res) => {
  let granted = await access.kasir(req)
    if(!granted.status){  // jika status tidak true
        return res.status(403).json(granted.message)
    }
  let param = { id_user: req.params.id_user}
  let result = await modelTransaksi.findAll({
      where: param,
      order: [
        ["tgl_transaksi","DESC"]
    ],
  })
  let totalAkhir = await modelTransaksi.sum("totalAkhir", {
    where : param
})
  res.json({
    transaksi : result,
    totalAkhir : totalAkhir
})
})

//filtering berdasarkan nama karyawan
router.get("/filter/nama_user/:nama_user", auth, async (req, res) => {
  let granted = await access.manajer(req)
  if(!granted.status){  // jika status tidak true
      return res.status(403).json(granted.message)
  }
  const param = { nama_user: req.params.nama_user }; 
  modelUser
    .findAll({ 
      where: {
        nama_user: param.nama_user,
      },
    })
    .then((result) => { 
      if (result == null) { 
        res.status(404).json({ 
          status: "error",
          message: "data tidak ditemukan",
        });
      } else { 
        modelTransaksi
          .findAll({ 
            where: {
              id_user: result[0].id_user,
            },
          })
          .then((result) => { 
           if (result.length === 0) { 
              res.status(404).json({ 
                status: "error",
                message: "data tidak ditemukan",
              });
            } else { 
              res.status(200).json({ 
                status: "success",
                message: "data ditemukan",
                data: result,
              });
            }
          })
          .catch((error) => { 
            res.status(400).json({ 
              status: "error",
              message: error.message,
            });
          });
      }
    })
    .catch((error) => { 
      res.status(400).json({ 
        status: "error",
        message: error.message,
      });
    });
});

//filtering transaksi berdasarkan tanggal transaksi
router.get("/filter/tgl_transaksi/:tgl_transaksi", auth, async (req, res) => { // endpoint untuk mencari data transaksi berdasarkan tanggal transaksi
  const param = { tgl_transaksi: req.params.tgl_transaksi }; // inisialisasi parameter yang akan dikirimkan melalui parameter

  modelTransaksi
   .findAll({ // mengambil data transaksi berdasarkan tanggal transaksi yang dikirimkan melalui parameter
      where: {
        tgl_transaksi: {
          [Op.between]: [
            param.tgl_transaksi + " 00:00:00",
            param.tgl_transaksi + " 23:59:59",
          ], // mencari data transaksi berdasarkan tanggal transaksi yang dikirimkan melalui parameter
        }
      },
      include: [ // join tabel user dan meja
        {
          model: modelUser,
          as: "user",
        },
        {
          model: modelMeja,
          as: "meja",
        },
      ],
    })
    .then((result) => { // jika berhasil
      if (result.length === 0) { // jika data tidak ditemukan
        res.status(404).json({ // mengembalikan response dengan status code 404 dan pesan data tidak ditemukan
          status: "error",
          message: "data tidak ditemukan",
        });
      } else { // jika data ditemukan
        res.status(200).json({ // mengembalikan response dengan status code 200 dan pesan data ditemukan
          status: "success",
          message: "data ditemukan",
          data: result,
        });
      }
    })
    .catch((error) => { // jika gagal
      res.status(400).json({ // mengembalikan response dengan status code 400 dan pesan error
        status: "error",
        message: error.message,
      });
    });
});


//endpoint menambah transaksi
router.post("/tambah-transaksi", auth, async (req, res) => {
  let granted = await access.kasir(req)
    if(!granted.status){  
        return res.status(403).json(granted.message)
    }
  let tgl = Date.now()
  let transaksi = {
    tgl_transaksi: tgl,
    id_user: req.body.id_user,
    id_meja : req.body.id_meja,
    nama_pelanggan : req.body.nama_pelanggan,
    status: req.body.status,
    totalAkhir: req.body.totalAkhir,
  };
  modelTransaksi.create(transaksi)
    .then(result => {
      let lastID = result.id_transaksi;
    //   console.log(lastID);
      detail = req.body.detail;
      detail.forEach(element => {
        element.id_transaksi = lastID;
        console.log(element.id_transaksi)
      });
      console.log(detail)
      modelDetailTransaksi
        .bulkCreate(detail, {individualHooks:true})
        .then(result => {
          res.json({
            message: "Data has been inserted",
            detail: result
          });
        })
        .catch(error => {
          res.json({
            message: error.message,
          });
        });
        // update status meja
      modelMeja.update({ status: "terisi" }, { where: { id_meja: req.body.id_meja } }); // mengubah status meja menjadi dipesan
    })
    .catch(error => {
      res.json({
        message: error.message,
      });
    });
});

router.put("/:id_transaksi", auth, async (req, res) => {
  let granted = await access.kasir(req)
    if(!granted.status){  // jika status tidak true
        return res.status(403).json(granted.message)
    }
  let current = new Date();
  let now = moment(current).format("YYYY-MM-DD");
  let param = {
    id_transaksi: req.params.id_transaksi
  }
  let transaksi = {
    status: req.body.status,
  };
  if (transaksi.status === "lunas") {
    (transaksi.tanggal_bayar = now);
  }
  modelTransaksi
    .update(transaksi, { where: param })
    .then((result) => {
      return res.json({
        message: "data updated",
        transaksi
      });
    })
    .catch((err) => {
      return res.json({
        message: err.message,
      });
    });
});

router.delete("/:id_transaksi", auth, async(req, res) => {
  let granted = await access.kasir(req)
    if(!granted.status){  // jika status tidak true
        return res.status(403).json(granted.message)
    }
  let id_transaksi = req.params.id_transaksi;

  //delete detail
  modelDetailTransaksi.destroy({where : {id_transaksi : id_transaksi}})
  .then((result) => {
    modelTransaksi
    .destroy({ where: { id_transaksi: id_transaksi } })
    .then((result) => {
      return res.json({
        message : "data transaksi deleted"
      })
    })
    .catch((err) => {
      return res.json({
        message: err.message,
      });
    });
  })
  .catch((err) => {
    return res.json({
      message: err.message,
    });
  });
});

module.exports = router;