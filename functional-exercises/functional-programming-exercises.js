"use strict";

const persons = [
  {
    name: "Pedro",
    age: 35,
    country: "ES",
    infected: true,
    pet: "Troski",
  },
  {
    name: "Elisabeth",
    age: 14,
    country: "UK",
    infected: true,
    pet: "Firulais",
  },
  {
    name: "Pablo",
    age: 25,
    country: "ES",
    infected: false,
    pet: "Berritxu",
  },
  {
    name: "Angela",
    age: 18,
    country: "DE",
    infected: false,
    pet: "Noodle",
  },
  {
    name: "Boris",
    age: 50,
    country: "UK",
    infected: true,
    pet: "Leon",
  },
  {
    name: "Donald",
    age: 69,
    country: "US",
    infected: false,
    pet: "Pence",
  },
];

const pets = [
  {
    name: "Troski",
    animal: "perro",
  },
  {
    name: "Firulais",
    animal: "perro",
  },
  {
    name: "Berritxu",
    animal: "loro",
  },
  {
    name: "Noodle",
    animal: "araña",
  },
  {
    name: "Leon",
    animal: "gato",
  },
  {
    name: "Pence",
    animal: "perro",
  },
];

const animals = [
  {
    name: "perro",
    legs: 4,
  },
  {
    name: "araña",
    legs: 8,
  },
  {
    name: "gato",
    legs: 4,
  },
  {
    name: "loro",
    legs: 2,
  },
  {
    name: "gallina",
    legs: 2,
  },
];

// Población en millones
const countries = [
  {
    code: "CN",
    name: "China",
    population: 1439,
    infected: 81999,
  },
  {
    code: "US",
    name: "Estados Unidos",
    population: 331,
    infected: 112468,
  },
  {
    code: "DE",
    name: "Alemania",
    population: 83,
    infected: 56202,
  },
  {
    code: "ES",
    name: "España",
    population: 46,
    infected: 72248,
  },
  {
    code: "UK",
    name: "Reino Unido",
    population: 67,
    infected: 17301,
  },
];

/**
 * EJERCICIOS
 */

// Número total de infectados
let totalInfected = persons.reduce((infected, person) => {
  if (person.infected) infected++;
  return infected;
}, 0);

console.log("The number of infected people is: ", totalInfected);

// Número total de sanos

let totalHealthy = persons.reduce((infected, person) => {
  if (!person.infected) infected++;
  return infected;
}, 0);

console.log("The number of healthy people is: ", totalHealthy);

// Numero total de infectados en los países (del array de países)
let countriesTotalInfected = countries.reduce(
  (infected, country) => infected + country.infected,
  0
);

console.log(
  "The total number of infected in all countries is:",
  countriesTotalInfected
);

// País con más infectados (del array de países)
let countryWithMostInfected = countries.sort((countryA, countryB) => {
  if (countryA.infected < countryB.infected) return 1;
  else if (countryA.infected > countryB.infected) return -1;
  return 0;
})[0];

console.log(
  "The country with the greatest number of infected people is: ",
  countryWithMostInfected.name
);

// Número de total de infectados del array de personas
let totalInfected2 = persons.reduce((infected, person) => {
  if (person.infected) infected++;
  return infected;
}, 0);

console.log("The number of infected people is: ", totalInfected2);

// Array con nombre de todas las mascotas
let allPets = persons.map((person) => person.pet);

console.log("These are all the pets: ", allPets);

// Array con las personas infectadas del array de personas
let allInfectedPeople = persons.filter((person) => person.infected);

console.log("These are all the infected people: ", allInfectedPeople);

// Array de españoles con perro
let dogs = pets.filter((pet) => pet.animal === "perro").map((dog) => dog.name);
let spanishDudesWithDog = persons
  .filter((person) => person.country === "ES")
  .filter((person) => dogs.includes(person.pet));

console.log(
  "These are all the Spanish dudes with a dog as a pet: ",
  spanishDudesWithDog
);

// Número de personas infectadas del array de personas
let totalInfected3 = persons.reduce((infected, person) => {
  if (person.infected) infected++;
  return infected;
}, 0);

console.log("The number of infected people is: ", totalInfected3);

// Array con las personas y el objeto de la persona tiene a mayores todos los datos de su mascota
let peopleWithPetInfo = persons.map((person) => {
  person.petSpecies = pets.find((pet) => pet.name === person.pet).animal;
  person.petLegs = animals.find(
    (animal) => animal.name === person.petSpecies
  ).legs;
  return person;
});

console.log(
  "These are the people with their pet info included: ",
  peopleWithPetInfo
);

// A partir de las personas sacar el animal que tienen más personas como mascota
let ownedPetSpecies = persons.map((person) => {
  return pets.find((pet) => pet.name === person.pet).animal;
});
let repetitionsPerSpecie = ownedPetSpecies.reduce((repetitionsPerPet, pet) => {
  repetitionsPerPet[pet] = (repetitionsPerPet[pet] || 0) + 1;
  return repetitionsPerPet;
}, {});

let maxRepetitions = Math.max(...Object.values(repetitionsPerSpecie));
let mostFrequentSpecieAsPet = Object.keys(repetitionsPerSpecie).filter(
  (specie) => repetitionsPerSpecie[specie] === maxRepetitions
)[0];

console.log(
  "The most frequent specie as a pet is the " + mostFrequentSpecieAsPet
);

// Número total de patas de las mascotas de las personas
let totalNumberOfLegsAmongAllPets = persons
  .map((person) => person.pet)
  .map((petName) => {
    return pets.find((pet) => pet.name === petName).animal;
  })
  .map((species) => {
    return animals.find((animal) => animal.name === species).legs;
  })
  .reduce((legAccumulator, numberOfLegs) => {
    return legAccumulator + numberOfLegs;
  }, 0);

console.log(
  "The total number of legs from all pets is: ",
  totalNumberOfLegsAmongAllPets
);

// Array con las personas que tienen animales de 4 patas
let selectedNumberOfLegs = 4;
let personsWith4LeggedPets = persons.filter((person) => {
  let petSpecie = pets.find((pet) => person.pet === pet.name).animal;
  let petNumberOfLegs = animals.find((animal) => (animal.name = petSpecie))
    .legs;
  return petNumberOfLegs === selectedNumberOfLegs;
});

console.log(
  "These are the people whose pet has 4 legs: ",
  personsWith4LeggedPets
);

// A partir del string 'España' obtener un array de personas no infectadas de ese país
let selectedCountry = "España";
let nonInfectedPeopleFromSpain = persons
  .filter((person) => !person.infected)
  .filter(
    (person) =>
      person.country ===
      countries.find((country) => country.name === selectedCountry).code
  );

console.log(
  "The people not infected from 'España' are: ",
  nonInfectedPeopleFromSpain
);

// Array de paises que tienen personas con loros como mascota

// Numero de infectados totales (los del objeto del país) de los paises con mascotas de ocho patas

// A partir de las personas sacar el animal que tienen más personas como mascota
