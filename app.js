// const add = require('./utils.js');
// const sum = add(4, 3);
// console.log(sum);
// const validator = require('validator');
const chalk = require("chalk");
const yargs = require("yargs");
const notes = require("./notes"); //require all exported function from notes.js
const {
  argv
} = require("yargs");

// const msg = getNotes();
// console.log(msg);
// console.log(chalk.bold.inverse.red("Error"));
// console.log(process.argv);
// ///https:/ / The process.argv property returns an array containing the command line arguments passed when the Node.js process was launched.
// //nodejs.org/docs/latest/api/process.html#process_process_argv/
// console.log(yargs.argv);
// const command = process.argv;
// if (command === "add") {
//   console.log("Adding note...");
// } else if (command === "remove") {
//   console.log("Removing note....");
// }

//e.g to use yargs - Customize yargs version
yargs.version("1.1.0");

//Create add command
yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string"
    },
    body: {
      describe: "This is the note that I want to add",
      demandOption: true,
      type: "string"
    },
  },
  handler(argv) {
    notes.addNote(argv.title, argv.body);
  },
});

///Create remove command
yargs.command({
  command: "remove",
  describe: "Remove a note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: 'string'
    },
  },
  handler(argv) {
    notes.removeNote(argv.title);
  },
});

//Create a list command
yargs.command({
  command: "list",
  describe: "List notes",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: 'string'
    },
  },
  handler(argv) {
    notes.listNotes(argv.title);
  },
});

//Create a read command
yargs.command({
  command: "read",
  describe: "Read a note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: 'string'
    },
  },
  handler(argv) {
    notes.readNote(argv.title, argv.body);
  },
});
//add, remove, read, list are the various commands (actions) we want to do to the notes

// console.log(yargs.argv);
///If we don't want to console log as the o/p is printed twice on the console, once for the command handler and then for the console.log above then we just parse the yargs
yargs.parse(); ///this parses all the configuration details that has been passed through the command