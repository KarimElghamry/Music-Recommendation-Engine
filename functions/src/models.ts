export interface Song {
  artist?: String;
  name?: String;
  genre?: String;
  uid?: String;
  popularity: number;
  acousticness: number;
  danceability: number;
  duration?: number;
  energy: number;
  instrumentalness: number;
  key?: String;
  liveness: number;
  loudness: number;
  mode?: String;
  speechiness: number;
  tempo: number;
  timeStamp?: String;
  valence: number;
}
