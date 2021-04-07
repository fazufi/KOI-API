const express = require("express");
const router = express.Router();
const multer = require("../helper/multer");
const wilayah = require("../JSON/wilayah.json");

const apiGet = async (req, res) => {
  if (req.params.table == "wilayah") {
    let rpId = req.params.id;
    const index = wilayah.findIndex((v) => v.id == rpId);
    rpId ? res.json(wilayah[index]) : res.json(wilayah);
    console.log(wilayah[index]);
  } else {
    try {
      const result = await req.db(req.params.table);
      res.json(result);
    } catch ({ code }) {
      res.json(code);
    }
  }
};

const peserta = async (req, res) => {
  try {
    await req.db("peserta").insert(req.body);
    res.json(req.file);
  } catch (error) {
    res.json(error);
  }
};

const programlama = async (req, res) => {
  try {
    await req
      .db("programLama")
      .insert({ id: req.body.id, foto: req.file.filename });

    res.json(req.file);
  } catch (error) {
    res.json(error);
  }
};

const programBaru = async (req, res) => {
  try {
    await req
      .db("programBaru")
      .update({ foto: req.file.filename })
      .where({ id: 1 });
    res.json(req.file);
  } catch (error) {
    res.json(error);
  }
};

router.post("/peserta", multer.single("foto"), peserta);
router.post("/programLama", multer.single("foto"), programlama);
router.post("/programBaru", multer.single("foto"), programBaru);
router.get(["/:table", "/:table/:id"], apiGet);
router.get("/", (req, res, next) => res.json("welcome"));

module.exports = router;
