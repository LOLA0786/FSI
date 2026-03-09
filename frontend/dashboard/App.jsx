import React, { useState } from "react";

export default function App() {

  const [score,setScore] = useState(null);

  async function fetchScore() {

    const res = await fetch("http://localhost:3000/fsi/score",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        profile:{
          userId:"demo",
          netMonthlyIncomeINR:80000
        },
        deposits:[],
        fixedDeposits:[],
        liquidAssets:{
          savingsBalanceINR:30000,
          liquidMutualFundsINR:0
        },
        upiTransactions:[],
        recurringCharges:[]
      })
    });

    const data = await res.json();

    setScore(data.fsiScore);

  }

  return (

    <div style={{padding:"40px"}}>

      <h1>Financial Safety Score</h1>

      <button onClick={fetchScore}>
        Calculate
      </button>

      {score && (
        <h2>FSI Score: {score}</h2>
      )}

    </div>

  );

}
