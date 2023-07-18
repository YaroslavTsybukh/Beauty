import {IAppointment , ActiveAppointment} from "../../shared/appointment.interface";
import {LooseValue} from "react-calendar/dist/cjs/shared/types";

export enum ActionsTypes {
    SET_ACTIVE_APPOINTMENTS = "SET_ACTIVE_APPOINTMENTS",
    SET_ALL_APPOINTMENTS = "SET_ALL_APPOINTMENTS",
    FETCHING_STATUS = "FETCHING_STATUS",
    ERROR_FETCHING_STATUS = "ERROR_FETCHING_STATUS",
    CHANGED_CALENDAR_DATE = "CHANGED_CALENDAR_DATE"
}

export type AppointmentAction = {
        type: ActionsTypes.SET_ACTIVE_APPOINTMENTS,
        payload: ActiveAppointment[]
    }
    |
    {
        type: ActionsTypes.SET_ALL_APPOINTMENTS,
        payload: IAppointment[]
    }
    |
    {
        type: ActionsTypes.FETCHING_STATUS
    }
    |
    {
        type: ActionsTypes.ERROR_FETCHING_STATUS
    }
    |
    {
        type: ActionsTypes.CHANGED_CALENDAR_DATE
        payload: LooseValue
    }