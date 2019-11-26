import { ADD_NOTE } from "./Constants";

export function addNote(payload) {
  return { type: ADD_NOTE, payload: { ...payload } };
}
