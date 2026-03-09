'use strict';

function detectLeaks(txns){

  const leaks = [];

  for(const t of txns){

    if(t.description &&
       t.description.includes("NETFLIX")){

      leaks.push(t);

    }

  }

  return leaks;

}

module.exports = { detectLeaks };
