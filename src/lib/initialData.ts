import {
  AcademicCurriculum,
  AdminAccount,
  TeacherAccount,
  StudentAccount,
  Quiz,
  Attempt,
  Notification,
  ChatMessage,
} from '@/types';

export const academicCurriculum: AcademicCurriculum = {
  CE: {
    "First Year": ["Myanmar", "English", "Mathematics", "Physics", "Programming Language (C++)", "Digital Logic Design"],
    "Second Year": ["English", "Mathematics", "Database Management System", "Programming Language (Java)", "Data and Computer Communications", "Computer Architecture and Organization", "Electronic Devices"],
    "Third Year": ["English", "Mathematics", "Database Management System", "Data and Computer Communications", "Computer Architecture and Organization", "Electronic Devices", "System Security"],
    "Fourth Year": ["English", "Mathematics", "Network Routing and Switching", "Operating System", "Digital Signal Processing", "Embedded System", "Humanity and Social Science"],
    "Fifth Year": ["English", "Operation Research", "Artificial Intelligence", "Cryptography", "Networking", "Image Processing", "Machine Learning", "Business Strategy and IT"],
    "Sixth Year": ["Project Management", "Research Methodology", "Cloud Computing"]
  },
  IST: {
    "First Year": ["Myanmar", "English", "Mathematics", "Physics", "Data Structure", "Digital Logic Design", "Programming Language (C++)"],
    "Second Year": ["English", "Mathematics", "Data and Computer Communication", "Web Development", "Programming Language (J2SE)", "Database Management System", "Object Oriented Design with UML"],
    "Third Year": ["English", "Mathematics", "Data and Computer Communication", "Database Management System", "Operating System", "Java EE Programming", "Compiling Techniques", "Computer Architecture and Organization"],
    "Fourth Year": ["English", "Mathematics", "Humanity and Social Science", "Network Routing and Switching", "Image Processing with Matlab Programming", "Software Engineering", "Artificial Intelligence", "Object Oriented Design with UML"],
    "Fifth Year": ["English", "Programming Language (Python)", "Operations Research", "Business Strategy and IT", "Management Information System", "Authentication and System Security", "Data Mining"],
    "Sixth Year": ["Opreations Research", "Project Management", "Internet of Things", "Distributed System & Cloud Computing", "Big Data Analysis", "Programming Language"]
  },
  ECE: {
    "First Year": ["Myanmar", "English", "Mathematics", "Physics", "Engineering Circuit", "Digital Fundamental", "Technical Programming"],
    "Second Year": ["English", "Mathematics", "Engineering Mechanics (Dynamics)", "Engineering Electromagnetic", "Semiconductor Theory", "Fundamental Communication", "Analog Electronics"],
    "Third Year": ["English", "Mathematics", "Engineering Electromagnetic", "Integrated Electronics", "Modeling and Control", "Computer Communication", "Programmable Logic Controllers (PLC)"],
    "Fourth Year": ["English", "Mathematics", "Power Electronics", "Modern Control System", "Microprocessor and Microcontroller", "Telecommunication Systems", "Digital Design with HDL", "Humanity and Social Science"],
    "Fifth Year": ["English", "Digital Control System", "Digital Communication", "Microelectronics", "Digital Signal Processing", "Industrial Management", "Microwave Engineering"],
    "Sixth Year": ["Fundamental of Computer Vision System", "Wireless and Mobile Communication", "Research Methodology"]
  },
  PrE: {
    "First Year": ["Myanmar", "English", "Mathematics", "Physics", "Technical Programming", "Machine Drawing and AutoCAD"],
    "Second Year": ["English", "Mathematics", "Fundamental of Modern Manufacturing", "Engineering Machines (Dynamics)", "Strength of Materials", "Electrical Machines"],
    "Third Year": ["English", "Mathematics", "Strength of Materials", "Theory of Machines", "CNC Machining Technology (Computer Room)", "Electrical Machines", "Data Communication and Sensor Technology", "Introduction to Material Sciences and Foundary Technology"],
    "Fourth Year": ["English", "Mathematics", "CNC Machining Technology(PrE Computer Room)", "Machine Design", "Pneumatics and Hydraulics", "Microcontroller Programming Technology", "Industrial Motor Drives", "Fundamental of Thermal and Fluid Sciences", "Humanity and Social Sciences"],
    "Fifth Year": ["English", "Geometric Dimensioning and Tolerancing", "Robotic Analysis and Control", "Programmable Logic Controller", "Industrial Electronics", "Vibration and Control", "Programming MATLAB (Computer Room)", "Industrial Management"],
    "Sixth Year": ["English", "Mathematics"]
  },
  AME: {
    "First Year": ["Myanmar", "English", "Mathematics", "Machine Drawing and Auto CAD", "Technical Programming", "Applied Chemistry", "Physics", "Programming Language"],
    "Second Year": ["English", "Mathematics", "Engineering Mechanics (Dynamics)", "Analog and Digital Electronic Circuits", "Principle of Metallurgical Engineering", "Mineral Processing", "Transport Phenomena"],
    "Third Year": ["English", "Mathematics", "C++ Programming Language", "Strength of Materials", "Mineral Processing", "(Electronic, Magnetic, Photonic and Thermal Properties of Materials)", "Principle of Metal Casting", "Physical Chemistry of Metal"],
    "Fourth Year": ["English", "Mathematics", "Metallurgical Thermodynamics", "Principle of Physical Metallurgy", "Metallurgical Heat Transfer", "Nanoscience and Nanotechnology", "Humanity and Social Science"],
    "Fifth Year": ["English", "Mathematics"],
    "Sixth Year": ["English", "Mathematics"]
  }
};

export const adminAccounts: AdminAccount[] = [
  { email: 'admin@smartquiz.com', pass: 'admin123', name: 'System Admin' }
];

export const initialTeachers: TeacherAccount[] = [
  { id: 1, email: 'teacher@smartquiz.com', pass: 'teacher123', name: 'Prof. Myat', dept: 'IST Department' },
  { id: 2, email: 'teacher2@smartquiz.com', pass: 'teacher123', name: 'Daw Saw Myat', dept: 'CE Department' }
];

export const initialStudents: StudentAccount[] = [
  { id: 1, rollNo: '3IST-101', name: 'John Smith', email: 'john@mail.com', year: 'Third Year', major: 'IST', pass: 'std123', status: 'approved' },
  { id: 2, rollNo: '3CE-102', name: 'Alice Wong', email: 'alice@mail.com', year: 'Third Year', major: 'CE', pass: 'std123', status: 'approved' },
  { id: 3, rollNo: '4ECE-103', name: 'Robert Lee', email: 'robert@mail.com', year: 'Fourth Year', major: 'ECE', pass: 'std123', status: 'pending' }
];

export const initialQuizzes: Quiz[] = [
  {
    id: 1, title: 'General Knowledge Practice', year: '1st Year', major: 'IST', subject: 'General Knowledge', code: null, overallTime: 10, questionTime: 30, isPublic: true, teacherName: 'System',
    questions: [
      { id: 1, type: 'mcq', text: 'What is the capital city of Myanmar?', choices: ['Yangon', 'Mandalay', 'Naypyidaw', 'Bago'], answer: 'Naypyidaw' },
      { id: 2, type: 'tf', text: 'Pacific Ocean is the largest ocean on Earth.', choices: ['True', 'False'], answer: 'True' },
      { id: 3, type: 'blank', text: 'What is the capital city of Japan?', answer: 'Tokyo' },
      { id: 4, type: 'mcq', text: 'Which planet is the largest in our solar system?', choices: ['Earth', 'Jupiter', 'Mars', 'Venus'], answer: 'Jupiter' },
      { id: 5, type: 'tf', text: 'Australia is both a continent and a country.', choices: ['True', 'False'], answer: 'True' },
      { id: 6, type: 'mcq', text: 'Which chemical element has the symbol O?', choices: ['Gold', 'Oxygen', 'Osmium', 'Silver'], answer: 'Oxygen' },
      { id: 7, type: 'blank', text: 'What is the longest river in the world?', answer: 'Nile' },
      { id: 8, type: 'mcq', text: 'How many days are in a standard non-leap year?', choices: ['365', '366', '360', '350'], answer: '365' },
      { id: 9, type: 'tf', text: 'Sound travels faster in air than in water.', choices: ['True', 'False'], answer: 'False' },
      { id: 10, type: 'blank', text: 'What is 10 multiplied by 10?', answer: '100' }
    ]
  },
  {
    id: 2, title: 'C Programming Practice', year: '1st Year', major: 'CE', subject: 'C Programming', code: null, overallTime: 10, questionTime: 30, isPublic: true, teacherName: 'System',
    questions: [
      { id: 1, type: 'mcq', text: 'Which operator gets the memory address of a variable in C?', choices: ['&', '*', '%', '#'], answer: '&' },
      { id: 2, type: 'tf', text: 'C is an object-oriented programming language.', choices: ['True', 'False'], answer: 'False' },
      { id: 3, type: 'blank', text: 'Which function prints text to standard output in C?', answer: 'printf' },
      { id: 4, type: 'mcq', text: 'What is the default return type of main() in C?', choices: ['void', 'int', 'float', 'char'], answer: 'int' },
      { id: 5, type: 'tf', text: 'Pointers store the memory address of another variable.', choices: ['True', 'False'], answer: 'True' },
      { id: 6, type: 'mcq', text: 'Which keyword is used to declare a constant in C?', choices: ['final', 'const', 'static', 'define'], answer: 'const' },
      { id: 7, type: 'blank', text: 'What header file is required for stdio functions in C?', answer: 'stdio.h' },
      { id: 8, type: 'mcq', text: 'What is the size of int data type in standard 32-bit compiler?', choices: ['2 bytes', '4 bytes', '8 bytes', '1 byte'], answer: '4 bytes' },
      { id: 9, type: 'tf', text: 'Arrays in C are zero-indexed.', choices: ['True', 'False'], answer: 'True' },
      { id: 10, type: 'mcq', text: 'Which loop is guaranteed to execute at least once?', choices: ['for', 'while', 'do-while', 'foreach'], answer: 'do-while' }
    ]
  },
  {
    id: 3, title: 'Computer Architecture & Organization', year: '2nd Year', major: 'CE', subject: 'Computer Architecture', code: null, overallTime: 10, questionTime: 30, isPublic: true, teacherName: 'System',
    questions: [
      { id: 1, type: 'mcq', text: 'What does CPU stand for?', choices: ['Central Processing Unit', 'Central Power Unit', 'Computer Process Unit', 'Core Processing Utility'], answer: 'Central Processing Unit' },
      { id: 2, type: 'tf', text: 'RAM is volatile memory.', choices: ['True', 'False'], answer: 'True' },
      { id: 3, type: 'blank', text: 'What fast memory sits between CPU and main RAM?', answer: 'Cache' },
      { id: 4, type: 'mcq', text: 'Which register holds the memory address of next instruction?', choices: ['Instruction Register', 'Program Counter', 'Accumulator', 'Buffer Register'], answer: 'Program Counter' },
      { id: 5, type: 'tf', text: 'RISC stands for Reduced Instruction Set Computer.', choices: ['True', 'False'], answer: 'True' },
      { id: 6, type: 'mcq', text: 'Which bus transfers memory addresses from CPU to RAM?', choices: ['Data Bus', 'Address Bus', 'Control Bus', 'System Bus'], answer: 'Address Bus' },
      { id: 7, type: 'blank', text: 'Binary system uses base number ___.', answer: '2' },
      { id: 8, type: 'mcq', text: 'ALU performs which types of operations?', choices: ['Arithmetic & Logic', 'Audio & Video', 'Disk I/O', 'Network Routing'], answer: 'Arithmetic & Logic' },
      { id: 9, type: 'tf', text: 'ROM loses its data when powered off.', choices: ['True', 'False'], answer: 'False' },
      { id: 10, type: 'mcq', text: 'What is pipelining in computer architecture?', choices: ['Overlapping instruction execution', 'Data compression', 'Cooling system', 'Power saving'], answer: 'Overlapping instruction execution' }
    ]
  },
  {
    id: 4, title: 'Data & Computer Communication', year: '2nd Year', major: 'ECE', subject: 'Data Communication', code: null, overallTime: 10, questionTime: 30, isPublic: true, teacherName: 'System',
    questions: [
      { id: 1, type: 'mcq', text: 'How many layers are in the OSI Model?', choices: ['5', '6', '7', '4'], answer: '7' },
      { id: 2, type: 'tf', text: 'TCP is a connection-oriented protocol.', choices: ['True', 'False'], answer: 'True' },
      { id: 3, type: 'blank', text: 'What protocol resolves IP addresses to MAC addresses?', answer: 'ARP' },
      { id: 4, type: 'mcq', text: 'What is the full form of IP in computer networks?', choices: ['Internet Protocol', 'Internal Process', 'Interconnected Path', 'Interface Protocol'], answer: 'Internet Protocol' },
      { id: 5, type: 'tf', text: 'UDP provides reliable connection with error checking.', choices: ['True', 'False'], answer: 'False' },
      { id: 6, type: 'mcq', text: 'Which device operates at Layer 3 (Network Layer)?', choices: ['Hub', 'Switch', 'Router', 'Repeater'], answer: 'Router' },
      { id: 7, type: 'blank', text: 'Standard HTTP port number is ___.', answer: '80' },
      { id: 8, type: 'mcq', text: 'Which topology connects all nodes to a central hub?', choices: ['Ring', 'Star', 'Bus', 'Mesh'], answer: 'Star' },
      { id: 9, type: 'tf', text: 'IPv6 addresses are 128 bits long.', choices: ['True', 'False'], answer: 'True' },
      { id: 10, type: 'mcq', text: 'What does Bandwidth measure?', choices: ['Data transfer capacity', 'Network distance', 'Server size', 'Cable length'], answer: 'Data transfer capacity' }
    ]
  },
  {
    id: 5, title: 'Java Programming Practice', year: '2nd Year', major: 'IST', subject: 'Java Programming', code: null, overallTime: 10, questionTime: 30, isPublic: true, teacherName: 'System',
    questions: [
      { id: 1, type: 'mcq', text: 'What converts Java bytecode to machine code?', choices: ['JVM', 'JDK', 'JRE', 'Compiler'], answer: 'JVM' },
      { id: 2, type: 'tf', text: 'Java supports multiple inheritance through classes.', choices: ['True', 'False'], answer: 'False' },
      { id: 3, type: 'blank', text: 'Which keyword is used to inherit a class in Java?', answer: 'extends' },
      { id: 4, type: 'mcq', text: 'Which collection class maintains unique elements in Java?', choices: ['List', 'Set', 'Map', 'ArrayList'], answer: 'Set' },
      { id: 5, type: 'tf', text: 'String objects in Java are immutable.', choices: ['True', 'False'], answer: 'True' },
      { id: 6, type: 'mcq', text: 'Which keyword prevents a method from being overridden?', choices: ['static', 'abstract', 'final', 'private'], answer: 'final' },
      { id: 7, type: 'blank', text: 'Java source code files have extension .___', answer: 'java' },
      { id: 8, type: 'mcq', text: 'Which of these is NOT a primitive data type in Java?', choices: ['int', 'boolean', 'String', 'double'], answer: 'String' },
      { id: 9, type: 'tf', text: 'Garbage Collection automatically frees memory in Java.', choices: ['True', 'False'], answer: 'True' },
      { id: 10, type: 'mcq', text: 'Which block handles exceptions in Java?', choices: ['try-catch', 'do-while', 'import', 'package'], answer: 'try-catch' }
    ]
  },
  {
    id: 6, title: 'Compiling Techniques Practice', year: '3rd Year', major: 'IST', subject: 'Compiling Techniques', code: null, overallTime: 10, questionTime: 30, isPublic: true, teacherName: 'System',
    questions: [
      { id: 1, type: 'mcq', text: 'What is the first phase of a compiler?', choices: ['Lexical Analysis', 'Syntax Analysis', 'Semantic Analysis', 'Code Generation'], answer: 'Lexical Analysis' },
      { id: 2, type: 'tf', text: 'Lexical analyzer converts source code into tokens.', choices: ['True', 'False'], answer: 'True' },
      { id: 3, type: 'blank', text: 'What tree structure is generated during syntax analysis?', answer: 'Parse Tree' },
      { id: 4, type: 'mcq', text: 'Which tool generates lexical analyzers?', choices: ['YACC', 'LEX', 'GCC', 'GDB'], answer: 'LEX' },
      { id: 5, type: 'tf', text: 'Interpreters compile entire program before execution.', choices: ['True', 'False'], answer: 'False' },
      { id: 6, type: 'mcq', text: 'Symbol table manages what information?', choices: ['Variable names & data types', 'Disk files', 'CPU speeds', 'RAM allocation'], answer: 'Variable names & data types' },
      { id: 7, type: 'blank', text: 'Grammar with multiple parse trees for same string is ___', answer: 'ambiguous' },
      { id: 8, type: 'mcq', text: 'What is intermediate code generation used for?', choices: ['Machine independence', 'Fast compilation', 'Graphics', 'Formatting'], answer: 'Machine independence' },
      { id: 9, type: 'tf', text: 'Dead code elimination is a compiler optimization technique.', choices: ['True', 'False'], answer: 'True' },
      { id: 10, type: 'mcq', text: 'Which parser reads input left-to-right constructing rightmost derivation?', choices: ['LL Parser', 'LR Parser', 'Recursive Parser', 'Shift Parser'], answer: 'LR Parser' }
    ]
  },
  {
    id: 7, title: 'Database Management System (DBMS)', year: '2nd Year', major: 'IST', subject: 'Database Management System', code: null, overallTime: 10, questionTime: 30, isPublic: true, teacherName: 'System',
    questions: [
      { id: 1, type: 'mcq', text: 'What does SQL stand for?', choices: ['Structured Query Language', 'Sequential Query Logic', 'System Query Language', 'Standard Question List'], answer: 'Structured Query Language' },
      { id: 2, type: 'tf', text: 'Primary Key can contain NULL values.', choices: ['True', 'False'], answer: 'False' },
      { id: 3, type: 'blank', text: 'Which SQL command retrieves data from a table?', answer: 'SELECT' },
      { id: 4, type: 'mcq', text: 'Which transaction property ensures all-or-nothing completion?', choices: ['Atomicity', 'Consistency', 'Isolation', 'Durability'], answer: 'Atomicity' },
      { id: 5, type: 'tf', text: 'Foreign key enforces referential integrity.', choices: ['True', 'False'], answer: 'True' },
      { id: 6, type: 'mcq', text: 'Which normal form eliminates partial dependency?', choices: ['1NF', '2NF', '3NF', 'BCNF'], answer: '2NF' },
      { id: 7, type: 'blank', text: 'Which SQL clause filters records after GROUP BY?', answer: 'HAVING' },
      { id: 8, type: 'mcq', text: 'Which JOIN returns matching records from both tables?', choices: ['LEFT JOIN', 'INNER JOIN', 'RIGHT JOIN', 'FULL JOIN'], answer: 'INNER JOIN' },
      { id: 9, type: 'tf', text: 'MongoDB is a relational database.', choices: ['True', 'False'], answer: 'False' },
      { id: 10, type: 'mcq', text: 'Which command deletes all records without logging individual rows?', choices: ['DELETE', 'DROP', 'TRUNCATE', 'REMOVE'], answer: 'TRUNCATE' }
    ]
  },
  {
    id: 8, title: 'Operating System (OS) Practice', year: '3rd Year', major: 'IST', subject: 'Operating System', code: null, overallTime: 10, questionTime: 30, isPublic: true, teacherName: 'System',
    questions: [
      { id: 1, type: 'mcq', text: 'What is the core program of an Operating System?', choices: ['Kernel', 'Shell', 'Driver', 'GUI'], answer: 'Kernel' },
      { id: 2, type: 'tf', text: 'Deadlock happens when processes wait indefinitely.', choices: ['True', 'False'], answer: 'True' },
      { id: 3, type: 'blank', text: 'What memory uses hard disk as virtual extension of RAM?', answer: 'Virtual Memory' },
      { id: 4, type: 'mcq', text: 'Which scheduling algorithm is First-Come First-Served?', choices: ['FCFS', 'SJF', 'Round Robin', 'Priority'], answer: 'FCFS' },
      { id: 5, type: 'tf', text: 'Paging suffers from external fragmentation.', choices: ['True', 'False'], answer: 'False' },
      { id: 6, type: 'mcq', text: 'What is a lightweight process called?', choices: ['Thread', 'Task', 'Daemon', 'Fork'], answer: 'Thread' },
      { id: 7, type: 'blank', text: 'What system call creates a new process in Unix?', answer: 'fork' },
      { id: 8, type: 'mcq', text: 'Which algorithm is used to avoid deadlocks?', choices: ['Banker Algorithm', 'Dijkstra Algorithm', 'LRU Algorithm', 'Round Robin'], answer: 'Banker Algorithm' },
      { id: 9, type: 'tf', text: 'Semaphores are used for process synchronization.', choices: ['True', 'False'], answer: 'True' },
      { id: 10, type: 'mcq', text: 'What causes thrashing in OS?', choices: ['Excessive page swapping', 'High CPU speed', 'Virus attack', 'Disk corruption'], answer: 'Excessive page swapping' }
    ]
  },
  {
    id: 9, title: 'Professional English Practice', year: '1st Year', major: 'PrE', subject: 'English', code: null, overallTime: 10, questionTime: 30, isPublic: true, teacherName: 'System',
    questions: [
      { id: 1, type: 'mcq', text: 'Identify synonym for "Efficient":', choices: ['Productive', 'Lazy', 'Slow', 'Clumsy'], answer: 'Productive' },
      { id: 2, type: 'tf', text: 'A resume should highlight relevant skills and achievements.', choices: ['True', 'False'], answer: 'True' },
      { id: 3, type: 'blank', text: 'Fill in blank: "Please find ___ my updated resume."', answer: 'attached' },
      { id: 4, type: 'mcq', text: 'Formal salutation for business letter to unknown recipient?', choices: ['Dear Sir/Madam,', 'Hey buddy,', 'Hi there,', 'Hello friend,'], answer: 'Dear Sir/Madam,' },
      { id: 5, type: 'tf', text: '"Irregardless" is standard formal English word.', choices: ['True', 'False'], answer: 'False' },
      { id: 6, type: 'mcq', text: 'Antonym of "Transparent":', choices: ['Opaque', 'Clear', 'Lucid', 'Open'], answer: 'Opaque' },
      { id: 7, type: 'blank', text: 'Complete phrase: "Looking forward to ___ from you."', answer: 'hearing' },
      { id: 8, type: 'mcq', text: 'Which word describes concise and clear writing?', choices: ['Succinct', 'Verbose', 'Wordy', 'Vague'], answer: 'Succinct' },
      { id: 9, type: 'tf', text: 'Proofreading is checking for errors before publishing.', choices: ['True', 'False'], answer: 'True' },
      { id: 10, type: 'mcq', text: 'What does ETA stand for in workplace communication?', choices: ['Estimated Time of Arrival', 'Exact Time Allocation', 'Emergency Task', 'Email Assistant'], answer: 'Estimated Time of Arrival' }
    ]
  },
  {
    id: 10, title: 'Web Development (HTML, CSS, JS)', year: '2nd Year', major: 'IST', subject: 'Web Development', code: null, overallTime: 10, questionTime: 30, isPublic: true, teacherName: 'System',
    questions: [
      { id: 1, type: 'mcq', text: 'Which HTML tag creates a hyper-link?', choices: ['<a>', '<link>', '<href>', '<url>'], answer: '<a>' },
      { id: 2, type: 'tf', text: 'CSS stands for Cascading Style Sheets.', choices: ['True', 'False'], answer: 'True' },
      { id: 3, type: 'blank', text: 'Which JS keyword declares block-scoped constant?', answer: 'const' },
      { id: 4, type: 'mcq', text: 'Which DOM method selects element by ID?', choices: ['getElementById', 'querySelector', 'getElementsByClass', 'getElement'], answer: 'getElementById' },
      { id: 5, type: 'tf', text: 'JavaScript is a statically typed language.', choices: ['True', 'False'], answer: 'False' },
      { id: 6, type: 'mcq', text: 'Which CSS property changes text color?', choices: ['color', 'font-color', 'text-style', 'background-color'], answer: 'color' },
      { id: 7, type: 'blank', text: 'What HTTP status code represents "Not Found"?', answer: '404' },
      { id: 8, type: 'mcq', text: 'Which array method adds element to end of array in JS?', choices: ['push()', 'pop()', 'shift()', 'unshift()'], answer: 'push()' },
      { id: 9, type: 'tf', text: 'Flexbox is used for 1-dimensional layouts.', choices: ['True', 'False'], answer: 'True' },
      { id: 10, type: 'mcq', text: 'Which protocol is secure version of HTTP?', choices: ['HTTPS', 'FTP', 'SSH', 'SMTP'], answer: 'HTTPS' }
    ]
  },
  {
    id: 11, title: 'Data Structures & Algorithms (DSA)', year: '1st Year', major: 'IST', subject: 'Data Structures and Algorithms', code: null, overallTime: 10, questionTime: 30, isPublic: true, teacherName: 'System',
    questions: [
      { id: 1, type: 'mcq', text: 'Which data structure follows LIFO?', choices: ['Stack', 'Queue', 'Array', 'Linked List'], answer: 'Stack' },
      { id: 2, type: 'tf', text: 'Binary Search requires array to be sorted.', choices: ['True', 'False'], answer: 'True' },
      { id: 3, type: 'blank', text: 'Average time complexity of Quick Sort? (e.g. O(n log n))', answer: 'O(n log n)' },
      { id: 4, type: 'mcq', text: 'Which data structure uses FIFO?', choices: ['Queue', 'Stack', 'Tree', 'Graph'], answer: 'Queue' },
      { id: 5, type: 'tf', text: 'A tree with no cycles is a Graph.', choices: ['True', 'False'], answer: 'True' },
      { id: 6, type: 'mcq', text: 'Worst-case time complexity of Linear Search?', choices: ['O(n)', 'O(1)', 'O(log n)', 'O(n^2)'], answer: 'O(n)' },
      { id: 7, type: 'blank', text: 'In BST, left child is always ___ than parent.', answer: 'smaller' },
      { id: 8, type: 'mcq', text: 'Which algorithm finds shortest path in weighted graph?', choices: ['Dijkstra Algorithm', 'Kruskal Algorithm', 'Prim Algorithm', 'BFS'], answer: 'Dijkstra Algorithm' },
      { id: 9, type: 'tf', text: 'Hash tables offer O(1) average lookup time.', choices: ['True', 'False'], answer: 'True' },
      { id: 10, type: 'mcq', text: 'What is recursion?', choices: ['A function calling itself', 'Looping infinitely', 'Memory allocation', 'Sorting technique'], answer: 'A function calling itself' }
    ]
  },
  {
    id: 12, title: 'Computer Science Fundamentals', year: '1st Year', major: 'AME', subject: 'Computer Science Fundamentals', code: null, overallTime: 10, questionTime: 30, isPublic: true, teacherName: 'System',
    questions: [
      { id: 1, type: 'mcq', text: 'How many bits make 1 byte?', choices: ['8', '4', '16', '32'], answer: '8' },
      { id: 2, type: 'tf', text: 'Hexadecimal system uses base 16.', choices: ['True', 'False'], answer: 'True' },
      { id: 3, type: 'blank', text: 'What does ASCII stand for? (First word)', answer: 'American' },
      { id: 4, type: 'mcq', text: 'Which component is considered brain of computer?', choices: ['CPU', 'Hard Drive', 'RAM', 'GPU'], answer: 'CPU' },
      { id: 5, type: 'tf', text: 'Software refers to physical parts of a computer.', choices: ['True', 'False'], answer: 'False' },
      { id: 6, type: 'mcq', text: 'Which logic gate outputs TRUE only when both inputs are TRUE?', choices: ['AND', 'OR', 'NOT', 'XOR'], answer: 'AND' },
      { id: 7, type: 'blank', text: '1 Kilobyte (KB) equals ___ bytes.', answer: '1024' },
      { id: 8, type: 'mcq', text: 'Who is known as Father of Modern Computer Science?', choices: ['Alan Turing', 'Charles Babbage', 'Bill Gates', 'Steve Jobs'], answer: 'Alan Turing' },
      { id: 9, type: 'tf', text: 'Linux is an open-source operating system.', choices: ['True', 'False'], answer: 'True' },
      { id: 10, type: 'mcq', text: 'Which device displays graphical output to users?', choices: ['Monitor', 'Keyboard', 'Mouse', 'Scanner'], answer: 'Monitor' }
    ]
  },
  {
    id: 102, title: 'Database Management System Midterm Exam', year: 'Third Year', major: 'IST', subject: 'Database Management System', code: '849201', overallTime: 10, questionTime: 30, startTime: '2026-08-01T08:00', endTime: '2026-08-30T23:59', isPublic: false, teacherName: 'Prof. Myat',
    questions: [
      { id: 1, type: 'mcq', text: 'What does SQL stand for?', choices: ['Structured Query Language', 'Sequential Query Logic', 'System Query Language', 'Standard Question List'], answer: 'Structured Query Language' },
      { id: 2, type: 'tf', text: 'Primary Key can contain NULL values.', choices: ['True', 'False'], answer: 'False' },
      { id: 3, type: 'blank', text: 'Which SQL command is used to retrieve data from a table?', answer: 'SELECT' }
    ]
  }
];

export const initialAttempts: Attempt[] = [
  { quizId: 102, studentRoll: '3IST-101', studentName: 'John Smith', score: 3, total: 3, status: 'submitted', submittedAt: '2026-08-01 10:15' }
];

export const initialNotifications: Notification[] = [
  { id: 1, targetYear: 'Third Year', targetMajor: 'IST', quizId: 102, title: '3rd Year IST: DBMS Exam Published!', message: 'Prof. Myat uploaded DBMS Midterm Exam for 3rd Year IST. Code: 849201. Schedule window active.', date: '2026-08-01' }
];

export const initialChatMessages: ChatMessage[] = [
  {
    id: 1,
    senderName: 'System Admin',
    role: 'admin',
    message: 'Welcome to Smart Quiz System Community Hub! Official exam updates and schedule changes will be announced here.',
    timestamp: '10:00 AM',
    isAnnouncement: true,
    isPinned: true
  },
  {
    id: 2,
    senderName: 'Prof. Myat',
    role: 'teacher',
    message: 'Attention 3rd Year IST students: The DBMS exam code is 849201. Make sure to complete it before August 30.',
    timestamp: '10:15 AM',
    isAnnouncement: false,
    isPinned: false
  },
  {
    id: 3,
    senderName: 'John Smith',
    role: 'student',
    message: 'Thank you Professor! Are practice quizzes open for unlimited attempts?',
    timestamp: '10:20 AM',
    isAnnouncement: false,
    isPinned: false
  }
];
