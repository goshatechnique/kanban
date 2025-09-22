import { uid } from 'uid'

export function generateId(length: number = 11) {
  return uid(length)
}
