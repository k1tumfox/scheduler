import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";
import { getInterviewersForDay } from "helpers/selectors";



export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";  
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETING = "DELETING";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  const { time, interview, interviewers, bookInterview, cancelInterview, id } = props;

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

  function remove(name, interviewer) {
    transition(DELETING);
    cancelInterview(id)
      .then(() => {
        transition(EMPTY);
      });
  }

//onDelete={remove}
  return (
    <article className="appointment"> 
      <Header time={time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onDelete={() => transition(CONFIRM)}
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
      {mode === CONFIRM && (
        <Confirm
          message={"Are you sure you would like to delete?"}
          onCancel={back}
          onConfirm={remove}

        />
      )}
      {mode === DELETING && (
        <Status
          message={"Deleting"}
        />
      )}

    </article>
  )
}

//{interview ? <Show interviewer={interview.interviewer} student={interview.student} /> : <Empty />} 