const express = require("express");
const router = express.Router();
const multer = require("../helper/multer");
const ctrl = require("./controllers")


<<<<<<< HEAD
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
    await req.db("programLama").insert({ foto: req.file.filename });

    res.json(req.file);
  } catch (error) {
    res.json(error);
  }
};

const programBaru = async (req, res) => {
  try {
    await req.db("programBaru").update({ foto: req.file.filename }).where({ id: 1 });
    res.json(req.file);
  } catch (error) {
    res.json(error);
  }
};

// {this.props.stokProduk.map((item, b) => (
const wilayahpost = async (req, res) => {
  try {
    await wilayah.forEach(async (element) => {
      try {
        await uku("provinsi").insert({
          id: element.id,
          nama: element.name,
        });
        await element.regencies.forEach(async (elementelement) => {
          try {
            await uku("kabupaten").insert({
              id: elementelement.id,
              nama: elementelement.name,
            });
          } catch (error) {
            console.log(error);
          }
        });
      } catch (error) {
        console.log(error);
      }
    });
  } catch (error) {
    console.log(error);
  }
  // try {
  // const result=
  // await req.db("provinsi").insert({ nama: "jdjdjd" })

  // console.log("iki");

  res.json(req.file);

  //   } catch (error) {
  //     res.json(error);
  //   }
};
=======
router.get("/", (req, res, next) => res.json("welcome"));
router.get("/rekap/:p/:v", ctrl.rekapGet);
router.get("/wilayah", ctrl.wilayahGet);
router.get(["/:table", "/:table/:id"], ctrl.allGet);
>>>>>>> 6eabfff24b43f80b1a77ad25143429628c238dee

router.post("/galeri", multer.single("foto"), ctrl.galeriPost);
router.post("/peserta", ctrl.pesertaPost);
router.post("/:table", ctrl.allPost);

router.put("/galeri/:id", multer.single("foto"), ctrl.galeriPut);
router.put("/:table/:id", ctrl.allPut);

router.delete("/galeri/:id", ctrl.galeriDel);
router.delete("/:table/:id", ctrl.allDel);

module.exports = router;
