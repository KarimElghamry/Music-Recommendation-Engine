import { Song } from './models';


/*
 * P(User Likes Song | Song) = 
 *  P(Genre | User Likes Song) x P(Key | User Likes Song) x 
 *      P(Mode | User Likes Song) * P(User Likes Song)
 * 
 * NOTE: an assumption was made that the user likes ALL the songs he/she listened to
 *  while this may not usually be the case, the K-NN algorithm runs on the average
 *  song attributes of the user which will ensure that the user likes MOST of the songs
 *  inputted into NB
 * 
 *  this leads to the modified model:
 *      
 *      P(User Likes Song | Song) =
 *          P(Genre | User Likes Song ~= 1) x P(Key | User Likes Song ~= 1) x 
 *      P(Mode | User Likes Song ~= 1) * P(User Likes Song ~= 1)
 * 
 *      =   P(Genre) x P(Key) x P(Mode)
 */
export function naiveBayes(songsHeard: Song[], availableSongs: Song[]): Song[] {
    // const songsHeardCount: number = songsHeard.length;

    const songProbPairs: NbPair[] = [];

    for (let availableSong of availableSongs) {

        let sameGenreProb: number = 0;
        let sameKeyProb: number = 0;
        let sameModeProb: number = 0;

        for (let songHeard of songsHeard) {
            if (songHeard.genre.toString() == availableSong.genre.toString()) {
                sameGenreProb++;
            }
            if (songHeard.key.toString() == availableSong.key.toString()) {
                sameKeyProb++;
            }
            if (songHeard.mode.toString() == availableSong.mode.toString()) {
                sameModeProb++;
            }
        }
        // sameGenreProb /= songsHeardCount;
        // sameKeyProb /= songsHeardCount;
        // sameModeProb /= songsHeardCount;
        const probability: number = Math.imul(sameModeProb, Math.imul(sameGenreProb, sameKeyProb));
        console.log(`${availableSong.name} = ${probability}`)
        songProbPairs.push({
            song: availableSong,
            probability: probability,
        } as NbPair)


    }

    const sortedSongs: NbPair[] = songProbPairs.sort((a, b) => b.probability - a.probability);

    sortedSongs.slice(0, 10).forEach((pair) => console.log("probability " + pair.song.name + ": " + pair.probability));
    return sortedSongs.map((pair) => pair.song);
}

interface NbPair {
    song: Song;
    probability: number;
}