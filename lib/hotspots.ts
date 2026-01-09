export interface Hotspot {
  id: string;
  x: number; // percentage from left
  y: number; // percentage from top
  width: number; // percentage
  height: number; // percentage
  character: 'police' | 'fire' | 'ambulance' | 'helicopter' | 'plane' | 'tow';
  soundEffect: string; // filename in /sounds
}

// Default hotspot configurations for each chapter
// These can be adjusted after images are generated
export const chapterHotspots: Record<number, Hotspot[]> = {
  0: [ // Знайомство
    { id: 'police-1', x: 15, y: 40, width: 20, height: 30, character: 'police', soundEffect: 'police-siren.mp3' },
    { id: 'fire-1', x: 40, y: 40, width: 20, height: 30, character: 'fire', soundEffect: 'fire-siren.mp3' },
    { id: 'ambulance-1', x: 65, y: 40, width: 20, height: 30, character: 'ambulance', soundEffect: 'ambulance-siren.mp3' },
  ],
  1: [ // Поліцейська машинка
    { id: 'police-2', x: 15, y: 35, width: 30, height: 40, character: 'police', soundEffect: 'police-siren.mp3' },
  ],
  2: [ // Пожежна машинка
    { id: 'fire-2', x: 15, y: 50, width: 30, height: 40, character: 'fire', soundEffect: 'fire-siren.mp3' },
  ],
  3: [ // Швидка допомога
    { id: 'ambulance-2', x: 35, y: 35, width: 30, height: 40, character: 'ambulance', soundEffect: 'ambulance-siren.mp3' },
  ],
  4: [ // Один зимовий вечір
    { id: 'ambulance-3', x: 20, y: 45, width: 20, height: 25, character: 'ambulance', soundEffect: 'ambulance-siren.mp3' },
    { id: 'fire-3', x: 60, y: 45, width: 20, height: 25, character: 'fire', soundEffect: 'fire-siren.mp3' },
  ],
  5: [ // Біда в лісі
    { id: 'fire-4', x: 18, y: 40, width: 30, height: 35, character: 'fire', soundEffect: 'fire-siren.mp3' },
  ],
  6: [ // Де пожежна машинка?
    { id: 'police-3', x: 35, y: 45, width: 20, height: 25, character: 'police', soundEffect: 'police-siren.mp3' },
    { id: 'ambulance-4', x: 65, y: 45, width: 20, height: 25, character: 'ambulance', soundEffect: 'ambulance-siren.mp3' },
  ],
  7: [ // Пошуки починаються
    { id: 'police-4', x: 55, y: 60, width: 20, height: 25, character: 'police', soundEffect: 'police-siren.mp3' },
    { id: 'helicopter-1', x: 50, y: 10, width: 25, height: 25, character: 'helicopter', soundEffect: 'helicopter.mp3' },
  ],
  8: [ // Пошуки з неба
    { id: 'helicopter-2', x: 55, y: 25, width: 30, height: 30, character: 'helicopter', soundEffect: 'helicopter.mp3' },
  ],
  9: [ // Знайшли!
    { id: 'fire-5', x: 35, y: 55, width: 25, height: 30, character: 'fire', soundEffect: 'fire-siren.mp3' },
    { id: 'helicopter-3', x: 50, y: 15, width: 25, height: 25, character: 'helicopter', soundEffect: 'helicopter.mp3' },
  ],
  10: [ // Історія
    { id: 'fire-6', x: 20, y: 50, width: 25, height: 30, character: 'fire', soundEffect: 'fire-siren.mp3' },
    { id: 'helicopter-4', x: 55, y: 25, width: 20, height: 20, character: 'helicopter', soundEffect: 'helicopter.mp3' },
  ],
  11: [ // Порятунок
    { id: 'police-5', x: 15, y: 60, width: 20, height: 25, character: 'police', soundEffect: 'police-siren.mp3' },
    { id: 'tow-1', x: 40, y: 50, width: 20, height: 25, character: 'tow', soundEffect: 'truck-horn.mp3' },
  ],
  12: [ // Радісна зустріч
    { id: 'police-6', x: 15, y: 60, width: 18, height: 23, character: 'police', soundEffect: 'police-siren.mp3' },
    { id: 'fire-7', x: 35, y: 50, width: 20, height: 30, character: 'fire', soundEffect: 'fire-siren.mp3' },
    { id: 'tow-2', x: 62, y: 50, width: 18, height: 23, character: 'tow', soundEffect: 'truck-horn.mp3' },
  ],
  13: [ // Святкова вечеря
    { id: 'police-7', x: 17, y: 50, width: 15, height: 20, character: 'police', soundEffect: 'police-siren.mp3' },
    { id: 'fire-8', x: 33, y: 40, width: 15, height: 20, character: 'fire', soundEffect: 'fire-siren.mp3' },
    { id: 'ambulance-5', x: 52, y: 40, width: 15, height: 20, character: 'ambulance', soundEffect: 'ambulance-siren.mp3' },
    { id: 'helicopter-5', x: 70, y: 48, width: 15, height: 18, character: 'helicopter', soundEffect: 'helicopter.mp3' },
  ],
  14: [ // Важливий урок
    { id: 'police-8', x: 20, y: 50, width: 18, height: 25, character: 'ambulance', soundEffect: 'police-siren.mp3' },
    { id: 'fire-9', x: 45, y: 45, width: 18, height: 25, character: 'fire', soundEffect: 'fire-siren.mp3' },
    { id: 'ambulance-6', x: 67, y: 60, width: 18, height: 25, character: 'police', soundEffect: 'ambulance-siren.mp3' },
  ],
};

export function getHotspotsForChapter(chapterId: number): Hotspot[] {
  return chapterHotspots[chapterId] || [];
}
