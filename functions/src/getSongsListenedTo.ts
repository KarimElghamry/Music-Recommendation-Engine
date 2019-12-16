import { Song } from './models'

export function getSongsListenedTo(listenHistory: any, songs: Song[]): Song[] {

    const songsListenedTo: Song[] = [];

    for (let i: number = 0; i < songs.length; i++) {
        const song: Song = songs[i];
        const songName: string = song.name as string;

        const isSongInHistory: boolean = Object.keys(listenHistory).includes(songName)
        if (songName && isSongInHistory) {

            const songListenCount: number = listenHistory[songName]


            for (let timesListenedTo = 0; timesListenedTo < songListenCount; timesListenedTo++) {
                songsListenedTo.push(song);
            }
        }
    }
    return songsListenedTo;
}
