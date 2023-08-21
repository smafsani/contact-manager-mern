const { getContacts, addToContact, getContactById, editContact, checkNumber, deleteContact, getContactBySearch, addToHistory, getHistories, deleteHistory, getRecentContacts, getRecentHistories, getMostUsedContacts } = require("../controllers/contact");

const router = require("express").Router();

router.get("/", getContacts);

router.get("/check/:number", checkNumber);

router.post("/create", addToContact);

router.get("/find/:id", getContactById);

router.get("/search/:value", getContactBySearch);

router.post("/update/:id", editContact);

router.get("/delete/:id", deleteContact);

router.post("/history/store", addToHistory);

router.get("/histories", getHistories);

router.get("/history/delete/:id", deleteHistory);

router.get("/recent/contacts", getRecentContacts);

router.get("/most-used/contacts", getMostUsedContacts);

router.get("/recent/histories", getRecentHistories);


module.exports = router;