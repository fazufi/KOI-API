exports.result = async (req, res) => {
  // const data = req.db("peserta").insert(req.body)
  // console.log(data)
  await req.db("pembayaran").insert(req.body)
  console.log(req.body)
  res.json("rekap berhasil")
}


exports.allGet = async (req, res) => {
  try {
    const result = await req.db("pembayaran")
    res.json(result);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
};

