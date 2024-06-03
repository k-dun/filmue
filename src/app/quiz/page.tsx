import { useState } from 'react';
import { movieTitles } from '../data/movies';
import { fetchMovieDetails } from '../api/omdbApi';

export default function Quiz() {
  const [currentMovie, setCurrentMovie] = useState('');
  const [clues, setClues] = useState<string[]>([]);

  const startGame = () => {
    const randomIndex = Math.floor(Math.random() * movieTitles.length);
    const randomMovie = movieTitles[randomIndex];
    setCurrentMovie(randomMovie);
    fetchMovieDetails(randomMovie)
      .then((data) => {
        const cluesArray = generateClues(data);
        setClues(cluesArray);
      })
      .catch((error) => console.error('API issue.'));
  };

  const generateClues = (movieData: any): string[] => {
    const cluesArray: string[] = [];
    const actors = movieData.Actors.split(', ');
    cluesArray.push(`Starring: ${actors[0]}`);
    cluesArray.push(`Released: ${movieData.Released} | Genre: ${movieData.Genre}`);
    cluesArray.push(`Starring: ${actors[1]}`);
    cluesArray.push(`Director: ${movieData.Director}`);
    if (movieData.Awards) {
      cluesArray.push(`Awards: ${movieData.Awards}`);
    } else {
      cluesArray.push(`Starring: ${actors[2]}`);
    };
    cluesArray.push(`Plot: ${movieData.Plot}`);
    return cluesArray;
  };

  return (
    <>
    </>
  );
}