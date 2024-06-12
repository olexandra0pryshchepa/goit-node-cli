import { program } from "commander";
import { listContacts, getContactById, addContact, removeContact } from "./contacts.js";

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      console.table(contacts);
      break;

    case "get":
     const contact = await getContactById(id);
      console.log(contact || null);
      break;

    case "add":
      if (name && email && phone) {
        const newContact = await addContact(name, email, phone);
        console.log('Added contact:', newContact);
      } else {
        console.log('Please provide name, email, and phone for the new contact');
      }
      break;

    case "remove":
      const removedContact = await removeContact(id);
      console.log(removedContact || null);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
