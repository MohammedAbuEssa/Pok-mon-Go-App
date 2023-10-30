"use strict";
const multer = require("multer");
module.exports.upload = (fieldName) => {
  const storage = multer.diskStorage({});
  const upload = multer({ storage: storage });
  return upload.single(fieldName);
};
