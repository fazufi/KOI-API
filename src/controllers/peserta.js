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

const zeroPad = (num, places) => String(num).padStart(places, "0");
const k = 12 + 1;
// if (k.toString().length > 1){
console.log(zeroPad(k, 1)); // "05"
// }
// ganti tahun:
const h = new Date().getFullYear();
console.log(h);
if (h !== 2019) {
  console.log("2021" + 1);
}
// console.log( );

// console.log(zeroPad(5, 4)); // "0005"
// console.log(zeroPad(5, 6)); // "000005"
// console.log(zeroPad(1234, 2)); // "1234"

exports.post = async (req, res) => {
  try {
    const email = req.body.email;
    const [isPeserta] = await req.db("peserta").where({ email });

    if (!isPeserta) {
      const pst = await req.db("peserta").orderBy("nim", "asc");
      const i = (await pst.length) - 1;
      let key = "";
      i == -1
        ? (key = 1)
        : (key = (await parseInt(pst[i].nim.toString().slice(4))) + 1);
      const zeroPad = async (num, places) =>
        await String(num).padStart(places, "0");

      req.body.nim =
        (await new Date().getFullYear().toString()) + (await zeroPad(key, 3));
      req.body.created_at = await new Date();
      req.body.updated_at = 0;
      await req.db("peserta").insert(req.body);

      const peserta = await req.db("peserta").where({ email });
      const program = await req.db("program").orderBy("created_at", "asc");
      const idpeserta = await peserta[0].id;
      const idprogram = await program[0].id;
      await req.db("rekap").insert({ peserta: idpeserta, program: idprogram });
    } else {
      req.body.updated_at = await new Date();
      await req.db("peserta").update(req.body).where({ email });

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
