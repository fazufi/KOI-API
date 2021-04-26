async function rekap(req, res) {
  // const data = req.db("peserta").insert(req.body)
  // console.log(data)
  await req.db("pembayaran").insert(req.body)
  console.log(req.body)
  res.json("rekap berhasil")
}

module.exports = rekap;
