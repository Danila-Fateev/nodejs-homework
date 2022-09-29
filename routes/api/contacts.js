const express = require("express");

const router = express.Router();

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
  res.json({ message: "template message" });
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
  res.json({ message: "template message" });
});

module.exports = router;
