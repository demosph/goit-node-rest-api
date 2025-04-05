import express from 'express';
import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateContactStatus
} from '../controllers/contactsControllers.js';

import {
  createContactSchema,
  updateContactSchema,
} from '../schemas/contactsSchemas.js';

import validateBody from '../helpers/validateBody.js';

const contactsRouter = express.Router();

contactsRouter.get('/', listContacts);
contactsRouter.get('/:id', getContactById);
contactsRouter.delete('/:id', removeContact);
contactsRouter.post('/', validateBody(createContactSchema), addContact);
contactsRouter.put('/:id', validateBody(updateContactSchema), updateContact);
contactsRouter.patch('/:id/favorite', updateContactStatus);

export default contactsRouter;