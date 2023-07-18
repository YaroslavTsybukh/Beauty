import { IState } from "../context/appointments/reducer";

export const filteredData = <T extends {date: string}>(data: T[], state: IState) => {
    return data.filter(item => {
        if(Array.isArray(state.calendarDate) && state.calendarDate[0] && state.calendarDate[1]) {
            if(new Date(state.calendarDate[0]).getTime() <= new Date(item.date).getTime() &&
                new Date(state.calendarDate[1]).getTime() >= new Date(item.date).getTime()) {
                return item
            }
        } else {
            return item
        }
    })
}