import React , { createContext, useEffect, useReducer } from "react";
import reducer , { IState } from "./reducer";
import { ActionsTypes } from "./actions";
import useAppointmentService from "../../services/AppointmentService";
import { Value } from "react-calendar/dist/cjs/shared/types";
import { filteredData } from "../../utils/filteredData";
import {ActiveAppointment, IAppointment} from "../../shared/appointment.interface";

interface IContextProps {
    children: React.ReactNode
}

const initialState: IState = {
    allAppointments: [],
    activeAppointments: [],
    loadingStatus: 'idle',
    calendarDate: [null , null]
}

interface IAppointmentsContext extends IState {
    getAppointments: () => void
    getActiveAppointments: () => void
    changedCalendarDates: (newDate: Value) => void
}

export const AppointmentsContext = createContext<IAppointmentsContext>({
    allAppointments: initialState.allAppointments,
    activeAppointments: initialState.activeAppointments,
    loadingStatus: initialState.loadingStatus,
    calendarDate: initialState.calendarDate,
    getAppointments: () => {},
    getActiveAppointments: () => {},
    changedCalendarDates: (newDate: Value) => {}
})

const AppointmentsContextProvider = ({children}: IContextProps) => {
    const {getAllAppointments , getAllActiveAppointments , status} = useAppointmentService()
    const [state , dispatch] = useReducer(reducer , initialState)

    const value = {
        allAppointments: state.allAppointments,
        activeAppointments: state.activeAppointments,
        loadingStatus: status,
        calendarDate: state.calendarDate,
        getAppointments: () => {
            getAllAppointments().then(data => {
                const filteredDataArr = filteredData<IAppointment>(data , state)

                dispatch({type: ActionsTypes.SET_ALL_APPOINTMENTS, payload: filteredDataArr})
            })
        },
        getActiveAppointments: () => {
            getAllActiveAppointments().then(data => {
                const filteredDataArr = filteredData<ActiveAppointment>(data , state)

                dispatch({type: ActionsTypes.SET_ACTIVE_APPOINTMENTS , payload: filteredDataArr})
            })
        },
        changedCalendarDates: (newDate: Value) => {
            dispatch({type: ActionsTypes.CHANGED_CALENDAR_DATE , payload: newDate})
        }
    }

    return(
        <AppointmentsContext.Provider value={value}>
            {children}
        </AppointmentsContext.Provider>
    )
}

export default AppointmentsContextProvider