import Header from "../header/Header";
import SchedulePage from "../../pages/schedule/SchedulePage";
// import HistoryPage from "../../pages/history/HistoryPage";
// import CancelModal from "../modal/CancelModal";
import {useEffect} from "react";
import {useAppointmentService} from "../../services/AppointmentService";
import "./app.scss";

function App() {
	const {getAllAppointments , getAllActiveAppointments} = useAppointmentService()

	useEffect(() => {
	getAllActiveAppointments()
	},[])
	return (
		<main className="board">
			<Header />
			<SchedulePage />
			{/* <HistoryPage /> */}
			{/* <CancelModal /> */}
		</main>
	);
}

export default App;
