import { proxy } from 'valtio';

const state = proxy({
  current: null,
  // has to be white, it is a bit weird
  items: {
    Top: '#ffffff',
    Bottom: '#ffffff',
    Footwear: '#ffffff',
  },
  avatarName: 'modelwanim',
});

export default state;
