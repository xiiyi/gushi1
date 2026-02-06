
import { NodeId, SceneNode, Vocabulary } from './types';

export const VOCABULARY: Vocabulary[] = [
  { word: '耘田', pinyin: 'yún tián', meaning: '在田间除草。', context: '昼出耘田夜绩麻。' },
  { word: '绩麻', pinyin: 'jì má', meaning: '把麻搓成线。', context: '昼出耘田夜绩麻。' },
  { word: '桑阴', pinyin: 'sāng yīn', meaning: '桑树的树荫。', context: '也傍桑阴学种瓜。' },
  { word: '童孙', pinyin: 'tóng sūn', meaning: '指小孩子，孙子。', context: '童孙未解供耕织。' },
  { word: '未解', pinyin: 'wèi jiě', meaning: '不懂得，不会。', context: '童孙未解供耕织。' },
  { word: '供', pinyin: 'gòng', meaning: '从事，参加。', context: '童孙未解供耕织。' }
];

export const SCENES: Record<NodeId, SceneNode> = {
  [NodeId.START]: {
    id: NodeId.START,
    title: '序章：初夏时节',
    scenario: '范成大笔下的宋代乡村，万物生长。此时正值夏忙，你作为这一家的顶梁柱，将带领家人度过充实的农忙时光。',
    image: '/images/start.png',
    choices: [
      { id: 'start', text: '开启田园生活', nextNode: NodeId.MORNING, impact: '' }
    ]
  },
  [NodeId.MORNING]: {
    id: NodeId.MORNING,
    title: '第一节：烈日当空',
    poemSnippet: '昼出耘田...',
    scenario: '初夏的清晨，太阳升起，天气渐热。田里的杂草疯长，若不及时处理，将会夺走庄稼的养分。作为家长，你决定：',
    image: '/images/morning.png',
    choices: [
      { id: 'A', text: '拿起锄头，下地耘田', nextNode: NodeId.NIGHT, impact: '勤劳' },
      { id: 'B', text: '暑气太盛，闭门歇息', nextNode: NodeId.NIGHT, impact: '懈怠' }
    ]
  },
  [NodeId.NIGHT]: {
    id: NodeId.NIGHT,
    title: '第二节：夜幕降临',
    poemSnippet: '...夜绩麻',
    scenario: '劳碌一天，明月高挂。虽已入夜，但还有白日采下的麻等待处理，那是全家冬日寒衣的指望。你该如何？',
    image: '/images/night.png',
    choices: [
      { id: 'A', text: '点亮油灯，全家绩麻', nextNode: NodeId.CHILD, impact: '各当家' },
      { id: 'B', text: '疲惫不堪，吹灯早睡', nextNode: NodeId.CHILD, impact: '荒废' }
    ]
  },
  [NodeId.CHILD]: {
    id: NodeId.CHILD,
    title: '第三节：童心稚趣',
    poemSnippet: '童孙未解供耕织，也傍桑阴学种瓜。',
    scenario: '次日，大人们依旧忙碌。家中年幼的小孙子看着你们辛劳，他虽不会耕织，却也想帮点忙。你希望他：',
    image: '/images/child.png',
    choices: [
      { id: 'A', text: '哭闹索求，引人关注', nextNode: NodeId.END, impact: '喧闹' },
      { id: 'B', text: '傍于桑阴，学着种瓜', nextNode: NodeId.END, impact: '天真' }
    ]
  },
  [NodeId.END]: {
    id: NodeId.END,
    title: '结局：田园余响',
    scenario: '时光流转，你的选择决定了这一家的气象。',
    image: '/images/end.png',
    choices: [
      { id: 'restart', text: '再次回味', nextNode: NodeId.START, impact: '' }
    ]
  }
};
