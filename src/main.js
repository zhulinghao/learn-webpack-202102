// 通过 CommonJS 规范导入 show 函数
// const show = require('./show.js');
import show from './show.js'
import './css/index.css'

class Person {
  constructor({ name, age }) {
    this.name = name
    this.age = age
  }
  sayInfo() {
    console.log(`my name is ${this.name}, i am ${this.age} years old`);
  }
}

const person = new Person({ name: 'zlh', age: 3333 })
console.log(person.sayInfo())
// 执行 show 函数
show('Webpack');