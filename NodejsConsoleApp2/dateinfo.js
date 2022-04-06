function pad(n) {
    return n.toString().padStart(2, "0");
}
module.exports = {
    getDate: function () {
        let date = new Date();
        return `${date.getFullYear()}/${pad(date.getMonth() + 1)}/${pad(date.getDate())}`;
    }
};