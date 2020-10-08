import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";
import { getInterviewersForDay } from "helpers/selectors";



export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";  
  const CREATE = "CREATE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  const { time, interview, interviewers, bookInterview, id } = props;

  function save(name, interviewer) {
    console.log('name, interviewer', name, interviewer);
    const interview = {
      student: name,
      interviewer
    };
    bookInterview(id, interview);
    transition(SHOW);
  }

  return (
    <article className="appointment"> 
      <Header time={time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
        />
      )} 
      {mode === CREATE && (
        <Form 
          onCancel={back}
          interviewers={interviewers}
          onSave={save}

        />
      )}
    </article>
  )
}

//{interview ? <Show interviewer={interview.interviewer} student={interview.student} /> : <Empty />} 