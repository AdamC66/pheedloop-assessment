import React from 'react'
import Card from 'react-bootstrap/Card'
import placeholder from '../../img/userplaceholder.jpeg'
import Button from 'react-bootstrap/Button'
function SpeakerCard({speaker, edit}) {
    const styles = {
        img : {
            width: 'auto',
            height: '3em',
            marginRight: '1em',
        }
    }

    return (
        <Card>
        <Card.Body>
            <Card.Title>
                <img style ={styles.img} src={speaker.photo} onError={(e)=>{e.target.onerror = null; e.target.src=placeholder}} alt=""/>
            {speaker.name}
            </Card.Title>
            <Card.Text>
                {speaker.bio}
            </Card.Text>
            {edit? <Button href={`/speakers/${speaker.id}/edit`}>Edit</Button>:<span></span>}
        </Card.Body>
        </Card>
    )
}

export default SpeakerCard
