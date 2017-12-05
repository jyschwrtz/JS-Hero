export const beatsPerMeasure = 8;

import songIntro from './songs/song_intro';
import songVerse1 from './songs/song_verse_1';
import songChorus1 from './songs/song_chorus_1';
import songSolo1 from './songs/song_solo_1';

export const songNotes = songIntro.concat(
  songVerse1,
  songChorus1,
  songSolo1
);
