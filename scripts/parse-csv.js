const fs = require('fs')

const rows = fs.readFileSync('statement_real.csv','utf8')
  .split('\n')
  .slice(1)

const txns = rows
  .map(r => r.split(','))
  .map(r => {

    const amount = Number(r[2])

    if(!amount || isNaN(amount)) return null

    return {
      amount: Math.abs(amount),
      type: amount > 0 ? "credit" : "debit",
      category: "unknown",
      timestamp: new Date().toISOString()
    }

  })
  .filter(Boolean)

fs.writeFileSync(
  'test-data/bank-transactions.json',
  JSON.stringify(txns,null,2)
)

console.log("Valid transactions:", txns.length)
