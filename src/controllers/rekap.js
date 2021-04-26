exports.getByProgram = async (req, res) => {
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

exports.getByPeserta = async (req, res) => {
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
      .orWhere("peserta.kabupaten", "like", `%${p}%`)
      .orWhere("peserta.kecamatan", "like", `%${p}%`)
      .orWhere("peserta.kelurahan", "like", `%${p}%`)
      .orWhere("peserta.created_at", "like", `%${p}%`);
    //jadikan query
    res.json(result);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
};



exports.put = async (req, res) => {
  try {
    await req
      .db("rekap")
      .update(req.body)
      .where({ id: req.params.id });
    res.json("berhasil diupdate");
  } catch (error) {
    res.json(error);
    console.log(error);
  }
};

exports.del = async (req, res) => {
  try {
    await req.db("rekap").del().where({ id: req.params.id });
    res.json("berhasil dihapus");
  } catch (error) {
    res.json(error);
    console.log(error);
  }
};