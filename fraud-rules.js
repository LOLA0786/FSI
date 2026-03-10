function detectFraud(txns) {

  let alerts = []
  let rapidCount = 0

  for(let i = 1; i < txns.length; i++){

    let diff =
      new Date(txns[i].timestamp) -
      new Date(txns[i-1].timestamp)

    if(diff < 30000){   // 30 seconds
      rapidCount++
    }

    if(txns[i].amount > 50000){
      alerts.push("Large transaction anomaly")
    }
  }

  if(rapidCount > 5){
    alerts.push("Rapid transaction burst detected")
  }

  return alerts
}

module.exports = detectFraud
