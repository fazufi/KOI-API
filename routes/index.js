const express = require("express");
const router = express.Router();
const multer = require("../helper/multer");

const apiGet = async (req, res) => {
  try {
    const result = await req.db(req.params.table);
    res.json(result);
  } catch ({ code }) {
    res.json(code);
  }
};
//  const upload = async (ctx) => {
//   let returnData = Object.keys(ctx.request.body)
//   returnData.push('id')
//   const result = await db("coba")
//     .insert(ctx.request.body)
//     .returning(returnData)
//   ctx.ok(result[0])
//   console.log(db("coba"));
// }
const uploadPelatihan = async (req, res) => {
  try {
    console.log(req.file.filename, req.body.id);
    await req
      .db("coba")
      // .db("pelatihan")
      .insert({ foto: req.file.filename })
      // .update({ foto: req.file.filename })
      // // .update({ foto: "foto" })
      // .where({ id: req.body.id });
    res.json(req.file);
  } catch (error) {
    res.json(error);
  }
};

router.post("/pelatihan/upload", multer.single("file"), uploadPelatihan);
// router.post("/pelatihan/upload",  upload);
router.get(["/:table", "/:table/:id"], apiGet);
router.get("/", (req, res, next) => res.json("welcome"));

module.exports = router;
