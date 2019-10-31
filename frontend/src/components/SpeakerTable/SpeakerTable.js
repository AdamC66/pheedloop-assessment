import React from 'react'
import SpeakerCard from '../SpeakerCard/SpeakerCard'


function SpeakerTable({speakers, edit}) {

    const speakerElems = speakers.map((speaker, i)=><SpeakerCard key={i} index={i} speaker={speaker} edit={edit}/>)
    const styles={
        speakerStyle:{
            width: '80%',
            margin:'0.5em auto'
        }
    }
    return (
        <div style={styles.speakerStyle}>
            {speakerElems}
        </div>
    )
}

export default SpeakerTable
