import { Song } from './models'
export function getAvgSong(songs: Song[]): Song {
    const avgSong: Song = {
        acousticness: 0,
        danceability: 0,
        energy: 0,
        instrumentalness: 0,
        liveness: 0,
        loudness: 0,
        popularity: 0,
        speechiness: 0,
        tempo: 0,
        valence: 0,
        genre: 0,
        key: 0,
        mode: 0,
    } as Song;

    let totalListenCount: number = 0;

    for (let song of songs) {
        totalListenCount++;
        //Continuous Variables
        avgSong.acousticness += song.acousticness;
        avgSong.danceability += song.danceability;
        avgSong.energy += song.energy;
        avgSong.instrumentalness += song.instrumentalness;
        avgSong.liveness += song.liveness;
        avgSong.loudness += song.loudness;
        avgSong.popularity += song.popularity;
        avgSong.speechiness += song.speechiness;
        avgSong.tempo += song.tempo;
        avgSong.valence += song.valence;


    }



    //Normalize average
    avgSong.acousticness = avgSong.acousticness / totalListenCount;
    avgSong.danceability = avgSong.danceability / totalListenCount;
    avgSong.energy = avgSong.energy / totalListenCount;
    avgSong.instrumentalness = avgSong.instrumentalness / totalListenCount;
    avgSong.liveness = avgSong.liveness / totalListenCount;
    avgSong.loudness = avgSong.loudness / totalListenCount;
    avgSong.popularity = avgSong.popularity / totalListenCount;
    avgSong.speechiness = avgSong.speechiness / totalListenCount;
    avgSong.tempo = avgSong.tempo / totalListenCount;
    avgSong.valence = avgSong.valence / totalListenCount;

    return avgSong;
}

