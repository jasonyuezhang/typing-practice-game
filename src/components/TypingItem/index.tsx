import * as react from "react";
import styles from "./styles.module.css"
import EnteredChars from "../EnteredChars";

interface TypingInputProps {
  onChange: (inputValue: string) => void;
  onKeyDown: (key: string, inputValue?: string) => void;
}

interface TypingPlaceholderProps {
  placeholder: string;
}

interface TypingItemProps {
  focus: boolean;
  material: string;
  onComplete: () => void;
}

const TypingInput: react.FC<TypingInputProps> = (props: TypingInputProps) => {
  const { onChange, onKeyDown } =  props;
  const inputRef = react.useRef<HTMLInputElement>(null);

  const onChangeHandler = (event: react.ChangeEvent<HTMLInputElement>) => {
    onChange(event.currentTarget.value);
  };
  const onKeyDownHandler = (event: react.KeyboardEvent<HTMLInputElement>) => {
    onKeyDown(event.key, inputRef.current?.value);
  };

  react.useEffect(() => {
    inputRef.current?.focus();
  }, [])

  return <input
    ref={inputRef}
    autoFocus
    className={`${styles.TypingInput} ${styles.TypingFont}`}
    onChange={onChangeHandler}
    onKeyDown={onKeyDownHandler}
    type="text"
    value={""}
  />;
};

const TypingPlaceholder: react.FC<TypingPlaceholderProps> = (props: TypingPlaceholderProps) => {
  const { placeholder } = props;
  return (<div className={`${styles.TypingPlaceholder} ${styles.TypingFont}`}>{placeholder}</div>);
};

const TypingItem: react.FC<TypingItemProps> = (props: TypingItemProps) => {
  const { focus, material, onComplete } =  props;
  const [value, setValue] = react.useState("");

  const inputOnChargeHandler = (inputValue: string) => {
    setValue(value + inputValue);
  };

  const inputOnKeyDownHandler = (key: string, inputValue?: string) => {
    if (key === "Backspace") {
      setValue(value.slice(0, -1));
    } else if (key === "Enter") {
      setValue(value + "⏎")
    }
  };

  react.useEffect(() => {
    if (value.length > material.length) {
      onComplete();
    }
  }, [value])

  return (
    <div className={styles.TypingItem}>
      <div className={styles.EnteredChars}>
        <EnteredChars entered={value} expected={material}/>
        {focus && (<TypingInput
          onChange={inputOnChargeHandler}
          onKeyDown={inputOnKeyDownHandler}
        />)}
      </div>
      <TypingPlaceholder placeholder={" ".repeat(value.length) + material.slice(value.length)}/>
    </div>
  );
};

export default TypingItem;