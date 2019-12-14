import { Song } from "../src/models";

interface Pair {
  song: Song;
  distance: number;
}

export function knn(songs: Song[], userSong: Song): Song[] {
  let distanceSongPairs: Pair[] = [];
  let songUids: Map<String, number> = new Map<String, number>();
  for (let i: number = 0; i < songs.length; i++) {
    let song: Song = songs[i];
    if (!song.name || !song.acousticness || !song.artist) continue;
    if (songUids.has(song.uid ?? "")) continue;
    songUids.set(song.uid ?? "", 1);

    let distance: number =
      Math.pow(song.acousticness - userSong.acousticness, 2) +
      Math.pow(song.danceability - userSong.danceability, 2) +
      Math.pow(song.energy - userSong.energy, 2) +
      Math.pow(song.instrumentalness - userSong.instrumentalness, 2) +
      Math.pow(song.liveness - userSong.liveness, 2) +
      Math.pow(song.speechiness - userSong.speechiness, 2) +
      Math.pow(song.valence - userSong.valence, 2);
    const pair: Pair = {
      song: song,
      distance: distance
    } as Pair;
    distanceSongPairs.push(pair);
  }

  distanceSongPairs.sort((a: Pair, b: Pair): number => {
    return a.distance - b.distance;
  });

  let temp = distanceSongPairs.slice(0, 10).map((pair: Pair) => pair.song);
  return temp;
}
