import axios from 'axios';
import { Diary, NewDiary } from './types';

const baseURL = 'http://localhost:3000/api/diaries';

export const getAllDiaries = () => {
  return axios.get<Diary[]>(baseURL)
  .then((response) => response.data);
}

export const createDiary = async (object: NewDiary) => {
  try {
    const diaries = await getAllDiaries();
    const id = diaries.length + 1;

    const newDiary = {
      id,
      ...object
    }

    console.log('New Diary:', newDiary);

    const response = await axios.post<Diary>(baseURL, newDiary);
    return response.data;
  } catch (error) {
    // Log the error for debugging
    console.error('Error creating diary:', error);
    throw error; // Rethrow the error to be handled by the caller (App component)
  }
}
