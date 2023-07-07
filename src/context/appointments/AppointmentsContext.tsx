import React , {createContext, useEffect, useReducer} from "react";
import reducer , {IState} from "./reducer";
import {ActionsTypes} from "./actions";
import useAppointmentService from "../../services/AppointmentService";

interface IContextProps {
    children: React.ReactNode
}

const initialState: IState = {
    allAppointments: [],
    activeAppointments: [],
    loadingStatus: 'idle'
}

interface IAppointmentsContext extends IState {
    getAppointments: () => void
    getActiveAppointments: () => void
}

export const AppointmentsContext = createContext<IAppointmentsContext>({
    allAppointments: initialState.allAppointments,
    activeAppointments: initialState.activeAppointments,
    loadingStatus: initialState.loadingStatus,
    getAppointments: () => {},
    getActiveAppointments: () => {}
})

const AppointmentsContextProvider = ({children}: IContextProps) => {
    const {getAllAppointments , getAllActiveAppointments , status} = useAppointmentService()
    const [state , dispatch] = useReducer(reducer , initialState)

    const value = {
        allAppointments: state.allAppointments,
        activeAppointments: state.activeAppointments,
        loadingStatus: status,
        getAppointments: () => {
            getAllAppointments().then(data => dispatch({type: ActionsTypes.SET_ALL_APPOINTMENTS , payload: data }))
        },
        getActiveAppointments: () => {
            getAllActiveAppointments().then(data => dispatch({type: ActionsTypes.SET_ACTIVE_APPOINTMENTS , payload: data}))
        }
    }

    return(
        <AppointmentsContext.Provider value={value}>
            {children}
        </AppointmentsContext.Provider>
    )
}

export default AppointmentsContextProvider