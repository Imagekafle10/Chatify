import { useRef } from "react";

function useKeyboardSound() {
  const keyStrokeSoundsRef = useRef([
    new Audio("/sounds/keystroke1.mp3"),
    new Audio("/sounds/keystroke2.mp3"),
    new Audio("/sounds/keystroke3.mp3"),
    new Audio("/sounds/keystroke4.mp3"),
  ]);

  const playRandomKeyStrokeSound = () => {
    const sounds = keyStrokeSoundsRef.current;
    const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
    randomSound.currentTime = 0;
    randomSound.play().catch((error) => console.log("Audio play failed:", error));
  };

  return { playRandomKeyStrokeSound };
}

export default useKeyboardSound;
