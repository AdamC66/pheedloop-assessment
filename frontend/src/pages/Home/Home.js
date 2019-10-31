import React, {useState, useEffect} from 'react'
import SessionTable from '../../components/SessionTable/SessionTable'
import main_url from '../../config'
function Home() {
    const [isLoading, setIsLoading] = useState(true)
    const [sessionData, setSessionData] = useState()

    useEffect(() => {
        const fetchData = async () => {
          const result = await main_url.get('/api/sessions/');
          setSessionData(result.data);
          setIsLoading(false)
        };
        fetchData();
      }, []);


    return (
        <div>
            {isLoading ? "Loading"  : <SessionTable sessions={sessionData}/> }
        </div>
    )
}

export default Home
