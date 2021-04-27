const express = require("express");
const router = express.Router();
const multer = require("../../helper/multer");

router.get("/", (req, res, next) => res.json("welcome"));

const wilayah = require("../controllers/wilayah");
router.get("/wilayah", wilayah.get);

const peserta = require("../controllers/peserta");
router.get("/peserta", peserta.allGet);
router.get("/peserta/:p", peserta.currentGet);
router.post("/peserta", peserta.post);
router.delete("/peserta/:id", peserta.del);

const program = require("../controllers/program");
router.get("/program", program.allGet);
router.get("/program/:p", program.currentGet)
router.post("/program", multer.single("foto"), program.post)
router.put("/program/:id", multer.single("foto"), program.put)
router.delete("/program/:id", program.del)

const kegiatan = require("../controllers/kegiatan");
router.get("/kegiatan", kegiatan.allGet);
router.get("/kegiatan/:p", kegiatan.currentGet)
router.post("/kegiatan", multer.single("foto"), kegiatan.post)
router.put("/kegiatan/:id", multer.single("foto"), kegiatan.put)
router.delete("/kegiatan/:id", kegiatan.del)


const rekap = require("../controllers/rekap");
router.get("/rekap/:id", rekap.currentGet)
router.get("/rekap/program/:p", rekap.getByProgram)
router.get("/rekap/peserta/:p", rekap.getByPeserta)
router.post("/rekap", rekap.post)
router.put("/rekap/:id", rekap.put)
router.delete("/rekap/:id", rekap.del)

const payment = require("../controllers/payment")
router.post("/payment", payment.payment);

const checkpayment = require("../controllers/checkpayment")
router.post("/checkpayment", checkpayment.checkpayment)




module.exports = router;

