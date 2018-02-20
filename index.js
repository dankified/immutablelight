//The Immutable constructor function will take a constructor function and wrap it with immutable properties
//It will travel the prototype chain until it finds the base prototype (the one before Object) and it will assign
//that prototype to inherit from immutable
function Immutable(ConstructorFunc) {
	return function() {
		ConstructorFunc.call(this, ...arguments);
		Object.defineProperty(this, 'previousStates', {
			value: [],
			writable: false,
			enumerable: false
		});
		Object.freeze(this);
	}
}

function Person(name, age) {
	this.name = name;
	this.age = age;
}




// Person.prototype.setName = function(name) {
//   this.prevStates.push({ name: this.name, age: this.age });
//   var obj = Object.assign(Object.create(Person.prototype), this, {
//     name: name
//   });
//   return obj;
// };

// Person.prototype.setAge = function(age) {
//   this.prevStates.push({ name: this.name, age: this.age });
//   var obj = Object.assign(Object.create(Person.prototype), this, { age: age });
//   return obj;
// };