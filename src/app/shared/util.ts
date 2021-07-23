export class Util {

    static isDecimalOrInteger(nr: any): boolean {
        // string, float, decimal ou inteiro em javascript
        if (typeof nr == 'string' && nr.match(/(\d+[,.]\d+)/)) return true;
        else if (typeof nr == 'string' && nr.match(/(\d+)/)) return true;
        else if (typeof nr == 'number') return true;
        else return false;
        //New Deeal --> estudar isso:
        /*
        Number.isInteger = Number.isInteger || function(value) {
        return typeof value === "number" && 
           isFinite(value) && 
           Math.floor(value) === value;
};
        */
    }

    static isValidDateString(dateString: string): boolean {
        // Validates that the input string is a valid date formatted as "yyyy-mm--dd"
        // First check for the pattern
        if (!/^\d{4}\-\d{1,2}\-\d{1,2}$/.test(dateString))
            return false;

        // Parse the date parts to integers 2020-12-31
        var parts = dateString.split("-");
        var day = parseInt(parts[2], 10);
        var month = parseInt(parts[1], 10);
        var year = parseInt(parts[0], 10);

        // Check the ranges of month and year
        if (year < 1000 || year > 3000 || month == 0 || month > 12)
            return false;

        var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        // Adjust for leap years
        if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
            monthLength[1] = 29;

        // Check the range of the day
        return day > 0 && day <= monthLength[month - 1];
    }

    static isValidDateNumeric(date: number): boolean {

        return false;
    }
}
