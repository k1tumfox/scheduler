import React from "react";

//show schedule (array of appointments) for selected day
export function getAppointmentsForDay(state, day) {
  
  const daySelected = state.days.find(selectDay => selectDay.name === day);
  
  if (!daySelected) {
    return [];
  }

  const appointmentInfo = daySelected.appointments.map(appointID => state.appointments[appointID]);

  return appointmentInfo;
  
}