const calculatePercentage = (cantidad,total):number => { let calculated =  (cantidad*100)/total;   return Math.round(calculated); }

const generateRandom = ():number => {return Math.floor(1000 + Math.random() * 9000) }
export {calculatePercentage,generateRandom}

 