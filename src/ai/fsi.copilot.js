'use strict';

function generateAdvice(score){

  if(score >= 750){

    return "Your finances are fortress level.";

  }

  if(score >= 650){

    return "Strong position. Maintain diversification.";

  }

  if(score >= 500){

    return "Moderate risk. Improve liquidity.";

  }

  return "High risk. Immediate financial restructuring recommended.";

}

module.exports = { generateAdvice };
