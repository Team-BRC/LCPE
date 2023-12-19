import React from 'react';
import QuestionProvider from '../context/QuestionProvider';
import { Container, Header } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "../app/index.css";
// import "../app/App.css";
// import "../app/globals.css";


function MyApp({ Component, pageProps }) {
  return (
    <Container fluid>
      <QuestionProvider>
        <Component {...pageProps} />
      </QuestionProvider>
    </Container>
  );
}

export default MyApp;
