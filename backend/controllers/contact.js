const Contact = require("../models/Contact");

const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json({ contacts });
    } catch (error) {
        res.status(400).json({ error: "Failed To Load!" });
    }
};

const getContactById = async (req, res) => {
    const { id } = req.params;
    try {
        const contact = await Contact.findById(id);
        res.status(200).json({ contact });
    } catch (error) {
        res.status(400).json({ error: "Failed To Load!" });
    }
}

const getContactBySearch = async (req, res) => {
    const { value } = req.params;
    try {
        const contacts = await Contact.find({
            $or: [
                { name: { $regex: value, $options: "i" } },
                { phone: { $elemMatch: { $regex: value, $options: "i" } } },  
            ]
        });
        res.status(200).json({ contacts });
    } catch (error) {
        res.status(400).json({ error: "Failed To Load!" });
    }
}

const addToContact = async (req, res) => {
    try {
        const { name, phone, email, address } = req.body;
        if (!phone) {
            return res.status(400).json({ error: "You must provide a phone number." });
        }
        let mainName = name;
        if (!name) {
            mainName = phone;
        }
        const contact = new Contact({ name: mainName, phone: [phone], email: email, address: address });
        await contact.save();
        res.status(200).json({ contact });
    } catch (error) {
        res.status(400).json({ error: "Contact cannot be added!" });
    }
};

const editContact = async (req, res) => {
    try {
        const { name, phone, email, address } = req.body;
        const { id } = req.params;
        let hasNumber = 0;
        let hasNumberValue = '';
        phone.forEach(element => {
            if (element.length > 0) {
                hasNumber = 1;
                hasNumberValue = element;
                return;
            }
        });
        if (hasNumber === 0) {
            return res.status(400).json({ error: "You must provide a phone number." });
        }

        let mainName = name;
        if (!name) {
            mainName = hasNumberValue;
        }
        const updatedContact = await Contact.findByIdAndUpdate(id, { name: mainName, phone: phone, email: email, address: address }, { new: true });
        res.status(200).json({ contact: updatedContact });
    } catch (error) {
        res.status(400).json({ error: "Contact cannot be updated!" });
    }
};

const checkNumber = async (req, res) => {
    const { number } = req.params;
    try {
        const isExist = await Contact.findOne({ phone: { $elemMatch: { $eq: number } } });
        if (isExist) {
            return res.json({ status: 200, contact: isExist });
        }
        else {
            return res.json({ status: 400, error: "Not Found" });
        }
    } catch (error) {
        return res.json({ status: 400, error: "Not Found" });
    }
};

const deleteContact = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedContact = await Contact.findByIdAndDelete(id);
        if (updatedContact) {
            return res.status(200).json({ contact: "Contact deleted successfully!" });
        }
        return res.status(400).json({ contact: "Contact cannot be deleted!" });
    } catch (error) {
        res.status(400).json({ error: "Contact cannot be deleted!" });
    }
};

module.exports = {
    getContacts,
    addToContact,
    getContactById,
    getContactBySearch,
    editContact,
    deleteContact,
    checkNumber
}