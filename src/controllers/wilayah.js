const wilayah = require("../../JSON/wilayah.json");

exports.get = async (req, res) => {
  try {
    let result = "";
    const { iprov, ikab, ikec } =  req.query;
    const iprovRequired = "Index provinsi harus diisi";
    const ikabRequired = "Index kabupaten harus diisi";
    if (ikec) {
      if (!iprov) {
        result = iprovRequired;
      } else if (!ikab) {
        result = ikabRequired;
      } else {
        result = wilayah[iprov].regencies[ikab].districts[ikec].villages.map(
          (v) => v.name
        );
      }
    } else if (ikab) {
      if (!iprov) {
        result = iprovRequired;
      } else {
        result = wilayah[iprov].regencies[ikab].districts.map((v) => v.name);
      }
    } else if (iprov) {
      result = wilayah[iprov].regencies.map((v) => v.name);
    } else {
      result = wilayah.map((v) => v.name);
    }
    return res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};
