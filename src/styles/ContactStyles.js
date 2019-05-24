import styled from 'styled-components';

const Container = styled.div`
  height: 100%;
  width: 100%;
  margin: 0;
  padding: auto 0;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top;
  padding: 15px;
  margin: auto 0;
  width: 88%;
  max-width: 1125px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .formsHeader {
    display: flex;
    flex-direction: column;
    align-items: center;

    h2 {
      font-family: 'Montserrat', 'Helvetica', sans-serif;
      @media (min-width: 820px) {
        font-size: 2em;
      }
    }
    h3 {
      font-family: 'Montserrat', 'Helvetica', sans-serif;
      @media (min-width: 820px) {
        font-size: 1.6em;
      }
    }

    .formBtnSection {
      display: flex;
      flex-direction: column;
      align-items: center;

      .formButton {
        font-family: 'Montserrat', 'Helvetica', sans-serif;
        text-transform: uppercase;
        font-weight: 700;
        margin: 8px auto;
        background-color: #fff;
        padding: 10px;
        border: none;
        box-shadow: 0px 0px 8px #444;
        transition: 400ms;
        &:hover {
          cursor: pointer;
          transform: scale(1.08, 1.08);
        }
      }
    }
  }
`;

export { Container };
