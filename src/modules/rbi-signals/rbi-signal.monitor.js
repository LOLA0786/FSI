'use strict';

function checkBankAlerts(bank){

  const alerts = {

    COOP:true,
    SFB:false,
    PSB:false

  };

  return alerts[bank] || false;

}

module.exports = { checkBankAlerts };
