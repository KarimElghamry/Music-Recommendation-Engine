import * as functions from "firebase-functions";
import * as Papa from "papaparse";
import axios, { AxiosResponse } from "axios";
import { Song } from "../src/models";
import { knn } from "./knn";

export const getRecommendations = functions.https.onCall(
  async (data, context) => {
    if (!context.auth) return;

    let userId: String = context.auth.uid;
    let url: string =
      "https://firebasestorage.googleapis.com/v0/b/road-trax.appspot.com/o/spotify.csv?alt=media&token=d2c11883-2495-46df-a719-d47dcbfaae80";

    let response: AxiosResponse = await axios.get(url);
    let results: Papa.ParseResult = Papa.parse(response.data);
    let songsRaw = results.data.slice(1);
    let features: String[] = results.data[0];

    const songs: Song[] = [];
    songsRaw.forEach(songData => {
      const song: Song = {
        genre: songData[features.indexOf("genre")],
        artist: songData[features.indexOf("artist_name")],
        name: songData[features.indexOf("track_name")],
        uid: songData[features.indexOf("track_id")],
        popularity: songData[features.indexOf("popularity")],
        acousticness: songData[features.indexOf("acousticness")],
        danceability: songData[features.indexOf("danceability")],
        duration: songData[features.indexOf("duration_ms")],
        energy: songData[features.indexOf("energy")],
        instrumentalness: songData[features.indexOf("instrumentalness")],
        key: songData[features.indexOf("key")],
        liveness: songData[features.indexOf("liveness")],
        loudness: songData[features.indexOf("loudness")],
        mode: songData[features.indexOf("mode")],
        speechiness: songData[features.indexOf("speechiness")],
        tempo: songData[features.indexOf("tempo")],
        timeStamp: songData[features.indexOf("time_signature")],
        valence: songData[features.indexOf("valence")]
      } as Song;
      songs.push(song);
    });
    console.log(songs[0]);
  }
);

async function test() {
  let url: string =
    "https://firebasestorage.googleapis.com/v0/b/road-trax.appspot.com/o/spotify.csv?alt=media&token=d2c11883-2495-46df-a719-d47dcbfaae80";

  let response: AxiosResponse<String> = await axios.get(url);
  let results = response.data
    .split("\r\n")
    .map((row: string) => row.split(","));

  let songsRaw: string[][] = results.slice(1);
  let features: string[] = results[0];

  const songs: Song[] = [];
  for (let i: number = 0; i < songsRaw.length; i++) {
    let songData: string[] = songsRaw[i];
    const song: Song = {
      genre: songData[features.indexOf("genre")],
      artist: songData[features.indexOf("artist_name")],
      name: songData[features.indexOf("track_name")],
      uid: songData[features.indexOf("track_id")],
      popularity: parseFloat(songData[features.indexOf("popularity")]),
      acousticness: parseFloat(songData[features.indexOf("acousticness")]),
      danceability: parseFloat(songData[features.indexOf("danceability")]),
      duration: parseFloat(songData[features.indexOf("duration_ms")]),
      energy: parseFloat(songData[features.indexOf("energy")]),
      instrumentalness: parseFloat(
        songData[features.indexOf("instrumentalness")]
      ),
      key: songData[features.indexOf("key")],
      liveness: parseFloat(songData[features.indexOf("liveness")]),
      loudness: parseFloat(songData[features.indexOf("loudness")]),
      mode: songData[features.indexOf("mode")],
      speechiness: parseFloat(songData[features.indexOf("speechiness")]),
      tempo: parseFloat(songData[features.indexOf("tempo")]),
      timeStamp: songData[features.indexOf("time_signature")],
      valence: parseFloat(songData[features.indexOf("valence")])
    } as Song;
    songs.push(song);
  }

  let dummy: Song = songs[3000];
  let output: Song[] = knn(songs, dummy);

  console.log(output);
}

test();
