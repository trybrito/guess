import styles from "./app.module.css";
import { Button } from "./components/Button";

import { Header } from "./components/Header";
import { Input } from "./components/Input";
import { Letters } from "./components/Letters";
import { LettersUsed } from "./components/LettersUsed";
import { Tip } from "./components/Tip";

function App() {
  function onRestartGame() {
    alert("Jogo reiniciado!");
  }

  return (
    <div className={styles.container}>
      <main>
        <Header current={5} max={10} onRestart={onRestartGame} />
        <Tip tip={"Teste de dica"} />
        <div className={styles.word}>
          <Letters value="R" />
          <Letters value="" />
          <Letters value="" />
          <Letters value="C" />
          <Letters value="T" />
        </div>

        <h4>Palpite</h4>

        <div className={styles.guess}>
          <Input autoFocus maxLength={1} placeholder="?" />
          <Button title="Confirmar" />
        </div>

        <LettersUsed />
      </main>
    </div>
  );
}

export default App;
