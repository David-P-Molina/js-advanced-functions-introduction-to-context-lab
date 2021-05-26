// Your code here
function createEmployeeRecord ( array ) {
   return { 
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}
function createEmployeeRecords ( employees ) {
   return employees.map(function(employee){
        return createEmployeeRecord(employee)
    })
}
function createTimeInEvent (employee, timeStamp) {
   let [date, hour] = timeStamp.split (" ")
   employee.timeInEvents.push({
       type: "TimeIn",
       hour: parseInt(hour),
       date: date
   })
   return employee
}
function createTimeOutEvent (employee, timeStamp) {
    let [date, hour] = timeStamp.split(" ")
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour),
        date
    })
    return employee
}

function hoursWorkedOnDate (employee, date) {
    let timeIn = employee.timeInEvents.find(function(event) {
       return event.date === date
    })
    let timeOut = employee.timeOutEvents.find(function(event) {
       return event.date === date
    })
    
    return ((timeOut.hour - timeIn.hour)/ 100)
}

function wagesEarnedOnDate (employee, date) {
   let hoursWorked = hoursWorkedOnDate(employee, date)
   let payOwed = hoursWorked * employee.payPerHour
   return payOwed
}

function allWagesFor(employee) {
    let dates = employee.timeInEvents.map(function(event){
        return event.date
    })
    let wages = dates.reduce(function (memoTotal, date) {
       return memoTotal +  wagesEarnedOnDate(employee, date) 
    },0)
    return wages
}
function findEmployeeByFirstName (employeesArray, firstName) {
    let record = employeesArray.find( function(name){
        return name.firstName === firstName
    })
    return record
}
function calculatePayroll (employees) {
    let fullPayroll = employees.reduce(function(memoTotal, name) {
        return memoTotal + allWagesFor(name)
    },0)
    return fullPayroll
}