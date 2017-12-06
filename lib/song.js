export const beatsPerMeasure = 8;

import songIntro from './songs/song_intro';
import songVerse1 from './songs/song_verse_1';
import songChorus1 from './songs/song_chorus_1';
import songSolo1 from './songs/song_solo_1';
import songVerse2 from './songs/song_verse_2';
import songChorus2 from './songs/song_chorus_2';
import songSolo2 from './songs/song_solo_2';
import songBridge from './songs/song_bridge';


export const songNotes = songIntro.concat(
  songVerse1,
  songChorus1,
  songSolo1,
  songVerse2,
  songChorus2,
  songSolo2,
  songBridge
);
