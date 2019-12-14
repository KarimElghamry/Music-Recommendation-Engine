import { Song } from './models'

export function getAvgSong(listenHistory: any, songs: Song[]): Song {
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
    } as Song;
    let totalListenCount: number = 0;

    for (let i: number = 0; i < songs.length; i++) {
        const song: Song = songs[i];
        if (song.name && Object.keys(listenHistory).includes(song.name as string)) {
            console.log(`song listened to found: ${song.name}`)
            const songListenCount: number = listenHistory[song.name as string]
            totalListenCount += listenHistory[song.name as string];
            avgSong.acousticness += song.acousticness * songListenCount;
            avgSong.danceability += song.danceability * songListenCount;
            avgSong.energy += song.energy * songListenCount;
            avgSong.instrumentalness += song.instrumentalness * songListenCount;
            avgSong.liveness += song.liveness * songListenCount;
            avgSong.loudness += song.loudness * songListenCount;
            avgSong.popularity += song.popularity * songListenCount;
            avgSong.speechiness += song.speechiness * songListenCount;
            avgSong.tempo += song.tempo * songListenCount;
            avgSong.valence += song.valence * songListenCount;
        }
    }
    avgSong.acousticness /= totalListenCount;
    avgSong.danceability /= totalListenCount;
    avgSong.energy /= totalListenCount;
    avgSong.instrumentalness /= totalListenCount;
    avgSong.liveness /= totalListenCount;
    avgSong.loudness /= totalListenCount;
    avgSong.popularity /= totalListenCount;
    avgSong.speechiness /= totalListenCount;
    avgSong.tempo /= totalListenCount;
    avgSong.valence /= totalListenCount;


    console.log(`User avg: acousticness: ${avgSong.acousticness},
    danceability: ${avgSong.danceability},
    popularity: ${avgSong.popularity},
    valence: ${avgSong.valence},
    energy: ${avgSong.energy},
    liveness: ${avgSong.liveness},
    speechiness: ${avgSong.speechiness},
    timeStamp: ${avgSong.timeStamp},
    instrumentalness: ${avgSong.instrumentalness},
    loudness: ${avgSong.loudness},
    tempo: ${avgSong.tempo}`);

    return avgSong;
}