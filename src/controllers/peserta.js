
exports.allGet = async (req, res) => {
  try {
    const result = await req.db("peserta").orderBy("nim", "asc");
    res.json(result);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
};

exports.currentGet = async (req, res) => {
  try {
    const p = req.params.p;
    const result = await req
      .db("peserta")
      .where({ id: p })
      .orWhere({ nim: p })
      .orWhere({ nama: p })
      .orWhere({ gender: p })
      .orWhere("lahir", "like", `%${p}%`)
      .orWhere("alamat", "like", `%${p}%`)
      .orWhere("provinsi", "like", `%${p}%`)
      .orderBy("kabupaten", "like", `%${p}%`)
      .orWhere("kecamatan", "like", `%${p}%`)
      .orWhere("kelurahan", "like", `%${p}%`)
      .orWhere("created_at", "like", `%${p}%`)
      .orderBy("nim", "asc");
    res.json(result);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
};

exports.post = async (req, res) => {
  try {
    const [isPeserta] = await req
      .db("peserta")
      .where({ email: req.body.email });
    if (!isPeserta) {
      req.body.nim =
        (await new Date().getFullYear().toString().slice(2, 4)) +
        Math.floor(Math.random() * 5);
      req.body.created_at = await new Date();
      req.body.updated_at = 0
      await req.db("peserta").insert(req.body);
    } else {
      req.body.updated_at = await new Date();
      await req.db("peserta").update(req.body).where({ email: req.body.email });
    }
    const [result] = await req.db("peserta").where({ email: req.body.email });
    res.json(result);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
};

exports.del = async (req, res) => {
  try {
    await req.db("peserta").del().where({ id: req.params.id });
    res.json("berhasil dihapus");
  } catch (error) {
    res.json(error);
    console.log(error);
  }
};
