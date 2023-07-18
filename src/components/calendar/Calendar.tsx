import { useContext } from "react";
import { AppointmentsContext } from "../../context/appointments/AppointmentsContext";
import { Calendar as CalendarLib } from 'react-calendar';

import 'react-calendar/dist/Calendar.css';
import "./calendar.scss";

function Calendar() {
	const {calendarDate, changedCalendarDates} = useContext(AppointmentsContext)
	return (
		<div className="calendar">
			<CalendarLib  value={calendarDate} onChange={changedCalendarDates} selectRange={true}/>
			<button onClick={() => changedCalendarDates([null,null])}>Очистить календарь</button>
		</div>
	)
}

export default Calendar;
