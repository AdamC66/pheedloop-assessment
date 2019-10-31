import React, { useState, useEffect } from 'react';
import Card from "react-bootstrap/Card";
import Button from 'react-bootstrap/Button';
import main_url from '../../config'
function EditSession(props) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        const fetchData = async () => {
          const result = await main_url.get(`/api/sessions/${props.match.params.id}`);
          setTitle(result.data.title);
          setDescription(result.data.description)
          setIsLoading(false)
        };
        fetchData();
      }, []);

    const styles = {
        cardStyle:{
            width: '80%',
            margin: '0 auto',
            textAlign: 'center',
        }
    }
    
    const handleSubmit = () =>{
        const body = {id: props.match.params.id ,title, description}
        const userToken = (window.localStorage['token'])
        main_url.put('/api/sessions/', body, {
            headers: {
                Authorization: `Token ${userToken}` 
            }
        }).then(()=>{
            window.location.href='/my-sessions'
        }).catch(()=>{
            alert("We're sorry! Something went wrong")
        })
    }
    const handleDelete = () =>{
        const userToken = (window.localStorage['token'])
        main_url.delete(`/api/sessions/${props.match.params.id}/`, {
            headers: {
                Authorization: `Token ${userToken}` 
            }
        }).then(()=>{
            window.location.href='/my-sessions'
        }).catch(()=>{
            alert("We're sorry! Something went wrong")
        })
    }
    if (isLoading){
        return (
            <div>
                Loading
            </div>
        )
    }
    return (
        <div>
            <Card style={styles.cardStyle}>
                <Card.Header as="h3">
                   Edit Session
                </Card.Header>
                <Card.Body>
                <div className="form-group">
                    <label htmlFor='title'><b> Title: </b></label> <br />
                        <input type='text' value={title} size="40" placeholder = 'Title' name='title' onChange = {(e)=> setTitle(e.target.value)}required/>
                    
                </div>
                <div className="form-group">    
                    <label htmlFor="description"> <b>Description:</b> </label> <br />
                        <textarea name="description" id="" cols="40" value={description} rows="10" onChange = {(e)=> setDescription(e.target.value)}required>

                        </textarea>
                    
                </div>
                </Card.Body>
                <Button onClick={()=>{handleSubmit()}}> Submit </Button>
                <br/>
                <Button variant="danger" onClick={()=>{handleDelete()}}> Delete </Button>
            </Card>
        </div>
    )
}

export default EditSession
