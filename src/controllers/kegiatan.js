const fs = require("fs");
const sharp = require("sharp");
const path = require("path");

exports.allGet = async (req, res) => {
  try {
    const result = await req.db("kegiatan").orderBy("created_at", "desc");
    res.json(result);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
};

exports.currentGet = async (req, res) => {
  try {
    const p = req.params.p;
    const [result] = await req
      .db("kegiatan")
      .where({ id: p })
      .orWhere({ nama: p });
    res.json(result);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
};

exports.post = async (req, res) => {
  try {
    await sharp(req.file.path)
      .resize(200)
      .toFile(path.join(__dirname, "../../public/small/", req.file.filename));
    req.body.foto = await req.file.filename;
    req.body.created_at = await new Date();
    req.body.updated_at = await 0;
    await req.db("kegiatan").insert(req.body);

    res.json(req.body);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

exports.put = async (req, res) => {
  try {
    const [ref] = await req.db("kegiatan").where({ id: req.params.id });

    const large = await path.join(__dirname, "../../public/large/", ref.foto);
    const small = await path.join(__dirname, "../../public/small/", ref.foto);
    await fs.unlinkSync(large);
    await fs.unlinkSync(small);

    await sharp(req.file.path)
      .resize(200)
      .toFile(path.join(__dirname, "../../public/small/", req.file.filename));
    req.body.foto = await req.file.filename;
    req.body.updated_at = await new Date();
    await req.db("kegiatan").update(req.body).where({ id: req.params.id });
    res.json(req.body);
  } catch (error) {
    res.json(error);
  }
};

exports.del = async (req, res) => {
  try {
    const [ref] = await req.db("kegiatan").where({ id: req.params.id });

    const large = await path.join(__dirname, "../../public/large/", ref.foto);
    const small = await path.join(__dirname, "../../public/small/", ref.foto);
    await fs.unlinkSync(large);
    await fs.unlinkSync(small);
    await req.db("kegiatan").del().where({ id: req.params.id });
    res.json("berhasil dihapus");
  } catch (error) {
    res.json(error);
    console.log(error);
  }
};
