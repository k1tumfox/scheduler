import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import useVisualMode from "hooks/useVisualMode";
import { getInterviewersForDay } from "helpers/selectors";



export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";  
  const CREATE = "CREATE";
  const SAVING = "SAVING";

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
    transition(SAVING);
    bookInterview(id, interview)
      .then(() => {
        transition(SHOW);
      });
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
      {mode === SAVING && (
        <Status
          message={"Saving"}
        />
      )}

    </article>
  )
}

//{interview ? <Show interviewer={interview.interviewer} student={interview.student} /> : <Empty />} 