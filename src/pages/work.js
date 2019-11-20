import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import Layout from '../templates/layout';
import WorkPageWrapper from '../styles/work/WorkPageStyles';

const Work = ({ path, data }) => {
  const seo = {
    page: `work`,
    title: `Work`,
    description: `Some project examples of mine. Ranging from personal side projects to paid client projects, I've had a lot of fun!`,
    // imgUrl: `${data.pageImg.publicURL}`,
    // imgAlt:
    //   'jdcastro logo, twitter, instagram, facebook, github icons with @jacobdcastro username',
    breadcrumbs: [
      {
        name: `Work`,
        path: `/work`,
      },
    ],
  };

  return (
    <Layout seo={seo} path={path}>
      <WorkPageWrapper>
        <h1>Work</h1>

        {/* map a list of projects */}
      </WorkPageWrapper>
    </Layout>
  );
};

Work.propTypes = {
  path: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
};

export default Work;
