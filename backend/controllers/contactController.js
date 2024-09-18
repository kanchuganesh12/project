// /controllers/contactController.js

const Contact = require('../models/contactModel');

// Handle contact form submission
exports.submitContactForm = async (req, res) => {
    const { name, email, subject, message } = req.body;

    try {
        // Create a new contact entry
        const newContact = new Contact({
            name,
            email,
            subject,
            message
        });

        // Save to the database
        await newContact.save();

        res.status(201).json({ message: 'Form submitted successfully!' });
    } catch (error) {
        console.error('Error saving contact form:', error);
        res.status(500).json({ message: 'Failed to submit the form. Please try again later.' });
    }
};

// Fetch all contact form submissions (GET)
exports.getContactForms = async (req, res) => {
    try {
        const contacts = await Contact.find(); // Find all entries in the Contact collection
        res.status(200).json(contacts); // Respond with the retrieved data
    } catch (error) {
        console.error('Error retrieving contact forms:', error);
        res.status(500).json({ message: 'Failed to retrieve contact forms.' });
    }
};