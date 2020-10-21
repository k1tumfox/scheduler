import React, { useState } from "react";
import InterviewerList from "../InterviewerList";
import Button from "../Button";

export default function Form(props) {
  const [ name, setName ] = useState(props.name || "");
  const [ interviewer, setInterviewer ] = useState(props.interviewer || null);
  const { interviewers, onSave, onCancel } = props;
  const [ error, setError ] = useState("")

  const reset = () => {
    setName("");
    setInterviewer(null);
  };
  
  const cancel = () => {
    onCancel();
    reset();
  }

  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
    if (!interviewer) {
      setError("Must select interviewer");
      return;
    }
    setError("");
    onSave(name, interviewer);
  }

  return(
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            value={name}
            type="text"
            placeholder="Enter Student Name"
            onChange={(event) => setName(event.target.value)}
          />
          <section>{error}</section>
        </form>
        <InterviewerList 
          interviewers={interviewers} 
          value={interviewer} 
          onClick={setInterviewer}
          setInterviewer={event => setInterviewer(event.target.value)} 
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button onClick={() => validate()} confirm>Save</Button>
        </section>
      </section>
    </main>
  )
}
