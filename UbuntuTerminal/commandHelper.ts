/** Generates mock output for a known command */
export const generateOutputForCommand = input => {
  const generateCommandHint = phrase => {
    return `The ${input} command is used to ${phrase}`;
  };
  switch (input) {
    case `ls`:
      return generateCommandHint(
        `display the available folders and files within a directory. 
        
Running "${input}" would display something like

myFileOne.text myFileTwo.Text cat.png
      `
      );

    case `mkdir`:
      return generateCommandHint(
        `create a new directory

You provide the name for the new directory and use it like this

mkdir MyPictures
        `
      );

    case `cp`:
      return generateCommandHint(
        `copy a file or directory to another location

You provide the first parameter[s] as the files/directories to be copied and the last parameter as the destination. It is used like this

cp myAwesomeFile.txt MyDocuments
        `
      );

    case `touch`:
      return generateCommandHint(
        `create a new file

You provide the name and file extension of the new file to be created. It's used like this

touch aNewDocument.txt
        `
      );

    case `cd`:
      return generateCommandHint(
        `changes the current working directory

You provide the path to the directory you want to navigate to. Additional parameters you can give are

- cd / — takes you to the root directory
- cd .. — takes you up one directory level
- cd - — takes you to the previous directory
- cd home - take you to a sub-directory of your current directory called home (if it exists)

cd home 
        `
      );

    case `sudo`:
      return generateCommandHint(
        `allows you to run programs or other commands with administrative privileges

You can enter "sudo" by itself and your terminal session will be run with administrative privileges for the whole session.

You can also use "sudo" before the command for a different program like below

sudo ls
        `
      );

    default:
      return `Oops! I don't know about the "${input}"" command`;
  }
};
