"use client";

import { useState, useEffect } from 'react';
import { movieTitles } from './data/movies';
import { fetchMovieDetails } from './api/omdbApi';
import Image from 'next/image';
import Link from 'next/link';
import Cookies from 'js-cookie';
import Modal from './components/Modal';

export default function Home() {
  const [currentMovie, setCurrentMovie] = useState('');
  const [currentClue, setCurrentClue] = useState(0);
  const [clues, setClues] = useState<string[]>([]);
  const [userInput, setUserInput] = useState('');
  const [startedGame, setStartedGame] = useState(false);
  const [timer, setTimer] = useState(0);
  const [streak, setStreak] = useState(0);
  const [modalMessage, setModalMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (startedGame) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [startedGame]);

  useEffect(() => {
    const storedStreak = Cookies.get('streak');
    if (storedStreak) {
      setStreak(parseInt(storedStreak, 10));
    }
  }, []);

  const startGame = () => {
    const randomIndex = Math.floor(Math.random() * movieTitles.length);
    const randomMovie = movieTitles[randomIndex];
    setCurrentMovie(randomMovie);
    fetchMovieDetails(randomMovie)
      .then((data) => {
        const cluesArray = generateClues(data);
        setClues(cluesArray);
        setStartedGame(true);
      })
      .catch((error) => console.error(error));
  };

  const endGame = () => {
    setStartedGame(false);
  }

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
    }
    cluesArray.push(`Plot: ${movieData.Plot}`);
    return cluesArray;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const resetGame = () => {
    setCurrentClue(0);
    setClues([]);
    setUserInput('');
    setTimer(0);
    setStreak(0);
    Cookies.remove('streak');
    setStartedGame(false);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userInput.toLowerCase() === currentMovie.toLowerCase()) {
      setStreak((prevStreak) => prevStreak + 1);
      Cookies.set('streak', (streak + 1).toString());
      openModal(`Well done! You guessed correctly in ${currentClue + 1} tries in ${timer} seconds!<br /><br />Your current streak is <span className="text-[#FF8080]">${streak}</span>!`);
      setCurrentClue(0);
      setClues([]);
      setUserInput('');
      setTimer(0);
      endGame();
    } else {
      if (currentClue === clues.length - 1) {
        openModal('Sorry, you have used up all the clues.<br /><br />The movie was ' + currentMovie + '!');
        resetGame();
      } else {
        setCurrentClue(currentClue + 1);
        setUserInput('');
      }
    }
  };

  const openModal = (message: string) => {
    setModalMessage(message);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-[100vh] w-[100vw]">
        <Link href="/">
          <Image src="/tv-bg.gif" priority={true} className="mb-12 w-[80vw] md:w-[30vw]" alt="Filmue Logo" width={400} height={100} />
        </Link>
        {!startedGame && (
          <>
            <p className="my-4 px-4">Simple game. Six hints, six guesses.</p>
            <p>Only <span className="font-semibold">ONE</span> correct answer.</p>
            <p className="mb-4 mt-2 font-semibold">Good Luck!</p>
            <button onClick={startGame} className="bg-[#202020] hover:bg-[#404040] text-[#FCFAFF] font-bold py-3 px-10 shadow hover:shadow-xl rounded-lg mb-5">
              Let&apos;s go!
            </button>
          </>
        )}
        {clues.slice(0, currentClue + 1).map((clue, index) => (
          <div key={index} className="">
            <p className="flex flex-wrap w-[80vw] md:w-[40vw] justify-center items-center border-2 bg-[#808080] text-[#FCFAFF] rounded-lg px-6 py-4 mb-3">
              {clue}
            </p>
          </div>
        ))}
        {startedGame && (
          <form onSubmit={handleSubmit}>
            <input type="text" value={userInput} placeholder="Movie title:" onChange={handleInputChange} className="border border-[#202020] py-3 px-2 rounded-lg mr-2" />
            <button type="submit" className="bg-[#202020] hover:bg-[#404040] text-[#FCFAFF] font-bold py-3 px-10 shadow hover:shadow-xl rounded-lg">Submit..</button>
          </form>
        )}
      </div>
      <Modal message={modalMessage} isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
}