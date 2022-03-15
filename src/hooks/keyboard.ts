import { useEffect } from 'react';
import { useStore } from '../store';

function useKeys(keyConfig) {
  useEffect(() => {
    const keyMap = keyConfig.reduce((out, { keys, fn, up = true }) => {
      keys && keys.forEach((key) => (out[key] = { fn, pressed: false, up }));
      return out;
    }, {});

    const downHandler = ({ key, target }) => {
      if (!keyMap[key] || target.nodeName === 'INPUT') return;
      const { fn, pressed, up } = keyMap[key];
      keyMap[key].pressed = true;
      if (up || !pressed) fn(true);
    };

    const upHandler = ({ key, target }) => {
      if (!keyMap[key] || target.nodeName === 'INPUT') return;
      const { fn, up } = keyMap[key];
      keyMap[key].pressed = false;
      if (up) fn(false);
    };

    window.addEventListener('keydown', downHandler, { passive: true });
    window.addEventListener('keyup', upHandler, { passive: true });

    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, [keyConfig]);
}

export function Keyboard() {
  const { set } = useStore(({ set }) => ({
    set,
  }));

  useKeys([
    {
      keys: ['ArrowUp', 'w', 'W'],
      fn: (forward) =>
        set((state) => ({ controls: { ...state.controls, forward } })),
    },
    {
      keys: ['ArrowDown', 's', 'S'],
      fn: (backward) =>
        set((state) => ({ controls: { ...state.controls, backward } })),
    },
    {
      keys: ['ArrowLeft', 'a', 'A'],
      fn: (left) => set((state) => ({ controls: { ...state.controls, left } })),
    },
    {
      keys: ['ArrowRight', 'd', 'D'],
      fn: (right) =>
        set((state) => ({ controls: { ...state.controls, right } })),
    },
  ]);
  return null;
}
