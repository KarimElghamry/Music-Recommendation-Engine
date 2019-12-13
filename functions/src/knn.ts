import { Song } from "../src/models";

interface Pair {
  song: Song;
  distance: number;
}

export function knn(songs: Song[], userSong: Song): Song[] {
  let distanceSongPairs: Pair[] = [];
  for (let i: number = 0; i < songs.length; i++) {
    let song: Song = songs[i];
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
    };
    distanceSongPairs.push(pair);
  }

  distanceSongPairs.sort((a: Pair, b: Pair): number => {
    return a.distance - b.distance;
  });

  let temp = distanceSongPairs.slice(0, 10).map((pair: Pair) => pair.song);
  return temp;
}
