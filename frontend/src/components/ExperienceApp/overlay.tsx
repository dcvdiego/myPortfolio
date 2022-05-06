import { Title } from '../../styles/global.styles';
import { Loader, useProgress } from '@react-three/drei';
import { useState, useEffect } from 'react';
import tw, { styled, TwStyle } from 'twin.macro';
import { useSnapshot } from 'valtio';

import { appState } from '../../utils/store';
import { isMobile } from 'react-device-detect';

// all overlays are broken in mobile (they go beyond the box)

const AppContainer = styled.div`
  ${tw`
absolute 
left-0 
w-full 
h-full 
flex 
items-center 
justify-center
`}
  background: #141622cc;
  transition: background-color 1000ms ease;
  z-index: 1000;
`;
const AppMenu = styled.div`
  ${tw`
  flex 
  items-center 
  justify-center 
  flex-col 
  h-full
  `}
`;
const AppMenuOptions = styled.div`
  ${tw`
  flex 
  flex-col 
  mt-4
  `}
`;
const AppMenuControls = styled.span`
  ${tw`
  mt-8 
  mb-2 
  text-3xl 
  text-purple-300
  `}
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

// const AppMenuButton = styled.button(({ color }) => [
//   tw`
//    text-6xl
//    m-16
//       `,
//   color && buttonStyles[color],
// ]);
// will make the new button style reusable at some point
const NewButtonIBM = styled.button`
  margin: 3rem;
  padding: 1.3em 3em;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  font-weight: 500;
  color: #000;
  background-color: #fff;
  border: none;
  border-radius: 45px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
  &:hover {
    background-color: #2e31e5;
    box-shadow: 0px 15px 20px rgba(46, 49, 229, 0.4);
    color: #fff;
    transform: translateY(-7px);
  }
  &:active {
    transform: translateY(-1px);
  }
`;
const NewButtonPP = styled.button`
  margin: 3rem;
  padding: 1.3em 3em;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  font-weight: 500;
  color: #000;
  background-color: #fff;
  border: none;
  border-radius: 45px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
  &:hover {
    background-color: #e5802e;
    box-shadow: 0px 15px 20px rgba(229, 134, 46, 0.4);
    color: #fff;
    transform: translateY(-7px);
  }
  &:active {
    transform: translateY(-1px);
  }
`;

const AppSubContainer = styled.div`
  ${tw`
m-8 
text-center 
flex 
flex-col 
items-center 
justify-around 
h-full
`}
`;

const ButtonsContainer = styled.div`
  ${tw`
flex
flex-row
`}
`;

const Overlay = () => {
  const [shown, setShown] = useState(true);
  const [opaque, setOpaque] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);
  const { active, progress } = useProgress();
  const snap = useSnapshot(appState);
  const appStarted = snap.appStarted;

  useEffect(() => {
    appStarted ? setShown(false) : setShown(true);
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
              <ButtonsContainer>
                <NewButtonPP onClick={() => handleStart('PP')}>
                  Pre-Professional
                </NewButtonPP>
                <NewButtonIBM onClick={() => handleStart('IBM')}>
                  IBM
                </NewButtonIBM>
              </ButtonsContainer>
              <AppMenuOptions>
                <AppMenuControls>
                  <p>Controls</p>{' '}
                  {isMobile
                    ? 'touch and drag to move around'
                    : 'WASD or ← arrows →, hold shift to run'}
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
