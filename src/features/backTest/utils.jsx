import { green, red } from '@material-ui/core/colors'
import moment from 'moment'

export const positiveNegativeColor = (number) => {
  return number >= 0 ? green[500] : red[500]
}

export const getRelativeTimeDifference = (startDate, endDate) => {
  const start = moment(startDate)
  const end = moment(endDate)
  const diffInSeconds = end.diff(start, 'seconds')

  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds`
  } else if (diffInSeconds < 3600) {
    const diffInMinutes = Math.floor(diffInSeconds / 60)
    return `${diffInMinutes} minutes`
  } else if (diffInSeconds < 86400) {
    const diffInHours = Math.floor(diffInSeconds / 3600)
    return `${diffInHours} hours`
  } else {
    const diffInDays = Math.floor(diffInSeconds / 86400)
    return `${diffInDays} days`
  }
}
