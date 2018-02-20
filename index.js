function Person(name, age) {
  this.prevStates = [];
  this.name = name;
  this.age = age;
  Object.freeze(this);
}

Person.prototype.setName = function(name) {
  this.prevStates.push({ name: this.name, age: this.age });
  var obj = Object.assign(Object.create(Person.prototype), this, {
    name: name
  });
  return obj;
};

Person.prototype.setAge = function(age) {
  this.prevStates.push({ name: this.name, age: this.age });
  var obj = Object.assign(Object.create(Person.prototype), this, { age: age });
  return obj;
};

