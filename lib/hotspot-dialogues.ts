/**
 * Character dialogue templates for interactive hotspots
 * Use {childName} placeholder for personalization
 */

export type Character = 'police' | 'fire' | 'ambulance' | 'helicopter' | 'plane' | 'tow';

export interface ChapterDialogues {
  [character: string]: string;
}

export const hotspotDialogues: Record<number, ChapterDialogues> = {
  // Chapter 0: Introduction
  0: {
    police: 'Привіт, {childName}! Я поліцейська машинка, найстарша сестричка! Я допомагаю людям і слідкую за порядком!',
    fire: 'Привіт, {childName}! Я пожежна машинка! Я гашу пожежі та рятую людей!',
    ambulance: 'Привіт, {childName}! Я швидка допомога, наймолодша сестричка! Я допомагаю хворим!',
  },

  // Chapter 1: Police car
  1: {
    police: '{childName}, дивись як я їжджу по місту! Я допомагаю всім людям та слідкую, щоб всі були у безпеці!',
  },

  // Chapter 2: Fire truck
  2: {
    fire: '{childName}, якщо десь пожежа, я швидко приїжджаю! Дивись, у мене є велика драбина!',
  },

  // Chapter 3: Ambulance
  3: {
    ambulance: '{childName}, коли хтось захворів, я можу швидко привезти лікаря! Я завжди готова допомогти!',
  },

  // Chapter 4: Evening at home
  4: {
    ambulance: '{childName}, я готую вечерю для всіх! Скоро поліцейська машинка приїде додому!',
    fire: `Ой, {childName}, мені потрібні інструменти з роботи. Я швидко з'їжджу та повернусь!`,
  },

  // Chapter 5: Fire truck lost in forest
  5: {
    fire: 'Ой, {childName}, я наїхала на гостру гілку і зламала колесо! Тепер я застрягла тут у лісі!',
  },

  // Chapter 6: Searching at home
  6: {
    police: '{childName}, ти не бачив пожежну машинку? Ми її скрізь шукаємо, але не можемо знайти!',
    ambulance: '{childName}, допоможи нам знайти пожежну машинку! Вона десь пропала!',
  },

  // Chapter 7: Calling for help
  7: {
    police: '{childName}, я покликала своїх друзів - гвинтокрилів та літаки! Вони допоможуть знайти пожежну машинку!',
    helicopter: 'Я прилетів допомогти, {childName}! Зараз будемо шукати пожежну машинку з неба!',
  },

  // Chapter 8: Searching from the sky
  8: {
    helicopter: '{childName}, я летю над лісом і шукаю пожежну машинку! Світлю своїм прожектором!',
  },

  // Chapter 9: Found!
  9: {
    fire: 'Ура, {childName}! Гвинтокрил мене знайшов! Я так рада!',
    helicopter: '{childName}, я знайшов пожежну машинку в лісі! Вона увімкнула свої маячки!',
  },

  // Chapter 10: Fire truck explains
  10: {
    fire: '{childName}, я поїхала за інструментами і так швидко їхала, що зламала колесо. Тепер мені потрібна допомога!',
    helicopter: 'Не хвилюйся, {childName}! Зараз повідомлю поліцейську машинку і вони допоможуть!',
  },

  // Chapter 11: Rescue mission
  11: {
    police: '{childName}, ми їдемо рятувати пожежну машинку! Я знайшла евакуатора з запасним колесом!',
    tow: 'Привіт, {childName}! Я евакуатор, я можу відремонтувати колесо! Зараз поїдемо в ліс!',
  },

  // Chapter 12: Happy reunion
  12: {
    police: '{childName}, дивись! Ми знайшли пожежну машинку! Зараз евакуатор відремонтує колесо!',
    fire: 'Як я рада вас бачити, {childName}! Дякую, що прийшли на допомогу!',
    tow: '{childName}, зараз швидко відремонтую колесо, і пожежна машинка зможе їхати!',
  },

  // Chapter 13: Celebration dinner
  13: {
    police: '{childName}, як добре, що ми всі разом! Справжні друзі завжди допомагають один одному!',
    fire: 'Дякую всім за допомогу, {childName}! Я дуже рада, що у мене такі чудові сестрички!',
    ambulance: '{childName}, я приготувала вечерю для всіх! Ходіть до столу, друзі!',
    helicopter: 'Я радий, що зміг допомогти, {childName}! Тепер пожежна машинка в безпеці!',
  },

  // Chapter 14: The lesson
  14: {
    police: `{childName}, запам'ятай: завжди кажи близьким, куди ти йдеш! Так вони завжди зможуть тебе знайти!`,
    fire: `Я навчилася важливого уроку, {childName}! Тепер я завжди буду казати сестричкам, куди їду!`,
    ambulance: `{childName}, справжня родина та друзі - це ті, хто завжди поруч і завжди готовий допомогти!`,
  },
};

/**
 * Get dialogue for a specific hotspot with personalized child name
 */
export function getDialogueForHotspot(
  chapterId: number,
  character: Character,
  childName?: string
): string | null {
  const chapterDialogues = hotspotDialogues[chapterId];
  if (!chapterDialogues || !chapterDialogues[character]) {
    return null;
  }

  const template = chapterDialogues[character];
  const name = childName || 'друже'; // Fallback to "friend" if no name
  return template.replace(/{childName}/g, name);
}

/**
 * Get all dialogues for a chapter (for pre-generation)
 */
export function getChapterDialogues(chapterId: number): Array<{
  character: Character;
  dialogue: string;
}> {
  const chapterDialogues = hotspotDialogues[chapterId];
  if (!chapterDialogues) {
    return [];
  }

  return Object.entries(chapterDialogues).map(([character, dialogue]) => ({
    character: character as Character,
    dialogue,
  }));
}

/**
 * Create a hash from child name for caching purposes
 */
export function getNameHash(childName?: string): string {
  if (!childName) return 'default';

  // Simple hash function for cache key
  let hash = 0;
  for (let i = 0; i < childName.length; i++) {
    const char = childName.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(36);
}
