import * as react from "react";
import styles from "./styles.module.css"
import TypingItem from "../TypingItem";
import {PhoneNumberGenerator} from "../Generator";
import { v4 as uuidv4 } from 'uuid';
import Timer from "../Timer";

type Material = {
  uuid: string;
  value: string;
};

interface BlurOverlayProps {
  onClick: () => void;
};

interface TypingAreaProps {
  numberOfItems: number;
};

const BlurOverlay: react.FC<BlurOverlayProps> = (props: BlurOverlayProps) => {
  const { onClick } = props;

  return (
    <div className={styles.BlurOverlay} onClick={onClick}>
      <p>Click here to start practice.</p>
    </div>)
};

const TypingArea: react.FC<TypingAreaProps> = (props: TypingAreaProps) => {
  const { numberOfItems } = props;

  const [focus, setFocus] = react.useState(false);
  const [focusIdx, setFocusIdx] = react.useState(0);
  const [material, setMaterial] = react.useState<Material[]>([]);
  const [status, setStatus] = react.useState<'start' | 'pause' | 'resume' | 'stop'>('stop');

  const onClickHandler = () => setFocus(true);
  const onBlurHandler = () => setFocus(false);
  const onCompleteHandler = (idx: number) => () => setFocusIdx(idx + 1);
  const blurOverlayOnClickHandler = () => setFocus(true);

  const refillMaterial = () => {
    const randomPhoneNums = Array(numberOfItems).fill(null).map(() => {
      return {'uuid': uuidv4(), 'value': PhoneNumberGenerator() };
    });
    setMaterial(randomPhoneNums);
  };

  react.useEffect(() => {
    refillMaterial();
  }, []);

  react.useEffect(() => {
    if (focus) {
      setStatus('start');
    } else {
      setStatus('stop');
    }
  }, [focus]);

  react.useEffect(() => {
    if (focusIdx === material.length) {
      refillMaterial();
      setFocusIdx(0);
    }
  }, [focusIdx]);

  return (
    <div className={styles.TypingAreaWrapper}>
      <Timer status={status}/>
      <div
        className={styles.TypingArea}
        onBlur={onBlurHandler}
        onClick={onClickHandler}
        >
        {
        material.map(({ uuid, value}, idx) => (
          <TypingItem
            key={uuid}
            focus={focus && focusIdx === idx}
            onComplete={onCompleteHandler(idx)}
            material={value}
          />
        ))
      }</div>
      {!focus && <BlurOverlay onClick={blurOverlayOnClickHandler} />}
    </div>
  )
};

export default TypingArea;