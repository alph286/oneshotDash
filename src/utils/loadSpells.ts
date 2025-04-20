import spellsData from '../data/spells.json';

interface Spell {
  id: string;
  level: number;
  name: string;
  imageUrl: string;
}

export function loadSpells(): Spell[] {
  return spellsData;
}