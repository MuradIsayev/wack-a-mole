import './App.css';

import mole from './assets/mole.png';
import hole from './assets/hole.png';
import { useEffect, useState } from 'react';

function App() {
  const [score, setScore] = useState(0);
  const [moles, setMoles] = useState<boolean[]>(new Array(9).fill(false));

  const setMoleVisibility = (index: number, isVisible: boolean) => {
    setMoles(curMoles => {
      const newMoles = [...curMoles];
      newMoles[index] = isVisible;
      return newMoles;
    });
  };

  const wackMole = (index: number) => {
    if (!moles[index]) return;
    setMoleVisibility(index, false);
    setScore((score) => score + 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * moles.length);
      setMoleVisibility(randomIndex, true);
      setTimeout(() => {
        setMoleVisibility(randomIndex, false);

      }, 700);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [moles]);

  return (
    <>
      <h1>Score {score}</h1>
      <div className="grid">
        {moles.map((isMole, idx) => (
          <img
            src={isMole ? mole : hole}
            alt=""
            onClick={() => {
              wackMole(idx);
            }}
          />
        ))}
      </div>
    </>
  );
}

export default App;
