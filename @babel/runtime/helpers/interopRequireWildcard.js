var _typeof = require("./typeof");
function _getRequireWildcardCache() {
  if ("function" != typeof WeakMap) return null;
  var e = new WeakMap();
  return (
    (_getRequireWildcardCache = function () {
      return e;
    }),
    e
  );
}
function _interopRequireWildcard(e) {
  if (e && e.__esModule) return e;
  if (null === e || ("object" !== _typeof(e) && "function" != typeof e))
    return { default: e };
  var r = _getRequireWildcardCache();
  if (r && r.has(e)) return r.get(e);
  var t = {},
    n = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var i in e)
    if (Object.prototype.hasOwnProperty.call(e, i)) {
      var o = n ? Object.getOwnPropertyDescriptor(e, i) : null;
      o && (o.get || o.set) ? Object.defineProperty(t, i, o) : (t[i] = e[i]);
    }
  return (t.default = e), r && r.set(e, t), t;
}
module.exports = _interopRequireWildcard;
