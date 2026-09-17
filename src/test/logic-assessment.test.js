import { describe, it, expect } from 'vitest';
import { countCharacterFrequency, processUserData } from '../../logic-assessment';

describe('Logic Assessment - Task 1.1 countCharacterFrequency', () => {
  it('counts letter frequencies case-insensitively', () => {
    const result = countCharacterFrequency('Hello World');
    expect(result).toEqual({
      h: 1,
      e: 1,
      l: 3,
      o: 2,
      w: 1,
      r: 1,
      d: 1,
    });
  });

  it('ignores numbers, punctuation, and whitespace', () => {
    const result = countCharacterFrequency('App-123, App!!');
    expect(result).toEqual({
      a: 2,
      p: 4,
    });
  });

  it('returns empty object for empty string or non-string inputs', () => {
    expect(countCharacterFrequency('')).toEqual({});
    expect(countCharacterFrequency(null)).toEqual({});
    expect(countCharacterFrequency(undefined)).toEqual({});
    expect(countCharacterFrequency(12345)).toEqual({});
  });
});

describe('Logic Assessment - Task 1.2 processUserData', () => {
  const sampleUsers = [
    { id: 1, name: 'Alice', age: 25, gender: 'female' },
    { id: 2, name: 'Bob', age: 17, gender: 'male' },
    { id: 3, name: 'Charlie', age: 30, gender: 'male' },
    { id: 4, name: 'Diana', age: 22, gender: 'female' },
    { id: 5, name: 'Evan', age: 18, gender: 'male' },
  ];

  it('filters out users younger than 18 and groups by gender', () => {
    const result = processUserData(sampleUsers);

    expect(result.female.count).toBe(2);
    expect(result.female.averageAge).toBe(23.5);
    expect(result.female.users.map((u) => u.name)).toEqual(['Alice', 'Diana']);

    expect(result.male.count).toBe(2);
    expect(result.male.averageAge).toBe(24);
    expect(result.male.users.map((u) => u.name)).toEqual(['Charlie', 'Evan']);
  });

  it('rounds averageAge to 1 decimal place', () => {
    const users = [
      { id: 1, name: 'User 1', age: 20, gender: 'other' },
      { id: 2, name: 'User 2', age: 21, gender: 'other' },
      { id: 3, name: 'User 3', age: 21, gender: 'other' },
    ];
    const result = processUserData(users);
    expect(result.other.averageAge).toBe(20.7);
  });

  it('does not mutate the original users array or objects', () => {
    const originalCopy = JSON.parse(JSON.stringify(sampleUsers));
    processUserData(sampleUsers);
    expect(sampleUsers).toEqual(originalCopy);
  });

  it('handles empty array or invalid inputs gracefully', () => {
    expect(processUserData([])).toEqual({});
    expect(processUserData(null)).toEqual({});
    expect(processUserData(undefined)).toEqual({});
  });
});
