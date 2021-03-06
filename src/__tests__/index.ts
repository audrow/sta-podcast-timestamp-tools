import {sortTimestamps, toTimestamp, toTimestampString} from '../index'

describe('sortTimestamps', () => {
  it('should compare timestamps correctly', () => {
    const d1 = {hours: 0, minutes: 0, seconds: 0}
    const d2 = {hours: 0, minutes: 0, seconds: 1}
    const d3 = {hours: 0, minutes: 1, seconds: 0}
    const d4 = {hours: 0, minutes: 1, seconds: 1}
    const d5 = {hours: 1, minutes: 0, seconds: 0}
    const d6 = {hours: 1, minutes: 0, seconds: 1}
    const d7 = {hours: 1, minutes: 1, seconds: 0}

    expect(sortTimestamps(d1, d1)).toBe(0)
    expect(sortTimestamps(d1, d2)).toBe(-1)
    expect(sortTimestamps(d1, d3)).toBe(-1)
    expect(sortTimestamps(d1, d4)).toBe(-1)
    expect(sortTimestamps(d1, d5)).toBe(-1)
    expect(sortTimestamps(d1, d6)).toBe(-1)
    expect(sortTimestamps(d1, d7)).toBe(-1)

    expect(sortTimestamps(d2, d1)).toBe(1)
    expect(sortTimestamps(d2, d2)).toBe(0)
    expect(sortTimestamps(d2, d3)).toBe(-1)
    expect(sortTimestamps(d2, d4)).toBe(-1)
    expect(sortTimestamps(d2, d5)).toBe(-1)
    expect(sortTimestamps(d2, d6)).toBe(-1)
    expect(sortTimestamps(d2, d7)).toBe(-1)

    expect(sortTimestamps(d3, d1)).toBe(1)
    expect(sortTimestamps(d3, d2)).toBe(1)
    expect(sortTimestamps(d3, d3)).toBe(0)
    expect(sortTimestamps(d3, d4)).toBe(-1)
    expect(sortTimestamps(d3, d5)).toBe(-1)
    expect(sortTimestamps(d3, d6)).toBe(-1)
    expect(sortTimestamps(d3, d7)).toBe(-1)

    expect(sortTimestamps(d4, d1)).toBe(1)
    expect(sortTimestamps(d4, d2)).toBe(1)
    expect(sortTimestamps(d4, d3)).toBe(1)
    expect(sortTimestamps(d4, d4)).toBe(0)
    expect(sortTimestamps(d4, d5)).toBe(-1)
    expect(sortTimestamps(d4, d6)).toBe(-1)
    expect(sortTimestamps(d4, d7)).toBe(-1)

    expect(sortTimestamps(d5, d1)).toBe(1)
    expect(sortTimestamps(d5, d2)).toBe(1)
    expect(sortTimestamps(d5, d3)).toBe(1)
    expect(sortTimestamps(d5, d4)).toBe(1)
    expect(sortTimestamps(d5, d5)).toBe(0)
    expect(sortTimestamps(d5, d6)).toBe(-1)
    expect(sortTimestamps(d5, d7)).toBe(-1)

    expect(sortTimestamps(d6, d1)).toBe(1)
    expect(sortTimestamps(d6, d2)).toBe(1)
    expect(sortTimestamps(d6, d3)).toBe(1)
    expect(sortTimestamps(d6, d4)).toBe(1)
    expect(sortTimestamps(d6, d5)).toBe(1)
    expect(sortTimestamps(d6, d6)).toBe(0)
    expect(sortTimestamps(d6, d7)).toBe(-1)

    expect(sortTimestamps(d7, d1)).toBe(1)
    expect(sortTimestamps(d7, d2)).toBe(1)
    expect(sortTimestamps(d7, d3)).toBe(1)
    expect(sortTimestamps(d7, d4)).toBe(1)
    expect(sortTimestamps(d7, d5)).toBe(1)
    expect(sortTimestamps(d7, d6)).toBe(1)
    expect(sortTimestamps(d7, d7)).toBe(0)
  })
})

describe('toTimestamp', () => {
  it('should convert a string to a timestamp', () => {
    expect(toTimestamp('0:00:00')).toEqual({hours: 0, minutes: 0, seconds: 0})
    expect(toTimestamp('0:00:01')).toEqual({hours: 0, minutes: 0, seconds: 1})
    expect(toTimestamp('0:01:00')).toEqual({hours: 0, minutes: 1, seconds: 0})
    expect(toTimestamp('1:00:00')).toEqual({hours: 1, minutes: 0, seconds: 0})
    expect(toTimestamp('1:01:01')).toEqual({hours: 1, minutes: 1, seconds: 1})
  })
  it('should ignore milliseconds', () => {
    expect(toTimestamp('0:00:00.000')).toEqual({
      hours: 0,
      minutes: 0,
      seconds: 0,
    })
    expect(toTimestamp('0:00:00,000')).toEqual({
      hours: 0,
      minutes: 0,
      seconds: 0,
    })
    expect(toTimestamp('0:00:00.001')).toEqual({
      hours: 0,
      minutes: 0,
      seconds: 0,
    })
    expect(toTimestamp('0:00:00,001')).toEqual({
      hours: 0,
      minutes: 0,
      seconds: 0,
    })
  })
  it('should throw an error on invalid strings', () => {
    const badStrings = [
      '0:00:00.a',
      '0:00:00,a',
      '0:00:0a',
      '0:00',
      '0:00:0',
      '0:00:000',
      '0:000:00',
      '0:0:00',
      '01',
      'foo',
      '',
      '   ',
    ]
    for (const badString of badStrings) {
      expect(() => toTimestamp(badString)).toThrowError()
    }
  })
})

describe('toTimestampString', () => {
  it('should convert durations to strings', () => {
    expect(toTimestampString({hours: 0, minutes: 0, seconds: 0})).toBe(
      '0:00:00',
    )
    expect(toTimestampString({hours: 0, minutes: 0, seconds: 1})).toBe(
      '0:00:01',
    )
    expect(toTimestampString({hours: 0, minutes: 1, seconds: 0})).toBe(
      '0:01:00',
    )
    expect(toTimestampString({hours: 1, minutes: 0, seconds: 0})).toBe(
      '1:00:00',
    )
    expect(toTimestampString({hours: 1, minutes: 1, seconds: 1})).toBe(
      '1:01:01',
    )
  })
})
