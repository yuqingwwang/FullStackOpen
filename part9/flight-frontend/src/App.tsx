import { useEffect, useState } from 'react';
import { Diary } from './types'
import { getAllDiaries, createDiary } from './diaryService';

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState('');
  const [visibility, setVisibility] = useState('');

  useEffect(() => {
    getAllDiaries().then(diaries =>
      setDiaries(diaries));
  }, []);

  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const newEntry = {
      date: date,
      weather: weather,
      visibility: visibility,
      comment: ''
    }

    createDiary(newEntry).then((diary) => {
      setDiaries(diaries.concat(diary));
    });

    setDate('');
    setWeather('');
    setVisibility('');
    }

  return (
    <div>
      <form onSubmit={diaryCreation}>
        <label>
          Date:
          <input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
        </label>
        <label>
          Weather:
          <input type="text" value={weather} onChange={(event) => setWeather(event.target.value)} />
        </label>
        <label>
          Visibility:
          <input type="text" value={visibility} onChange={(event) => setVisibility(event.target.value)} />
        </label>
        <button type="submit">Submit</button>
      </form>
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
