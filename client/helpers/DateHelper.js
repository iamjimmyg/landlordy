export function dateAndDueInfo(unit){
  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  let date = new Date()
  let currentMonth = date.getMonth()
  let currentDay = date.getDate()
  let currentYear = date.getFullYear()

  let overDue = false
  let monthDue
  let yearDue = currentYear
  if(unit.dueDate < currentDay && unit.paidStatus === false){
    monthDue = currentMonth
    overDue = true
  }else if(unit.dueDate >= currentDay){

    if(unit.paidStatus === false){
      if(unit.dueDate === currentDay){
        monthDue = currentMonth
      }else {
        monthDue = currentMonth - 1
      }
      overDue = true
    }else if(unit.paidStatus === true){
      if(currentMonth === 11){
        monthDue = 0
        yearDue = yearDue + 1
      }
      if(unit.dueDate === currentDay){
        monthDue = currentMonth + 1
      }else {
        monthDue = currentMonth
      }
    }
  }else if(unit.dueDate < currentDay && unit.paidStatus === true){
    if(currentMonth === 11){
      monthDue = 0
      yearDue = yearDue + 1
    }
    monthDue = currentMonth + 1
  }

  return { overDue: overDue, yearDue: yearDue, monthDue: monthDue }
}
