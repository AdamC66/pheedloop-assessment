import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import SpeakerCard from "../SpeakerCard/SpeakerCard";
import StarRatingComponent from 'react-star-rating-component';
import { Link } from 'react-router-dom'
function SessionCard({ session, edit }) {
  const [open, setOpen] = useState(false);
  const styles = {
    cardStyle: {
      width: "80%",
      margin: "0.5em auto"
    },
    starStyle:{
        float: 'right'
    }
  };
  const speakerElements = session.speakers.map((speaker, i) => (
    <SpeakerCard key={i} index={i} speaker={speaker} />
  ));

  return (
    <Card style={styles.cardStyle}>
      <Card.Header as="h5">
        <Link to={`/Sessions/${session.id}`}>
      {session.title}
      </Link>
      <span style = {styles.starStyle} >
      <StarRatingComponent
            
          name="rate2" 
          editing={false}
          starCount={5}
          value={session.rating}
        />
      </span>
      </Card.Header>
      <Card.Body>
        <Card.Text>{session.description}</Card.Text>

        <Card>
          <Card.Body>
            <Button
              onClick={() => setOpen(!open)}
              aria-controls="example-collapse-text"
              aria-expanded={open}
            >
              <Card.Text as="h4">Speakers</Card.Text>
            </Button>
            <Collapse in={open}>
              <div id="example-collapse-text">{speakerElements}</div>
            </Collapse>
            
          </Card.Body>
        </Card>
        {edit ? <Button href={`/session/${session.id}/edit`} >Edit</Button> : <span></span>}
      </Card.Body>
    </Card>
  );
}

export default SessionCard;
