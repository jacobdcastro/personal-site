import styled from 'styled-components';

const Container = styled.div`
  height: auto;
  width: 90%;
  max-width: 1125px;
  margin: 20px auto;
  text-align: center;

  /**
 * Add back the container background-color, border-radius, padding, margin
 * and overflow that we removed from <pre>.
 */
  .gatsby-highlight {
    background-color: #fdf6e3;
    border-radius: 0.3em;
    margin: 0.5em 0;
    padding: 1em;
    overflow: auto;
  }

  /**
 * Remove the default PrismJS theme background-color, border-radius, margin,
 * padding and overflow.
 * 1. Make the element just wide enough to fit its content.
 * 2. Always fill the visible space in .gatsby-highlight.
 * 3. Adjust the position of the line numbers
 */
  .gatsby-highlight pre[class*='language-'] {
    background-color: transparent;
    margin: 0;
    padding: 0;
    overflow: initial;
    float: left; /* 1 */
    min-width: 100%; /* 2 */
  }

  /* Adjust the position of the line numbers */
  .gatsby-highlight pre[class*='language-'].line-numbers {
    padding-left: 2.8em;
  }

  /**
 * If you only want to use line numbering
 */

  .gatsby-highlight {
    background-color: #fdf6e3;
    border-radius: 0.3em;
    margin: 0.5em 0;
    padding: 1em;
    overflow: auto;
  }

  .gatsby-highlight pre[class*='language-'].line-numbers {
    padding: 0;
    padding-left: 2.8em;
    overflow: initial;
  }

  .command-line-prompt > span:before {
    color: #999;
    content: ' ';
    display: block;
    padding-right: 0.8em;
  }

  /* Prompt for all users */
  .command-line-prompt > span[data-user]:before {
    content: '[' attr(data-user) '@' attr(data-host) '] $';
  }

  /* Prompt for root */
  .command-line-prompt > span[data-user='root']:before {
    content: '[' attr(data-user) '@' attr(data-host) '] #';
  }

  .command-line-prompt > span[data-prompt]:before {
    content: attr(data-prompt);
  }

  h1 {
    line-height: 3rem;
  }

  h2 {
    font-family: 'Montserrat', 'Helvetica', sans-serif;
    text-align: center;
    letter-spacing: 1px;
    color: #353535;
    @media (min-width: 820px) {
      font-size: 2em;
      line-height: 2em;
    }
  }

  .blogPostList {
    display: grid;
    grid: auto / auto;
    padding: 0;
    margin: 0 auto;
    width: 95%;
    max-width: 1125px;
    grid-row-gap: 20px;
    grid-column-gap: 20px;
    @media (min-width: 820px) {
      width: 760px;
      margin: auto;
      grid: auto / repeat(2, auto);
    }
    @media (min-width: 1270px) {
      width: 1100px;
      grid: auto / repeat(3, auto);
    }
  }
`;

export { Container };
