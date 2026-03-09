'use strict';

/**
 * Minimal validator so the engine can run.
 * Later this can be expanded with full schema validation.
 */

function validateFSIInput(input) {

  if (!input || typeof input !== 'object') {
    const err = new Error('Invalid input');
    err.name = 'FSIInvalidTypeError';
    throw err;
  }

  if (!input.profile || !input.profile.userId) {
    const err = new Error('Missing profile.userId');
    err.name = 'FSIMissingFieldError';
    throw err;
  }

  if (input.profile.netMonthlyIncomeINR < 0) {
    const err = new Error('Income cannot be negative');
    err.name = 'FSIInvalidRangeError';
    throw err;
  }

  return input;
}

module.exports = { validateFSIInput };
