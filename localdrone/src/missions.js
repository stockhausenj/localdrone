import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

export async function getMissions(query) {
  let missions = await localforage.getItem("missions");
  if (!missions) missions = [];
  if (query) {
    missions = matchSorter(missions, query, { keys: ["first", "last"] });
  }
  return missions.sort(sortBy("last", "createdAt"));
}

export async function getMission(id) {
  let missions = await localforage.getItem("missions");
  let mission = missions.find(mission => mission.id === id);
  return mission ?? null;
}
