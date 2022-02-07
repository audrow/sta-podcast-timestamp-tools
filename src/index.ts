import type {Timestamp} from '@sta-podcast/types'

export type {Timestamp}

export function toTimestamp(s: string): Timestamp {
  const match = s.match(/^(\d+):(\d{2}):(\d{2})(?:[,|.]\d+)?$/)
  if (!match) {
    throw new Error(`"${s}" is not a valid duration`)
  }
  const duration = {
    hours: parseInt(match[1]),
    minutes: parseInt(match[2]),
    seconds: parseInt(match[3]),
  }
  if (duration.minutes > 59 || duration.seconds > 59) {
    throw new Error(`"${s}" is not a valid duration`)
  }
  return duration
}

export function toTimestampString(duration: Timestamp): string {
  return `${duration.hours}:${duration.minutes
    .toString()
    .padStart(2, '0')}:${duration.seconds.toString().padStart(2, '0')}`
}

export function sortTimestamps(a: Timestamp, b: Timestamp) {
  if (a.hours > b.hours) {
    return 1
  } else if (a.hours < b.hours) {
    return -1
  }

  if (a.minutes > b.minutes) {
    return 1
  } else if (a.minutes < b.minutes) {
    return -1
  }

  if (a.seconds > b.seconds) {
    return 1
  } else if (a.seconds < b.seconds) {
    return -1
  }

  return 0
}
