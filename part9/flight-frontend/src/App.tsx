import { useEffect, useState } from 'react';
import { Diary } from './types'
import { getAllDiaries, createDiary } from './diaryService';

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState('sunny'); // Default value
  const [visibility, setVisibility] = useState('great'); // Default value

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
    setWeather('sunny'); // Reset to default
    setVisibility('great'); // Reset to default
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
          <div>
            <label>
              Sunny
              <input
                type="radio"
                name="weather"
                value="sunny"
                checked={weather === 'sunny'}
                onChange={() => setWeather('sunny')}
              />
            </label>
            <label>
              Rainy
              <input
                type="radio"
                name="weather"
                value="rainy"
                checked={weather === 'rainy'}
                onChange={() => setWeather('rainy')}
              />
            </label>
            <label>
              Cloudy
              <input
                type="radio"
                name="weather"
                value="cloudy"
                checked={weather === 'cloudy'}
                onChange={() => setWeather('cloudy')}
              />
            </label>
            <label>
              Stormy
              <input
                type="radio"
                name="weather"
                value="stormy"
                checked={weather === 'stormy'}
                onChange={() => setWeather('stormy')}
              />
            </label>
            <label>
              Windy
              <input
                type="radio"
                name="weather"
                value="windy"
                checked={weather === 'windy'}
                onChange={() => setWeather('windy')}
              />
            </label>
          </div>
        </label>
        <label>
          Visibility:
          <div>
            <label>
              Great
              <input
                type="radio"
                name="visibility"
                value="great"
                checked={visibility === 'great'}
                onChange={() => setVisibility('great')}
              />
            </label>
            <label>
              Good
              <input
                type="radio"
                name="visibility"
                value="good"
                checked={visibility === 'good'}
                onChange={() => setVisibility('good')}
              />
            </label>
            <label>
              Ok
              <input
                type="radio"
                name="visibility"
                value="ok"
                checked={visibility === 'ok'}
                onChange={() => setVisibility('ok')}
              />
            </label>
            <label>
              Poor
              <input
                type="radio"
                name="visibility"
                value="poor"
                checked={visibility === 'poor'}
                onChange={() => setVisibility('poor')}
              />
            </label>
          </div>
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
