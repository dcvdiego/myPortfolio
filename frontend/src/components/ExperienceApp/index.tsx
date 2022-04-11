import React, { Suspense, useEffect, useState } from 'react';
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
import CertificationsPage from '../../pages/certifications';
import CERTIFICATIONS_QUERY from '../../graphql/Certification/certifications';
import { ApolloProvider, useQuery } from '@apollo/client';
import client from '../../utils/apolloClient';
import { UIBottomContainer, UITopContainer } from './eApp.styles';
import ABOUT_QUERY from '../../graphql/About/about';
import AboutPage from '../../pages/about';
import LFWLogo from '../../assets/london-fashion-week-logo.png';
import AwardCover from '../../assets/award.png';
import GivebackCover from '../../assets/giveback.jpeg';
import AvatarCover from '../../assets/avatar.png';
import { isMobile } from 'react-device-detect';
import PROJECT_QUERY from '../../graphql/Projects/project';
import Client from '../../pages/projects/[slug]';
import IBMLogo from './models/IBM';
import TutorialOverlay from '../TutorialOverlay';
import PROJECTS_QUERY from '../../graphql/Projects/projects';
import ProjectsPage from '../../pages/projects';

softShadows();

export default function App() {
  const [autoWalk, setAutoWalk] = useState(false);
  const [screenNumber, setScreenNumber] = useState(0);
  const [index, setIndex] = useState(0);
  const [iconObject, setIconObject] = useState();
  const [tutorial, setTutorial] = useState<boolean>(false);
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

  const { loading, error, data } = useQuery(CERTIFICATIONS_QUERY);

  const randomObject = (array: any[]) => {
    return array[Math.floor(Math.random() * array.length)];
  };
  useEffect(() => {
    const tick = () => setIndex((i) => i + 1);
    const id = setInterval(tick, 7000);
    return () => clearInterval(id);
  }, []);
  useEffect(() => {
    if (!loading && !error) {
      setIconObject(
        randomObject(data?.certifications.data[0].attributes.Certification)
      );
    }
  }, [index]);

  return (
    <>
      <Canvas
        shadows
        camera={{ fov: 75, near: 0.1, far: 1000, position: [-11, 1, -62] }}
        style={{ height: '100vh', width: '100%', overflowX: 'hidden' }}
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
                screen={screenNumber ? true : false}
              />
            )}
            <BaseSection scale={4} position={[-11, 4.5, -62]} />
            {snap.verse === 'PP' && (
              <>
                <Cloud
                  dist={linkArray.length}
                  radius={20}
                  data={linkArray}
                  origin="app"
                />
                <Screen
                  scale={0.25}
                  position={[-2, 0, -70]}
                  rotation={[0, -Math.PI / 2, 0]}
                  cover={AvatarCover}
                  query={ABOUT_QUERY}
                  Component={<AboutPage screen />}
                  screen={screenNumber === 1 ? screenNumber : 0}
                  onClick={() => setScreenNumber(1)}
                />
                <BaseSection scale={4} position={[-11, 4.5, -80]} door />
                {/* IDEAS:
                Pre-Uni: Not sure... added about me already!
                Uni: Add University badge and Gaming society tech
                Global Engineering Challenge NODE-Red?

                */}
              </>
            )}
            {snap.verse === 'IBM' && (
              <>
                {/* CERTIFICATIONS SECTION */}
                {iconObject && (
                  <Icon
                    position={[-16, 5, -70]}
                    url={(iconObject as any)?.threedid}
                    shape={(iconObject as any)?.shape}
                  />
                )}
                <IBMLogo position={[-11, 2, -70]} scale={0.5} />
                <Screen
                  scale={0.25}
                  position={[-2, 0, -70]}
                  rotation={[0, -Math.PI / 2, 0]}
                  cover={AwardCover}
                  query={CERTIFICATIONS_QUERY}
                  Component={<CertificationsPage screen />}
                  screen={screenNumber === 1 ? screenNumber : 0}
                  onClick={() => setScreenNumber(1)}
                />
                {/* LONDON FASHION WEEK SECTION */}
                <BaseSection scale={4} position={[-11, 4.5, -80]} />
                <BalletMannequin
                  scale={4}
                  position={[-19, 1, -94]}
                  rotation={[0, 20, 0]}
                />
                <Dress scale={4} position={[-11, -1, -90]} />
                <Screen
                  scale={0.25}
                  position={[-2, 0, -90]}
                  rotation={[0, -Math.PI / 2, 0]}
                  cover={LFWLogo}
                  query={PROJECT_QUERY}
                  variable={{ slug: 'london-fashion-week' }}
                  Component={<Client screen />}
                  screen={screenNumber === 2 ? screenNumber : 0}
                  onClick={() => setScreenNumber(2)}
                />
                {/* GIVEBACK SECTION */}
                <BaseSection scale={4} position={[-11, 4.5, -98]} />
                <Screen
                  scale={0.25}
                  position={[-2, 0, -110]}
                  rotation={[0, -Math.PI / 2, 0]}
                  cover={GivebackCover}
                  // certain projects from list/json so we can select only giveback projects?
                  query={PROJECTS_QUERY}
                  Component={<ProjectsPage screen />}
                  screen={screenNumber === 3 ? screenNumber : 0}
                  onClick={() => setScreenNumber(3)}
                />
                <Phone position={[-11, 10, -110]} scale={0.5} />
                <BaseSection scale={4} position={[-11, 4.5, -116]} door />
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
            style={{ backgroundColor: 'rgba(120, 113, 108, 0.313)' }}
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
              style={{ backgroundColor: 'rgba(120, 113, 108, 0.313)' }}
              onClick={() => setAutoWalk(true)}
            >
              Auto-Walk
            </Button>
          )
        )}
        {snap.verse && screenNumber === 0 && (
          <Button
            style={{ backgroundColor: 'rgba(120, 113, 108, 0.313)' }}
            onClick={handleBack}
          >
            Back to menu
          </Button>
        )}
        {screenNumber > 0 && (
          <Button
            style={{ backgroundColor: 'rgba(120, 113, 108, 0.313)' }}
            onClick={() => setScreenNumber(0)}
          >
            Go Back
          </Button>
        )}
      </UIBottomContainer>
    </>
  );
}
