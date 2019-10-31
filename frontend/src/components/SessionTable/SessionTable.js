import React from "react";
import SessionCard from "../SessionCard/SessionCard";

function SessionTable({ sessions, edit }) {
  let sessionElements = [];
  if (sessions.length > 0) {
    sessionElements = sessions.map((session, i) => (
      <SessionCard key={i} index={i} session={session} edit={edit} />
    ));
  } else {
    sessionElements = <div>No Sessions... yet</div>;
  }

  return <div>{sessionElements}</div>;
}

export default SessionTable;
