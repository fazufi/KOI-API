const express = require("express");
const router = express.Router();
const multer = require("../helper/multer");
const wilayah = require("../JSON/wilayah.json");

const pendaftaranGet = async (req, res) => {
  if (req.params.p == "namaPeserta") {
    const result = await req
      .db("pendaftaran")
      .select("peserta.nama as peserta", "program.nama as program")
      .join("program", "program.id", "pendaftaran.program")
      .join("peserta", "peserta.id", "pendaftaran.peserta")
      .where("peserta.nama", "=", req.params.v);
    // .where({program: '79f45e1d-97b5-11eb-99e7-7062b824f60e' })
    // .where({ ['peserta.nama']: 'joni' })
    // .where("peserta.nama", "like", "jon%");
    res.send(result);
  }
  if (req.params.p == "idPeserta") {
    const result = await req
      .db("pendaftaran")
      .select("peserta.nama as peserta", "program.nama as program")
      .join("program", "program.id", "pendaftaran.program")
      .join("peserta", "peserta.id", "pendaftaran.peserta")
      .where("peserta.id", "=", req.params.v);
    res.send(result);
  }
  if (req.params.p == "namaProgram") {
    const result = await req
      .db("pendaftaran")
      .select("peserta.nama as peserta", "program.nama as program")
      .join("program", "program.id", "pendaftaran.program")
      .join("peserta", "peserta.id", "pendaftaran.peserta")
      .where("program.nama", "=", req.params.v);
    res.send(result);
  }
  if (req.params.p == "idProgram") {
    const result = await req
      .db("pendaftaran")
      .select("peserta.nama as peserta", "program.nama as program")
      .join("program", "program.id", "pendaftaran.program")
      .join("peserta", "peserta.id", "pendaftaran.peserta")
      .where("program.id", "=", req.params.v);
    res.send(result);
  }
};

const allGet = async (req, res) => {
  if (req.params.table !== "pendaftaran") {
    const data = await req.db(req.params.table);
    if (req.params.id) {
      const result = data.find((item) => {
        return item.id == req.params.id;
      });
      res.json(result);
    } else {
      res.json(data);
    }
  }
};

const programPost = async (req, res) => {
  try {
    await req.db("program").insert({ ...req.body, foto: req.file.filename });
    res.send(req.file);
    console.log(req.body);
  } catch (error) {
    res.json(error);
  }
};

const kegiatanPost = async (req, res) => {
  try {
    await req.db("kegiatan").insert({ ...req.body, foto: req.file.filename });
    res.send(req.file);
    console.log(req.body);
  } catch (error) {
    res.json(error);
  }
};

const allPost = async (req, res) => {
  try {
    await req.db(req.params.table).insert(req.body);
    res.json(req.body);
  } catch (error) {
    res.json(error);
  }
};

const programPut = async (req, res) => {
  try {
    await req
      .db("program")
      .update({ ...req.body, foto: req.file.filename })
      .where({ id: req.params.id });
    res.json("berhasil");
  } catch (error) {
    res.json(error);
  }
};
const kegiatanPut = async (req, res) => {
  try {
    req
      .db("program")
      .update({ ...req.body, foto: req.file.filename })
      .where({ id: req.params.id });
    res.json("berhasil");
  } catch (error) {
    res.json(error);
  }
};

const allPut = async (req, res) => {
  try {
     await req
      .db(req.params.table)
      .update(req.body)
      .where({ id: req.params.id });
    res.json("berhasil");
  } catch (error) {
    res.json(error);
  }
};

const allDelete = async (req, res) => {
  try {
    const data = await req.db(req.params.table);

  const index = await data.findIndex((item) => {
    return item.id == req.params.id;
  });
  console.log(index);
  data.slice(index, 1)
  // console.log(data);
  //   data.destroy({
  //   where: { id: req.params.id }
  // });
  res.json("berhasil");
  } catch (error) {
    res.json(error)
  }
  
};

const wilayahpost = async (req, res) => {
  await wilayah.forEach(async (prov) => {
    // await req.db("provinsi").insert({
    //   id: prov.id,
    //   nama: prov.name,
    // });
    await prov.regencies.forEach(async (kab) => {
      // await req.db("kabupaten").insert({
      //   id: kab.id,
      //   nama: kab.name,
      //   idprovinsi: kab.province_id
      // });
      await kab.districts.forEach(async (kec) => {
        // await req.db("kecamatan").insert({
        //   id: kec.id,
        //   nama: kec.name,
        //   idkabupaten: kec.regency_id
        // })
        await kec.villages.forEach(async (kel) => {
          try {
            await req.db("kelurahan").insert({
              id: kel.id,
              nama: kel.name,
              idkecamatan: kel.district_id,
            });
          } catch (error) {
            console.log(error);
          }
        });
      });
    });
  });
  res.json("berhasil");
};

router.get("/", (req, res, next) => res.json("welcome"));
router.get("/pendaftaran/:p/:v", pendaftaranGet);
router.get(["/:table", "/:table/:id"], allGet);

router.post("/provinsi", wilayahpost);
router.post("/program", multer.single("foto"), programPost);
router.post("/kegiatan", multer.single("foto"), kegiatanPost);
router.post("/:table", allPost);

router.put("/program/:id", multer.single("foto"), programPut);
router.put("/kegiatanPut:id", multer.single("foto"), kegiatanPut);
router.put("/:table/:id", allPut);

router.delete("/:table/:id", allDelete);

module.exports = router;
