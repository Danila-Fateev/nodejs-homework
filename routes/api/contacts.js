const express = require("express");

const router = express.Router();
const Joi = require("joi");
const shortid = require("shortid");

const contactSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  phone: Joi.string()
    .pattern(/^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/)
    .required(),
});

const contactsFunctions = require("../../models/contacts");

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
    const value = await contactSchema.validate(req.body);

    const newContact = {
      id: shortid.generate(),
      ...req.body,
    };

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

module.exports = router;
