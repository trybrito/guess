import styles from "./styles.module.css";

import { Letters } from "../Letters";

export function LettersUsed() {
  return (
    <div className={styles.lettersUsed}>
      <h5>Letras utilizadas</h5>
      <div>
        <Letters value="R" size="small" color="correct" />
        <Letters value="X" size="small" color="wrong" />
      </div>
    </div>
  );
}
