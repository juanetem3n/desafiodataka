const { DateTime } = require("luxon");

module.exports = class DatakaDate {
    constructor(secret) {
        this.timezone = secret.TIMEZONE;
    }

    now() {
        this.date = DateTime.now().setZone(this.timezone);
        return this;
    }

    setDateFromIso(iso) {
        this.date = DateTime.fromISO(iso);
        return this;
    }

    setDate(date) {
        this.date = date;
        return this;
    }

    setDateFromString(dateString) {
        this.date = DateTime.fromFormat(dateString, "yyyy-MM-dd hh:mm:ss");
        return this;
    }

    setZone(zone) {
        this.date = this.date.setZone(zone);
        return this;
    }

    add({ years, months, weeks, days, hours, minutes, seconds }) {
        try {
            this.date = this.date.plus({
                seconds: seconds,
                minutes: minutes,
                hours: hours,
                days: days,
                weeks: weeks,
                months: months,
                years: years,
            });
            return this;
        } catch (e) {
            throw new Error(`Failed to add to date: ${e}`);
        }
    }

    getDateIso() {
        return this.date.utc().toISO();
    }

    getDateString() {
        let dateJson = this.date.toObject();
        return (
            dateJson.year.toLocaleString("en-US", {
                minimumIntegerDigits: 2,
                useGrouping: false,
            }) +
            "-" +
            dateJson.month.toLocaleString("en-US", {
                minimumIntegerDigits: 2,
                useGrouping: false,
            }) +
            "-" +
            dateJson.day.toLocaleString("en-US", {
                minimumIntegerDigits: 2,
                useGrouping: false,
            }) +
            " " +
            dateJson.hour.toLocaleString("en-US", {
                minimumIntegerDigits: 2,
                useGrouping: false,
            }) +
            ":" +
            dateJson.minute.toLocaleString("en-US", {
                minimumIntegerDigits: 2,
                useGrouping: false,
            }) +
            ":" +
            dateJson.second.toLocaleString("en-US", {
                minimumIntegerDigits: 2,
                useGrouping: false,
            })
        );
    }
};
