const fs = require("fs");
const sharp = require("sharp");
const path = require("path");

exports.allGet = async (req, res) => {
  try {
    const result = await req.db("galeri").orderBy("created_at", "asc");
    res.json(result);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
};

exports.currentGet = async (req, res) => {
  try {
    const [result] = await req.db("galeri").where({ id: req.params.id });
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
    req.body.created_at = await new Date();
    req.body.updated_at = await 0;
    await req.db("galeri").insert({ ...req.body, foto: req.file.filename });

    res.send(req.file);
  } catch (error) {
    console.log(error);
    res.status(500).send("errrrroooooor");
  }
};

exports.put = async (req, res) => {
  try {
    const [ref] = await req.db("galeri").where({ id: req.params.id });

    const large = await path.join(__dirname, "../../public/large/", ref.foto);
    const small = await path.join(__dirname, "../../public/small/", ref.foto);
    await fs.unlinkSync(large);
    await fs.unlinkSync(small);

    await sharp(req.file.path)
      .resize(200)
      .toFile(path.join(__dirname, "../../public/small/", req.file.filename));

    req.body.updated_at = await new Date();
    await req
      .db("galeri")
      .update({ ...req.body, foto: req.file.filename })
      .where({ id: req.params.id });
    res.json(req.file);
  } catch (error) {
    res.json(error);
  }
};

exports.del = async (req, res) => {
  try {
    const [ref] = await req.db("galeri").where({ id: req.params.id });

    const large = await path.join(__dirname, "../../public/large/", ref.foto);
    const small = await path.join(__dirname, "../../public/small/", ref.foto);
    await fs.unlinkSync(large);
    await fs.unlinkSync(small);
    await req.db("galeri").del().where({ id: req.params.id });
    res.json("berhasil dihapus");
  } catch (error) {
    res.json(error);
  }
};
