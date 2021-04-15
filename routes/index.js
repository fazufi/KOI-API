const express = require("express");
const router = express.Router();
const multer = require("../helper/multer");
const ctrl = require("./controllers")


router.get("/", (req, res, next) => res.json("welcome"));
router.get("/pendaftaran/:p/:v", ctrl.pendaftaranGet);
router.get(["/:table", "/:table/:id"], ctrl.allGet);

router.post("/provinsi", ctrl.wilayahpost);
router.post("/program", multer.single("foto"), ctrl.programPost);
router.post("/kegiatan", multer.single("foto"), ctrl.kegiatanPost);
router.post("/:table", ctrl.allPost);

router.put("/program/:id", multer.single("foto"), ctrl.programPut);
router.put("/kegiatan:id", multer.single("foto"), ctrl.kegiatanPut);
router.put("/:table/:id", ctrl.allPut);

router.delete("/:table/:id", ctrl.allDelete);

module.exports = router;
