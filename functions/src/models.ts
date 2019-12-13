export interface Song {
  artist?: string;
  name?: string;
  genre?: string;
  uid?: string;
  popularity: number;
  acousticness: number;
  danceability: number;
  duration?: number;
  energy: number;
  instrumentalness: number;
  key?: string;
  liveness: number;
  loudness: number;
  mode?: string;
  speechiness: number;
  tempo: number;
  timeStamp?: string;
  valence: number;
}
