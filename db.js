import Dexie from 'dexie'

export const db = new Dexie('localMobDB')
db.version(1).stores({
  allMobs: 'index, name, url',
  favMobs: 'index, name, url',
  summonedMobs: 'i++, name, data'
})
