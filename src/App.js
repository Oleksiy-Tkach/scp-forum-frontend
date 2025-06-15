        import React, { useEffect, useState } from 'react';
        import axios from 'axios';
        import './App.css';

        function App() {
          const [message, setMessage] = useState('');
          const [error, setError] = useState(null);

          const backendUrl = process.env.REACT_APP_BACKEND_URL;

          useEffect(() => {
            if (!backendUrl) {
              setError("REACT_APP_BACKEND_URL не визначено у файлі .env! Будь ласка, перевірте файл.");
              return;
            }

            axios.get(backendUrl)
              .then(response => {
                setMessage(response.data);
              })
              .catch(err => {
                console.error("Помилка отримання даних від бекенду:", err);
                setError(`Не вдалося отримати дані від бекенду: ${err.message}. Переконайтеся, що бекенд працює та CORS налаштовано.`);
              });
          }, [backendUrl]);

          return (
            <div className="App">
              <header className="App-header">
                <h1>SCP Forum Frontend</h1>
                {error ? (
                  <p style={{ color: 'red', fontWeight: 'bold' }}>Помилка: {error}</p>
                ) : (
                  <p>Повідомлення від бекенду: {message}</p>
                )}
                <p>
                  Це ваш React фронтенд. Він підключений до:
                  <br />
                  <a href={backendUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#61dafb' }}>
                    {backendUrl}
                  </a>
                </p>
                <p>
                  Відредагуйте <code>src/App.js</code> і збережіть для перезавантаження.
                </p>
                <a
                  className="App-link"
                  href="https://react.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Дізнайтеся React
                </a>
              </header>
            </div>
          );
        }

        export default App;
        