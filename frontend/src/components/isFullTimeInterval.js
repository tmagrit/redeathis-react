export function isFullTimeInterval(interval = [1950, 2020], min = 1950) {
  if(interval[0] === min && interval[1] === new Date().getFullYear())
      return false
  else 
      return true    
};