import Head from 'next/dist/next-server/lib/head';
import { PropTypes } from 'prop-types';

const BasicLayout = ({ title, description, children }) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="og:site_name" content="Drew Norman" />
      <meta name="og:url" content="https://www.adre.me" />
      <meta name="og:title" content={title} />
      <meta name="og:type" content="website" />
      <meta property="og:description" content={description} />
      <link rel="icon" href="/favicon.ico" />
      <link href="https://fonts.googleapis.com/css2?family=Heebo:wght@300&family=Staatliches&family=Rubik:wght@300&display=swap" rel="stylesheet" />
    </Head>
    {children}
  </div>
);

BasicLayout.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

export default BasicLayout;
