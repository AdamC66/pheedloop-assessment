import React, {useState, useEffect} from 'react'
import BigSessionCard from '../../components/BigSessionCard/BigSessionCard'
import main_url from '../../config'
function Sessions(props) {
    const [isLoading, setIsLoading] = useState(true)
    const [sessionData, setSessionData] = useState()
    useEffect(() => {
        const fetchData = async () => {
          const result = await main_url.get(`/api/sessions/${props.match.params.id}`);
          setSessionData(result.data);
          setIsLoading(false)
        };
        fetchData();
      }, []);

    
    return (
        <div>
        {isLoading ? "Loading"  : <BigSessionCard session={sessionData} loggedIn={props.loggedIn}/>}
        </div>
    )
}

export default Sessions
