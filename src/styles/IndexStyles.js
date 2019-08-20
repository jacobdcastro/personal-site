import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: auto 18%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  transition: background-color 0.5s;
  transition: margin-left 0.5s;
  overflow: hidden;
  background-color: #fff;

  .mainContent {
    z-index: 3;
    height: 100%;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    .textContainer {
      a {
        text-decoration: none;
        margin: 0;
        outline: 0;
      }

      h1 {
        animation: fadeInUpwards 1.2s;
        font-family: 'Montserrat', 'Helvetica', sans-serif;
        text-align: center;
        text-transform: uppercase;
        font-weight: 800;
        color: #ffffff;
        letter-spacing: 10px;
      }

      h4 {
        animation: fadeInUpwards 1.2s;
        font-family: 'Montserrat', 'Helvetica', sans-serif;
        text-align: center;
        color: #ffffff;
        text-transform: uppercase;
        margin: auto;
        width: 14em;
        padding: 12px 3px;
        border: 4px solid #ffffff;
        letter-spacing: 4px;
        -webkit-transition-duration: 0.4s;
        transition-duration: 0.4s;

        &:hover {
          background-color: #ffffff;
          color: #353535;
          opacity: 0.86;
        }
      }
    }
  }

  @media (min-width: 820px) {
    .blackLayer .mainContent .textContainer {
      font-size: 1.18rem;
      h1 {
        letter-spacing: 14px;
        font-size: 2.42rem;
      }
      h4 {
        padding: 13px 4px;
        letter-spacing: 5px;
        font-size: 2.42rem;
      }
    }
  }

  @media (min-width: 1080px) {
    .blackLayer .mainContent .textContainer {
      font-size: 1.29rem;
      h1 {
        letter-spacing: 16px;
        font-size: 2.88rem;
      }
      h4 {
        padding: 13px 3px;
        letter-spacing: 6px;
        font-size: 1.29rem;
      }
    }
  }

  @media (min-width: 1400px) {
    .blackLayer .mainContent .textContainer {
      font-size: 1.58rem;
    }
    h1 {
      letter-spacing: 18px;
      font-size: 3.05em;
    }
    h4 {
      padding: 13.75px 4px;
      letter-spacing: 7.5px;
      font-size: 1.58rem;
    }
  }

  @keyframes fadeInUpwards {
    from {
      color: rgba(0, 0, 0, 0);
      transform: translateY(60px);
    }
    to {
      color: #ffffff;
      transform: translateY(0);
    }
  }

  @keyframes slideInFromLeft {
    from {
      transform: translateX(-80px);
    }
    to {
      transform: translateX(0);
    }
  }

  @keyframes slideInFromRight {
    from {
      transform: translateX(80px);
    }
    to {
      transform: translateX(0);
    }
  }
`;

export { Container };
