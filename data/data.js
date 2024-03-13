const persons = require('./persons.json');

function searchPersonByMail(email) {
  const trimmedEmail = email.trim().toLowerCase(); 
  const personFound = persons.find(person => person.email.trim().toLowerCase() === trimmedEmail);
  return personFound ? personFound : "ERROR";
}

module.exports = searchPersonByMail;
