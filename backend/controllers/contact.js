const Contact = require("../models/Contact");

const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json({contacts});
    } catch (error) {
        res.status(400).json({error: "Failed To Load!"});
    }
};

const addToContact = async (req, res) => {
    try {
        const {name, phone, email, address} = req.body;
        if(!phone){
            return res.status(400).json({error: "You must provide a phone number."});
        }
        const alreadyAdded = await Contact.findOne({phone : {$elemMatch: {$eq : phone}}});
        if(alreadyAdded){
            return res.status(300).json({error: "Phone number already added.", existing: true, contact: alreadyAdded});
        }
        let mainName = name;
        if(!name){
            mainName = phone;
        }
        const contact = new Contact({name: mainName, phone: [phone], email: email, address: address});
        await contact.save();
        res.status(200).json({contact});
    } catch (error) {
        res.status(400).json({error: "Contact cannot be added!"});
    }
};

module.exports = {
    getContacts,
    addToContact
}