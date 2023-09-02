import { expect, test } from "vitest";

const validatePassword = (password: string) => {
  const re = {
    capital: /[A-Z]/,
    lower: /[a-z]/,
    digit: /[\d]/,
    special: /[@!?=()]/,
    full: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[*@!#%&()^~{}]+).{8,15}$/,
  };

  return (
    re.capital.test(password) &&
    re.lower.test(password) &&
    re.digit.test(password) &&
    re.special.test(password) &&
    password.length > 8 &&
    password.length < 15
  );
};

test("password has one capital, one lowercase, one digit, on special character, between 8-15, and full", () => {
  expect(validatePassword("Password.123!")).toBe(true);
});

test("password has no capital letter", () => {
  expect(validatePassword("password123!")).toBe(false);
});

test("password has no special character", () => {
  expect(validatePassword("Password123")).toBe(false);
});

test("password has no lowercase letter", () => {
  expect(validatePassword("PASSWORD123!")).toBe(false);
});

test("password has no digits", () => {
  expect(validatePassword("Password!")).toBe(false);
});

test("password does not match length", () => {
  expect(validatePassword("Pass1")).toBe(false);
});

test("password exceeds length", () => {
  expect(validatePassword("Aabbbbbbbbbb12345!")).toBe(false);
});
