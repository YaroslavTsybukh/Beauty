import {ActiveAppointment, IAppointment} from "../../shared/appointment.interface";
import {ActionsTypes, AppointmentAction} from "./actions";
import {LoadingStatus} from "../../hooks/http.hook";
import {LooseValue} from "react-calendar/dist/cjs/shared/types";

export interface IState {
    allAppointments: IAppointment[] | [],
    activeAppointments: ActiveAppointment[] | [],
    loadingStatus: LoadingStatus ,
    calendarDate: LooseValue
}

const reducer = (state: IState , action:AppointmentAction): IState => {
    switch (action.type) {
        case ActionsTypes.SET_ALL_APPOINTMENTS:
            return {
                ...state,
                allAppointments: action.payload
            }
        case ActionsTypes.SET_ACTIVE_APPOINTMENTS:
            return {
                ...state,
                activeAppointments: action.payload
            }
        case ActionsTypes.FETCHING_STATUS:
            return {
                ...state,
                loadingStatus: 'loading'
            }
        case ActionsTypes.ERROR_FETCHING_STATUS: {
            return {
                ...state,
                loadingStatus: 'error'
            }
        }
        case ActionsTypes.CHANGED_CALENDAR_DATE: {
            return {
                ...state,
                calendarDate: action.payload
            }
        }
        default:
            return state
    }
}

export default reducer