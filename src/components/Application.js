import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import Button from "components/Button";
import DayListItem from "components/DayListItem";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import getAppointmentsForDay from "helpers/selectors"; //DC

// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "2pm",
//     interview: {
//       student: "Miller-Jones Pock",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 4,
//     time: "4pm",
//     interview: {
//       student: "Poulet Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   }
// ];


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const setDay = day => setState({ ...state, day });//only change day key
  const setDays = days => setState(prev => ({...prev, days}));//only change days key
  //renders data for days (nav bar)
  useEffect(() => {
    axios
      .get("/api/days")
      .then(response => {
        setDays(response.data);
    });
  }, [])

  const parsedAppointments = appointments.map((appointment) => 
    <Appointment 
      key={appointment.id}
      // time={appointment.time}
      // interview={appointment.interview}
      {...appointment}
    />);

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {parsedAppointments}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
