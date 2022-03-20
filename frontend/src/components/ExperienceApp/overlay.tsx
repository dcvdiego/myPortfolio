import { Title } from '../../styles/global.styles';
import { Loader, useProgress } from '@react-three/drei';
import { useState, useEffect } from 'react';
import tw, { styled, TwStyle } from 'twin.macro';
import { useSnapshot } from 'valtio';

import { appState } from '../../utils/store';

const AppContainer = styled.div`
  position: absolute;
  /* top: 0; */
  left: 0;
  width: 100%;
  height: 100%;
  background: #141622cc;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 300ms ease;
  transition: background-color 1000ms ease;
  z-index: 1000;
`;
const AppMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
`;
const AppMenuOptions = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
`;
const AppMenuControls = styled.span`
  margin-top: 2rem;
  margin-bottom: 0.5rem;
  font-size: 2rem;
  color: #c1b1df;
  text-shadow: 0 0 20px #5a117e;
`;

export const buttonStyles: Record<string, TwStyle> = {
  blue: tw`
    bg-blue-700
    hover:bg-blue-600
    `,
  orange: tw`
  bg-orange-600
  hover:bg-orange-400
  `,
  green: tw`
  bg-green-500
  hover:bg-green-400
  `,
  red: tw`
  bg-red-700
  hover:bg-red-800
  `,
};

const AppMenuButton = styled.button(({ color }) => [
  tw`
   text-6xl
      `,
  color && buttonStyles[color],
]);

const AppSubContainer = styled.div`
  margin: 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 100%;
`;

const Overlay = () => {
  const [shown, setShown] = useState(true);
  const [opaque, setOpaque] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);
  const { active, progress } = useProgress();
  const snap = useSnapshot(appState);
  const appStarted = snap.appStarted;

  useEffect(() => {
    if (appStarted) {
      setShown(false);
    } else if (!appStarted) {
      setShown(true);
    }
  }, [appStarted, active]);

  useEffect(() => {
    let t: number;
    if (hasLoaded === opaque) t = setTimeout(() => setOpaque(!hasLoaded), 300);
    return () => clearTimeout(t);
  }, [hasLoaded, opaque]);

  useEffect(() => {
    if (progress >= 100) {
      setHasLoaded(true);
    }
  }, [progress]);

  const handleStart = (verse: string) => {
    appState.verse = verse;
    appState.appStarted = true;
  };

  return shown ? (
    <AppContainer
      onClick={() => (appState.hasInteracted = true)}
      style={{
        opacity: shown ? 1 : 0,
        background: opaque ? '#141622FF' : '#141622CC',
      }}
    >
      <AppMenu>
        <AppSubContainer>
          {!hasLoaded ? (
            <Loader />
          ) : (
            <>
              <Title>Select the ExperienceVerse</Title>
              <AppMenuButton color="orange" onClick={() => handleStart('PP')}>
                Pre-Professional
              </AppMenuButton>
              <AppMenuButton color="blue" onClick={() => handleStart('IBM')}>
                IBM
              </AppMenuButton>
              <AppMenuOptions>
                <AppMenuControls>
                  <p>Controls</p> WASD or ← arrows →
                </AppMenuControls>
              </AppMenuOptions>
            </>
          )}
        </AppSubContainer>
      </AppMenu>
    </AppContainer>
  ) : null;
};

export default Overlay;
