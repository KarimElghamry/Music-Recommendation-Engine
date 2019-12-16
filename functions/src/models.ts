export interface Song {
  artist?: String;
  name?: String;
  genre: String | number;
  uid?: String;
  popularity: number;
  acousticness: number;
  danceability: number;
  duration?: number;
  energy: number;
  instrumentalness: number;
  key: String | number;
  liveness: number;
  loudness: number;
  mode: String | number;
  speechiness: number;
  tempo: number;
  timeStamp?: String;
  valence: number;
}
