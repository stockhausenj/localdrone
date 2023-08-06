import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

export async function getPilots(query) {
  let pilots = await localforage.getItem("pilots");
  if (!pilots) pilots = [];
  if (query) {
    pilots = matchSorter(pilots, query, { keys: ["first", "last"] });
  }
  return pilots.sort(sortBy("last", "createdAt"));
}

export async function getPilot(id) {
  let contacts = await localforage.getItem("contacts");
  let contact = contacts.find(contact => contact.id === id);
  return contact ?? null;
}
