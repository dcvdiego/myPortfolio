import React from 'react';
import { Title, SubHeading } from '../styles/global.styles';
import tw, { styled } from 'twin.macro';
import { Marginer } from './Marginer';
import { isMobile } from 'react-device-detect';

interface ITutorialOverlayProps {
  setTutorial: React.Dispatch<React.SetStateAction<boolean>>;
  origin: string;
}

const TutorialOverlay: React.FC<ITutorialOverlayProps> = ({
  setTutorial,
  origin,
}) => {
  const AppContainer = styled.div`
    background: #141622cc;
    transition: background-color 1000ms ease;
    z-index: 1000;
    ${tw`
    absolute 
    left-0 
    w-full
    h-full
    flex 
    items-center 
    justify-center 
    text-white
    `}
  `;
  const AppMenu = styled.div`
    min-height: 50%;
    max-width: 75%;
    ${tw`
    flex 
    items-center 
    justify-center 
    flex-col
    `}
  `;

  // const buttonStyles: Record<string, TwStyle> = {
  //   blue: tw`
  //     bg-blue-700
  //     hover:bg-blue-600
  //     `,
  //   orange: tw`
  //   bg-orange-600
  //   hover:bg-orange-400
  //   `,
  //   green: tw`
  //   bg-green-500
  //   hover:bg-green-400
  //   `,
  //   red: tw`
  //   bg-red-700
  //   hover:bg-red-800
  //   `,
  //   purple: tw`
  //   bg-purple-800
  //   hover:bg-purple-700
  //   `,
  // };

  // const AppMenuButton = styled.button(({ color }) => [
  //   tw`
  //    text-6xl
  //       `,
  //   color && buttonStyles[color],
  // ]);
  const NewButton = styled.button`
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
      background-color: #a22ee5;
      box-shadow: 0px 15px 20px rgba(110, 46, 229, 0.4);
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
  const TutorialContainer = styled.div`
    ${tw`
    flex
    flex-row
    flex-basis[0]
    flex-grow

    `};
    div {
      ${tw`
      flex-basis[0]
    flex-grow
      `}
      p {
        word-wrap: break-word;
      }
    }
  `;
  return (
    <AppContainer
      style={{
        background: '#141622f0',
      }}
    >
      <AppMenu>
        <AppSubContainer>
          {origin === 'app' ? (
            <>
              <Title>How does it work</Title>
              <TutorialContainer>
                <div>
                  <SubHeading>Explore the universe!</SubHeading>
                  <p>
                    A 3D version of the experiences I have had. Use{' '}
                    {isMobile
                      ? 'your finger to drag and roam around!'
                      : 'WASD Controls (W - Forward, S - Backward, A - Left, D - Right) or the directional keys to roam around! Hold shift while moving to run.'}
                  </p>
                  <Marginer direction="horizontal" margin="1em" />
                </div>
                <div>
                  <SubHeading>Interact with it!</SubHeading>
                  <p>
                    Treat it like a museum. It is a showcase of my work in the
                    middle and left sides, however on the right there are small
                    screens that you can click to learn more about each
                    experience!
                  </p>
                  <Marginer direction="horizontal" margin="1em" />
                </div>
                <div>
                  <SubHeading>
                    Jump through other "ExperienceVerse"s!
                  </SubHeading>
                  <p>
                    Once you reach the end, you can opt to go back to the main
                    menu and choose another experience. Currently IBM is the
                    only one available. Feel free to access other parts of my
                    site too!
                  </p>
                  <Marginer direction="horizontal" margin="1em" />
                </div>
              </TutorialContainer>
              <Marginer direction="vertical" margin="1em" />
              <NewButton onClick={() => setTutorial(false)}>
                Thank you, now take me back!
              </NewButton>
            </>
          ) : origin === 'home' ? (
            <>
              <Title>How to add your own avatar</Title>

              <TutorialContainer>
                <div>
                  <SubHeading>Step 1: ReadyPlayerMe</SubHeading>
                  <p>
                    Go to the website
                    <a href="https://readyplayer.me"> ReadyPlayer.me</a> and
                    create a username. This will then prompt you to create your
                    own avatar using their own avatar configurator, go wild! If
                    you already have an avatar you'd like to use, skip to step 2
                  </p>
                </div>
                <Marginer direction="horizontal" margin="2em" />
                <div>
                  <SubHeading>Step 2: URL</SubHeading>
                  <p>
                    Enter the hub where your avatar resides. You can either
                    click on the download button at the bottom and copy the .glb
                    URL, or head to the My Avatars tab and on the three dots
                    dropdown menu click Copy .glb URL
                  </p>
                </div>
                <Marginer direction="horizontal" margin="2em" />
                <div>
                  <SubHeading>Step 3: Paste and customize!</SubHeading>
                  <p>
                    Paste the link and your avatar will automatically find
                    itself here
                  </p>
                </div>
              </TutorialContainer>
              <Marginer direction="vertical" margin="2em" />
              <NewButton onClick={() => setTutorial(false)}>
                I understand
              </NewButton>
            </>
          ) : (
            <p>Error</p>
          )}
        </AppSubContainer>
      </AppMenu>
    </AppContainer>
  );
};

export default TutorialOverlay;
