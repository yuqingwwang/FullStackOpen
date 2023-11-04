import { useEffect, useState } from 'react';
import axios from 'axios';

interface Diary {
  id: number;
  date: string;
  weather: string;
  visibility: string;
}

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  const baseURL = 'http://localhost:3000/api/diaries';

  useEffect(() => {
    axios.get<Diary[]>(baseURL)
      .then((response) => setDiaries(response.data));
  }, []);

  return (
    <div>
      <h1>Diary entries</h1>
        {diaries.map((diary) => (
          <div key={diary.id}>
            <h3>{diary.date}</h3>
            <p>visibility: {diary.visibility} </p>
            <p>weather: {diary.weather}</p>
          </div>
        ))}
    </div>
  );
}

export default App;
