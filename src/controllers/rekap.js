

exports.currentGet = async (req, res) => {
  try {
    const p = req.params.p;
    const result = req.db("program").where({ id: p }).orWhere({ nama: p });
    res.json(result);
  } catch (error) {
    res.send(error);
    console.log(error);
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

exports.allPut = async (req, res) => {
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

exports.allDel = async (req, res) => {
  try {
    await req.db(req.params.table).del().where({ id: req.params.id });
    res.json("berhasil");
  } catch (error) {
    res.json(error);
  }
};

exports.byProgramGet = async (req, res) => {
  try {
    const p = req.params.p;
    const result = await req
      .db("rekap")
      .select("peserta.nama as peserta", "program.nama as program")
      .join("program", "program.id", "rekap.program")
      .join("peserta", "peserta.id", "rekap.peserta")
      .where("program.id", "=", p)
      .orWhere("program.nama", "=", p)
      .orWhere("program.created_at", "like", `%${p}%`);
    res.send(result);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
};

exports.byPesertaGet = async (req, res) => {
  try {
    const p = req.params.p;
    const result = await req
      .db("rekap")
      .select("peserta.nama as peserta", "program.nama as program")
      .join("program", "program.id", "rekap.program")
      .join("peserta", "peserta.id", "rekap.peserta")
      .where("peserta.id", "=", p)
      .orWhere("peserta.nama", "=", p)
      .orWhere("peserta.nim", "=", p)
      .orWhere("peserta.gender", "=", p)
      .orWhere("peserta.alamat", "like", `%${p}%`)
      .orWhere("peserta.provinsi", "like", `%${p}%`)
      .orderBy("peserta.kabupaten", "like", `%${p}%`)
      .orWhere("peserta.kecamatan", "like", `%${p}%`)
      .orWhere("peserta.kelurahan", "like", `%${p}%`)
      .orWhere("peserta.created_at", "like", `%${p}%`);
    res.json(result);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
 
};
