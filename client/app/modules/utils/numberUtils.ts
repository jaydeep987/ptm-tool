import { rgb } from 'color';

function getRandomColorHex(): string {
  const rgbColors: number[] = [];
  for (let i = 0; i < 3; i++) {
    rgbColors.push(getPositiveIntegerRandomNumber(255));
  }
  return rgb(rgbColors).hex();
}

function getPositiveIntegerRandomNumber(seed: number): number {
  return Math.abs(Math.floor(Math.random() * seed));
}

export {
  getRandomColorHex,
  getPositiveIntegerRandomNumber,
};
