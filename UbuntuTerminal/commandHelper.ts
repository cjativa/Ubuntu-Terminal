/** Generates mock output for a known command */
export const generateOutputForCommand = input => {
  const generateCommandHint = phrase => {
    return `The ${input} command is used to ${phrase}`;
  };
  switch (input) {
    case `ls`:
      return generateCommandHint(
        `display the available folders and files within a directory. You would see something like this after running the command in an actual Ubuntu environment
myFileOne.text myFileTwo.Text cat.png
      `);

    case `mkdir`:
      return generateCommandHint(`make a directory`);

    case `cp`:
      return generateCommandHint(`copy a directory to another location`);

    default:
      return `Oops! I don't know about the "${input}"" command`;
  }
};
