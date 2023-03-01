"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require("../DB/fakerProducts"),
    generarProducto = _require.generarProducto;

var ContenedorFake =
/*#__PURE__*/
function () {
  function ContenedorFake() {
    _classCallCheck(this, ContenedorFake);
  }

  _createClass(ContenedorFake, [{
    key: "getProd",
    value: function getProd(n) {
      var fakeProducts = [];

      for (var index = 0; index < n; index++) {
        var nuevoProd = generarProducto();
        fakeProducts.push(nuevoProd);
      }

      return fakeProducts;
    }
  }]);

  return ContenedorFake;
}();

module.exports = ContenedorFake;