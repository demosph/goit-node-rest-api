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
  updateStatusContactSchema
} from '../schemas/contactsSchemas.js';

import auth from '../middlewares/auth.js';
import validateBody from '../helpers/validateBody.js';

const contactsRouter = express.Router();
contactsRouter.use(auth);

contactsRouter.get('/', listContacts);
contactsRouter.get('/:id', getContactById);
contactsRouter.delete('/:id', removeContact);
contactsRouter.post('/', validateBody(createContactSchema), addContact);
contactsRouter.put('/:id', validateBody(updateContactSchema), updateContact);
contactsRouter.patch('/:id/favorite', validateBody(updateStatusContactSchema), updateContactStatus);

export default contactsRouter;