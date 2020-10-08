
//show schedule (array of appointments) for selected day
export function getAppointmentsForDay(state, day) {
  
  const daySelected = state.days.find(selectDay => selectDay.name === day);
  
  if (!daySelected) {
    return [];
  }

  const appointmentInfo = daySelected.appointments.map(appointID => state.appointments[appointID]);

  return appointmentInfo;
  
}

export function getInterviewersForDay(state, day) {
  
  const daySelected = state.days.find(selectDay => selectDay.name === day);
  
  if (!daySelected) {
    return [];
  }

  const interviewersOfDay = daySelected.interviewers.map(interviewerID => state.interviewers[interviewerID]);

  return interviewersOfDay;
  
}

export function getInterview(state, interview) {
  
  if (!interview) {
    return null;
  }

  const interviewerInfo = {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer]  
  }

  return interviewerInfo;
}