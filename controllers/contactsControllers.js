import {
  listContacts as listContactsService,
  getContactById as getContactByIdService,
  removeContact as removeContactService,
  addContact as addContactService,
  updateContact as updateContactService,
} from "../services/contactsServices.js";

import HttpError from "../helpers/HttpError.js";

// GET /api/contacts
export const listContacts = async (req, res, next) => {
  try {
    const contacts = await listContactsService();
    res.status(200).json(contacts);
  } catch (error) {
      next(error);
  }
};

// GET /api/contacts/:id
export const getContactById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await getContactByIdService(id);
    if (!contact) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json(contact);
  } catch (error) {
      next(error);
  }
};

// DELETE /api/contacts/:id
export const removeContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await removeContactService(id);
    if (!deleted) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json(deleted);
  } catch (error) {
      next(error);
  }
};

// POST /api/contacts
export const addContact = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const newContact = await addContactService(name, email, phone);
    res.status(201).json(newContact);
  } catch (error) {
      next(error);
  }
};

// PUT /api/contacts/:id
export const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;

    if (!body || Object.keys(body).length === 0) {
      throw HttpError(400, "Body must have at least one field");
    }

    const updated = await updateContactService(id, body);
    if (!updated) {
      throw HttpError(404, "Not found");
    }

    res.status(200).json(updated);
  } catch (error) {
      next(error);
  }
};