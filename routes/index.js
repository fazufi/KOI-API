const express = require("express");
const router = express.Router();
const multer = require("../helper/multer");
const wilayah = require("../JSON/wilayah.json");
const uku = require("../helper/knex");

const apiGet = async (req, res) => {
  console.log("API GET");
  if (req.params.table == "wilayah") {
    let rpId = req.params.id;
    const index = wilayah.findIndex((v) => v.id == rpId);
    rpId ? res.json(wilayah[index]) : res.json(wilayah);
    console.log(wilayah[index]);
  } else {
    try {
      const result = await req.db(req.params.table);
      // where
      res.json(result);
    } catch ({ code }) {
      res.json(code);
    }
  }
};
router.get(["/:table", "/:table/:id"], apiGet);

const peserta = async (req, res) => {
  try {
    await req.db("peserta").insert(req.body);
    res.json(req.file);
  } catch (error) {
    res.json(error);
  }
};

const program = async (req, res) => {
  try {
    await req
      .db("programLama")
      .insert({  foto: req.file.filename });

    res.json(req.file);
  } catch (error) {
    res.json(error);
  }
};

const kegiatan = async (req, res) => {
  try {
    await req
      .db("kegiatan")
      .insert({ nama: req.body.nama, foto: req.file.filename, deskripsi: req.body.deskripsi });

    res.json(req.file);
  } catch (error) {
    res.json(error);
  }
};



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
  

  res.json(req.file);

 
};

router.get("/peserta", async (req, res, next) => {
  try {
    const result = req
      .db("kelas")
      .select("peserta.nama as namaPeserta", "program.nama as namaProgram")
      .join("program", "program.id", "kelas.program")
      .join("peserta", "peserta.id", "kelas.peserta")
      // .where({program: '79f45e1d-97b5-11eb-99e7-7062b824f60e' })
      // .where('peserta.nama', '=', 'joni')
      // .where({ ['peserta.nama']: 'joni' })
      // .where("peserta.nama", "like", "jon%");

    res.send(await result);
  } catch (error) {
    res.json(error);
  }
});

router.get("/kegiatan", async (req, res, next) => {
  try {
    const result = req
      .db("kelas")
      .select("peserta.nama as namaPeserta", "program.nama as namaProgram")
      .join("program", "program.id", "kelas.program")
      .join("peserta", "peserta.id", "kelas.peserta")
      // .where({program: '79f45e1d-97b5-11eb-99e7-7062b824f60e' })
      // .where('peserta.nama', '=', 'joni')
      // .where({ ['peserta.nama']: 'joni' })
      // .where("peserta.nama", "like", "jon%");

    res.send(await result);
  } catch (error) {
    res.json(error);
  }
});

router.post("/provinsi", wilayahpost);
router.post("/peserta", multer.single("foto"), peserta);
router.post("/program", multer.single("foto"), program);
router.post("/kegiatan", multer.single("foto"), kegiatan);
router.get("/", (req, res, next) => res.json("welcome"));

module.exports = router;
