const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

//returning name of current month
export function getCurrentMonth() {
    return months[new Date().getMonth()];
}

//returning year
export function getCurrentYear(){
    return new Date().getFullYear();
}

//checking to see if transaction is in scope
export function isCurrentMonth(date){
    const currentDate = new Date();
    const transactionDate = new Date(date);

    return (
        transactionDate.getMonth() === currentDate.getMonth() &&
        transactionDate.getFullYear() === currentDate.getFullYear()
    );
}

