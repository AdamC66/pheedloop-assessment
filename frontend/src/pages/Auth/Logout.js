import React from 'react'
import Card from 'react-bootstrap/Card'
function Logout({setLoggedIn}) {
    const styles = {
        cardStyle: {
          width: "80%",
          margin: "2em auto",
          textAlign: "center",
        },
      };
    const logout = () =>{
        window.localStorage.token = null
    }
    window.addEventListener('load', logout) 
    return (
        <div>
            <Card style={styles.cardStyle}>
                <Card.Body>
                    You have now been logged out
                </Card.Body>
            </Card>
        </div>
    )
}

export default Logout
