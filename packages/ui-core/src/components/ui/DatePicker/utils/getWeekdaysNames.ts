import dayjs from 'dayjs'
import { getStartOfWeek } from './getStartOfWeek'
import type { FirstDayOfWeek } from '../../@types/date'

export function getWeekdaysNames(
    firstDayOfWeek: FirstDayOfWeek = 'monday',
) {
    const names = []
    const date = getStartOfWeek(new Date(), firstDayOfWeek)

    for (let i = 0; i < 7; i += 1) {
        names.push(dayjs(date).format('ddd'))
        date.setDate(date.getDate() + 1)
    }

    return names
}
