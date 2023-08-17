const { getContacts, addToContact } = require("../controllers/contact");

const router = require("express").Router();

router.get("/", getContacts);

router.post("/create", addToContact);

module.exports = router;