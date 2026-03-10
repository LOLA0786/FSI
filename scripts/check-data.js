const fs = require("fs");

const txns = JSON.parse(
  fs.readFileSync("./test-data/bank-transactions.json")
);

let debit = 0;
let credit = 0;
let max = 0;

txns.forEach(t => {
  if (t.type === "debit") debit++;
  if (t.type === "credit") credit++;
  if (Math.abs(t.amount) > max) max = Math.abs(t.amount);
});

console.log("Total transactions:", txns.length);
console.log("Debit:", debit);
console.log("Credit:", credit);
console.log("Largest transaction:", max);
