'use strict';

const fs = require('fs');

function parseCSV(filePath) {

  const raw = fs.readFileSync(filePath, 'utf8');
  const lines = raw.split('\n').slice(1);

  const transactions = [];

  for (const line of lines) {

    if (!line.trim()) continue;

    const [date, description, amount] = line.split(',');

    transactions.push({
      date,
      description,
      amountINR: Number(amount)
    });

  }

  return transactions;
}

module.exports = { parseCSV };
