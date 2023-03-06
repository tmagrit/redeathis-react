const express = require("express");

const router = express.Router();

const files = require("./files");
const deletefile = require("./deletefile");
const updatefile = require("./updatefile");

router.get("/files", files);
router.get("/deletefile", deletefile);
router.get("/updatefile", updatefile);

module.exports = router;