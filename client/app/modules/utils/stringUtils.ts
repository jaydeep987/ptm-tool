import { characters, generate } from 'shortid';

enum ShortIdType {
  NUMBER_ONLY = '0123456789',
  NUMBER_AND_SYMBOLS = '0123456789_$',
  NUMBER_ALPHA_LOWER = '0123456789abcdefghijklmnopqrstuvwxyz',
  NUMBER_ALPHA_UPPER = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  NUMBER_ALPHA_BOTH = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  NUMBER_ALPHA_SYMBOLS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_$',
}

function getUniqueShortId(shortIdType?: string): string {
  if (shortIdType) {
    characters(shortIdType);
  }

  return generate();
}

export {
  getUniqueShortId,
};
