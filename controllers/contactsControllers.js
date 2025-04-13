import {
  listContacts as listContactsService,
  getContactById as getContactByIdService,
  removeContact as removeContactService,
  addContact as addContactService,
  updateContact as updateContactService,
  updateContactStatus as updateContactStatusService,
} from "../services/contactsServices.js";

import HttpError from "../helpers/HttpError.js";

// GET /api/contacts
export const listContacts = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, favorite } = req.query;
    const offset = (page - 1) * limit;

    const where = { owner: req.user.id };
    if (favorite !== undefined) {
      where.favorite = favorite === 'true';
    }

    const contacts = await listContactsService({ where, limit: Number(limit), offset: Number(offset) });

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

    if (!contact || contact.owner !== req.user.id) {
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
    const contact = await removeContactService(id);

    if (!contact || contact.owner !== req.user.id) {
      throw HttpError(404, "Not found");
    }

    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

// POST /api/contacts
export const addContact = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const newContact = await addContactService(name, email, phone, req.user.id);
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

    const contact = await getContactByIdService(id);
    if (!contact || contact.owner !== req.user.id) {
      throw HttpError(404, "Not found");
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

// PATCH /api/contacts/:id/favorite
export const updateContactStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { favorite } = req.body;

    const contact = await getContactByIdService(id);
    if (!contact || contact.owner !== req.user.id) {
      throw HttpError(404, "Not found");
    }

    const updatedContact = await updateContactStatusService(id, { favorite });

    if (!updatedContact) {
      throw HttpError(404, "Not found");
    }

    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
};
