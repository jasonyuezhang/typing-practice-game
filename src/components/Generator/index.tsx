const RandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};

const PhoneNumberGenerator = () => {
  const randomizedNumber = Array(10).fill(null).map(() => RandomInt(10));
  return `${randomizedNumber.slice(0, 3).join("")}-${randomizedNumber.slice(3, 6).join("")}-${randomizedNumber.slice(6).join("")}`;
};

export {
  PhoneNumberGenerator
}