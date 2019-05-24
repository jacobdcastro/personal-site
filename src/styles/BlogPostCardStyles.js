import styled from 'styled-components';

const fontFamily = "font-family: 'Montserrat', 'Helvetica', sans-serif;";
const padMar = 'padding: 0; margin: 0;';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 250px;
  width: auto;
  max-width: 415px;
  text-align: left;
  margin: auto;
  padding: 0;
  background-image: url(${props => props.url});
  background-position: center;
  background-size: cover;
  box-shadow: 0 5px 17px #676767;
  transition: 0.5s;
  &:hover {
    cursor: pointer;
    transform: scale(1.05, 1.05);
  }

  .blackLayer {
    margin: 0;
    padding: 20px;
    background-color: rgba(0, 0, 0, 0.5);
    height: 100%;
    width: auto;
    max-height: 250px;
    overflow: hidden;

    .blogTitleSection {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: stretch;
      margin: auto auto 0;
      height: 100%;
      width: 80%;
      float: left;

      h1 {
        ${fontFamily}
        font-size: 1.6em;
        letter-spacing: 3px;
        ${padMar}
        text-decoration: none;
        color: white;
        text-transform: uppercase;
      }
      h3 {
        ${fontFamily}
        ${padMar}
        font-size: 1.1em;
        text-decoration: none;
        color: white;
      }
      h4 {
        ${fontFamily}
        ${padMar}
        font-size: 1em;
        text-decoration: none;
        color: white;
      }
      p {
        ${fontFamily}
        padding: 0;
        margin: 0px;
        text-decoration: none;
        color: white;
        overflow: hidden;
      }
      h5 {
        ${fontFamily}
        ${padMar}
        font-size: 1.05em;
        letter-spacing: 1px;
        text-decoration: none;
        color: white;
      }
    }
  }
`;

export { Container };
