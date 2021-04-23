const fs = require("fs");
const sharp = require("sharp");
const path = require("path");
const wilayah = require("../../JSON/wilayah.json");

exports.allGet = async (req, res) => {
  try {
    const result = req.db("program").orderBy("created_at", "desc");
    res.json(result);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
};

exports.currentGet = async (req, res) => {
  try {
    const p = req.params.p;
    const result = req.db("program").where({ id: p }).orWhere({ nama: p });
    res.json(result);
  } catch (error) {
    res.send(error)
    console.log(error);
  }
};

exports.post = async (req, res) => {
  try {
    req.body.created_at = await new Date();
    req.body.updated_at = await 0;
    await req.db("program").insert(req.body);

    res.json(req.body);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
};

exports.put = async (req, res) => {
  try {
    req.body.updated_at = await new Date();
    const result = await req
      .db("program")
      .update(req.body)
      .where({ id: req.params.id });
    res.json(result);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
};

exports.del = async (req, res) => {
  try {
    await req.db("program").del().where({ id: req.params.id });
    res.json("berhasil dihapus");
  } catch (error) {
    res.send(error);
    console.log(error);
  }
};
