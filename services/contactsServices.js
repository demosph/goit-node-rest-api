import Contact from '../db/models/contacts.js';

async function listContacts(queryOptions = {}) {
  return await Contact.findAll(queryOptions);
}

async function getContactById(contactId) {
  const contact = await Contact.findByPk(contactId);
  return contact || null;
}

async function updateContact(contactId, updatedFields) {
  const contact = await Contact.findByPk(contactId);
  if (!contact) return null;
  await contact.update(updatedFields);
  return contact;
}

async function removeContact(contactId) {
  const contact = await Contact.findByPk(contactId);
  if (!contact) return null;
  await contact.destroy();
  return contact;
}

async function addContact(name, email, phone, owner) {
  return await Contact.create({ name, email, phone, owner });
}

async function updateContactStatus(contactId, body) {
  const contact = await Contact.findByPk(contactId);
  if (!contact) return null;
  await contact.update(body);
  return contact;
}

export {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateContactStatus
};