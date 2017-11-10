'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DateHelper = function () {
    function DateHelper() {
        _classCallCheck(this, DateHelper);

        throw new Error('This class cannot be instantiated.');
    }

    _createClass(DateHelper, null, [{
        key: 'textToDate',
        value: function textToDate(dateText) {
            if (!/\d{4}-\d{2}-\d{2}/.test(dateText)) throw new Error('The date must be in the format yyyy-mm-dd');

            return new (Function.prototype.bind.apply(Date, [null].concat(_toConsumableArray(dateText.split('-').map(function (date, index) {
                return index == 1 ? date - 1 : date;
            })))))();
        }
    }, {
        key: 'dateToText',
        value: function dateToText(date) {
            return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
        }
    }]);

    return DateHelper;
}();
//# sourceMappingURL=DateHelper.js.map