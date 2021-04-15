const fs = require("fs");
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
    await req.db("galeri").insert({ foto: req.file.filename });
    res.send(req.file);
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
    const file = (await `${__dirname}/../public/`) + ref.foto;
    await fs.unlinkSync(file);
    await req.db("galeri").update({foto: req.file.filename}).where({ id: req.params.id });
    res.json(req.file);
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

exports.galeriDel = async (req, res) => {
  try {
    const table = await req.db("galeri");
    const ref = await table.find((item) => {
      return item.id == req.params.id;
    });
    const file = (await `${__dirname}/../public/`) + ref.foto;
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

exports.wilayahpost = async (req, res) => {
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
