exports.allGet = async (req, res) => {
  try {
    const result = await req.db("pembayaran");
    console.log("iki");
    res.json(result);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
};
