import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });//only change day key

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then(all => {
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }));
    })
  }, [])
  // console.log('interviewers', state.interviewers);

  function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const days = getSpots(appointments);

    return axios.put(`/api/appointments/${id}`, {interview})
      .then(() => {
        setState({
          ...state,
          appointments,
          days
        });
      })
  }

  function cancelInterview(id) {
    const appointment = { ...state.appointments[id], interview: null };
    const appointments = { ...state.appointments, [id]: appointment };
    const days = getSpots(appointments);
    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        setState({
          ...state,
          days
        });
      })
  }

  const getSpots = (appointments) => {

    const currentDay = state.days.find(day => day.name === state.day);
    
    const nullAppointments = currentDay.appointments.map(appId => 
      appointments[appId]).filter(appointment => appointment.interview === null);
    
      const numberOfSpots = nullAppointments.length;
    
    const days = state.days.map(eachDay => {
      if (eachDay.id === currentDay.id) {
        eachDay.spots = numberOfSpots;
      } 
      return eachDay;
    });
    return days;
  };

  return { state, setDay, bookInterview, cancelInterview };
}