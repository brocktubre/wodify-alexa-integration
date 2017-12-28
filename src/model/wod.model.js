var Wod = (function () {
    function Wod() {
        console.log('Creating new Wod');
    }
    Wod.prototype.map = function (json) {
        console.log('Trying to map the JSON object.');
    };
    return Wod;
})();
exports.Wod = Wod;
