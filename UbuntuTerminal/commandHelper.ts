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

    default:
      return `Oops! I don't know about the "${input}"" command`;
  }
};
