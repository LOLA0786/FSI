const fs = require('fs')
const detectFraud = require('./fraud-rules')

const data = JSON.parse(
  fs.readFileSync('./test-data/bank-transactions.json')
)

let risk = 0

data.forEach(tx => {

  if(tx.amount > 40000 && tx.type === "debit")
    risk += 2

  if(tx.category === "unknown")
    risk += 1

})

risk = risk / data.length * 100

let safetyScore = Math.max(0, 100 - risk)

const fraudAlerts = detectFraud(data)

console.log("Transactions analyzed:", data.length)
console.log("FSI Safety Score:", Math.round(safetyScore))
console.log("Fraud Alerts:", fraudAlerts)
