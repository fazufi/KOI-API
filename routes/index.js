const express = require("express");
const router = express.Router();
const multer = require("../helper/multer");
const ctrl = require("./controllers");

router.get("/", (req, res, next) => res.json("welcome"));
router.get("/rekap/:p/:v", ctrl.rekapGet);
router.get("/wilayah", ctrl.wilayahGet);
router.get(["/:table", "/:table/:id"], ctrl.allGet);

router.post("/galeri", multer.single("foto"), ctrl.galeriPost);
router.post("/peserta", ctrl.pesertaPost);
router.post("/:table", ctrl.allPost);

router.put("/galeri/:id", multer.single("foto"), ctrl.galeriPut);
router.put("/:table/:id", ctrl.allPut);

router.delete("/galeri/:id", ctrl.galeriDel);
router.delete("/:table/:id", ctrl.allDel);

module.exports = router;
