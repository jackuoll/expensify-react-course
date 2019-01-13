const person = {
  name: 'Jack',
  age: 34,
  location: {
    city: 'Auckland',
    temp: 26
  }
};

const { name, age } = person;

console.log(`${name} is ${age}.`);

const { city, temp: temperature } = person.location;
if (city && temperature){
  console.log(`It's ${temperature} in ${city}`);
}
