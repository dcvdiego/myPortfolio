import { Title, SubHeading } from '../styles/global.styles';
import { Loader, useProgress } from '@react-three/drei';
import { useState, useEffect } from 'react';
import tw, { styled, TwStyle } from 'twin.macro';
import { useSnapshot } from 'valtio';

import { tempState } from '../utils/store';

const AppContainer = styled.div`
  position: absolute;
  top: 0;
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
  color: white;
`;
const AppMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
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

const TempOverlay = () => {
  const [shown, setShown] = useState(true);
  const [opaque, setOpaque] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);
  const { active, progress } = useProgress();
  const snap = useSnapshot(tempState);
  const siteStarted = snap.siteStarted;

  useEffect(() => {
    if (siteStarted) {
      setShown(false);
    } else if (!siteStarted) {
      setShown(true);
    }
  }, [siteStarted, active]);

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

  const handleStart = () => {
    tempState.consent = true;
    tempState.siteStarted = true;
  };

  return shown ? (
    <AppContainer
      onClick={() => (tempState.hasInteracted = true)}
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
              <Title>Hi, thanks for visiting</Title>
              <SubHeading>This website is still in progress</SubHeading>
              <AppMenuButton color="red" onClick={() => handleStart()}>
                Show me what you have done so far!
              </AppMenuButton>
            </>
          )}
        </AppSubContainer>
      </AppMenu>
    </AppContainer>
  ) : null;
};

export default TempOverlay;
