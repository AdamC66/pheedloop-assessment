import React, {useState, useEffect} from 'react'
import SessionTable from '../../components/SessionTable/SessionTable'
import main_url from '../../config'
import Card from "react-bootstrap/Card";
import Button from 'react-bootstrap/Button'
function MySessions() {
    const [isLoading, setIsLoading] = useState(true)
    const [sessionData, setSessionData] = useState()

    useEffect(() => {
        const fetchData = async () => {
          const result = await main_url.get('/api/sessions/', {
            headers: {
                Authorization: `Token ${window.localStorage['token']}`
            }
        });
          setSessionData(result.data);
          setIsLoading(false)
        };
        fetchData();
      }, []);


    return (
        <div>
            <Card style={{width: "80%", margin:"0 auto", textAlign: 'center'}}>
                <Card.Header>
                <Button href="/new-session" className="btn btn-primary">New Session</Button> &nbsp;
                <Button href="/new-speaker" className="btn btn-primary">New Speaker</Button>
                </Card.Header>
            </Card>
            {isLoading ? "Loading"  : <SessionTable sessions={sessionData} edit={true} /> }
        </div>
    )
}

export default MySessions
