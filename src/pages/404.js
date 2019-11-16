import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import Layout from '../templates/layout';

const NotFoundWrapper = styled.div`
  /* text-align: center; */
  height: 80vh;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  width: 100vw;
  max-width: 700px;
  padding: 15px;

  div {
    width: 100%;
    margin-top: 80px;

    h1 {
      font-size: 3.4rem;
    }
  }
`;

const NotFound = () => {
  const seo = {
    page: `404`,
    title: 'Page Not Found',
    description: `Big oops, much sorry. You've hit a route that doesn't exist!`,
    url: `https://jacobdcastro.com`,
    imgUrl: ``,
    breadcrumbs: [],
  };

  return (
    <Layout seo={seo}>
      <NotFoundWrapper>
        <div>
          <h1>
            Big oops,
            <br />
            much sorry.
          </h1>
          <h3>You've hit a route that doesn't exist!</h3>
          <Link to="/">Go back to Home page</Link>
        </div>
      </NotFoundWrapper>
    </Layout>
  );
};

export default NotFound;
