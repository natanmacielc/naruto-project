export interface Characters {
  characters: Character[]
}

export interface Character {
  character: string;
  player: string;
  ranking: 'C' | 'B' | 'A' | 'S' | 'S+';
  active: '' | 'S' | 'N';
  chooseAt: string;
  image?: string
}
