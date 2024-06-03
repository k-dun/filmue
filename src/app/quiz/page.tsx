"use client";

import { useState } from 'react';
import { movieTitles } from '../data/movies';
import { fetchMovieDetails } from '../api/omdbApi';

export default function Quiz() {
  const [currentMovie, setCurrentMovie] = useState('');
  const [clues, setClues] = useState<string[]>([]);
  const [userInput, setUserInput] = useState('');
  const [currentClue, setCurrentClue] = useState(0);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault;
    if (userInput.toLowerCase() === currentMovie.toLowerCase()) {
      alert(`Congrats! ${currentMovie} is the correct answer! On a ${currentClue + 1} try!`);
    } else {
      setCurrentClue(currentClue + 1);
    };
    setUserInput('');
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-[100vh] w-[100vw]">
        <button onClick={startGame}>Start Game!</button>
        {clues.slice(0, currentClue + 1).map((clue, index) => (
          <div key={index}>
            <p>{clue}</p>
          </div>
        ))}
        <form onSubmit={handleSubmit}>
          <input type="text" value={userInput} onChange={handleInputChange} />
          <button type="submit">Submit..</button>
        </form>
      </div>
    </>
  );
}