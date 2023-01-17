import React from "react";
import { Container } from "react-bootstrap";

function Home() {
  return (
    <Container className="mt-5">
      <p>
        This app is used to mark audio files and generate 'begin' and 'end'
        timestamps of audio segments. Dashboard contains your data while Public
        contains all data including others. Please login and start using this
        app.
      </p>
    </Container>
  );
}

export default Home;
