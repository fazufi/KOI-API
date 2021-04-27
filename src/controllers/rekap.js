exports.allGet = async (req, res) => {
  try {
    const result = await req.db("rekap")
    res.json(result)
  } catch (error) {
    console.log(error)
  }
}

exports.currentGet = async (req, res) => {
  try {
    const result = await req.db("rekap").where({ id: req.params.id })
    res.json(result)
  } catch (error) {
    console.log(error)
  }
}


exports.getByProgram = async (req, res) => {
  try {
    const p = req.params.p;
    const result = await req
      .db("rekap")
      .select("peserta.nama as peserta", "peserta.nim as nim",  "program.nama as program", "order_id", "payment_type", "transaction_status", "settlement_time", "transaction_time" )
      .join("program", "program.id", "rekap.program")
      .join("peserta", "peserta.id", "rekap.peserta")
      .where("program.id", "=", p)
      .orWhere("program.nama", "like", `%${p}%`)
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
      .select("peserta.nama as peserta", "peserta.nim as nim",  "program.nama as program", "order_id", "payment_type", "transaction_status", "settlement_time", "transaction_time" )
      .join("program", "program.id", "rekap.program")
      .join("peserta", "peserta.id", "rekap.peserta")
      .where("peserta.id", "=", p)
      .orWhere("peserta.gender", "=", p)
      .orWhere("peserta.nama", "like", `%${p}%`)
      .orWhere("peserta.nim", "like", `%${p}%`)      
      .orWhere("peserta.alamat", "like", `%${p}%`)
      .orWhere("peserta.provinsi", "like", `%${p}%`)
      .orWhere("peserta.kabupaten", "like", `%${p}%`)
      .orWhere("peserta.kecamatan", "like", `%${p}%`)
      .orWhere("peserta.kelurahan", "like", `%${p}%`)
      .orWhere("peserta.created_at", "like", `%${p}%`);

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

exports.post = async (req, res) => {
  try {
    await req
      .db("rekap")
      .insert(req.body)
    res.json(rea.body);
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