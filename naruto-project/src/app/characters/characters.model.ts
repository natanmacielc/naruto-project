export interface Characters {
  characters: Character[]
}

export interface Character {
  character: string;
  player: string;
  ranking: 'C' | 'B' | 'A' | 'S' | 'S+';
  active: '' | 'S' | 'N';
  chooseAt: string;
  status: 'alive' | 'deceased';
  village: 'Konoha' | 'Kiri' | 'Suna' | 'Kumo' | 'Oto' | 'Ame' | 'Iwa';
  image?: string
}

export type SortingOperator = 'none' | 'ascending' | 'descending'
