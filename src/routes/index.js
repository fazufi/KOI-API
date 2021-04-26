const express = require("express");
const router = express.Router();
const multer = require("../../helper/multer");

router.get("/", (req, res, next) => res.json("welcome"));


const wilayah = require("../controllers/wilayah");
router.get("/wilayah", wilayah.get);

const galeri = require("../controllers/galeri");
router.get("/galeri", galeri.allGet);
router.get("/galeri/:id", galeri.currentGet);
router.post("/galeri", multer.single("foto"), galeri.post);
router.put("/galeri/:id", multer.single("foto"), galeri.put);
router.delete("/galeri/:id", galeri.del);

const peserta = require("../controllers/peserta");  
router.get("/peserta", peserta.allGet);
router.get("/peserta/:p", peserta.currentGet);
router.post("/peserta", peserta.post);
router.delete("/peserta/:id", peserta.del);

const program = require("../controllers/program");
router.get("/program", program.allGet);
router.get("/program/:p", program.currentGet)
router.post("/program", program.post)
router.put("/program/:id", program.put)
router.delete("/program", program.del)

const rekap = require("../controllers/rekap");
router.get("/rekap/program/:p", rekap.getByProgram)
router.get("/rekap/peserta/:p", rekap.getByPeserta)
router.put("/rekap/:id", rekap.put)
router.delete("/rekap/:id", rekap.del)

const payment = require("../controllers/payment")
router.post("/payment", payment.payment);

const checkpayment = require("../controllers/checkpayment")
router.post("/checkpayment", checkpayment.checkpayment)

const rekappembayaran= require("../controllers/rekappembayaran")
router.get("/rekappembayaran", rekappembayaran.allGet )
router.post("/rekappembayaran", rekappembayaran.result);


module.exports = router;

