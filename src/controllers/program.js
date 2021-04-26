exports.allGet = async (req, res) => {
  try {
    const result = await req.db("program").orderBy("created_at", "desc");
   
    res.json(result);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
};

exports.currentGet = async (req, res) => {
  try {
    const p = req.params.p;
    const [result] = await req.db("program").where({ id: p }).orWhere({ nama: p });
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
    await req.db("program").insert({ ...req.body, foto: req.file.filename });

    res.send(req.file);
  } catch (error) {
    console.log(error);
    res.send(error)
  }
};

exports.put = async (req, res) => {
  try {
    const [ref] = await req.db("program").where({ id: req.params.id });

    const large = await path.join(__dirname, "../../public/large/", ref.foto);
    const small = await path.join(__dirname, "../../public/small/", ref.foto);
    await fs.unlinkSync(large);
    await fs.unlinkSync(small);

    await sharp(req.file.path)
      .resize(200)
      .toFile(path.join(__dirname, "../../public/small/", req.file.filename));

    req.body.updated_at = await new Date();
    await req
      .db("program")
      .update({ ...req.body, foto: req.file.filename })
      .where({ id: req.params.id });
    res.json(req.file);
  } catch (error) {
    res.json(error);
  }
};

exports.del = async (req, res) => {
  try {
    const [ref] = await req.db("program").where({ id: req.params.id });

    const large = await path.join(__dirname, "../../public/large/", ref.foto);
    const small = await path.join(__dirname, "../../public/small/", ref.foto);
    await fs.unlinkSync(large);
    await fs.unlinkSync(small);
    await req.db("program").del().where({ id: req.params.id });
    res.json("berhasil dihapus");
  } catch (error) {
    res.json(error);
  }
};

