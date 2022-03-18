import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';

const keyCodeMapping: Record<string, string> = {
  KeyW: 'forward',
  KeyS: 'backward',
  KeyA: 'left',
  KeyD: 'right',
  ArrowUp: 'forward',
  ArrowDown: 'backward',
  ArrowLeft: 'left',
  ArrowRight: 'right',
  ShiftLeft: 'shift',
  AutoWalk: 'forward',
};

function moveFieldByKey(key: string) {
  return keyCodeMapping[key];
}

export default function usePlayerControls(AutoWalk: boolean) {
  const [movement, setMovement] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
    shift: false,
  });

  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  const [action, setAction] = useState('Idle');

  function calculateDirection(event: TouchEvent) {
    event.preventDefault();
    let x = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
    let y = event.touches[0].clientY / window.innerHeight - 1;

    setMousePosition({ x, y });
    setAction('Idle');
  }

  function handleKeyDown(keyCode: string) {
    if (
      keyCode === 'KeyW' ||
      keyCode === 'KeyA' ||
      keyCode === 'KeyS' ||
      keyCode === 'KeyD' ||
      keyCode === 'ArrowUp' ||
      keyCode === 'ArrowDown' ||
      keyCode === 'ArrowLeft' ||
      keyCode === 'ArrowRight' ||
      keyCode === 'ShiftLeft' ||
      keyCode === 'AutoWalk'
    ) {
      setMovement((m) => ({ ...m, [moveFieldByKey(keyCode)]: true }));
    }
  }

  function handleKeyUp(keyCode: string) {
    if (
      keyCode === 'KeyW' ||
      keyCode === 'KeyA' ||
      keyCode === 'KeyS' ||
      keyCode === 'KeyD' ||
      keyCode === 'ArrowUp' ||
      keyCode === 'ArrowDown' ||
      keyCode === 'ArrowLeft' ||
      keyCode === 'ArrowRight' ||
      keyCode === 'ShiftLeft' ||
      keyCode === 'AutoWalk'
    ) {
      setMovement((m) => ({ ...m, [moveFieldByKey(keyCode)]: false }));
    }
  }

  useEffect(() => {
    if (isMobile) {
      document.addEventListener('touchmove', calculateDirection);
      document.addEventListener('touchend', () => {
        setAction('Idle');
        setMousePosition({ x: 0, y: 0 });
      });
    } else {
      document.addEventListener('keydown', (e) => handleKeyDown(e.code));
      document.addEventListener('keyup', (e) => handleKeyUp(e.code));
    }

    return () => {
      document.removeEventListener('touchmove', calculateDirection);
      document.removeEventListener('touchend', () => {
        setAction('Run');
        setMousePosition({ x: 0, y: 0 });
      });
    };
  }, []);
  // animations?
  useEffect(() => {
    const { forward, backward, shift } = movement;

    if (forward) {
      if (shift) {
        setAction('Run');
      } else {
        setAction('Walk');
      }
    } else if (backward) {
      setAction('Walk');
    } else {
      setAction('Idle');
    }
  }, [movement]);
  useEffect(() => {
    if (AutoWalk) {
      handleKeyDown('AutoWalk');
    } else {
      handleKeyUp('AutoWalk');
    }
  }, [AutoWalk]);
  return [mousePosition, action, movement];
}
