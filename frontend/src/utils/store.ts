import { proxy } from 'valtio';

interface IState {
  current: null | string;
  items: {
    [key: string]: string;
    Top: string;
    Bottom: string;
    Footwear: string;
  };
  avatarURL: string;
}

const state: IState = proxy({
  current: null,
  // has to be white, it is a bit weird
  items: {
    Top: '#ffffff',
    Bottom: '#ffffff',
    Footwear: '#ffffff',
  },
  avatarURL: '/glb/modelwanim.glb',
  // 'https://d1a370nemizbjq.cloudfront.net/6b2de664-48c2-4c36-8b84-85fd92689994.glb',
});

interface IAppState {
  verse: null | string;
  appStarted: boolean;
  hasInteracted: boolean;
  corridorEnd: number;
}

export const appState: IAppState = proxy({
  verse: null,
  appStarted: false,
  hasInteracted: false,
  corridorEnd: -62 - 18,
});

export const tempState = proxy({
  consent: false,
  hasInteracted: false,
  siteStarted: false,
});

//I might cache this / cookie it since it is not dependant on every refresh
export const browserState = proxy({
  canRun: true,
  readerMode: false,
  bannerConsent: false,
});

export default state;
