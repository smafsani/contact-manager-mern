const Contact = require("../models/Contact");
const History = require("../models/History");

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

const addToHistory = async (req, res) => {
    try {
        const { to, type, message, date } = req.body;
        if (!to || !type) {
            return res.status(400).json({ error: "You must fill the required fields!" });
        }
        const contact = await Contact.findById(to);
        if (!contact) {
            return res.status(400).json({ error: "No contact found!" });
        }
        const newHistory = new History({
            receiver: contact._id,
            contactType: type,
            message: message,
            date: date
        });
        await newHistory.save();
        const histories = await History.find().populate('receiver').sort({ date: -1 });
        return res.status(200).json({ histories });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: "Cannot be added to history!" });
    }
}

const getHistories = async (req, res) => {
    try {
        const histories = await History.find().populate('receiver').sort({ date: -1 });
        res.status(200).json({ histories });
    } catch (error) {
        res.status(400).json({ error: "No Data Found" });
    }
};

const deleteHistory = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedHistory = await History.findByIdAndDelete(id);
        if (updatedHistory) {
            return res.status(200).json({ contact: "History deleted successfully!" });
        }
        return res.status(400).json({ contact: "History cannot be deleted!" });
    } catch (error) {
        res.status(400).json({ error: "History cannot be deleted!" });
    }
};

const getRecentContacts = async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ _id: -1 }).limit(5);
        res.status(200).json({ contacts });
    } catch (error) {
        res.status(400).json({ error: "Failed To Load!" });
    }
};

const getMostUsedContacts = async (req, res) => {
    try {
        const mostUsedContacts = await History.aggregate([
            {
                $group: {
                    _id: "$receiver",
                    count: { $sum: 1 },
                },
            },
            {
                $sort: { count: -1 },
            },
            {
                $limit: 5,
            },
        ]);
        const receiverIds = mostUsedContacts.map(item => item._id);

        const contacts = await Contact.find({ _id: { $in: receiverIds } });

        res.status(200).json({ contacts });
    } catch (error) {
        res.status(400).json({ error: "Failed To Load!" });
    }
};

const getRecentHistories = async (req, res) => {
    try {
        const histories = await History.find().sort({ date: -1 }).limit(5).populate('receiver');
        res.status(200).json({ histories });
    } catch (error) {
        res.status(400).json({ error: "Failed To Load!" });
    }
};

module.exports = {
    getContacts,
    addToContact,
    getContactById,
    getContactBySearch,
    editContact,
    deleteContact,
    addToHistory,
    checkNumber,
    getHistories,
    deleteHistory,
    getRecentContacts,
    getMostUsedContacts,
    getRecentHistories

}