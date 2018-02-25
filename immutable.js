/*
The Immutable function is a decorator that will take a constructor function add the immutable functionality to it and return the decorated function, so next time you create a new object from that constructor function, the resulting object will have immutable properties.
*/
module.exports = function Immutable(ConstructorFunc) {
  return function() {
    ConstructorFunc.call(this, ...arguments);
    if (!this.hasOwnProperty("previousStates")) {
      Object.defineProperty(this, "previousStates", {
        value: [],
        writable: false,
        enumerable: false
      });
    }
    for (var key in this) {
      createSetter.call(this, key, this);
    }

    Object.freeze(this);
    return this;
  };
};

function createSetter(key, obj) {
  cappedKey = key.charAt(0).toUpperCase() + key.slice(1);
  var objProto = Object.getPrototypeOf(obj);
  if (!objProto.hasOwnProperty(`set${cappedKey}`)) {
    objProto[`set${cappedKey}`] = function(value) {
      obj.previousStates.push(createState.call(obj));
      var rootObj = Object.create(objProto);
      var newObj = Object.assign(rootObj, obj, {name: "Jose"});
       newObj.previousStates = obj.previousStates;
      return newObj;
    };
  }
}

function createState() {
  var obj = {};
  for (var key in this) {
    if (this.hasOwnProperty(`${key}`)) {
      Object.defineProperty(obj, key, {
        value: this[key]
      });
    }
  }
  return obj;
}
