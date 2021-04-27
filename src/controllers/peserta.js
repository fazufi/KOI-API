exports.allGet = async (req, res) => {
  try {
    const result = await req.db("peserta").orderBy("created_at", "asc");
    res.json(result);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
};

exports.currentGet = async (req, res) => {
  try {
    const p = await req.params.p;
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
      .orderBy("created_at", "asc");
    res.json(result);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
};

exports.post = async (req, res) => {
  try {
    const {
      nim,
      nama,
      email,
      password,
      telepon,
      lahir,
      alamat,
      provinsi,
      kabupaten,
      kecamatan,
      kelurahan,
      gender,
      golongan,
      created_at,
      updated_at,
    } = req.body;
    const [isPeserta] = await req.db("peserta").where({ email }).orWhere({ telepon });
    console.log(isPeserta);
    if (!isPeserta) {
      const pst = await req.db("peserta").orderBy("created_at", "asc");
      const i = (await pst.length) - 1;
      let key = "";
      i == -1
        ? (key = 1)
        : pst[i].nim.toString().slice(0, 4) == (await new Date().getFullYear())
          ? (key = (await parseInt(pst[i].nim.toString().slice(4))) + 1)
          : (key = 1);
      const zeroPad = async (num, places) =>
        await String(num).padStart(places, "0");

      req.body.nim =
        (await new Date().getFullYear().toString()) + (await zeroPad(key, 3));
      req.body.created_at = await new Date();
      req.body.updated_at = 0;
      if (
        (nama,
          email,
          password,
          telepon,
          lahir,
          alamat,
          provinsi,
          kabupaten,
          kecamatan,
          kelurahan,
          gender,
          golongan)
      ) {
        await req.db("peserta").insert(req.body);


      } else {
        return res.status(500).json("data tidak lengkap, atau password salah");
      }
    } else {
      console.log(isPeserta);
      req.body.updated_at = await new Date();
      await req.db("peserta").update(req.body).where({ id: isPeserta.id })

    }

    const [result] = await req.db("peserta").where({ email });

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
