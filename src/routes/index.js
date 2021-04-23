const express = require("express");
const router = express.Router();
const multer = require("../../helper/multer");

router.get("/", (req, res, next) => res.json("welcome"));
// router.get("/rekap/:p/:v", ctrl.rekapGet);

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

const rekap = require("../controllers/rekap")
router.get("/rekap/program/:p", rekap.byProgramGet)
router.get("/rekap/peserta/:p", rekap.byPesertaGet)
// router.post("/program", ctrl.programPost);

// router.post("/:table", ctrl.allPost);

// router.put("/:table/:id", ctrl.allPut);

// router.delete("/galeri/:id", ctrl.galeriDel);
// router.delete("/:table/:id", ctrl.allDel);

module.exports = router;
