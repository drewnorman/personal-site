import styled, { createGlobalStyle } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGithub, faGitlab, faBitbucket,
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
    a, a:hover, a:visited, a:active {
      font-weight: 800;
      color: ${({ theme }) => theme.colors.primary};
      text-decoration: none;
    }
    body {
      height: 100%;
      color: white;
      background: ${({ theme }) => theme.colors.black};
    }
  }
`;

const Main = styled.main`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  min-width: 90vw;
  @media screen and ${({ theme }) => theme.breakpoints.large} {
    min-width: 40vw;
  }
  .name {
    font-size: 3.6rem;
    margin: 0;
    white-space: nowrap;
  }
  .career {
    margin: 0.5rem 0;
    font-size: 1.6rem;
    letter-spacing: 2px;
    font-weight: 400;
    white-space: nowrap;
  }
  .details {
    margin: 3rem 0 0;
    font-size: 1.2rem;
    white-space: pre-wrap;
    .detail {
      margin: 1rem 0;
    }
  }
  .pic {
    width:  280px;
    height: 280px;
    margin: 0 0 2rem;
  }
  .code-links {
    padding-top: 2rem;
    a {
      opacity: 0.8;
      &:hover {
        opacity: 1;
      }
      color: white;
      font-size: 2rem;
      margin: 0 1rem;
    }
  }
`;

const Home = () => (
  <BaseLayout
    title="Drew Norman | Full Stack Developer"
    description="Hi, I'm Drew Norman, a full stack developer with a knack for delivering engaging, responsive, and scalable web applications."
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
        <Main>
          <motion.img
            className="pic"
            src="/images/me-and-mr-kitty.png"
            alt="Me and Mr. Kitty"
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.4, delay: 0.2 }}
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: { opacity: 1, scale: 1 },
            }}
          />
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
                href="https://cloud.google.com/cloud-build"
                target="_blank"
                rel="noopener noreferrer"
              >
                continuous integration
              </a>
              &nbsp;and&nbsp;
              <a
                href="https://kubernetes.io/"
                target="_blank"
                rel="noopener noreferrer"
              >
                cloud-native technologies
              </a>
              .
            </p>
            <p className="detail">
              Sometimes I&nbsp;
              <a
                href="https://www.nashville.gov/Parks-and-Recreation/Athletics/Two-Rivers-Skate-Park.aspx"
                target="_blank"
                rel="noopener noreferrer"
              >
                skateboard
              </a>
              &nbsp;or watch&nbsp;
              <a
                href="https://www.imdb.com/title/tt0078748/"
                target="_blank"
                rel="noopener noreferrer"
              >
                scary movies
              </a>
              &nbsp;and other times I just pet my cat.
            </p>
            <p className="detail">
              I currently work at&nbsp;
              <a
                href="https://foxfuelcreative.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Fox Fuel Creative
              </a>
              .
            </p>
            <p className="detail">
              Feel free to check out&nbsp;
              <a
                href="/documents/drew-norman-resume.pdf"
                download
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
              href="https://bitbucket.com/drewnorman/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faBitbucket} />
            </a>
          </motion.div>
        </Main>
      </motion.div>
    </>
  </BaseLayout>
);

export default Home;
