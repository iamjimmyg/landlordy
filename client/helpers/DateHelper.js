export function dateAndDueInfo(unit){
  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  let date = new Date()
  let currentMonth = date.getMonth()
  let currentDay = date.getDate()
  let currentYear = date.getFullYear()

  let overDue = false
  let monthDue = currentMonth
  let yearDue = currentYear

  if(unit.dueDate === currentDay){
    if(unit.paidStatus === true){
      monthDue = monthDue + 1
      if(monthDue === 12){
        monthDue = 0
        yearDue = yearDue + 1
      }
    }
  }else if(unit.dueDate < currentDay){
    if(unit.paidStatus === true){
      monthDue = monthDue + 1
      if(monthDue === 12){
        monthDue = 0
        yearDue = yearDue + 1
      }
    }
  }else if(unit.dueDate > currentDay){
    if(unit.paidStatus === false){
      if(monthDue === 0){
        currentYear = currentYear - 1
        monthDue = 11
      }else {
        monthDue = monthDue - 1
      }

    }
  }
  return { overDue: overDue, yearDue: yearDue, monthDue: monthDue }
}
