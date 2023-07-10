import {Routes , Route} from "react-router-dom";
import Header from "../header/Header";
import SchedulePage from "../../pages/schedule/SchedulePage";
import AppointmentsContextProvider from "../../context/appointments/AppointmentsContext";
import HistoryPage from "../../pages/history/HistoryPage";
import {NotFoundPage} from "../404/404";

import "./app.scss";

function App() {
	return (
		<main className="board">
			<Header />
			<AppointmentsContextProvider>
				<Routes>
					{
						['/' , '/schedule'].map((pathName , i) => (
							<Route key={i} path={pathName} element={<SchedulePage />} />
						))
					}
				 	<Route path="/history" element={<HistoryPage />}/>
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</AppointmentsContextProvider>
		</main>
	);
}

export default App;
