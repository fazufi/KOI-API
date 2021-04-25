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
    let {
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
    const [isPeserta] = await req.db("peserta").where({ email, password });

    if (!isPeserta) {
      const pst = await req.db("peserta").orderBy("nim", "asc");
      const i = (await pst.length) - 1;
      let key = "";
      i == -1
        ? (key = 1)
        : (key = (await parseInt(pst[i].nim.toString().slice(4))) + 1);
      const zeroPad = async (num, places) =>
        await String(num).padStart(places, "0");

      nim =
        (await new Date().getFullYear().toString()) + (await zeroPad(key, 3));
      created_at = await new Date();
      updated_at = 0;
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
        await req.db("peserta").insert({
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
        });

        const peserta = await req.db("peserta").where({ email });
        const program = await req.db("program").orderBy("created_at", "asc");
        const idpeserta = await peserta[0].id;
        const idprogram = await program[0].id;
        await req
          .db("rekap")
          .insert({ peserta: idpeserta, program: idprogram });
      } else {
        return res.status(500).json("data tidak lengkap, atau password salah");
      }
    } else {
      req.body.updated_at = await new Date();
      await req.db("peserta").update(req.body).where({ email, password });

      const peserta = await req.db("peserta").where({ email });
      const program = await req.db("program").orderBy("created_at", "asc");
      const idpeserta = await peserta[0].id;
      const idprogram = await program[0].id;
      await req.db("rekap").insert({ peserta: idpeserta, program: idprogram });
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
