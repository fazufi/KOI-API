const fs = require("fs");
const sharp = require("sharp");
const path = require("path");
const wilayah = require("../JSON/wilayah.json");

exports.rekapGet = async (req, res) => {
  if (req.params.p == "namaPeserta") {
    const result = await req
      .db("rekap")
      .select("peserta.nama as peserta", "program.nama as program")
      .join("program", "program.id", "rekap.program")
      .join("peserta", "peserta.id", "rekap.peserta")
      .where("peserta.nama", "=", req.params.v);
    // .where({program: '79f45e1d-97b5-11eb-99e7-7062b824f60e' })
    // .where({ ['peserta.nama']: 'joni' })
    // .where("peserta.nama", "like", "jon%");
    res.send(result);
  }
  if (req.params.p == "idPeserta") {
    const result = await req
      .db("rekap")
      .select("peserta.nama as peserta", "program.nama as program")
      .join("program", "program.id", "rekap.program")
      .join("peserta", "peserta.id", "rekap.peserta")
      .where("peserta.id", "=", req.params.v);
    res.send(result);
  }
  if (req.params.p == "namaPeserta") {
    const result = await req
      .db("rekap")
      .select("peserta.nama as peserta", "program.nama as program")
      .join("program", "program.id", "rekap.program")
      .join("peserta", "peserta.id", "rekap.peserta")
      .where("peserta.nama", "=", req.params.v);
    res.send(result);
  }
  if (req.params.p == "NIMPeserta") {
    const result = await req
      .db("rekap")
      .select("peserta.nama as peserta", "program.nama as program")
      .join("program", "program.id", "rekap.program")
      .join("peserta", "peserta.id", "rekap.peserta")
      .where("peserta.NIM", "=", req.params.v);
    res.send(result);
  }
  if (req.params.p == "namaProgram") {
    const result = await req
      .db("rekap")
      .select("peserta.nama as peserta", "program.nama as program")
      .join("program", "program.id", "rekap.program")
      .join("peserta", "peserta.id", "rekap.peserta")
      .where("program.nama", "=", req.params.v);
    res.send(result);
  }
  if (req.params.p == "idProgram") {
    const result = await req
      .db("rekap")
      .select("peserta.nama as peserta", "program.nama as program")
      .join("program", "program.id", "rekap.program")
      .join("peserta", "peserta.id", "rekap.peserta")
      .where("program.id", "=", req.params.v);
    res.send(result);
  }
  if (req.params.p == "ikhwan") {
    const result = await req
      .db("rekap")
      .select("peserta.nama as peserta", "program.nama as program")
      .join("program", "program.id", "rekap.program")
      .join("peserta", "peserta.id", "rekap.peserta")
      .where("peserta.gender", "=", "ikhwan")
      .where("program.nama", "=", req.params.v);
    res.send(result);
  }
  if (req.params.p == "akhwat") {
    const result = await req
      .db("rekap")
      .select("peserta.nama as peserta", "program.nama as program")
      .join("program", "program.id", "rekap.program")
      .join("peserta", "peserta.id", "rekap.peserta")
      .where("peserta.gender", "=", "akhwat")
      .where("program.nama", "=", req.params.v);
    res.send(result);
  }
};

exports.allGet = async (req, res) => {
  if (req.params.table !== "rekap") {
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

exports.galeriPost = async (req, res) => {
  try {
    await sharp(req.file.path).resize(200).toFile(path.join(__dirname, "../public/small/", req.file.filename));
    await req.db("galeri").insert({ foto: req.file.filename });

    res.send(req.file);
  } catch (error) {
    console.log(error);
    res.status(500).send("errrrroooooor");
  }
};

exports.pesertaPost = async (req, res) => {
  try {
    const ref = await req.db("peserta");
    const no = (await ref.length) + 1;
    console.log("masuk");
    await req.db("peserta").insert({
      ...req.body,

      NIM: new Date().getFullYear() + no.toString(),
    });
    res.json(req.body);
  } catch (error) {
    res.json(error);
  }
};

exports.allPost = async (req, res) => {
  try {
    await req.db(req.params.table).insert(req.body);
    res.json(req.body);
  } catch (error) {
    res.json(error);
  }
};

exports.galeriPut = async (req, res) => {
  try {
    const table = await req.db("galeri");
    const ref = await table.find((item) => {
      return item.id == req.params.id;
    });
    const file1 = path.join(__dirname, "../public/large/", ref.foto);
    const file2 = path.join(__dirname, "../public/small/", ref.foto);
    await fs.unlinkSync(file1);
    await fs.unlinkSync(file2);

    await sharp(req.file.path).resize(200).toFile(path.join(__dirname, "../public/small/", req.file.filename));

    await req.db("galeri").update({ foto: req.file.filename }).where({ id: req.params.id });
    res.json(req.file);
  } catch (error) {
    res.json(error);
  }
};

exports.allPut = async (req, res) => {
  try {
    await req.db(req.params.table).update(req.body).where({ id: req.params.id });
    res.json("berhasil");
  } catch (error) {
    res.json(error);
  }
};

exports.galeriDel = async (req, res) => {
  try {
    const table = await req.db("galeri");
    const ref = await table.find((item) => {
      return item.id == req.params.id;
    });
    // const file = (await `${__dirname}/../public/small`) + ref.foto;
    const file = path.join(__dirname, "../public/small/", ref.foto);
    await fs.unlinkSync(file);
    await req.db("galeri").del().where({ id: req.params.id });
    res.json("berhasil");
  } catch (error) {
    res.json(error);
  }
};

exports.allDel = async (req, res) => {
  try {
    await req.db(req.params.table).del().where({ id: req.params.id });
    res.json("berhasil");
  } catch (error) {
    res.json(error);
  }
};

exports.wilayahGet = async (req, res) => {
  try {
    let result = "";
    const { iprov, ikab, ikec, ikel } = req.query;
    const iprovRequired = "Index provinsi harus diisi";
    const ikabRequired = "Index kabupaten harus diisi";
    if (ikec) {
      if (!iprov) {
        result = iprovRequired;
      } else if (!ikab) {
        result = ikabRequired;
      } else {
        result = wilayah[iprov].regencies[ikab].districts[ikec].villages.map((v) => v.name);
      }
    } else if (ikab) {
      if (!iprov) {
        result = iprovRequired;
      } else {
        result = wilayah[iprov].regencies[ikab].districts.map((v) => v.name);
      }
    } else if (iprov) {
      result = wilayah[iprov].regencies.map((v) => v.name);
    } else {
      result = wilayah.map((v) => v.name);
    }
    return res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};
