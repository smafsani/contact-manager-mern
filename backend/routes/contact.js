const { getContacts, addToContact, getContactById, editContact, checkNumber } = require("../controllers/contact");

const router = require("express").Router();

router.get("/", getContacts);

router.get("/check/:number", checkNumber);

router.post("/create", addToContact);

router.get("/find/:id", getContactById);

router.post("/update/:id", editContact);

module.exports = router;