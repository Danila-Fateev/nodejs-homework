const express = require("express");

const router = express.Router();
const Joi = require("joi");
const { contactJoiSchema } = require("../../models/contact");

const contactsFunctions = require("../../controllers/contacts");

router.get("/", async (req, res, next) => {
  try {
    const result = await contactsFunctions.listContacts();
    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const result = await contactsFunctions.getContactById(contactId);
    res.json({ result });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const value = await contactJoiSchema.validate(req.body);

    const newContact = req.body;

    if (!value) {
      throw new Error({ message: "Invalid contact data" });
    }
    const result = await contactsFunctions.addContact(newContact);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  try {
    await contactsFunctions.removeContact(contactId);
    res.json({ message: "Contact removed" });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.put("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const result = await contactsFunctions.updateContact(contactId, req.body);
    return result;
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.put("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const result = await contactsFunctions.updateFavoriteContact(
      contactId,
      req.body
    );
    return result;
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
