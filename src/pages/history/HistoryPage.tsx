import Calendar from "../../components/calendar/Calendar";
import HistoryList from "../../components/historyList/HistoryList";
import { useContext , useEffect } from "react";
import { AppointmentsContext } from "../../context/appointments/AppointmentsContext";

import "./historyPage.scss";

function HistoryPage() {
	const { changedCalendarDates } = useContext(AppointmentsContext)

	useEffect(() => {
		changedCalendarDates([null , null])
	},[])

	return (
		<section className="history">
			<div className="history__controls">
				<Calendar />
			</div>
			<div className="history__list">
				<HistoryList />
			</div>
		</section>
	);
}

export default HistoryPage;
