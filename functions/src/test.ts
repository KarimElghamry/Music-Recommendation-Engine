// import { Song } from "../src/models";
// import axios, { AxiosResponse } from "axios";
// import { knn } from "./knn";
// import * as Papa from "papaparse";

// async function test() {
//   let url: string =
//     "https://firebasestorage.googleapis.com/v0/b/road-trax.appspot.com/o/spotifyFeatures2.csv?alt=media&token=8cd0b4bf-5c88-4244-9d9c-9fa7c3aaec96";

//   let response: AxiosResponse = await axios.get(url);

//   let results: Papa.ParseResult = Papa.parse(response.data);
//   let songsRaw = results.data.slice(1);
//   let features: String[] = results.data[0];

//   const songs: Song[] = [];
//   for (let i: number = 0; i < songsRaw.length; i++) {
//     let songData: String[] = songsRaw[i];
//     const song: Song = {
//       genre: songData[features.indexOf("genre")],
//       artist: songData[features.indexOf("artist_name")],
//       name: songData[features.indexOf("track_name")],
//       uid: songData[features.indexOf("track_id")],
//       popularity: Number(songData[features.indexOf("popularity")]),
//       acousticness: Number(songData[features.indexOf("acousticness")]),
//       danceability: Number(songData[features.indexOf("danceability")]),
//       duration: Number(songData[features.indexOf("duration_ms")]),
//       energy: Number(songData[features.indexOf("energy")]),
//       instrumentalness: Number(songData[features.indexOf("instrumentalness")]),
//       key: songData[features.indexOf("key")],
//       liveness: Number(songData[features.indexOf("liveness")]),
//       loudness: Number(songData[features.indexOf("loudness")]),
//       mode: songData[features.indexOf("mode")],
//       speechiness: Number(songData[features.indexOf("speechiness")]),
//       tempo: Number(songData[features.indexOf("tempo")]),
//       timeStamp: songData[features.indexOf("time_signature")],
//       valence: Number(songData[features.indexOf("valence")])
//     } as Song;
//     songs.push(song);
//   }

//   let dummy: Song = songs[3270];
//   let output: Song[] = knn(songs, dummy);

//   console.log(output);
// }
