// src/commands.js
const processCommand = (command, setOutput) => {
    switch (command.toLowerCase()) {
      case 'help':
        return 'Available commands: about, skills, projects, contact, clear';
      case 'about':
        return 'I am a passionate developer...';
      case 'skills':
        return 'My skills include...';
      case 'projects':
        return 'Project1: ..., Project2: ...';
      case 'contact':
        return 'Contact me at: email@example.com';
      case 'clear':
        // Clear the screen
        setOutput([]);
        return '';
      default:
        return `Command not found: ${command}. Type "help" for available commands.`;
    }
  };
  
  export default processCommand;
  