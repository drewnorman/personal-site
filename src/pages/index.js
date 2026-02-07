import styled, { createGlobalStyle } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGithub, faGitlab, faLinkedin,
} from '@fortawesome/free-brands-svg-icons';
import { motion } from 'framer-motion';
import BaseLayout from '../layouts/BaseLayout';

const GlobalStyle = createGlobalStyle`
  html {
    margin: 0;
    padding: 0;
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: calc(10px + 0.33vw);
    h1, h2, h3 {
      font-family: ${({ theme }) => theme.fonts.largeHeading}
    }
    h4, h5, h6 {
      font-family: ${({ theme }) => theme.fonts.smallHeading};
    }
    a {
      font-weight: 800;
      color: ${({ theme }) => theme.colors.links};
      text-decoration-color: transparent;
      transition: text-decoration-color 0.2s ease-in-out;
      &:hover {
        text-decoration-color: ${({ theme }) => theme.colors.links};
      }
    }
    body {
      height: 100%;
      margin: 0;
      color: ${({ theme }) => theme.colors.text};
      background: ${({ theme }) => theme.colors.background};
    }
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

const Main = styled.main`
  text-align: center;
  max-height: 100vh;
  width: 100%;
  padding: 0 1rem;
  @media screen and ${({ theme }) => theme.breakpoints.large} {
    min-width: 40vw;
  }
  .name {
    font-size: 3rem;
    @media screen and ${({ theme }) => theme.breakpoints.large} {
      font-size: 3.4rem;
    }
    margin: 0;
    white-space: nowrap;
  }
  .career {
    margin: 0;
    font-size: 1.6rem;
    letter-spacing: 2px;
    font-weight: 400;
    white-space: nowrap;
  }
  .details {
    margin: 2rem 0 0;
    font-size: 1.4rem;
    white-space: pre-wrap;
    .detail {
      margin: 0.6rem 0;
      @media screen and ${({ theme }) => theme.breakpoints.medium} {
        margin: 1rem 0;
      }
    }
    @media screen and ${({ theme }) => theme.breakpoints.medium} {
      font-size: 1.2rem;
    }
  }
  .pic {
    max-width: 220px;
    width: 100%;
    margin: 0 auto 1rem;
    overflow: hidden;
    @media screen and ${({ theme }) => theme.breakpoints.small} {
      max-width: 260px;
    }
    @media screen and ${({ theme }) => theme.breakpoints.medium} {
      max-width: 300px;
    }
    @media screen and ${({ theme }) => theme.breakpoints.xlarge} {
      max-width: 340px;
    }
    img {
      box-sizing: border-box;
      width: 100%;
      border: 4px solid ${({ theme }) => theme.colors.text};
      border-radius: 100%;
    }
  }
  .code-links {
    padding-top: 1rem;
    a {
      opacity: 0.8;
      transition: opacity 0.2s ease-in-out;
      &:hover {
        opacity: 1;
      }
      color: ${({ theme }) => theme.colors.text};
      font-size: 2rem;
      margin: 0 1rem;
    }
  }
`;

const Home = () => (
  <BaseLayout
    title="Drew Norman | Full Stack Developer"
    description="I'm Drew Norman, a full stack developer specializing in functional programming and cloud-native technologies."
  >
    <>
      <GlobalStyle />
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 1 }}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }}
      >
        <Container>
          <Main>
            <motion.div
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.4, delay: 0.2 }}
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: { opacity: 1, scale: 1 },
              }}
            >
              <div className="pic">
                <img
                  src="/images/drew.jpg"
                  alt="Drew Norman"
                />
              </div>
            </motion.div>
            <motion.div
              style="hidden"
              animate="visible"
              transition={{ duration: 1.6, delay: 0.4 }}
              variants={{
                hidden: { opacity: 0, y: -10 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <h1 className="name">Drew Norman</h1>
              <h4 className="career">Full Stack Developer</h4>
            </motion.div>
            <motion.div
              className="details"
              style="hidden"
              animate="visible"
              transition={{ duration: 1.6, delay: 0.6 }}
              variants={{
                hidden: { opacity: 0, x: -40 },
                visible: { opacity: 1, x: 0 },
              }}
            >
              <p className="detail">
                I&apos;m into&nbsp;
                <a
                  href="https://en.wikipedia.org/wiki/Functional_programming"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  functional programming
                </a>
                &nbsp;and&nbsp;
                <a
                  href="https://landscape.cncf.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  cloud-native technologies
                </a>
                .
              </p>
              <p className="detail">
                I like growing&nbsp;
                <a
                  href="/images/ghost-peppers.jpg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  super hots
                </a>
                , watching&nbsp;
                <a
                  href="https://www.imdb.com/title/tt0078748/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  scary movies
                </a>
                , and chilling with&nbsp;
                <a href="/images/cats.jpg">
                  my cats
                </a>
                .
              </p>
              <p className="detail">
                I currently work at&nbsp;
                <a
                  href="https://foxfuelcreative.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  FoxFuel Creative
                </a>
                .
              </p>
              <p className="detail">
                Feel free to check out&nbsp;
                <a
                  href="/documents/Drew Norman - Resume.pdf"
                  target="_blank"
                >
                  my resume
                </a>
                &nbsp;or see my recent activity below.
              </p>
            </motion.div>
            <motion.div
              className="code-links"
              style="hidden"
              animate="visible"
              transition={{ duration: 1.6, delay: 1 }}
              variants={{
                hidden: { opacity: 0, y: -40 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <a
                href="https://github.com/drewnorman/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faGithub} />
              </a>
              <a
                href="https://gitlab.com/drewnorman/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faGitlab} />
              </a>
              <a
                href="https://linkedin.com/in/drew-norman-dev/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
            </motion.div>
          </Main>
        </Container>
      </motion.div>
    </>
  </BaseLayout>
);

export default Home;
