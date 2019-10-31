import React, { useState, useEffect } from 'react';
import Card from "react-bootstrap/Card";
import Button from 'react-bootstrap/Button';
import main_url from '../../config'

function EditSpeaker(props) {
    const [name, setName] = useState('')
    const [bio, setBio] = useState('')
    const [photo, setPhoto] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [selectedSession, setSelectedSession] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [sessionData, setSessionData] = useState()
    const [errors, setErrors] = useState({})
    const styles = {
        cardStyle:{
            width: '80%',
            margin: '0 auto',
            textAlign: 'center',
        },
        errorList:{
            listStyle: 'none',
            color: 'red'
        }
    }

    useEffect(() => {
        const fetchSessionData = async () => {
          const result = await main_url.get('/api/sessions/', {
            headers: {
                Authorization: `Token ${window.localStorage['token']}`
            }
        });
          setSessionData(result.data);
          setIsLoading(false)
        };
        const fetchSpeakerData = async () => {
            const result = await main_url.get(`/api/speakers/${props.match.params.id}`, {
              headers: {
                  Authorization: `Token ${window.localStorage['token']}`
              }
          });
            setName(result.data.name);
            setBio(result.data.bio)
            setPhoto(result.data.photo)
            setPhone(result.data.phone_number)
            setEmail(result.data.email)
            setIsLoading(false)
          };
        fetchSessionData();
        fetchSpeakerData();
    }, []);

    const handleSelect = (e) =>{
        console.log(e.target.selectedIndex)
        if (sessionData[e.target.selectedIndex]){
            var options = e.target.options;
            var value = [];
            for (var i = 0, l = options.length; i < l; i++) {
              if (options[i].selected) {
                value.push(Number.parseInt((options[i].id),10));
                setSelectedSession(value.toString())
                console.log(value.toString())
              }
            }
        }
    }
    function isEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }
    const handleSubmit = () =>{
        const body = {name, bio, photo, phone_number: phone, email, session: selectedSession, id:props.match.params.id}
        console.log(checkErrors(body))
        const userToken = window.localStorage.token
        if (checkErrors(body)){
            main_url.put(`/api/speakers/`, body, {
                headers: {
                    Authorization: `Token ${userToken}` 
                }
            }).then(()=>{
                window.location.href='/my-speakers'
            }).catch(()=>{
                alert("We're sorry! Something went wrong")
            })
        }
    }
    const handleDelete = () =>{
        const userToken = (window.localStorage['token'])
        main_url.delete(`/api/speakers/${props.match.params.id}/`, {
            headers: {
                Authorization: `Token ${userToken}` 
            }
        }).then(()=>{
            window.location.href='/my-speakers'
        }).catch(()=>{
            alert("We're sorry! Something went wrong")
        })
    }
    const checkErrors = (data) => {
        let current_errors = {}
        const validEmailRegex = RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        var validURLRegex = new RegExp('^(https?:\\/\\/)?'+ // protocol
                                    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
                                    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
                                    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
                                    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
                                    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        
        if (!validEmailRegex.test(data.email)){
            current_errors['email']=("Please Enter a Valid Email")
        }
        if (!data.bio){
            current_errors['bio']=("This field is required")
        }
        if (!data.name){
            current_errors['name']=("This field is required")
        }
        if (!data.phone_number){
            current_errors['phone']=("This field is required")
        }
        if (!data.session){
            current_errors['session']=("This field is required")
        }
        if (!data.photo){
            current_errors['photo']=("This field is required")
        }else if(data['photo'].length > 255){
            current_errors['photo']=("Photo link length must be less than 255 characters")
        }else if (!validURLRegex.test(data.photo)){
            current_errors['photo']=("Please enter a valid url")
        }
        setErrors(current_errors)
        if (isEmpty(current_errors)){
            return true
        }else return false
    }

    if (isLoading){
        return <div>Loading</div>
    }

    let errorlist = []
    for (var key in errors){
        errorlist.push(<li>{key}: {errors[key]}</li>)
    }

    let elems = []
    if (sessionData){
    sessionData.forEach((session, i) =>{
        elems.push(<option key={i} id={session.id}> {session.title} </option>)
    })
    }

    return (
        <div>
            <Card style={styles.cardStyle}>
                <Card.Header as="h3">
                    Edit Speaker
                </Card.Header>
                <Card.Body>
                <div>
                    <ul style={styles.errorList}>
                        {errors.length === 0? <span></span>: errorlist}
                    </ul>
                </div>
                <div className="form-group">
                    <label htmlFor='Name'><b> Name: </b></label> <br />
                        <input type='text' value={name} placeholder = 'Name' name='Name' onChange = {(e)=> setName(e.target.value)}required/>
                    
                </div>
                <div className="form-group">    
                    <label htmlFor="bio"> <b>Bio:</b> </label> <br />
                        <textarea name="bio" id="" cols="30" rows="5" 
                        onChange = {(e)=> setBio(e.target.value)}
                        value={bio}>
                        </textarea>
                    
                </div>
                <div className="form-group">
                    <label htmlFor='Photo'><b> Photo: </b></label> <br />
                        <input type='text' value={photo} placeholder = 'Photo' photo='Photo' onChange = {(e)=> setPhoto(e.target.value)}required/>
                    
                </div>
                <div className="form-group">
                    <label htmlFor='Phone'><b> Phone: </b></label> <br />
                        <input type='text' value={phone} placeholder = 'Phone' phone='Phone' onChange = {(e)=> setPhone(e.target.value)}required/>
                    
                </div>
                <div className="form-group">
                    <label htmlFor='Email'><b> Email: </b></label> <br />
                        <input type='text' value={email} placeholder = 'Email' email='Email' onChange = {(e)=> setEmail(e.target.value)}required/>
                    
                </div>
                <div className='form-group'>
                    <label>Assign to Session</label>
                    <select id="69696" className="form-control" onChange={(e)=>handleSelect(e)} multiple>
                        {elems}
                    </select>
                </div>
                </Card.Body>
                <Button onClick={()=>handleSubmit()}> Submit </Button>
                <br/>
                <Button variant="danger" onClick={()=>{handleDelete()}}> Delete </Button>
            </Card>
        </div>
    )
}

export default EditSpeaker
