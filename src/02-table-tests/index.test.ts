// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 3, b: 1, action: Action.Divide, expected: 3 },
  {
    a: 2,
    b: 2,
    action: Action.Exponentiate,
    expected: 4,
  },
  {
    a: 3,
    b: 1,
    action: 'Try',
    expected: null,
  },
  {
    a: {},
    b: [],
    action: Action.Add,
    expected: null,
  },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'Table-driving testing',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    },
  );
});
