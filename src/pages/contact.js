import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import Layout from '../templates/layout';
import ContactWrapper from '../styles/contact/ContactStyles';
import ContactForm from '../components/contact/ContactForm';

const Contact = ({ path, data }) => {
  const seo = {
    page: 'contact',
    title: 'Contact',
    description:
      // eslint-disable-next-line quotes
      "Let's chat! I'm open to lots of new opportunities, freelance or a fulltime position.",
    url: 'https://jacobdcastro.com/contact',
    imgUrl: `${data.pageImg.publicURL}`,
    imgAlt:
      'jdcastro logo, twitter, instagram, facebook, github icons with @jacobdcastro username',
    breadcrumbs: [
      {
        name: 'Contact',
        path: '/contact',
      },
    ],
  };

  return (
    <Layout seo={seo} path={path}>
      <ContactWrapper>
        <h1>Contact</h1>
        <p>
          Let's chat! I'm open to lots of new opportunities, freelance or a
          fulltime position.
        </p>
        <ContactForm />
      </ContactWrapper>
    </Layout>
  );
};

Contact.propTypes = {
  path: PropTypes.string.isRequired,
};

export default Contact;

export const CONTACT_PAGE_QUERY = graphql`
  query CONTACT_PAGE_QUERY {
    pageImg: file(relativePath: { eq: "page-meta-img.jpg" }) {
      publicURL # used for SEO
    }
  }
`;
