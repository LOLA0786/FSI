const income = 120000
const rent = 35000
const emi = 20000
const subs = 2500

let balance = 0
let score = 80

for(let m=1;m<=12;m++){

  let expenses = rent + emi + subs

  // simulate unexpected expense
  if(Math.random() < 0.2){
    const shock = 15000
    expenses += shock
    console.log("Unexpected expense:",shock)
  }

  const savings = income - expenses
  balance += savings

  if(balance < income * 3)
    score -= 1

  console.log("Month",m,"Balance",balance,"Score",score)

}
