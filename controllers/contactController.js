const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');

//@desc Get all contacts
//@route GET /api/contacts
//@access private 

const getContact =asyncHandler(async (req, res) => {
    const contacts = await Contact.find({user_id : req.user.id});
    res.status(200).json(contacts);
});

//@desc Create new contact
//@route POST /api/contacts
//@access private 

const createContact =asyncHandler(async (req, res) => {
    // console.log(req.body);
    const {name , email , phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error('All fields are mandatory.');
    }

    const contact = await Contact.create({
        name : name,
        email : email,
        phone : phone,
        user_id : req.user.id
    });

    res.status(201).json(contact);
});

//@desc Get  contact specified by id
//@route GET /api/contacts/:id
//@access private 

const getContactById =asyncHandler(async (req, res) => {

    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error('Contact not found');
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error('User do not have permisson to see other users contact.');
    }
    res.status(200).json(contact);
});

//@desc update  contact specified by id
//@route PUT /api/contacts/:id
//@access private 

const updateContactById =asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error('Contact not found');
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error('User do not have permisson to update other users contact.');
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new : true}
        );

    res.status(200).json(updatedContact);
});

//@desc delete  contact specified by id
//@route DELETE /api/contacts/:id
//@access private 

const deleteContactById =asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error('Contact not found');
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error('User do not have permisson to delete other users contact.');
    }
    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json(contact);
});



module.exports = {
    getContact,
    createContact,
    getContactById,
    updateContactById,
    deleteContactById
};