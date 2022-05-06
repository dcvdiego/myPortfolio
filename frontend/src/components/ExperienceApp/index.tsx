import React, { Suspense, useCallback, useEffect, useState } from 'react';
import { Button } from '../../styles/global.styles';
import {
  PerspectiveCamera,
  Loader,
  Stars,
  softShadows,
} from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import Icon from './models/icon';
import PlayerMovement from './playerMovement';
import Overlay from './overlay';
import { appState } from '../../utils/store';
import { useSnapshot } from 'valtio';
import Cloud from '../WordCloud/model';
import BaseSection from './models/corridor/baseSection';
import BalletMannequin from './models/balletMannequin';
import Dress from './models/dress';
import Screen from './models/screen';
import Phone from './models/phone';
import Headset from './models/headset';
import CertificationsPage from '../../pages/certifications';
import CERTIFICATIONS_QUERY from '../../graphql/Certification/certifications';
import { ApolloProvider } from '@apollo/client';
import client from '../../utils/apolloClient';
import { UIBottomContainer, UITopContainer } from './eApp.styles';
import ABOUT_QUERY from '../../graphql/About/about';
import AboutPage from '../../pages/about';
import LFWLogo from '../../assets/london-fashion-week-logo.png';
import AwardCover from '../../assets/award.png';
import GivebackCover from '../../assets/giveback.jpeg';
import AvatarCover from '../../assets/avatar.png';
import BlockchainCover from '../../assets/blockchain.jpeg';
import { isMobile } from 'react-device-detect';
import PROJECT_QUERY from '../../graphql/Projects/project';
import Client from '../../pages/projects/[slug]';
import IBMLogo from './models/IBM';
import TutorialOverlay from '../TutorialOverlay';
import ProjectsPage from '../../pages/projects';
import GIVEBACK_PROJECTS_QUERY from '../../graphql/Projects/givebackProjects';
import CustomAvatar from './models/customAvatar';
import BigScreen from './models/bigScreen';
import testVideo from '../../assets/test.mp4';
import givebackPlusVideo from '../../assets/giveback+.mp4';
import LFWVideo from '../../assets/LFWPromo.mp4';

softShadows();

export default function App() {
  const [autoWalk, setAutoWalk] = useState<boolean>(false);
  const [screenNumber, setScreenNumber] = useState<number>(0);
  const [tutorial, setTutorial] = useState<boolean>(false);
  const [transparent, setTransparent] = useState<boolean>(false);
  const snap = useSnapshot(appState);
  const handleBack = () => {
    appState.verse = null;
    appState.appStarted = false;
  };
  const linkArray = [
    'hard work',
    'enthusiasm',
    'dedication',
    'commitment',
    'pragmatic',
    'leadership',
  ];
  const escFunction = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape' && snap.verse) handleBack();
    //Do whatever when esc is pressed
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);

    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
  }, []);
  return (
    <>
      <Canvas
        shadows
        // if rendering starts to be weird, increase far
        camera={{ fov: 70, near: 1, far: 350, position: [-11, 1, -62] }}
        style={{
          height: '100vh',
          width: '100%',
          overflowX: 'hidden',
          touchAction: 'none',
        }}
      >
        <ApolloProvider client={client}>
          <PerspectiveCamera />
          <Stars
            radius={100}
            depth={50}
            count={5000}
            factor={4}
            saturation={0}
          />
          <Suspense fallback={null}>
            {/* every -18 units you can add a new corridor */}
            {snap.verse && (
              <PlayerMovement
                AutoWalk={autoWalk}
                location="App"
                screen={screenNumber > 0 ? true : false}
                setTransparent={setTransparent}
              />
            )}
            <BaseSection transparent={transparent} position={[-11, 4.5, -62]} />
            {/* Pre-Professional ExperienceVerse */}
            {snap.verse === 'PP' && (
              <>
                <Cloud
                  dist={linkArray.length}
                  radius={20}
                  data={linkArray}
                  origin="app"
                />
                <Screen
                  position={[-2, 0, -70]}
                  cover={AvatarCover}
                  query={ABOUT_QUERY}
                  Component={<AboutPage screen />}
                  screen={screenNumber === 1 ? screenNumber : 0}
                  onClick={() => setScreenNumber(1)}
                />
                <BaseSection
                  transparent={transparent}
                  position={[-11, 4.5, -80]}
                  door
                />
                {/* IDEAS:
                Pre-Uni: Not sure... added about me already!
                Uni: Add University badge and Gaming society tech
                Global Engineering Challenge NODE-Red?

                */}
              </>
            )}
            {/* IBM ExperienceVerse */}
            {snap.verse === 'IBM' && (
              <>
                {/* CERTIFICATIONS SECTION */}
                <Icon position={[-16, 5, -70]} />
                <IBMLogo position={[-11, 2, -70]} scale={0.5} />
                <Screen
                  position={[-2, 0, -70]}
                  cover={AwardCover}
                  query={CERTIFICATIONS_QUERY}
                  Component={<CertificationsPage screen />}
                  screen={screenNumber === 1 ? screenNumber : 0}
                  onClick={() => setScreenNumber(1)}
                />
                <BigScreen url={testVideo} position={[-2, 0, -70]} />
                {/* LONDON FASHION WEEK SECTION */}
                <BaseSection
                  transparent={transparent}
                  position={[-11, 4.5, -80]}
                />
                <BalletMannequin
                  scale={4}
                  position={[-19, 1, -94]}
                  rotation={[0, 20, 0]}
                />
                <Dress scale={4} position={[-11, -1, -90]} />
                <Screen
                  position={[-2, 0, -90]}
                  cover={LFWLogo}
                  query={PROJECT_QUERY}
                  variable={{ slug: 'london-fashion-week' }}
                  Component={<Client screen />}
                  screen={screenNumber === 2 ? screenNumber : 0}
                  onClick={() => setScreenNumber(2)}
                />
                <BigScreen url={LFWVideo} position={[-2, 0, -90]} />
                {/* METAVERSE SECTION */}
                <BaseSection
                  transparent={transparent}
                  position={[-11, 4.5, -98]}
                />
                <Headset position={[-11, 4.5, -107]} scale={2} />
                <Screen
                  position={[-2, 0, -108]}
                  cover={BlockchainCover}
                  query={PROJECT_QUERY}
                  variable={{ slug: 'metaverse' }}
                  Component={<Client screen />}
                  screen={screenNumber === 3 ? screenNumber : 0}
                  onClick={() => setScreenNumber(3)}
                />
                <CustomAvatar
                  scale={2.25}
                  position={[-19, 1, -114]}
                  rotation={[0, Math.PI / 6, 0]}
                />
                {/* GIVEBACK SECTION */}
                <BaseSection
                  transparent={transparent}
                  position={[-11, 4.5, -116]}
                />
                <Screen
                  position={[-2, 0, -125]}
                  cover={GivebackCover}
                  query={GIVEBACK_PROJECTS_QUERY}
                  Component={<ProjectsPage screen />}
                  screen={screenNumber === 4 ? screenNumber : 0}
                  onClick={() => setScreenNumber(4)}
                />
                <BigScreen url={givebackPlusVideo} position={[-2, 0, -125]} />
                <Phone position={[-11, 10, -128]} scale={0.5} />
                <BaseSection
                  transparent={transparent}
                  position={[-11, 4.5, -134]}
                  door
                />
              </>
            )}
          </Suspense>
        </ApolloProvider>
      </Canvas>
      <Overlay />
      {tutorial ? (
        <TutorialOverlay origin="app" setTutorial={setTutorial} />
      ) : null}
      <Loader />
      <UITopContainer>
        {!tutorial && (
          <Button
            onClick={() => setTutorial(true)}
            style={{
              backgroundColor: 'rgba(120, 113, 108, 0.313)',
              padding: '0.5rem 1rem 0.5rem 1rem',
              color: 'white',
            }}
          >
            ?
          </Button>
        )}
      </UITopContainer>
      <UIBottomContainer>
        {autoWalk &&
        screenNumber === 0 &&
        !isMobile &&
        snap.verse &&
        !tutorial ? (
          <Button
            style={{
              backgroundColor: 'rgba(120, 113, 108, 0.313)',
              color: 'white',
            }}
            onClick={() => setAutoWalk(false)}
          >
            Stop
          </Button>
        ) : (
          screenNumber === 0 &&
          !isMobile &&
          snap.verse &&
          !tutorial && (
            <Button
              style={{
                backgroundColor: 'rgba(120, 113, 108, 0.313)',
                color: 'white',
                margin: '1rem',
              }}
              onClick={() => setAutoWalk(true)}
            >
              Auto-Walk
            </Button>
          )
        )}
        {snap.verse && screenNumber === 0 && (
          <Button
            style={{
              backgroundColor: 'rgba(120, 113, 108, 0.313)',
              color: 'white',
              margin: '1rem',
            }}
            onClick={handleBack}
          >
            Back to menu
          </Button>
        )}
        {screenNumber > 0 && (
          <Button
            style={{
              backgroundColor: 'rgba(120, 113, 108, 0.313)',
              color: 'white',
              margin: '1rem',
            }}
            onClick={() => setScreenNumber(0)}
          >
            Go Back
          </Button>
        )}
      </UIBottomContainer>
    </>
  );
}
