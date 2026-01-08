export interface Chapter {
  id: number;
  title: string;
  content: string;
  imagePrompt: string; // For AI generation
}

export const storyData: Chapter[] = [
  {
    id: 0,
    title: "Знайомство з машинками",
    content: `Жили-були три машинки в одному великому і теплому гаражі. Вони були найкращими друзями та справжніми сестричками.`,
    imagePrompt: "Three cute cartoon cars (police car, fire truck, ambulance) in a warm cozy garage, children's book illustration style, bright colors, friendly atmosphere"
  },
  {
    id: 1,
    title: "Поліцейська машинка",
    content: `Старша машинка була поліцейською. Вона дуже любила допомагати людям. Цілий день вона їздила по вулицях, слідкувала за порядком, дивилася, щоб ніхто нікого не ображав, щоб ніхто нікому не заважав. Усі її любили, усі її поважали.`,
    imagePrompt: "Friendly blue police car patrolling city streets with a smile, helping people, children's book illustration, sunny day, Ukrainian city setting"
  },
  {
    id: 2,
    title: "Пожежна машинка",
    content: `Середня машинка була пожежною. І ця машинка теж любила допомагати людям.\n\nЯкщо десь траплялася пожежа, вона швидко приїжджала та гасила вогонь. А якщо хтось заліз, наприклад, на дерево і не міг злізти, то пожежна машинка також приїжджала зі своєю великою драбиною та допомагала.`,
    imagePrompt: "Red fire truck with ladder helping someone in a tree, friendly cartoon style, children's book illustration, heroic pose"
  },
  {
    id: 3,
    title: "Швидка допомога",
    content: `А наймолодша сестричка була швидкою допомогою. Швидка допомога теж дуже любила допомагати людям.\n\nКоли хтось захворів, вона могла приїхати до людини, привезти лікаря або відвезти хворого до лікарні. Усі три машинки жили дружно у своєму великому гаражі.`,
    imagePrompt: "White and yellow ambulance car with red cross, caring and friendly expression, helping people, children's book illustration style"
  },
  {
    id: 4,
    title: "Один зимовий вечір",
    content: `Якось одного дня поліцейська машинка була на роботі. Швидка допомога готувала вечерю. А пожежна машинка займалася домашніми справами.\n\nРаптом пожежній машинці знадобилося взяти якісь інструменти на роботі. Вона нічого не сказала швидкій допомозі, а просто поїхала.\n\n«Я зараз швиденько туди заїду і назад повернуся», — подумала вона.`,
    imagePrompt: "Cozy garage scene in winter evening, police car away at work, ambulance cooking dinner, fire truck doing chores, warm interior lighting, children's book style"
  },
  {
    id: 5,
    title: "Біда в лісі",
    content: `Поїхала пожежна машинка по дорозі через ліс. Уже вечоріло, було холодно, надворі стояла зима.\n\nВона так швидко їхала, що в лісі наїхала на якусь гостру гілку і пробила колесо. Колесо зламалося!\n\nПожежна машинка дуже переживала. Уже було темно, уже настав вечір, нікого на дорозі не було, ніхто не міг їй допомогти. А вона нікому не сказала, куди поїхала. Ніхто про це не знав.`,
    imagePrompt: "Red fire truck with flat tire alone on snowy forest road at dusk, worried expression, dark winter forest, dramatic lighting, children's book illustration"
  },
  {
    id: 6,
    title: "Де пожежна машинка?",
    content: `Поліцейська машинка приїхала додому. Швидка допомога вже приготувала вечерю.\n\n«Пожежна машинко! Пожежна машинко! Ти де? Ходи до нас, будемо вечеряти!» — гукали вони.\n\nА пожежна машинка не відповідала. Вони почали її шукати, але пожежної машинки ніде не було. Обшукали весь гараж, усі місця — а її ніде немає!`,
    imagePrompt: "Police car and ambulance in garage searching for fire truck, worried expressions, dinner table set, empty spot for fire truck, evening scene, children's book style"
  },
  {
    id: 7,
    title: "Пошуки починаються",
    content: `Що робити? Поліцейська машинка поїздила навколо гаража, пошукала-пошукала — і ніде не знайшла.\n\nТоді поліцейська машинка вирішила покликати на допомогу своїх друзів. Оскільки вона любила допомагати всім-всім-всім, у неї було багато друзів.\n\nСеред них були і літаки, і гвинтокрили, які теж працювали в поліції. Усі вони швидко прилетіли допомогти.`,
    imagePrompt: "Police car calling for help, police helicopters and planes arriving in the evening sky, teamwork scene, children's book illustration, dramatic sky"
  },
  {
    id: 8,
    title: "Пошуки з неба",
    content: `Літаки та гвинтокрили злетіли в небо і почали шукати пожежну машинку. Вони шукали її скрізь: біля гаража, в місті, на дорозі — і ніде не могли знайти.\n\nІ ось один із гвинтокрилів полетів далі, в ліс. Він летів уздовж дороги, світив своїм прожектором, шукав пожежну машинку, яка загубилася.`,
    imagePrompt: "Police helicopter flying over snowy forest at night, searchlight beam illuminating dark forest road below, aerial view, children's book illustration, dramatic night scene"
  },
  {
    id: 9,
    title: "Знайшли!",
    content: `Пожежна машинка почула гул від гвинтокрила. Вона увімкнула свої сирени, увімкнула свої червоні маячки і почала сигналити, щоб гвинтокрил її швидше побачив.\n\nГвинтокрил побачив світло від пожежної машинки, побачив її мигалки та підлетів до неї.\n\n«Пожежна машинко, що ти тут робиш? Чому ти тут, а не вдома з братиком та сестричкою?» — запитав він.`,
    imagePrompt: "Fire truck with flashing red lights and sirens on, police helicopter spotting it with searchlight, joyful reunion moment, snowy forest, night scene, children's book style"
  },
  {
    id: 10,
    title: "Історія пожежної машинки",
    content: `Пожежна машинка розповіла, що поїхала за інструментами і їхала так швидко, що в неї зламалося колесо.\n\n«Тепер я застрягла тут у лісі. Мені потрібна допомога — треба, щоб приїхав евакуатор та відремонтував колесо. Тоді я зможу знову їхати», — сказала вона.`,
    imagePrompt: "Fire truck explaining situation to helicopter, broken wheel visible, sad but hopeful expression, forest setting at night, children's book illustration"
  },
  {
    id: 11,
    title: "Порятунок",
    content: `Гвинтокрил полетів назад до поліцейської машинки і розповів їй цю історію.\n\nПоліцейська машинка швидко знайшла евакуатора. Вони взяли запасне колесо, взяли інструменти, і поліцейська машинка з евакуатором поїхали рятувати пожежну машинку.\n\nВони приїхали в ліс, де стояла пожежна машинка.`,
    imagePrompt: "Police car and tow truck driving through snowy forest with spare wheel and tools, rescue mission, headlights cutting through darkness, children's book illustration"
  },
  {
    id: 12,
    title: "Радісна зустріч",
    content: `Пожежна машинка дуже зраділа, побачивши свого братика та евакуатора!\n\nПоліцейська машинка напоїла пожежну машинку теплим чаєм, укрила ковдрою, а евакуатор дуже швидко відремонтував колесо.\n\nІ пожежна машинка знову змогла їхати!`,
    imagePrompt: "Joyful reunion scene, police car giving fire truck warm tea and blanket, tow truck fixing wheel, happy expressions, snowy forest, heartwarming moment, children's book style"
  },
  {
    id: 13,
    title: "Святкова вечеря",
    content: `Друзі всі разом поїхали в гараж, де на них чекала ще тепла вечеря.\n\nШвидка допомога запросила всіх до столу: і літаків, і гвинтокрилів, і евакуатора — усіх-усіх-усіх!\n\nУсі дуже раділи, що знайшли пожежну машинку так швидко. Бо ночувати в лісі, коли холодно і темно, дуже неприємно і страшно.`,
    imagePrompt: "Big celebration dinner in garage, all three car sisters, helicopter, planes, and tow truck around dinner table, joyful atmosphere, warm lighting, children's book illustration"
  },
  {
    id: 14,
    title: "Важливий урок",
    content: `Швидка допомога трішки посварила пожежну машинку. Усі розуміли, що таке буває, що таке трапляється.\n\nАле сказали: «Наступного разу, коли ти будеш кудись їхати, обов'язково скажи своїм братику та сестричці, щоб вони знали, де тебе шукати».\n\nПожежна машинка ще раз усім подякувала. Їй теж дуже не хотілося ночувати в лісі. Вона пообіцяла більше ніколи не їхати нікуди, нікому не сказавши.\n\nІ з того дня три машинки жили ще дружніше. Вони завжди казали одна одній, куди їдуть, і завжди допомагали одна одній.\n\nБо справжні друзі та справжня родина — це ті, хто завжди поруч і завжди готовий прийти на допомогу.`,
    imagePrompt: "Three car sisters together in garage, hugging, happy ending scene, warm atmosphere, family bond, children's book illustration, heartwarming finale with stars"
  }
];

export function getChapter(id: number): Chapter | undefined {
  return storyData.find(chapter => chapter.id === id);
}

export function getTotalChapters(): number {
  return storyData.length;
}

// Personalization helper
export function personalizeContent(content: string, childName?: string): string {
  if (!childName) return content;

  // Replace "пожежна машинка" with child's name in some places
  // Keep it subtle - only in dialogue or when the fire truck is being addressed
  return content.replace(/пожежна машинка/gi, (match) => {
    // Randomly replace ~30% of occurrences to keep it natural
    return Math.random() < 0.3 ? childName : match;
  });
}
