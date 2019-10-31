import React from 'react'
import SessionCard from '../SessionCard/SessionCard'


function SessionTable({sessions, edit}) {

    const sessionElements = sessions.map((session, i)=><SessionCard key={i} index={i} session={session} edit={edit}/>)

    return (
        <div>
            {sessionElements}
        </div>
    )
}

export default SessionTable
