import { v4 as uuidv4 } from "uuid";

export function recalculateValueFromOneRangeToAnother(value, minSource, maxSource, minTarget, maxTarget, isLimitValueByRange = false) {
  const calculatedValue = minTarget + (value - minSource) * (maxTarget - minTarget) / (maxSource - minSource);

  return isLimitValueByRange ? Math.min(maxTarget, Math.max(minTarget, calculatedValue)) : calculatedValue;
}

export function recalculateValueRelativeToRange(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export function generateUUID() {
  return uuidv4();
}

export function generateVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
};