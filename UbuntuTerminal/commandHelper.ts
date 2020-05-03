/** Generates mock output for a known command */
export const generateOutputForCommand = command => {
  const matchedCommand = supportedCommands.find(
    sCommand => sCommand.command === command
  );

  if (matchedCommand) {
    return `The command "${command}" is used to ${matchedCommand.instruction}`;
  }

  return `Oops! I don't know about the "${command}" command. Enter "help" for the list of supported commands`;
};

const supportedCommands = [
  {
    command: "ls",
    instruction: `display the available folders and files within a directory. 
        
Running "ls" would display something like

myFileOne.text myFileTwo.Text cat.png
      `
  },
  {
    command: "mkdir",
    instruction: `create a new directory.

You provide the name for the new directory and use it like this.

mkdir MyPictures
        `
  },
  {
    command: "cp",
    instruction: `copy a file or directory to another location.

You provide the first parameter[s] as the files/directories to be copied and the last parameter as the destination. It is used like this

cp myAwesomeFile.txt MyDocuments
        `
  },
  {
    command: "touch",
    instruction: `create a new file.

You provide the name and file extension of the new file to be created. It's used like this.

touch aNewDocument.txt
        `
  },
  {
    command: "cd",
    instruction: `changes the current working directory.

You provide the path to the directory you want to navigate to. Additional parameters you can give are.

- cd / — takes you to the root directory
- cd .. — takes you up one directory level
- cd - — takes you to the previous directory
- cd home - take you to a sub-directory of your current directory called home (if it exists)

cd home 
        `
  },
  {
    command: "sudo",
    instruction: `allows you to run programs or other commands with administrative privileges.

You can enter "sudo" by itself and your terminal session will be run with administrative privileges for the whole session.

You can also use "sudo" before the command for a different program like below.

sudo ls
        `
  },
  {
    command: "pwd",
    instruction: `prints the full path of the current directory. You run the command by itself and it'll display the path.

pwd
/home/ubuntu/My Current Directory
        `
  },
  {
    command: "mv",
    instruction: `moves files and folders from one location to another. 
        
You can use the command like this to move a file "myCoolFile.txt" to the location "/home/myFiles".

mv myCoolFile.txt /home/myFiles
        `
  },
  {
    command: "rm",
    instruction: `removes the specified file or directory.
        
You can use it in the following ways

rmdir — removes an empty directory
rm -r — removes a directory recursively along with its contents

rm myFileToBeDeleted.csv
        `
  },
  {
    command: "df",
    instruction: `displays information on the disk space usage of the mounted file systems.
        
Using it would display something like the following

Filesystem    1K-blocks Used      Available  Use% Mounted on
rootfs        998812668 214202792 784609876  22%  /
none          998812668 214202792 784609876  22%  /dev
        `
  },
  {
    command: "clear",
    instruction: `clears the terminal of any previously entered input.`
  }
];
