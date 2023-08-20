const { getContacts, addToContact, getContactById, editContact, checkNumber, deleteContact, getContactBySearch } = require("../controllers/contact");

const router = require("express").Router();

router.get("/", getContacts);

router.get("/check/:number", checkNumber);

router.post("/create", addToContact);

router.get("/find/:id", getContactById);

router.get("/search/:value", getContactBySearch);

router.post("/update/:id", editContact);

router.get("/delete/:id", deleteContact);

module.exports = router;