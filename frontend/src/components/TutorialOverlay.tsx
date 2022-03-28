import React from 'react';
import { Title, SubHeading } from '../styles/global.styles';
import tw, { styled, TwStyle } from 'twin.macro';
import { Marginer } from './Marginer';

interface ITutorialOverlayProps {
  setTutorial: React.Dispatch<React.SetStateAction<boolean>>;
}

const TutorialOverlay: React.FC<ITutorialOverlayProps> = ({ setTutorial }) => {
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
    min-height: 50%;
    max-width: 75%;
  `;

  const buttonStyles: Record<string, TwStyle> = {
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
  return (
    <AppContainer
      style={{
        background: '#141622FF',
      }}
    >
      <AppMenu>
        <AppSubContainer>
          <Title>How to add your own avatar</Title>
          <SubHeading>Step 1: ReadyPlayerMe</SubHeading>
          <p>
            Go to the website
            <a href="https://readyplayer.me"> ReadyPlayer.me</a> and create a
            username. This will then prompt you to create your own avatar using
            their own avatar configurator, go wild! If you already have an
            avatar you'd like to use, skip to step 2
          </p>
          <Marginer direction="vertical" margin="2em" />
          <SubHeading>Step 2: URL</SubHeading>
          <p>
            Enter the hub where your avatar resides. You can either click on the
            download button at the bottom and copy the .glb URL, or head to the
            My Avatars tab and on the three dots dropdown menu click Copy .glb
            URL
          </p>
          <Marginer direction="vertical" margin="2em" />
          <SubHeading>Step 3: Paste and customize!</SubHeading>
          <p>
            Paste the link and your avatar will automatically find itself here
          </p>
          <Marginer direction="vertical" margin="2em" />
          <AppMenuButton color="blue" onClick={() => setTutorial(false)}>
            I understand
          </AppMenuButton>
        </AppSubContainer>
      </AppMenu>
    </AppContainer>
  );
};

export default TutorialOverlay;
