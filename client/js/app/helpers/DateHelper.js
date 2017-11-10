class DateHelper {

    constructor() {
        throw new Error('This class cannot be instantiated.');
    }

    static textToDate(dateText) {
        if(!/\d{4}-\d{2}-\d{2}/.test(dateText))
            throw new Error('The date must be in the format yyyy-mm-dd');

        return new Date(...dateText.split('-').map((date, index) => index == 1 ? date - 1 : date));
    }

    static dateToText(date) {
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    }
}