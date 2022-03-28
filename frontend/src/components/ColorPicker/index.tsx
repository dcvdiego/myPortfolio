import React from 'react';
import { HexColorPicker } from 'react-colorful';
import { styled } from 'twin.macro';
import { useSnapshot } from 'valtio';
import state from '../../utils/store';
const ColorPicker = styled(HexColorPicker)`
  .react-colorful {
    padding: 16px;
    border-radius: 12px;
    background: #33333a;
    box-shadow: 0 6px 12px #999;
  }
`;
export default function Picker() {
  const snap = useSnapshot(state);
  return (
    <div
      style={{
        display: snap.current ? 'flex' : 'none',
        position: 'absolute',
        top: '50%',
        left: '100%',
      }}
    >
      <ColorPicker
        className="picker"
        color={snap.items[String(snap.current)]}
        onChange={(color) => (state.items[String(snap.current)] = color)}
      />
      <h1 style={{ color: 'white' }}>{snap.current}</h1>
    </div>
  );
}
