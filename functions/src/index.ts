import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as Papa from "papaparse";
import * as fs from "fs";
import { Song } from "../src/models";
import { knn } from "./knn";
import * as path from "path";
import * as os from "os";

admin.initializeApp();
const db = admin.firestore();

export const getRecommendations = functions.https.onCall(
  async (data, context) => {
    const userId: string | undefined = context.auth?.uid;
    console.log(`user uid: ${context.auth?.uid}`);
    if (!userId) throw Error(`Invalid authentication`)

    const userDoc: FirebaseFirestore.DocumentSnapshot = await db
      .collection("users")
      .doc(userId)
      .get();

    const userData: FirebaseFirestore.DocumentData | undefined = userDoc.data();
    if (!userData) {
      throw Error(`No data for user: ${userId}`);
    }

    const avgUserSong: any = userData.averageScore;

    const userSong: Song = {
      acousticness: avgUserSong.acousticness,
      danceability: avgUserSong.danceability,
      popularity: avgUserSong.popularity,
      valence: avgUserSong.valence,
      energy: avgUserSong.energy,
      liveness: avgUserSong.liveness,
      speechiness: avgUserSong.speechiness,
      timeStamp: avgUserSong.timeStamp,
      instrumentalness: avgUserSong.instrumentalness,
      loudness: avgUserSong.loudness,
      tempo: avgUserSong.tempo
    };

    console.log(`User avg: acousticness: ${userData.acousticness},
    danceability: ${userData.danceability},
    popularity: ${userData.popularity},
    valence: ${userData.valence},
    energy: ${userData.energy},
    liveness: ${userData.liveness},
    speechiness: ${userData.speechiness},
    timeStamp: ${userData.timeStamp},
    instrumentalness: ${userData.instrumentalness},
    loudness: ${userData.loudness},
    tempo: ${userData.tempo}`);

    const storage = admin.storage();
    const bucket = storage.bucket("gs://road-trax.appspot.com");
    const tempFilePath = path.join(os.tmpdir(), "spotifyFeatures3.csv");
    await bucket
      .file("spotifyFeatures3.csv")
      .download({ destination: tempFilePath });
    console.log("Downloaded to: " + tempFilePath);

    let results = Papa.parse(fs.readFileSync(tempFilePath, "utf8"));
    console.log(results.data.slice(1, 10));

    let songsRaw = results.data.slice(1);
    let features: String[] = results.data[0];

    const songs: Song[] = [];
    for (let i: number = 0; i < songsRaw.length; i++) {
      let songData: String[] = songsRaw[i];
      const song: Song = {
        genre: songData[features.indexOf("genre")],
        artist: songData[features.indexOf("artist_name")],
        name: songData[features.indexOf("track_name")],
        uid: songData[features.indexOf("track_id")],
        popularity: Number(songData[features.indexOf("popularity")]),
        acousticness: Number(songData[features.indexOf("acousticness")]),
        danceability: Number(songData[features.indexOf("danceability")]),
        duration: Number(songData[features.indexOf("duration_ms")]),
        energy: Number(songData[features.indexOf("energy")]),
        instrumentalness: Number(
          songData[features.indexOf("instrumentalness")]
        ),
        key: songData[features.indexOf("key")],
        liveness: Number(songData[features.indexOf("liveness")]),
        loudness: Number(songData[features.indexOf("loudness")]),
        mode: songData[features.indexOf("mode")],
        speechiness: Number(songData[features.indexOf("speechiness")]),
        tempo: Number(songData[features.indexOf("tempo")]),
        timeStamp: songData[features.indexOf("time_signature")],
        valence: Number(songData[features.indexOf("valence")])
      } as Song;
      songs.push(song);
    }

    const response: Song[] = knn(songs, userSong);

    console.log(response);

    return Promise.resolve({ body: response });
  }
);
