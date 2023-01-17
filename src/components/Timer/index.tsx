import * as react from "react";
import styles from "./styles.module.css"

interface TimerProps {
  status: 'start' | 'pause' | 'resume' | 'stop';
};

const Timer: react.FC<TimerProps> = (props: TimerProps) => {
  const { status } = props;

  const [startTime, setStartTime] = react.useState(new Date().getTime());
  const [pausedTime, setPrausedTime] = react.useState(0);

  const calcElapsedTime = () => {
    const now = new Date().getTime();
    const distance = now - startTime;


    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const output = [`${minutes.toFixed(2)}:${seconds.toFixed(2)}`];
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    if (hours > 0) {
      output.unshift(`${hours.toFixed(2)}:`)
    }
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    if (days > 1) {
      output.unshift(`${days} days `)
    } else if (days > 0) {
      output.unshift(`${days} day `)
    }

    return output.join("");
  };

  react.useEffect(() => {
    if (status === 'start') {
      setStartTime(new Date().getTime());
    } else if (status === 'stop') {
      setStartTime(new Date().getTime());
    } else if (status === 'pause') {

    } else if (status === 'resume') {
    }
  }, [status]);

  return (<div>{calcElapsedTime()}</div>)
}

export default Timer;