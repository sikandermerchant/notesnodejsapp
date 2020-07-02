const fs = require('fs');
const chalk = require('chalk');
const {
  title
} = require('process');

//Function to load existing notes
const loadNotes = () => {
  try {
    //read the current json files
    const dataBuffer = fs.readFileSync('notes.json');
    //convert data json to string
    const dataString = dataBuffer.toString();
    return JSON.parse(dataString);
  } catch (e) {
    return [];
  }

}

//Function to save notes
const saveNotes = (notes) => {
  const dataString = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataString);
}

//Function to add a note
const addNote = (title, body) => {
  ///Read/load existing notes
  const notes = loadNotes();
  //use array filter method to check if the existing title has been taken so its not repeated. The filter() method creates a new array with all elements that pass the test implemented by the provided function.
  // const duplicateNotes = notes.filter(note => note.title === title);
  // if (duplicateNotes.length === 0) {
  //   notes.push({
  //     title: title,
  //     body: body
  //   });
  //   saveNotes(notes);
  //   console.log('New note Added');
  // } else {
  //   console.log('Note title taken!')
  // }
  //A much optimum way to look for duplicate in this case is to use the .find() rather than .filter().
  //find() will stop after it gets the first match, whereas filter() will filter each item of the array  even if it finds a match, which in this case is not ideal. Below is how we can use find method
  const duplicateNote = notes.find(note => note.title === title);
  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body
    });
    saveNotes(notes);
    console.log('New note Added');
  } else {
    console.log('Note title taken!')
  }
}
//Function to List Notes
const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.inverse('Your notes'));
  notes.forEach(note => {
    console.log(chalk.green.inverse(`${note.title}`));
  });
}
//Function to read a note
const readNote = (title) => {
  notes = loadNotes();
  const noteToBeRead = notes.find(note => note.title === title);
  if (noteToBeRead) {
    console.log(chalk.blue.inverse(`${noteToBeRead.title}`));
    console.log(`${noteToBeRead.body}`);
  } else {
    console.log(chalk.red.inverse(`No Note Found!`))
  }
}
///Function to remove a note
const removeNote = (title) => {
  //read/load existing notes
  const notes = loadNotes();
  //remove note with array filter method
  const notesAfterRemove = notes.filter(note => note.title !== title);

  if (notes.length > notesAfterRemove.length) {
    console.log(chalk.green.inverse('Note Removed'));
    saveNotes(notesAfterRemove);
  } else {
    console.log(chalk.red.inverse('Note not found'));
  }
}
//To export multiple functions we are creating an object with the property of each function to be exported
module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote
}
//used to export function 