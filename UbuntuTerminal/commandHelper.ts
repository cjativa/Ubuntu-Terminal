/** Generates mock output for a known command */
export const generateOutputForCommand = input => {
  const generateCommandHint = phrase => {
    return `The ${input} command is used to ${phrase}`;
  };
  switch (input) {
    case `ls`:
      return generateCommandHint(
        `display the available folders and files within a directory. 
        
You would see something like this after running the command in an actual Ubuntu environment

myFileOne.text myFileTwo.Text cat.png
      `
      );

    case `mkdir`:
      return generateCommandHint(
        `create a new directory

You use the command along with the name you want to give the directory, like this

mkdir MyPictures
        `
      );

    case `cp`:
      return generateCommandHint(
        `copy a file or directory to another location

You would use it like this to copy a file to a new location

cp myAwesomeFile.txt MyDocuments
        `
      );

    default:
      return `Oops! I don't know about the "${input}"" command`;
  }
};
