import styles from './app.module.css';

import { FormEvent, useEffect, useState } from 'react';
import { Challenge, WORDS } from './utils/words';

import { Button } from './components/Button';
import { Header } from './components/Header';
import { Input } from './components/Input';
import { Letter } from './components/Letter';
import { LettersUsed, LettersUsedProps } from './components/LettersUsed';
import { Tip } from './components/Tip';

const ATTEMPTS_MARGIN = 5;

function App() {
  const [score, setScore] = useState(0);
  const [letter, setLetter] = useState('');
  const [lettersUsed, setLettersUsed] = useState<LettersUsedProps[]>([]);
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [shake, setShake] = useState(false);

  function onRestartGame() {
    const isConfirmed = window.confirm('Tem certeza de que deseja reiniciar?');

    if (isConfirmed) {
      startGame();
    }
  }

  function startGame() {
    const index = Math.floor(Math.random() * WORDS.length);
    const randomWord = WORDS[index];

    setChallenge(randomWord);
    setScore(0);
    setLetter('');
    setLettersUsed([]);
  }

  function endGame(message: string) {
    alert(message);
    startGame();
  }

  function handleConfirm(event: FormEvent) {
    event.preventDefault();

    const letterInput = (event.target as HTMLFormElement)
      .children[0] as HTMLInputElement;

    letterInput.focus();

    if (!challenge) {
      return;
    }

    if (!letter.trim()) {
      return alert('Digite uma letra');
    }

    const value = letter.toLocaleUpperCase();
    const letterAlreadyUsed = lettersUsed.find((data) => data.value === value);

    if (letterAlreadyUsed) {
      setLetter('');
      return alert(`Você já utilizou a letra ${value}`);
    }

    const hits = challenge.word
      .toLocaleUpperCase()
      .split('')
      .filter((char) => char === value).length;
    const isCorrect = hits > 0;
    const currentScore = score + hits;

    setLettersUsed((prevState) => [...prevState, { value, isCorrect }]);
    setScore(currentScore);
    setLetter('');

    if (!isCorrect) {
      setShake(true);
      setTimeout(() => setShake(false), 300);
    }
  }

  useEffect(() => {
    startGame();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (!challenge) {
        return;
      }

      if (score === challenge.word.length) {
        return endGame('Parabéns, você descobriu a palavra!');
      }

      const attemptsLimit = challenge.word.length + ATTEMPTS_MARGIN;

      if (lettersUsed.length === attemptsLimit) {
        return endGame('Que pena, você usou todas as tentativas :(');
      }
    }, 200);
  }, [score, lettersUsed.length]);

  if (!challenge) {
    return;
  }

  return (
    <div className={styles.container}>
      <main>
        <Header
          current={lettersUsed.length}
          max={challenge.word.length + ATTEMPTS_MARGIN}
          onRestart={onRestartGame}
        />
        <Tip tip={challenge.tip} />
        <div className={`${styles.word} ${shake ? styles.shake : ''}`}>
          {challenge.word.split('').map((letter, index) => {
            const letterThatMatchesUsedLetter = lettersUsed.find(
              (data) =>
                data.value.toLocaleUpperCase() === letter.toLocaleUpperCase()
            );

            return (
              <Letter
                key={index}
                value={letterThatMatchesUsedLetter && letter}
                color={letterThatMatchesUsedLetter ? 'correct' : 'default'}
              />
            );
          })}
        </div>

        <h4>Palpite</h4>

        <form action="" onSubmit={handleConfirm} className={styles.guess}>
          <Input
            type="text"
            placeholder="?"
            autoFocus
            maxLength={1}
            value={letter}
            onChange={(event) =>
              setLetter(event.target.value.toLocaleUpperCase())
            }
          />
          <Button type="submit" title="Confirmar" />
        </form>

        <LettersUsed data={lettersUsed} />
      </main>
    </div>
  );
}

export default App;
