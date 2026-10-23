import { useState, useEffect } from 'react';

/**
 * Custom hook to simulate typewriter text reveal with startDelay and configurable speed.
 * @param text The full text to reveal
 * @param speed Milliseconds between characters (default: 38ms)
 * @param startDelay Delay in ms before typing begins (default: 600ms)
 * @returns { displayed: string, done: boolean }
 */
export function useTypewriter(
  text: string,
  speed: number = 38,
  startDelay: number = 600
): { displayed: string; done: boolean } {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let timeoutId: number;
    let intervalId: number;
    let currentIndex = 0;

    setDisplayed('');
    setDone(false);

    timeoutId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        if (currentIndex < text.length) {
          currentIndex++;
          setDisplayed(text.slice(0, currentIndex));
          if (currentIndex >= text.length) {
            setDone(true);
            clearInterval(intervalId);
          }
        } else {
          setDone(true);
          clearInterval(intervalId);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [text, speed, startDelay]);

  return { displayed, done };
}
