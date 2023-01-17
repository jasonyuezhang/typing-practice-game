import * as react from "react";
import styles from "./styles.module.css"

interface EnteredCharProps {
  char: string;
  expectedChar: string;
}

interface EnteredCharsProps {
  entered: string;
  expected: string;
}

const EnteredChar: react.FC<EnteredCharProps> = (props: EnteredCharProps) => {
  const { char, expectedChar } = props;
  const classNames = [styles.EnteredChar, styles.TypingFont];
  if (char === expectedChar) {
    classNames.push(styles.Match);
  } else {
    classNames.push(styles.Mismatch);
  }

  if (expectedChar.charCodeAt(0) > 255) {
    classNames.push(styles.Unicode);
  }

  return (<span className={classNames.join(" ")}>{expectedChar}</span>);
};

const EnteredChars: react.FC<EnteredCharsProps> = (props: EnteredCharsProps) => {
  const { entered, expected } = props;
  return (
    <react.Fragment>{
      entered
        .split("")
        .map((c, idx) => <EnteredChar
          key={idx.toString()}
          char={c}
          expectedChar={expected[idx] || "⏎"}
        />)
      }
    </react.Fragment>
  );
};

export default EnteredChars;