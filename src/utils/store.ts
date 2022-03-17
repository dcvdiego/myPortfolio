import { proxy } from 'valtio';

interface IState {
  current: null | string;
  items: {
    [key: string]: string;
    Top: string;
    Bottom: string;
    Footwear: string;
  };
  avatarName: string;
}

const state: IState = proxy({
  current: null,
  // has to be white, it is a bit weird
  items: {
    Top: '#ffffff',
    Bottom: '#ffffff',
    Footwear: '#ffffff',
  },
  avatarName: 'modelwanim',
});

interface IAppState {
  verse: null | string;
  gameStarted: boolean;
  hasInteracted: boolean;
}

export const appState: IAppState = proxy({
  verse: null,
  gameStarted: false,
  hasInteracted: false,
});

export default state;
