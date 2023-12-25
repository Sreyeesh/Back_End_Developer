// src/commands.js

// Simulating a basic file system
const fileSystem = {
    home: {
      user: {
        documents: {
          'resume.txt': 'This is my resume.',
        },
        'hello.txt': '',
      },
    },
  };
  
  let currentPath = ['home', 'user']; // Simulating "/home/user" as the starting path
  
  // A function for each command
  const commands = {
    echo: (args) => args.join(' '),
    pwd: () => '/' + currentPath.join('/'),
    ls: () => listFiles(currentPath),
    cd: (args) => changeDirectory(args),
    cat: (args) => readFile([...currentPath, ...args]),
    touch: (args) => createFile([...currentPath, ...args[0]]),
    mkdir: (args) => createDirectory([...currentPath, ...args]),
    rm: (args) => removeFileOrDirectory([...currentPath, ...args]),
    // ... more commands ...
    help: () => 'Available commands: ' + Object.keys(commands).join(', '),
  };
  
  // Main function to process commands
  const processCommand = (input) => {
    const parts = input.trim().split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);
  
    if (commands[command]) {
      return commands[command](args);
    } else {
      return `Command not found: ${command}. Type "help" for available commands.`;
    }
  };
  
  // Utility functions for file system operations
  
  function getFolder(pathArray) {
    let dir = fileSystem;
    for (let i = 0; i < pathArray.length; i++) {
      dir = dir[pathArray[i]];
      if (!dir) {
        return null; // path does not exist
      }
    }
    return dir;
  }
  
  function listFiles(pathArray) {
    const dir = getFolder(pathArray);
    return dir ? Object.keys(dir).join('  ') : 'ls: cannot access: No such file or directory';
  }
  
  function changeDirectory(args) {
    if (args.length === 0 || args[0] === '~') {
      currentPath = ['home', 'user']; // Go to the home directory
    } else if (args[0] === '..') {
      if (currentPath.length > 1) currentPath.pop(); // Go up one directory, but not beyond root
    } else {
      // Try to change to the specified directory
      const newPath = args[0].split('/');
      const newDir = getFolder([...currentPath, ...newPath]);
      if (newDir) {
        currentPath = [...currentPath, ...newPath];
      } else {
        return `cd: no such file or directory: ${args.join(' ')}`;
      }
    }
    return ''; // No message needed on successful directory change
  }
  
  
  function readFile(pathArray) {
    const file = getFolder(pathArray); // Get the file from the simulated file system
    if (file && typeof file === 'string') { // Check if it's a file content
      return file;
    }
    return `cat: ${pathArray.join('/')}: No such file or directory`;
  }
  
  
  function createFile(pathArray) {
    const dir = getFolder(pathArray.slice(0, -1)); // Get the directory
    const fileName = pathArray[pathArray.length - 1];
    if (dir && !dir[fileName]) { // Check if file doesn't already exist
      dir[fileName] = ''; // Create an empty file
      return '';
    }
    return `touch: cannot touch '${fileName}': File exists`;
  }
  
  function createDirectory(pathArray) {
    const parentPath = pathArray.slice(0, -1); // Get the path of the parent directory
    const newDirName = pathArray[pathArray.length - 1]; // The new directory name is the last part of pathArray
  
    const parentDir = getFolder(parentPath); // Get the parent directory from the file system
    if (!parentDir) {
      return `mkdir: cannot create directory '${newDirName}': No such file or directory`;
    }
  
    if (parentDir[newDirName]) {
      return `mkdir: cannot create directory '${newDirName}': File exists`;
    }
  
    // Create the new directory
    parentDir[newDirName] = {};
    return `Created directory ${pathArray.join('/')}`;
  }
  
  
  function removeFileOrDirectory(pathArray) {
    const parentDir = getFolder(pathArray.slice(0, -1)); // Get the parent directory
    const targetName = pathArray[pathArray.length - 1];
    if (parentDir && parentDir[targetName]) { // Check if the target exists
      delete parentDir[targetName]; // Remove the file or directory
      return '';
    }
    return `rm: cannot remove '${targetName}': No such file or directory`;
  }
  
  
  // Export the processCommand function to use in your Terminal.jsx
  export default processCommand;
  