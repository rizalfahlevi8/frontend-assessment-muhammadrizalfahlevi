function countCharacterFrequency(text) {
  if (typeof text !== 'string') {
    return {};
  }

  const frequencyMap = {};
  const normalized = text.toLowerCase();

  for (const char of normalized) {
    if (char >= 'a' && char <= 'z') {
      frequencyMap[char] = (frequencyMap[char] || 0) + 1;
    }
  }

  return frequencyMap;
}

function processUserData(users) {
  if (!Array.isArray(users) || users.length === 0) {
    return {};
  }

  const adultUsers = users.filter((user) => {
    return (
      user &&
      typeof user === 'object' &&
      typeof user.age === 'number' &&
      !Number.isNaN(user.age) &&
      user.age >= 18
    );
  });

  const grouped = {};

  for (const user of adultUsers) {
    const genderKey = user.gender ? String(user.gender).trim() : 'unknown';

    if (!grouped[genderKey]) {
      grouped[genderKey] = {
        count: 0,
        totalAge: 0,
        users: []
      };
    }

    grouped[genderKey].count += 1;
    grouped[genderKey].totalAge += user.age;
    grouped[genderKey].users.push({ ...user });
  }

  const finalResult = {};

  for (const [gender, data] of Object.entries(grouped)) {
    const average = data.count > 0 ? data.totalAge / data.count : 0;
    finalResult[gender] = {
      count: data.count,
      averageAge: Number(average.toFixed(1)),
      users: data.users
    };
  }

  return finalResult;
}

export {
  countCharacterFrequency,
  processUserData
};
