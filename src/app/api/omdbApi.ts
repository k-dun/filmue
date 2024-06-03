import axios from 'axios';

const OMDB_API_KEY = '79740b73' || '';

export const fetchMovieDetails = async (title: string) => {
  const response = await axios.get(`http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&t=${encodeURIComponent(title)}`);
  return response.data;
};