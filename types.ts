
export enum NodeId {
  START = 'START',
  MORNING = 'MORNING',
  NIGHT = 'NIGHT',
  CHILD = 'CHILD',
  END = 'END'
}

export interface Choice {
  id: string;
  text: string;
  nextNode: NodeId;
  impact: string;
}

export interface SceneNode {
  id: NodeId;
  title: string;
  scenario: string;
  image: string;
  choices: Choice[];
  poemSnippet?: string;
}

export interface Vocabulary {
  word: string;
  pinyin: string;
  meaning: string;
  context: string;
}

export type ChoiceHistory = Record<string, string>;
