import React, { useState } from 'react';
import Card from "react-bootstrap/Card";
import Button from 'react-bootstrap/Button';
import main_url from '../../config'
function NewSession() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    
    const styles = {
        cardStyle:{
            width: '80%',
            margin: '0 auto',
            textAlign: 'center',
        }
    }
    
    const handleSubmit = () =>{
        const body = {title, description}
        const userToken = (window.localStorage['token'])
        main_url.post('/api/sessions/', body, {
            headers: {
                Authorization: `Token ${userToken}` 
            }
        }).then(()=>{
            window.location.href='/my-sessions'
        }).catch(()=>{
            alert("We're sorry! Something went wrong")
        })
    }
    
    return (
        <div>
            <Card style={styles.cardStyle}>
                <Card.Header as="h3">
                    Create a New Session
                </Card.Header>
                <Card.Body>
                <div className="form-group">
                    <label htmlFor='title'><b> Title: </b></label> <br />
                        <input type='text' value={title} placeholder = 'Title' name='title' onChange = {(e)=> setTitle(e.target.value)}required/>
                    
                </div>
                <div className="form-group">    
                    <label htmlFor="description"> <b>Description:</b> </label> <br />
                        <textarea name="description" id="" cols="30" rows="10" onChange = {(e)=> setDescription(e.target.value)}required>

                        </textarea>
                    
                </div>
                </Card.Body>
                <Button onClick={()=>{handleSubmit()}}> Submit </Button>
            </Card>
        </div>
    )
}

export default NewSession
