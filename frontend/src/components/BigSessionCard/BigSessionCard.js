import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import SpeakerCard from "../SpeakerCard/SpeakerCard";
import StarRatingComponent from "react-star-rating-component";
import Button from "react-bootstrap/Button";
import main_url from "../../config";

function BigSessionCard({ session, loggedIn }) {
  const [rating, setRating] = useState();
  const styles = {
    cardStyle: {
      width: "80%",
      margin: "0.5em auto"
    },
    curStarStyle: {
      float: "right",
      textAlign: "center"
    },
    ratingStarStyle: {
      margin: "0.25em",
      height: "1.5em",
      display: 'block',
    },
    headerTextStyle: {
      display: "inline-block",
      marginTop: "0.5em"
    }
  };
  const speakerElements = session.speakers.map((speaker, i) => (
    <SpeakerCard key={i} index={i} speaker={speaker} />
  ));

  const onStarClick = nextValue => {
    setRating(nextValue);
  };

  const handleSubmit = () => {
    const payload = { id: session.id, rating: rating };
    main_url.put(`/api/sessions/`, payload, {headers:{Authorization: `Token ${window.localStorage.token}`}}).then(() => {
      window.location.reload();
    });
  };

  let elem = (<span>
    Attended this Session? Log In to Leave a Rating:
  </span>)
  if (loggedIn){
     elem = (          
      <span>
      Attended this Session? Leave a Rating:
      <span style={styles.ratingStarStyle}>
        <StarRatingComponent
          name="rate1"
          starCount={5}
          value={rating}
          onStarClick={onStarClick}
        />
      </span>
      <Button onClick={() => handleSubmit()}> Submit </Button>
      </span>)
  }
  return (
    <Card style={styles.cardStyle}>
      <Card.Header>
        <h2 style={styles.headerTextStyle}>{session.title}</h2>
        <span style={styles.curStarStyle}>
          <h6>{session.rating.toFixed(2)}</h6>
          <span style={{display:'block'}}> 
            <StarRatingComponent
              name="rate2"
              editing={false}
              starCount={5}
              value={session.rating}
            />
          </span>
          <h6>{session.num_of_ratings} Ratings </h6>
        </span>
      </Card.Header>
      <Card.Body>
        <Card.Text>{session.description}</Card.Text>
        <Card.Text>
          { elem }
        </Card.Text>
        <Card>
          <Card.Body>
            <Card.Text as="h4">Speakers</Card.Text>
            {speakerElements}
          </Card.Body>
        </Card>
      </Card.Body>
    </Card>
  );
}

export default BigSessionCard;
