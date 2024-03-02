import {expect, test} from 'vitest'
import {sum} from './example.ts'

test('add 1 + 2 to get 3', () => {
    expect(sum(1, 2)).toBe(3)
})