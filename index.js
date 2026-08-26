// ==================== GLOBAL APP STATE & ALL MAJORS/YEARS ACADEMIC DATABASE ====================

// Session State
let currentUser = {
    role: 'guest', // 'guest', 'student', 'teacher', 'admin'
    id: null,
    name: 'Guest User',
    email: null,
    year: null,
    major: null,
    rollNo: null
};

// ACADEMIC CURRICULUM DATABASE FOR ALL MAJORS & YEARS
const academicCurriculum = {
    "CE": {
        "First Year": ["Myanmar", "English", "Mathematics", "Physics", "Programming Language (C++)", "Digital Logic Design"],
        "Second Year": ["English", "Mathematics", "Database Management System", "Programming Language (Java)", "Data and Computer Communications", "Computer Architecture and Organization", "Electronic Devices"],
        "Third Year": ["English", "Mathematics", "Database Management System", "Data and Computer Communications", "Computer Architecture and Organization", "Electronic Devices", "System Security"],
        "Fourth Year": ["English", "Mathematics", "Network Routing and Switching", "Operating System", "Digital Signal Processing", "Embedded System", "Humanity and Social Science"],
        "Fifth Year": ["English", "Operation Research", "Artificial Intelligence", "Cryptography", "Networking", "Image Processing", "Machine Learning", "Business Strategy and IT"],
        "Sixth Year": ["Project Management", "Research Methodology", "Cloud Computing"]
    },
    "IST": {
        "First Year": ["Myanmar", "English", "Mathematics", "Physics", "Data Structure", "Digital Logic Design", "Programming Language (C++)"],
        "Second Year": ["English", "Mathematics", "Data and Computer Communication", "Web Development", "Programming Language (J2SE)", "Database Management System", "Object Oriented Design with UML"],
        "Third Year": ["English", "Mathematics", "Data and Computer Communication", "Database Management System", "Operating System", "Java EE Programming", "Compiling Techniques", "Computer Architecture and Organization"],
        "Fourth Year": ["English", "Mathematics", "Humanity and Social Science", "Network Routing and Switching", "Image Processing with Matlab Programming", "Software Engineering", "Artificial Intelligence", "Object Oriented Design with UML"],
        "Fifth Year": ["English", "Programming Language (Python)", "Operations Research", "Business Strategy and IT", "Management Information System", "Authentication and System Security", "Data Mining"],
        "Sixth Year": ["Opreations Research", "Project Management", "Internet of Things", "Distributed System & Cloud Computing", "Big Data Analysis", "Programming Language"]
    },
    "ECE": {
        "First Year": ["Myanmar", "English", "Mathematics", "Physics", "Engineering Circuit", "Digital Fundamental", "Technical Programming"],
        "Second Year": ["English", "Mathematics", "Engineering Mechanics (Dynamics)", "Engineering Electromagnetic", "Semiconductor Theory", "Fundamental Communication", "Analog Electronics"],
        "Third Year": ["English", "Mathematics", "Engineering Electromagnetic", "Integrated Electronics", "Modeling and Control", "Computer Communication", "Programmable Logic Controllers (PLC)"],
        "Fourth Year": ["English", "Mathematics", "Power Electronics", "Modern Control System", "Microprocessor and Microcontroller", "Telecommunication Systems", "Digital Design with HDL", "Humanity and Social Science"],
        "Fifth Year": ["English", "Digital Control System", "Digital Communication", "Microelectronics", "Digital Signal Processing", "Industrial Management", "Microwave Engineering"],
        "Sixth Year": ["Fundamental of Computer Vision System", "Wireless and Mobile Communication", "Research Methodology"]
    },
    "PrE": {
        "First Year": ["Myanmar", "English", "Mathematics", "Physics", "Technical Programming", "Machine Drawing and AutoCAD"],
        "Second Year": ["English", "Mathematics", "Fundamental of Modern Manufacturing", "Engineering Machines (Dynamics)", "Strength of Materials", "Electrical Machines"],
        "Third Year": ["English", "Mathematics", "Strength of Materials", "Theory of Machines", "CNC Machining Technology (Computer Room)", "Electrical Machines", "Data Communication and Sensor Technology", "Introduction to Material Sciences and Foundary Technology"],
        "Fourth Year": ["English", "Mathematics", "CNC Machining Technology(PrE Computer Room)", "Machine Design", "Pneumatics and Hydraulics", "Microcontroller Programming Technology", "Industrial Motor Drives", "Fundamental of Thermal and Fluid Sciences", "Humanity and Social Sciences"],
        "Fifth Year": ["English", "Geometric Dimensioning and Tolerancing", "Robotic Analysis and Control", "Programmable Logic Controller", "Industrial Electronics", "Vibration and Control", "Programming MATLAB (Computer Room)", "Industrial Management"],
        "Sixth Year": ["English", "Mathematics"]
    },
    "AME": {
        "First Year": ["Myanmar", "English", "Mathematics", "Machine Drawing and Auto CAD", "Technical Programming", "Applied Chemistry", "Physics", "Programming Language"],
        "Second Year": ["English", "Mathematics", "Engineering Mechanics (Dynamics)", "Analog and Digital Electronic Circuits", "Principle of Metallurgical Engineering", "Mineral Processing", "Transport Phenomena"],
        "Third Year": ["English", "Mathematics", "C++ Programming Language", "Strength of Materials", "Mineral Processing", "(Electronic, Magnetic, Photonic and Thermal Properties of Materials)", "Principle of Metal Casting", "Physical Chemistry of Metal"],
        "Fourth Year": ["English", "Mathematics", "Metallurgical Thermodynamics", "Principle of Physical Metallurgy", "Metallurgical Heat Transfer", "Nanoscience and Nanotechnology", "Humanity and Social Science"],
        "Fifth Year": ["English", "Mathematics"],
        "Sixth Year": ["English", "Mathematics"]
    }
};

// Admin Accounts DB
const adminAccounts = [
    { email: 'admin@smartquiz.com', pass: 'admin123', name: 'System Admin' }
];

// Multiple Teacher Accounts DB
let teacherAccounts = [
    { id: 1, email: 'teacher@smartquiz.com', pass: 'teacher123', name: 'Prof. Myat', dept: 'IST Department' },
    { id: 2, email: 'teacher2@smartquiz.com', pass: 'teacher123', name: 'Daw Saw Myat', dept: 'CE Department' }
];

// Student Database Record (Separated Inputs: Roll No, Email, Password)
let studentsDB = [
    { id: 1, rollNo: '3IST-101', name: 'John Smith', email: 'john@mail.com', year: 'Third Year', major: 'IST', pass: 'std123', status: 'approved' },
    { id: 2, rollNo: '3CE-102', name: 'Alice Wong', email: 'alice@mail.com', year: 'Third Year', major: 'CE', pass: 'std123', status: 'approved' },
    { id: 3, rollNo: '4ECE-103', name: 'Robert Lee', email: 'robert@mail.com', year: 'Fourth Year', major: 'ECE', pass: 'std123', status: 'pending' }
];

// Quizzes Database (Public Practice 12 Subjects with 10 Qs Each + Graded Course Quizzes)
let quizzesDB = [
    // 1. General Knowledge (10 Questions)
    {
        id: 1, title: 'General Knowledge Practice', year: 'All', major: 'Public Practice', subject: 'General Knowledge', code: null, overallTime: 10, questionTime: 30, isPublic: true, teacherName: 'System',
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
    // 2. C Programming (10 Questions)
    {
        id: 2, title: 'C Programming Practice', year: 'All', major: 'Public Practice', subject: 'C Programming', code: null, overallTime: 10, questionTime: 30, isPublic: true, teacherName: 'System',
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
    // 3. Computer Architecture and Organization (10 Questions)
    {
        id: 3, title: 'Computer Architecture & Organization', year: 'All', major: 'Public Practice', subject: 'Computer Architecture', code: null, overallTime: 10, questionTime: 30, isPublic: true, teacherName: 'System',
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
    // 4. Data and Computer Communication (10 Questions)
    {
        id: 4, title: 'Data & Computer Communication', year: 'All', major: 'Public Practice', subject: 'Data Communication', code: null, overallTime: 10, questionTime: 30, isPublic: true, teacherName: 'System',
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
    // 5. Java Programming (10 Questions)
    {
        id: 5, title: 'Java Programming Practice', year: 'All', major: 'Public Practice', subject: 'Java Programming', code: null, overallTime: 10, questionTime: 30, isPublic: true, teacherName: 'System',
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
    // 6. Compiling Techniques (10 Questions)
    {
        id: 6, title: 'Compiling Techniques Practice', year: 'All', major: 'Public Practice', subject: 'Compiling Techniques', code: null, overallTime: 10, questionTime: 30, isPublic: true, teacherName: 'System',
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
    // 7. Database Management System (10 Questions)
    {
        id: 7, title: 'Database Management System (DBMS)', year: 'All', major: 'Public Practice', subject: 'Database Management System', code: null, overallTime: 10, questionTime: 30, isPublic: true, teacherName: 'System',
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
    // 8. Operating System (10 Questions)
    {
        id: 8, title: 'Operating System (OS) Practice', year: 'All', major: 'Public Practice', subject: 'Operating System', code: null, overallTime: 10, questionTime: 30, isPublic: true, teacherName: 'System',
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
    // 9. Professional English (10 Questions)
    {
        id: 9, title: 'Professional English Practice', year: 'All', major: 'Public Practice', subject: 'English', code: null, overallTime: 10, questionTime: 30, isPublic: true, teacherName: 'System',
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
    // 10. Web Development (10 Questions)
    {
        id: 10, title: 'Web Development (HTML, CSS, JS)', year: 'All', major: 'Public Practice', subject: 'Web Development', code: null, overallTime: 10, questionTime: 30, isPublic: true, teacherName: 'System',
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
    // 11. Data Structures and Algorithms (10 Questions)
    {
        id: 11, title: 'Data Structures & Algorithms (DSA)', year: 'All', major: 'Public Practice', subject: 'Data Structures and Algorithms', code: null, overallTime: 10, questionTime: 30, isPublic: true, teacherName: 'System',
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
    // 12. Computer Science Fundamentals (10 Questions)
    {
        id: 12, title: 'Computer Science Fundamentals', year: 'All', major: 'Public Practice', subject: 'Computer Science Fundamentals', code: null, overallTime: 10, questionTime: 30, isPublic: true, teacherName: 'System',
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
    // Graded Exam Example
    {
        id: 102, title: 'Database Management System Midterm Exam', year: 'Third Year', major: 'IST', subject: 'Database Management System', code: '849201', overallTime: 10, questionTime: 30, startTime: '2026-08-01T08:00', endTime: '2026-08-15T23:59', isPublic: false, teacherName: 'Prof. Myat',
        questions: [
            { id: 1, type: 'mcq', text: 'What does SQL stand for?', choices: ['Structured Query Language', 'Sequential Query Logic', 'System Query Language', 'Standard Question List'], answer: 'Structured Query Language' },
            { id: 2, type: 'tf', text: 'Primary Key can contain NULL values.', choices: ['True', 'False'], answer: 'False' },
            { id: 3, type: 'blank', text: 'Which SQL command is used to retrieve data from a table?', answer: 'SELECT' }
        ]
    }
];

// Submissions & Attempts DB
let attemptsDB = [
    { quizId: 102, studentRoll: '3IST-101', studentName: 'John Smith', score: 3, total: 3, status: 'submitted', submittedAt: '2026-08-01 10:15' }
];

// Notifications DB
let notificationsDB = [
    { id: 1, targetYear: 'Third Year', targetMajor: 'IST', quizId: 102, title: '3rd Year IST: DBMS Exam Published!', message: 'Prof. Myat uploaded DBMS Midterm Exam for 3rd Year IST. Code: 849201. Schedule: 2026-08-01 to 2026-08-15.', date: '2026-08-01' }
];

// ================= COMMUNITY GROUP CHAT DATABASE =================
        let chatMessagesDB = [
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
                message: 'Attention 3rd Year IST students: The DBMS exam code is 849201. Make sure to complete it before August 15.',
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



// Active Quiz Engine State
let currentActiveQuiz = null;
let currentQIndex = 0;
let userAnswers = {};
let overallTimerInterval = null;
let questionTimerInterval = null;
let overallSecondsLeft = 0;
let questionSecondsLeft = 0;
let cheatingWarningsCount = 0;

// Bootstrap Modals
let loginModalObj, changePassModalObj, createQuizModalObj, addStudentModalObj, addTeacherModalObj, studentSlipModalObj, reviewQuizModalObj;

// ==================== APP INITIALIZATION & ANTI-CHEATING LISTENERS ====================
window.onload = function() {
    loginModalObj = new bootstrap.Modal(document.getElementById('loginModal'));
    changePassModalObj = new bootstrap.Modal(document.getElementById('changePassModal'));
    createQuizModalObj = new bootstrap.Modal(document.getElementById('createQuizModal'));
    addStudentModalObj = new bootstrap.Modal(document.getElementById('addStudentModal'));
    addTeacherModalObj = new bootstrap.Modal(document.getElementById('addTeacherModal'));
    studentSlipModalObj = new bootstrap.Modal(document.getElementById('studentCredentialSlipModal'));
    reviewQuizModalObj = new bootstrap.Modal(document.getElementById('reviewQuizModal'));



    // =========================================================
// ANTI-CHEATING SYSTEM
// 1 minimize/tab switch = 1 violation
// 2 violations = exam termination
// =========================================================

let cheatingWarningsCount = 0;

// Prevent blur + visibilitychange from being counted twice
let antiCheatEventLocked = false;

// Small delay to allow browser events to settle
const ANTI_CHEAT_COOLDOWN = 1000; // 1 second


function handleAntiCheatingTrigger() {

    // Only activate during Official Exam
    if (
        !currentActiveQuiz ||
        currentActiveQuiz.isPublic ||
        document.getElementById('view-quiz-taking').classList.contains('d-none')
    ) {
        return;
    }

    // -----------------------------------------------------
    // IMPORTANT:
    // blur and visibilitychange can happen from the
    // SAME minimize/tab-switch action.
    // Ignore the second event.
    // -----------------------------------------------------
    if (antiCheatEventLocked) {
        return;
    }

    antiCheatEventLocked = true;

    // Count ONE violation
    cheatingWarningsCount++;

    console.log(
        `Anti-Cheat Violation: ${cheatingWarningsCount}/2`
    );


    // -----------------------------------------------------
    // FIRST VIOLATION
    // -----------------------------------------------------

    if (cheatingWarningsCount === 1) {

        alert(
            'WARNING (1/2): Tab or Window switching is prohibited during official examinations.\n\n' +
            'If you leave the exam window one more time, your exam will be terminated.'
        );

    }


    // -----------------------------------------------------
    // SECOND VIOLATION
    // -----------------------------------------------------

    else if (cheatingWarningsCount >= 2) {

        alert(
            'SECURITY VIOLATION DETECTED!\n\n' +
            'You have left or switched the examination window multiple times.\n\n' +
            'Your exam is AUTO-TERMINATED with 0 score.'
        );

        terminateQuizCheating();

    }


    // -----------------------------------------------------
    // Unlock after cooldown
    // -----------------------------------------------------

    setTimeout(() => {
        antiCheatEventLocked = false;
    }, ANTI_CHEAT_COOLDOWN);
}



// =========================================================
// WINDOW / TAB DETECTION
// =========================================================

// Browser window loses focus
window.addEventListener('blur', () => {

    handleAntiCheatingTrigger();

});


// Browser tab becomes hidden
document.addEventListener('visibilitychange', () => {

    if (document.hidden) {
        handleAntiCheatingTrigger();
    }

});

    renderPracticeQuizzes();
    renderChatMessages();
    applyStrictViewControl();
};

function handleAntiCheatingTrigger() {
    if (currentActiveQuiz && !currentActiveQuiz.isPublic && !document.getElementById('view-quiz-taking').classList.contains('d-none')) {
        cheatingWarningsCount++;
        if (cheatingWarningsCount >= 2) {
            alert('SECURITY VIOLATION DETECTED! You have left or switched examination tabs multiple times. Your exam is AUTO-TERMINATED with 0 score.');
            terminateQuizCheating();
        } else {
            alert(`WARNING (${cheatingWarningsCount}/2): Tab or Window switching is prohibited during official examinations. Next violation will terminate your exam!`);
        }
    }
}

function terminateQuizCheating() {
    clearInterval(overallTimerInterval);
    clearInterval(questionTimerInterval);

    if (currentUser.rollNo) {
        attemptsDB.push({
            quizId: currentActiveQuiz.id,
            studentRoll: currentUser.rollNo,
            studentName: currentUser.name,
            score: 0,
            total: currentActiveQuiz.questions.length,
            status: 'submitted',
            submittedAt: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' (Auto-Terminated)'
        });
    }

    currentActiveQuiz = null;
    applyStrictViewControl();
}

// ==================== TOGGLE QUIZ CATEGORY FIELDS (TEACHER MODAL) ====================
function toggleQuizCategoryFields() {
    const isPublic = document.getElementById('catPublic').checked;
    const scopeFields = document.querySelectorAll('.scope-field');

    scopeFields.forEach(el => {
        if (isPublic) {
            el.classList.add('d-none');
        } else {
            el.classList.remove('d-none');
        }
    });
}

// ==================== DYNAMIC QUIZ SUBJECT DROPDOWN GENERATOR ====================
function updateQuizSubjectDropdown() {
    const year = document.getElementById('quizYearInput').value;
    const major = document.getElementById('quizMajorInput').value;
    const subjectSelect = document.getElementById('quizSubjectInput');

    subjectSelect.innerHTML = '';
    const subjects = academicCurriculum[major]?.[year] || ["English", "Mathematics"];

    subjects.forEach(sub => {
        const opt = document.createElement('option');
        opt.value = sub;
        opt.innerText = sub;
        subjectSelect.appendChild(opt);
    });
}

// ==================== LIGHT MODE & DARK MODE CONTROLLER ====================
function toggleThemeMode() {
    const html = document.documentElement;
    const themeBtn = document.getElementById('themeToggleBtn');

    if (html.getAttribute('data-bs-theme') === 'dark') {
        html.setAttribute('data-bs-theme', 'light');
        themeBtn.innerHTML = '<i class="fa-solid fa-sun me-1"></i> <span>Light Mode</span>';
    } else {
        html.setAttribute('data-bs-theme', 'dark');
        themeBtn.innerHTML = '<i class="fa-solid fa-moon me-1"></i> <span>Dark Mode</span>';
    }
}

// ==================== VIEW CONTROLLER ====================
function applyStrictViewControl() {
    document.getElementById('view-public-home').classList.add('d-none');
    document.getElementById('view-student-dashboard').classList.add('d-none');
    document.getElementById('view-teacher-dashboard').classList.add('d-none');
    document.getElementById('view-admin-dashboard').classList.add('d-none');
    document.getElementById('view-quiz-taking').classList.add('d-none');
    // document.getElementById('view-community-hub').classList.add('d-none');

    const badge = document.getElementById('currentUserBadge');
    const nameDisplay = document.getElementById('userNameDisplay');
    const roleBadge = document.getElementById('userRoleBadge');
    const navGuestLinks = document.getElementById('navGuestLinks');
    const logoutBtn = document.getElementById('logoutBtn');

    if (currentUser.role === 'guest') {
        document.getElementById('view-public-home').classList.remove('d-none');
        badge.classList.add('d-none');
        navGuestLinks.classList.remove('d-none');
        logoutBtn.classList.add('d-none');
    } else {
        badge.classList.remove('d-none');
        navGuestLinks.classList.add('d-none');
        logoutBtn.classList.remove('d-none');

        nameDisplay.innerText = currentUser.name;
        roleBadge.innerText = currentUser.role;

        if (currentUser.role === 'student') {
            document.getElementById('view-student-dashboard').classList.remove('d-none');
            renderStudentDashboard();
        } else if (currentUser.role === 'teacher') {
            document.getElementById('view-teacher-dashboard').classList.remove('d-none');
            renderTeacherQuizzes();
        } else if (currentUser.role === 'admin') {
            document.getElementById('view-admin-dashboard').classList.remove('d-none');
            renderAdminStudentList();
            renderAdminTeacherList();
        }
    }
}

function navigateToHome() {
    applyStrictViewControl();
}

function showCommunityView() {
            document.getElementById('view-public-home').classList.add('d-none');
            document.getElementById('view-student-dashboard').classList.add('d-none');
            document.getElementById('view-teacher-dashboard').classList.add('d-none');
            document.getElementById('view-admin-dashboard').classList.add('d-none');
            document.getElementById('view-quiz-taking').classList.add('d-none');
            
            document.getElementById('view-community-hub').classList.remove('d-none');

            document.getElementById('nav-home').classList.remove('active');
            document.getElementById('nav-community').classList.add('active');

            renderChatMessages();
        }

// ==================== UNIFIED LOGIN SYSTEM ====================
function showLoginModal() {
    document.getElementById('loginError').classList.add('d-none');
    
    // Clear student 3 inputs
    document.getElementById('loginRollNo').value = '';
    document.getElementById('loginStudentEmail').value = '';
    document.getElementById('loginStudentPassword').value = '';
    
    // Clear staff inputs
    document.getElementById('loginStaffEmail').value = '';
    document.getElementById('loginStaffPassword').value = '';

    setLoginRole('student');
    loginModalObj.show();
}

function setLoginRole(role) {
    document.getElementById('loginRoleType').value = role;
    
    const tabs = document.querySelectorAll('#loginRoleTabs button');
    tabs.forEach(t => t.classList.remove('active'));
    
    const studentFields = document.getElementById('studentLoginFields');
    const staffFields = document.getElementById('staffLoginFields');

    if (role === 'student') {
        tabs[0].classList.add('active');
        studentFields.classList.remove('d-none');
        staffFields.classList.add('d-none');
    } else if (role === 'teacher') {
        tabs[1].classList.add('active');
        studentFields.classList.add('d-none');
        staffFields.classList.remove('d-none');
        document.getElementById('staffEmailLabel').innerText = 'Teacher Email Address';
        document.getElementById('loginStaffEmail').placeholder = 'e.g. teacher@smartquiz.com';
    } else if (role === 'admin') {
        tabs[2].classList.add('active');
        studentFields.classList.add('d-none');
        staffFields.classList.remove('d-none');
        document.getElementById('staffEmailLabel').innerText = 'Admin Email Address';
        document.getElementById('loginStaffEmail').placeholder = 'e.g. admin@smartquiz.com';
    }
}

function handleLoginSubmit(e) {
    e.preventDefault();
    const role = document.getElementById('loginRoleType').value;

    if (role === 'student') {
        // STUDENT LOGIN WITH 3 SEPARATE INPUTS (ROLL NO, EMAIL, PASSWORD)
        const rollVal = document.getElementById('loginRollNo').value.trim();
        const emailVal = document.getElementById('loginStudentEmail').value.trim();
        const passVal = document.getElementById('loginStudentPassword').value.trim();

        const student = studentsDB.find(s => s.rollNo === rollVal && s.email === emailVal && s.pass === passVal);
        if (student) {
            if (student.status !== 'approved') {
                alert('Your account registration is pending Admin approval or suspended!');
                return;
            }
            currentUser = { role: 'student', id: student.id, name: student.name, email: student.email, year: student.year, major: student.major, rollNo: student.rollNo };
            loginModalObj.hide();
            applyStrictViewControl();
        } else {
            document.getElementById('loginError').classList.remove('d-none');
        }
    } else if (role === 'teacher' || role === 'admin') {
        const emailVal = document.getElementById('loginStaffEmail').value.trim();
        const passVal = document.getElementById('loginStaffPassword').value.trim();

        if (role === 'teacher') {
            const teacher = teacherAccounts.find(t => t.email === emailVal && t.pass === passVal);
            if (teacher) {
                currentUser = { role: 'teacher', id: teacher.id, name: teacher.name, major: null, rollNo: null };
                loginModalObj.hide();
                applyStrictViewControl();
            } else {
                document.getElementById('loginError').classList.remove('d-none');
            }
        } else if (role === 'admin') {
            const admin = adminAccounts.find(a => a.email === emailVal && a.pass === passVal);
            if (admin) {
                currentUser = { role: 'admin', id: 100, name: admin.name, major: null, rollNo: null };
                loginModalObj.hide();
                applyStrictViewControl();
            } else {
                document.getElementById('loginError').classList.remove('d-none');
            }
        }
    }
}

function handleLogout() {
    currentUser = { role: 'guest', id: null, name: 'Guest User', year: null, major: null, rollNo: null };
    applyStrictViewControl();
}

        // ================= COMMUNITY GROUP CHAT ENGINE =================
        function renderChatMessages() {
            const container = document.getElementById('chatMessagesContainer');
            const pinnedContainer = document.getElementById('pinnedMessageContainer');
            const adminOption = document.getElementById('adminAnnouncementOption');

            if (!container) return;
            container.innerHTML = '';

            // Toggle admin announcement switch
            if (currentUser.role === 'admin') {
                adminOption.classList.remove('d-none');
            } else {
                adminOption.classList.add('d-none');
            }

            document.getElementById('chatMessageCount').innerText = `${chatMessagesDB.length} Messages`;

            // Render Pinned Announcement
            let pinnedMsg = chatMessagesDB.find(m => m.isPinned);
            if (pinnedMsg) {
                pinnedContainer.innerHTML = `
                    <div class="fw-bold text-dark mb-1 d-flex justify-content-between align-items-center">
                        <span>${pinnedMsg.senderName} (${pinnedMsg.role.toUpperCase()})</span>
                        <span class="badge bg-danger">Pinned</span>
                    </div>
                    <div class="text-secondary mb-1">${pinnedMsg.message}</div>
                    <div class="text-end text-muted opacity-75" style="font-size:10px;">${pinnedMsg.timestamp}</div>
                `;
            } else {
                pinnedContainer.innerHTML = `<em>No message pinned at the moment.</em>`;
            }

            // Render Messages
            chatMessagesDB.forEach(msg => {
                const bubble = document.createElement('div');
                const isMe = msg.senderName === currentUser.name;

                let roleBadgeClass = 'bg-secondary';
                if (msg.role === 'admin') roleBadgeClass = 'bg-danger';
                else if (msg.role === 'teacher') roleBadgeClass = 'bg-primary';
                else if (msg.role === 'student') roleBadgeClass = 'bg-success';

                if (msg.isAnnouncement) {
                    bubble.className = 'chat-bubble admin-announcement';
                    bubble.innerHTML = `
                        <div class="d-flex justify-content-between align-items-center mb-1">
                            <span class="fw-bold text-dark">
                                <i class="fa-solid fa-bullhorn text-warning me-1"></i> ${msg.senderName} 
                                <span class="badge ${roleBadgeClass} rounded-pill ms-1">${msg.role.toUpperCase()}</span>
                            </span>
                            <small class="text-muted">${msg.timestamp}</small>
                        </div>
                        <div class="fw-bold fs-6 mb-1 text-dark">${msg.message}</div>
                        ${currentUser.role === 'admin' ? renderAdminChatActions(msg.id, msg.isPinned) : ''}
                    `;
                } else {
                    bubble.className = `chat-bubble ${isMe ? 'my-msg' : 'other-msg'}`;
                    bubble.innerHTML = `
                        <div class="d-flex justify-content-between align-items-center mb-1 gap-2">
                            <small class="fw-bold">${msg.senderName} <span class="badge ${roleBadgeClass} rounded-pill" style="font-size:9px;">${msg.role.toUpperCase()}</span></small>
                            <small class="text-muted opacity-75" style="font-size:10px;">${msg.timestamp}</small>
                        </div>
                        <div>${msg.message}</div>
                        ${currentUser.role === 'admin' ? renderAdminChatActions(msg.id, msg.isPinned) : ''}
                    `;
                }

                container.appendChild(bubble);
            });

            container.scrollTop = container.scrollHeight;
        }

        function renderAdminChatActions(msgId, isPinned) {
            return `
                <div class="border-top pt-1 mt-2 text-end">
                    <button onclick="togglePinChatMessage(${msgId})" class="btn btn-sm py-0 px-2.5 ${isPinned ? 'btn-danger' : 'btn-outline-secondary'} me-1" style="font-size:11px;">
                        <i class="fa-solid fa-thumbtack me-1"></i> ${isPinned ? 'Unpin' : 'Pin Message'}
                    </button>
                    <button onclick="deleteChatMessage(${msgId})" class="btn btn-sm btn-outline-danger py-0 px-2.5" style="font-size:11px;">
                        <i class="fa-solid fa-trash-can me-1"></i> Delete
                    </button>
                </div>
            `;
        }

        function handleSendChatMessage(e) {
            e.preventDefault();
            if (currentUser.role === 'guest') {
                alert('Please sign in to your student, teacher, or admin account to send messages!');
                showLoginModal();
                return;
            }

            const inputElem = document.getElementById('chatInputMessage');
            const messageText = inputElem.value.trim();
            if (!messageText) return;

            const isAnnouncement = currentUser.role === 'admin' && document.getElementById('adminAnnouncementToggle').checked;

            const newMsg = {
                id: Date.now(),
                senderName: currentUser.name,
                role: currentUser.role,
                message: messageText,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                isAnnouncement: isAnnouncement,
                isPinned: false
            };

            chatMessagesDB.push(newMsg);
            inputElem.value = '';

            if (currentUser.role === 'admin') {
                document.getElementById('adminAnnouncementToggle').checked = false;
            }

            renderChatMessages();
        }

        function deleteChatMessage(msgId) {
            if (currentUser.role !== 'admin') return;
            if (confirm("Are you sure you want to delete this message?")) {
                chatMessagesDB = chatMessagesDB.filter(m => m.id !== msgId);
                renderChatMessages();
            }
        }

        function togglePinChatMessage(msgId) {
            if (currentUser.role !== 'admin') return;
            chatMessagesDB.forEach(m => {
                if (m.id === msgId) {
                    m.isPinned = !m.isPinned;
                } else {
                    m.isPinned = false;
                }
            });
            renderChatMessages();
        }


function openChangePasswordModal() {
    changePassModalObj.show();
}

function openTeacherChangePasswordModal() {
    changePassModalObj.show();
}

function handleChangePassword(e) {
    e.preventDefault();
    const oldP = document.getElementById('oldPassword').value;
    const newP = document.getElementById('newPassword').value;

    if (currentUser.role === 'student') {
        const std = studentsDB.find(s => s.id === currentUser.id);
        if (std && std.pass === oldP) {
            std.pass = newP;
            alert('Password updated successfully!');
            changePassModalObj.hide();
            return;
        }
    } else if (currentUser.role === 'teacher') {
        const t = teacherAccounts.find(t => t.id === currentUser.id);
        if (t && t.pass === oldP) {
            t.pass = newP;
            alert('Teacher password updated successfully!');
            changePassModalObj.hide();
            return;
        }
    }
    alert('Current password incorrect.');
}

// ==================== PUBLIC PRACTICE MODE ====================
function renderPracticeQuizzes() {
    const container = document.getElementById('practiceQuizContainer');
    container.innerHTML = '';

    const practiceList = quizzesDB.filter(q => q.isPublic);
    practiceList.forEach(q => {
        const col = document.createElement('div');
        col.className = 'col-md-6 col-lg-4 practice-card-item';
        col.setAttribute('data-title', q.title.toLowerCase());
        col.innerHTML = `
            <div class="card h-100 border-0 shadow-sm rounded-4 hover-lift transition p-3">
                <div class="card-body d-flex flex-column justify-content-between">
                    <div>
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <span class="badge bg-sage-light text-sage font-bold rounded-pill border border-sage-subtle">Practice Quiz</span>
                            <small class="text-muted"><i class="fa-regular fa-clock me-1"></i> ${q.overallTime} mins</small>
                        </div>
                        <h5 class="card-title font-bold mb-2 text-dark">${q.title}</h5>
                        <p class="text-muted small mb-0">Questions: ${q.questions.length} | Instructor: ${q.teacherName}</p>
                    </div>
                    <button onclick="startQuiz(${q.id})" class="btn btn-soft-blue w-100 font-bold rounded-3 mt-3 shadow-sm">
                        <i class="fa-solid fa-play me-1"></i> Start Practice
                    </button>
                </div>
            </div>
        `;
        container.appendChild(col);
    });
}

function filterPracticeQuizzes() {
    const query = document.getElementById('practiceSearchInput').value.toLowerCase();
    const items = document.querySelectorAll('.practice-card-item');

    items.forEach(item => {
        const title = item.getAttribute('data-title');
        if (title.includes(query)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// ==================== STUDENT DASHBOARD & ENROLLED MAJOR SUBJECTS ====================
function renderStudentDashboard() {
    if (currentUser.role !== 'student') return;

    document.getElementById('studentWelcomeName').innerText = `${currentUser.name}'s Dashboard`;
    document.getElementById('studentRollDisplay').innerText = currentUser.rollNo;
    document.getElementById('studentEmailDisplay').innerText = currentUser.email;
    document.getElementById('studentScopeDisplay').innerText = `${currentUser.year} - ${currentUser.major}`;

    // Populate Enrolled Subjects Badges
    const subjectsContainer = document.getElementById('enrolledSubjectsContainer');
    subjectsContainer.innerHTML = '';
    const myMajorSubjects = academicCurriculum[currentUser.major]?.[currentUser.year] || ["English", "Mathematics"];
    
    myMajorSubjects.forEach(sub => {
        const badge = document.createElement('span');
        badge.className = 'badge bg-sage-light text-sage border border-sage-subtle px-3 py-2 rounded-pill small font-semibold';
        badge.innerHTML = `<i class="fa-solid fa-circle-check me-1 text-success"></i> ${sub}`;
        subjectsContainer.appendChild(badge);
    });

    // Targeted Notifications
    const notifList = document.getElementById('studentNotificationList');
    notifList.innerHTML = '';
    const myNotifs = notificationsDB.filter(n => n.targetYear === currentUser.year && n.targetMajor === currentUser.major);
    
    if (myNotifs.length === 0) {
        notifList.innerHTML = `<p class="text-muted small py-2">No announcements available for your major scope.</p>`;
    } else {
        myNotifs.forEach(n => {
            const el = document.createElement('div');
            el.className = 'p-3 bg-warning-subtle rounded-3 border border-warning text-dark small';
            el.innerHTML = `
                <div class="fw-bold d-flex justify-content-between">
                    <span>${n.title}</span>
                    <span class="small text-muted">${n.date}</span>
                </div>
                <p class="mb-0 text-secondary mt-1">${n.message}</p>
            `;
            notifList.appendChild(el);
        });
    }

    // Filter Assigned Course Quizzes
    const assignedList = document.getElementById('studentAssignedQuizzesList');
    assignedList.innerHTML = '';
    const myQuizzes = quizzesDB.filter(q => !q.isPublic && q.year === currentUser.year && q.major === currentUser.major);

    if (myQuizzes.length === 0) {
        assignedList.innerHTML = `<p class="text-muted small py-3">No examinations scheduled for your year and major scope.</p>`;
    } else {
        myQuizzes.forEach(q => {
            const attempted = attemptsDB.find(a => a.quizId === q.id && a.studentRoll === currentUser.rollNo && a.status === 'submitted');
            const card = document.createElement('div');
            card.className = 'p-3 rounded-3 border d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 bg-light text-dark';
            
            card.innerHTML = `
                <div>
                    <div class="d-flex align-items-center gap-2">
                        <h6 class="fw-bold mb-0 text-dark">${q.title}</h6>
                        ${attempted ? `<span class="badge bg-success rounded-pill">Submitted</span>` : `<span class="badge bg-danger rounded-pill">Pending</span>`}
                    </div>
                    <small class="text-muted mt-1 d-block">
                        <i class="fa-solid fa-book me-1"></i> Subject: ${q.subject} | <i class="fa-regular fa-clock me-1"></i> Limit: ${q.overallTime} Mins
                    </small>
                </div>
                <div>
                    ${attempted ? `<button onclick="openReviewQuizModal(${q.id})" class="btn btn-outline-success btn-sm fw-bold me-1"><i class="fa-solid fa-eye me-1"></i> Review & Practice Again (${attempted.score}/${attempted.total})</button>` : `<button onclick="fillAndJoinCode('${q.code}')" class="btn btn-warning btn-sm fw-bold">Enter Code & Take Quiz</button>`}
                </div>
            `;
            assignedList.appendChild(card);
        });
    }
}

function openReviewQuizModal(quizId) {
    const quiz = quizzesDB.find(q => q.id === quizId);
    const attempt = attemptsDB.find(a => a.quizId === quizId && a.studentRoll === currentUser.rollNo);
    if (!quiz || !attempt) return;

    document.getElementById('reviewQuizTitle').innerText = `${quiz.title} - Review Details`;
    document.getElementById('reviewScoreText').innerText = `Your Score: ${attempt.score}/${attempt.total} (${Math.round(attempt.score/attempt.total*100)}%)`;

    document.getElementById('rePracticeBtn').onclick = () => {
        reviewQuizModalObj.hide();
        startQuiz(quizId);
    };

    const container = document.getElementById('reviewQuestionsContainer');
    container.innerHTML = '';

    quiz.questions.forEach((q, idx) => {
        const card = document.createElement('div');
        card.className = 'p-3 border rounded-3 bg-light text-dark';
        card.innerHTML = `
            <div class="fw-bold mb-1">Q${idx+1}: ${q.text}</div>
            <div class="small text-success fw-bold"><i class="fa-solid fa-circle-check me-1"></i> Correct Answer Key: ${q.answer}</div>
        `;
        container.appendChild(card);
    });

    reviewQuizModalObj.show();
}

function fillAndJoinCode(code) {
    document.getElementById('joinCodeInput').value = code;
    attemptJoinGradedQuiz();
}

function attemptJoinGradedQuiz() {
    if (currentUser.role !== 'student') {
        alert('Log in as student to attempt course examinations!');
        return;
    }

    const inputCode = document.getElementById('joinCodeInput').value.trim();
    if (!inputCode || inputCode.length !== 6) {
        alert('Enter a valid 6-digit access code.');
        return;
    }

    const quiz = quizzesDB.find(q => q.code === inputCode);
    if (!quiz) {
        alert('No quiz found matching this access code.');
        return;
    }

    // Scope Control Check
    if (quiz.year !== currentUser.year || quiz.major !== currentUser.major) {
        alert(`Access Denied! This quiz is strictly for ${quiz.year} (${quiz.major}) enrolled students.`);
        return;
    }

    const now = new Date();
    if (quiz.startTime && new Date(quiz.startTime) > now) {
        alert(`Examination is not open yet. Scheduled start time: ${quiz.startTime}`);
        return;
    }
    if (quiz.endTime && new Date(quiz.endTime) < now) {
        alert('The submission deadline for this examination has expired.');
        return;
    }

    const alreadySubmitted = attemptsDB.find(a => a.quizId === quiz.id && a.studentRoll === currentUser.rollNo && a.status === 'submitted');
    if (alreadySubmitted) {
        alert('You have already submitted this exam! Use Review & Practice Again to practice.');
        return;
    }

    startQuiz(quiz.id);
}

// ==================== TEACHER PORTAL & EDIT QUIZ LOGIC ====================
function renderTeacherQuizzes() {
    if (currentUser.role !== 'teacher') return;

    document.getElementById('teacherPortalWelcome').innerText = `${currentUser.name}'s Portal`;
    const body = document.getElementById('teacherQuizTableBody');
    body.innerHTML = '';

    const tQuizzes = quizzesDB.filter(q => q.teacherName === currentUser.name || currentUser.name === 'Prof. Myat');
    document.getElementById('teacherQuizCount').innerText = `${tQuizzes.length} Quizzes`;

    tQuizzes.forEach(q => {
        const submittedCount = attemptsDB.filter(a => a.quizId === q.id && a.status === 'submitted').length;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="fw-bold text-dark">${q.title}</td>
            <td><span class="badge ${q.isPublic?'bg-info-subtle text-info-emphasis':'bg-sage-light text-sage'} border border-sage-subtle">${q.isPublic ? 'Public Practice' : `${q.year} - ${q.major} (${q.subject})`}</span></td>
            <td><span class="font-monospace fw-bold text-warning-emphasis bg-warning-subtle px-2 py-1 rounded border border-warning">${q.code ? q.code : 'None (Public)'}</span></td>
            <td class="small text-muted">${q.startTime || 'Anytime'} ~ ${q.endTime || 'Anytime'}</td>
            <td class="text-center">${q.questions.length}</td>
            <td><span class="text-success fw-bold">${q.isPublic ? '-' : `${submittedCount} Submitted`}</span></td>
            <td class="text-end">
                <button onclick="editQuizModal(${q.id})" class="btn btn-outline-primary btn-sm me-1" title="Edit Quiz Questions">
                    <i class="fa-solid fa-pen-to-square"></i> Edit
                </button>
                ${!q.isPublic ? `<button onclick="viewQuizResults(${q.id})" class="btn btn-sage btn-sm"><i class="fa-solid fa-chart-bar me-1"></i> Results</button>` : ''}
                <button onclick="deleteQuiz(${q.id})" class="btn btn-outline-danger btn-sm ms-1" title="Delete Quiz">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </td>
        `;
        body.appendChild(row);
    });
}

function deleteQuiz(quizId) {
    if (confirm("Are you sure you want to delete this quiz? This action cannot be undone.")) {
        quizzesDB = quizzesDB.filter(q => q.id !== quizId);
        attemptsDB = attemptsDB.filter(a => a.quizId !== quizId);
        notificationsDB = notificationsDB.filter(n => n.quizId !== quizId);
        alert("Quiz deleted successfully!");
        renderTeacherQuizzes();
        renderPracticeQuizzes();
    }
}

function openCreateQuizModal() {
    document.getElementById('editingQuizId').value = '';
    document.getElementById('createQuizModalTitle').innerText = 'Create Quiz Examination / Practice';
    document.getElementById('quizTitleInput').value = '';
    document.getElementById('catExam').checked = true;
    toggleQuizCategoryFields();
    document.getElementById('quizQuestionsBuilder').innerHTML = '';
    updateQuizSubjectDropdown();
    addQuestionField();
    createQuizModalObj.show();
}

function editQuizModal(quizId) {
    const quiz = quizzesDB.find(q => q.id === quizId);
    if (!quiz) return;

    document.getElementById('editingQuizId').value = quiz.id;
    document.getElementById('createQuizModalTitle').innerText = 'Edit Quiz Examination / Practice';
    document.getElementById('quizTitleInput').value = quiz.title;
    
    if (quiz.isPublic) {
        document.getElementById('catPublic').checked = true;
    } else {
        document.getElementById('catExam').checked = true;
    }
    toggleQuizCategoryFields();

    document.getElementById('quizYearInput').value = quiz.year || 'Third Year';
    document.getElementById('quizMajorInput').value = quiz.major || 'IST';
    
    updateQuizSubjectDropdown();
    if (quiz.subject) document.getElementById('quizSubjectInput').value = quiz.subject;
    
    document.getElementById('quizStartInput').value = quiz.startTime || '';
    document.getElementById('quizEndInput').value = quiz.endTime || '';
    document.getElementById('quizOverallTimeInput').value = quiz.overallTime;
    document.getElementById('quizQuestionTimeInput').value = quiz.questionTime;

    const builder = document.getElementById('quizQuestionsBuilder');
    builder.innerHTML = '';

    quiz.questions.forEach((q, idx) => {
        const qDiv = document.createElement('div');
        qDiv.className = 'p-3 bg-light border rounded-3 space-y-2';
        qDiv.innerHTML = `
            <div class="d-flex justify-content-between align-items-center">
                <span class="small fw-bold text-sage">Question ${idx + 1}</span>
                <select class="q-type-select form-select form-select-sm w-auto" onchange="toggleOptionsType(this)">
                    <option value="mcq" ${q.type==='mcq'?'selected':''}>Multiple Choice (MCQ)</option>
                    <option value="tf" ${q.type==='tf'?'selected':''}>True / False</option>
                    <option value="blank" ${q.type==='blank'?'selected':''}>Fill in the Blank</option>
                </select>
            </div>
            <input type="text" value="${q.text}" placeholder="Enter question statement" class="q-text form-control form-control-sm" required>
            <div class="q-options-container">
                <input type="text" value="${q.choices ? q.choices.join(', '):''}" placeholder="Option A, Option B, Option C, Option D" class="q-options form-control form-control-sm" required>
            </div>
            <div>
                <input type="text" value="${q.answer}" placeholder="Exact correct answer key" class="q-answer form-control form-control-sm border-success bg-success-subtle fw-bold" required>
            </div>
        `;
        builder.appendChild(qDiv);
    });

    createQuizModalObj.show();
}

function addQuestionField() {
    const builder = document.getElementById('quizQuestionsBuilder');
    const qNum = builder.children.length + 1;
    const qDiv = document.createElement('div');
    qDiv.className = 'p-3 bg-light border rounded-3 space-y-2';
    qDiv.innerHTML = `
        <div class="d-flex justify-content-between align-items-center">
            <span class="small fw-bold text-sage">Question ${qNum}</span>
            <select class="q-type-select form-select form-select-sm w-auto" onchange="toggleOptionsType(this)">
                <option value="mcq">Multiple Choice (MCQ)</option>
                <option value="tf">True / False</option>
                <option value="blank">Fill in the Blank</option>
            </select>
        </div>
        <input type="text" placeholder="Enter question statement" class="q-text form-control form-control-sm" required>
        <div class="q-options-container">
            <input type="text" placeholder="Option A, Option B, Option C, Option D (comma-separated)" class="q-options form-control form-control-sm" required>
        </div>
        <div>
            <input type="text" placeholder="Exact correct answer key (e.g. Option A)" class="q-answer form-control form-control-sm border-success bg-success-subtle fw-bold" required>
        </div>
    `;
    builder.appendChild(qDiv);
}

function toggleOptionsType(selectElem) {
    const container = selectElem.parentElement.nextElementSibling.nextElementSibling;
    if (selectElem.value === 'tf') {
        container.innerHTML = `<small class="text-muted">True/False options set automatically.</small>`;
    } else if (selectElem.value === 'blank') {
        container.innerHTML = `<small class="text-muted">Text box input answer type.</small>`;
    } else {
        container.innerHTML = `<input type="text" placeholder="Option A, Option B, Option C, Option D (comma-separated)" class="q-options form-control form-control-sm" required>`;
    }
}

function handleSaveQuiz(e) {
    e.preventDefault();
    const editingId = document.getElementById('editingQuizId').value;
    const isPublic = document.getElementById('catPublic').checked;
    const title = document.getElementById('quizTitleInput').value;
    const year = document.getElementById('quizYearInput').value;
    const major = document.getElementById('quizMajorInput').value;
    const subject = document.getElementById('quizSubjectInput').value;
    const start = document.getElementById('quizStartInput').value;
    const end = document.getElementById('quizEndInput').value;
    const overallTime = parseInt(document.getElementById('quizOverallTimeInput').value);
    const questionTime = parseInt(document.getElementById('quizQuestionTimeInput').value);

    const builder = document.getElementById('quizQuestionsBuilder');
    const questions = [];

    Array.from(builder.children).forEach((qDiv, idx) => {
        const type = qDiv.querySelector('.q-type-select').value;
        const text = qDiv.querySelector('.q-text').value;
        const answer = qDiv.querySelector('.q-answer').value.trim();
        let choices = [];

        if (type === 'mcq') {
            const optsVal = qDiv.querySelector('.q-options')?.value || '';
            choices = optsVal.split(',').map(s => s.trim());
        } else if (type === 'tf') {
            choices = ['True', 'False'];
        }

        questions.push({ id: idx + 1, type, text, choices, answer });
    });

    if (editingId) {
        const quiz = quizzesDB.find(q => q.id === parseInt(editingId));
        if (quiz) {
            quiz.title = title;
            quiz.isPublic = isPublic;
            quiz.year = isPublic ? 'All' : year;
            quiz.major = isPublic ? 'Public Practice' : major;
            quiz.subject = isPublic ? 'General Practice' : subject;
            quiz.startTime = start;
            quiz.endTime = end;
            quiz.overallTime = overallTime;
            quiz.questionTime = questionTime;
            quiz.questions = questions;
            alert('Quiz updated successfully!');
        }
    } else {
        const randomCode = isPublic ? null : Math.floor(100000 + Math.random() * 900000).toString();
        const newQuiz = {
            id: Date.now(), title, year: isPublic ? 'All' : year, major: isPublic ? 'Public Practice' : major, subject: isPublic ? 'General Practice' : subject, code: randomCode, overallTime, questionTime, startTime: start, endTime: end, isPublic: isPublic, teacherName: currentUser.name, questions
        };
        quizzesDB.push(newQuiz);

        if (!isPublic) {
            notificationsDB.push({
                id: Date.now(), targetYear: year, targetMajor: major, quizId: newQuiz.id,
                title: `${year} (${major}): ${title}`, message: `${currentUser.name} uploaded ${subject} exam. Access Code: ${randomCode}. Schedule: ${start} to ${end}.`, date: new Date().toISOString().split('T')[0]
            });
            alert(`Course Examination Created!\n\nAccess Code: [ ${randomCode} ]`);
        } else {
            alert('Public Practice Quiz Created and published to Practice Section!');
        }
    }

    createQuizModalObj.hide();
    renderTeacherQuizzes();
    renderPracticeQuizzes();
}

function viewQuizResults(quizId) {
    const quiz = quizzesDB.find(q => q.id === quizId);
    if (!quiz) return;

    document.getElementById('teacherResultsSection').classList.remove('d-none');
    document.getElementById('selectedQuizTitle').innerText = quiz.title;
    document.getElementById('selectedQuizCode').innerText = quiz.code;

    const targetStudents = studentsDB.filter(s => s.year === quiz.year && s.major === quiz.major && s.status === 'approved');
    const attempts = attemptsDB.filter(a => a.quizId === quizId);

    const submittedCount = attempts.filter(a => a.status === 'submitted').length;
    const pendingCount = targetStudents.length - submittedCount;
    
    let totalAvg = 0;
    if (submittedCount > 0) {
        const sum = attempts.reduce((acc, curr) => acc + (curr.score / curr.total * 100), 0);
        totalAvg = Math.round(sum / submittedCount);
    }

    document.getElementById('statSubmittedCount').innerText = submittedCount;
    document.getElementById('statPendingCount').innerText = pendingCount > 0 ? pendingCount : 0;
    document.getElementById('statAvgScore').innerText = `${totalAvg}%`;

    const tbody = document.getElementById('studentResultsTableBody');
    tbody.innerHTML = '';

    targetStudents.forEach(std => {
        const att = attempts.find(a => a.studentRoll === std.rollNo);
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="font-monospace fw-bold">${std.rollNo}</td>
            <td class="fw-semibold">${std.name}</td>
            <td>
                ${att && att.status === 'submitted' ? `<span class="badge bg-success rounded-pill">Submitted</span>` : `<span class="badge bg-warning rounded-pill">Pending</span>`}
            </td>
            <td class="fw-bold">${att ? `${att.score} / ${att.total}` : '-'}</td>
            <td class="small text-muted">${att ? (att.submittedAt || '-') : '-'}</td>
        `;
        tbody.appendChild(tr);
    });
}

function exportScoresCSV() {
    const quizTitleElement = document.getElementById('selectedQuizTitle');
    const quizTitle = quizTitleElement ? quizTitleElement.innerText : 'quiz_results';
    
    const fileName = quizTitle
        .replace(/[^a-zA-Z0-9\u1000-\u109F\s]/g, '')
        .replace(/\s+/g, '_')
        .substring(0, 50);
    
    const today = new Date().toISOString().split('T')[0];
    
    // 👇 Score ကို သီးခြား ၂ ကော်လံခွဲမယ်
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Roll No,Student Name,Status,Score Obtained,Total Questions,Percentage,Submission Time\n";
    
    const tbody = document.getElementById('studentResultsTableBody');
    
    if (!tbody) {
        alert('No data to export!');
        return;
    }
    
    const rows = tbody.querySelectorAll('tr');
    
    if (rows.length === 0) {
        alert('No student data available to export!');
        return;
    }
    
    rows.forEach(row => {
        const cols = row.querySelectorAll('td');
        
        if (cols.length >= 5) {
            const rollNo = cols[0].innerText.trim();
            const studentName = cols[1].innerText.trim();
            const status = cols[2].innerText.trim();
            const scoreText = cols[3].innerText.trim(); // "3/3"
            const submissionTime = cols[4].innerText.trim();
            
            let scoreObtained = '-';
            let totalQuestions = '-';
            let percentage = '-';
            
            if (scoreText !== '-' && scoreText.includes('/')) {
                const parts = scoreText.split('/');
                if (parts.length === 2) {
                    scoreObtained = parts[0].trim();
                    totalQuestions = parts[1].trim();
                    const score = parseInt(scoreObtained);
                    const total = parseInt(totalQuestions);
                    if (!isNaN(score) && !isNaN(total) && total > 0) {
                        percentage = Math.round((score / total) * 100) + '%';
                    }
                }
            }
            
            csvContent += `${rollNo},${studentName},${status},${scoreObtained},${totalQuestions},${percentage},${submissionTime}\n`;
        }
    });
    
    try {
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `${fileName}_${today}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        alert('Error exporting CSV: ' + error.message);
    }
}

function closeTeacherResults() {
    document.getElementById('teacherResultsSection').classList.add('d-none');
}

// ==================== ADMIN PORTAL LOGIC ====================
function renderAdminStudentList() {
    if (currentUser.role !== 'admin') return;

    const body = document.getElementById('adminStudentTableBody');
    body.innerHTML = '';
    document.getElementById('totalStudentsCount').innerText = `${studentsDB.length} Students`;

    studentsDB.forEach(std => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="font-monospace fw-bold text-sage">${std.rollNo}</td>
            <td class="fw-bold text-dark">${std.name}</td>
            <td class="text-muted">${std.email}</td>
            <td><span class="badge bg-light text-dark border">${std.year} - ${std.major}</span></td>
            <td class="font-monospace small bg-light text-dark fw-bold">${std.pass}</td>
            <td>
                ${std.status === 'approved' ? `<span class="badge bg-success rounded-pill">Approved</span>` : `<span class="badge bg-warning rounded-pill">Pending Approval</span>`}
            </td>
            <td class="text-end">
                <button onclick="reprintStudentSlip(${std.id})" class="btn btn-outline-dark btn-sm me-1" title="Print Slip">
                    <i class="fa-solid fa-print"></i> Slip
                </button>
                ${std.status === 'pending' ? `<button onclick="toggleStudentStatus(${std.id}, 'approved')" class="btn btn-success btn-sm">Approve</button>` : `<button onclick="toggleStudentStatus(${std.id}, 'pending')" class="btn btn-warning btn-sm">Suspend</button>`}
            </td>
        `;
        body.appendChild(tr);
    });
}

function renderAdminTeacherList() {
    if (currentUser.role !== 'admin') return;

    const body = document.getElementById('adminTeacherTableBody');
    body.innerHTML = '';
    document.getElementById('totalTeachersCount').innerText = `${teacherAccounts.length} Teachers`;

    teacherAccounts.forEach(t => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="fw-bold text-dark">${t.name}</td>
            <td class="text-sage">${t.email}</td>
            <td><span class="badge bg-sage-light text-sage border border-sage-subtle">${t.dept}</span></td>
            <td class="font-monospace small bg-light text-dark fw-bold">${t.pass}</td>
        `;
        body.appendChild(tr);
    });
}

function openAddTeacherModal() {
    addTeacherModalObj.show();
}

function handleAdminAddTeacher(e) {
    e.preventDefault();
    const name = document.getElementById('adminTeacherNameInput').value.trim();
    const email = document.getElementById('adminTeacherEmailInput').value.trim();
    const dept = document.getElementById('adminTeacherDeptInput').value;
    const pass = document.getElementById('adminTeacherPassInput').value.trim();

    teacherAccounts.push({
        id: Date.now(), name, email, dept, pass
    });

    alert(`Faculty Teacher Account Created Successfully!\n\nEmail: ${email}\nAssigned Pass: ${pass}`);
    addTeacherModalObj.hide();
    renderAdminTeacherList();
}

function openAddStudentModal() {
    addStudentModalObj.show();
}

function handleAdminAddStudent(e) {
    e.preventDefault();
    const rollNo = document.getElementById('adminRollInput').value.trim();
    const name = document.getElementById('adminNameInput').value.trim();
    const email = document.getElementById('adminEmailInput').value.trim();
    const year = document.getElementById('adminYearInput').value;
    const major = document.getElementById('adminMajorInput').value;
    const pass = document.getElementById('adminPassInput').value.trim();

    const newStd = {
        id: Date.now(), rollNo, name, email, year, major, pass, status: 'approved'
    };

    studentsDB.push(newStd);
    addStudentModalObj.hide();
    renderAdminStudentList();

    document.getElementById('slipSentEmail').innerText = email;
    document.getElementById('slipRollNo').innerText = rollNo;
    document.getElementById('slipName').innerText = name;
    document.getElementById('slipEmail').innerText = email;
    document.getElementById('slipScope').innerText = `${year} - ${major}`;
    document.getElementById('slipPass').innerText = pass;

    studentSlipModalObj.show();
}

function reprintStudentSlip(stdId) {
    const std = studentsDB.find(s => s.id === stdId);
    if (!std) return;

    document.getElementById('slipSentEmail').innerText = std.email;
    document.getElementById('slipRollNo').innerText = std.rollNo;
    document.getElementById('slipName').innerText = std.name;
    document.getElementById('slipEmail').innerText = std.email;
    document.getElementById('slipScope').innerText = `${std.year} - ${std.major}`;
    document.getElementById('slipPass').innerText = std.pass;

    studentSlipModalObj.show();
}

function printStudentSlip() {
    window.print();
}

function toggleStudentStatus(stdId, status) {
    const std = studentsDB.find(s => s.id === stdId);
    if (std) {
        std.status = status;
        renderAdminStudentList();
    }
}

// ==================== LIVE TIMED QUIZ ENGINE ====================
function startQuiz(quizId) {
    const quiz = quizzesDB.find(q => q.id === quizId);
    if (!quiz) return;

    currentActiveQuiz = quiz;
    currentQIndex = 0;
    userAnswers = {};
    cheatingWarningsCount = 0;
    antiCheatEventLocked = false;

    // Show/Hide Anti-cheating banner
    const antiBanner = document.getElementById('antiCheatingBanner');
    if (quiz.isPublic) {
        antiBanner.classList.add('d-none');
    } else {
        antiBanner.classList.remove('d-none');
    }

    document.getElementById('view-public-home').classList.add('d-none');
    document.getElementById('view-student-dashboard').classList.add('d-none');
    document.getElementById('view-teacher-dashboard').classList.add('d-none');
    document.getElementById('view-admin-dashboard').classList.add('d-none');
    // document.getElementById('view-community-hub').classList.add('d-none');
    document.getElementById('view-quiz-taking').classList.remove('d-none');

    document.getElementById('liveQuizTitle').innerText = quiz.title;
    document.getElementById('liveQuizSubject').innerText = quiz.isPublic ? 'Public Practice' : `${quiz.year} - ${quiz.major} (${quiz.subject})`;

    overallSecondsLeft = quiz.overallTime * 60;
    clearInterval(overallTimerInterval);
    overallTimerInterval = setInterval(updateOverallTimer, 1000);

    renderActiveQuestion();
}

function updateOverallTimer() {
    if (overallSecondsLeft <= 0) {
        clearInterval(overallTimerInterval);
        clearInterval(questionTimerInterval);
        alert('Overall Time Limit Expired! Submitting quiz automatically.');
        submitActiveQuiz();
        return;
    }
    overallSecondsLeft--;
    const mins = Math.floor(overallSecondsLeft / 60);
    const secs = overallSecondsLeft % 60;
    document.getElementById('overallTimerDisplay').innerText = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function startQuestionTimer() {
    clearInterval(questionTimerInterval);
    questionSecondsLeft = currentActiveQuiz.questionTime;
    updateQuestionTimerDisplay();

    questionTimerInterval = setInterval(() => {
        if (questionSecondsLeft <= 0) {
            clearInterval(questionTimerInterval);
            if (currentQIndex < currentActiveQuiz.questions.length - 1) {
                navigateQuestion(1);
            }
        } else {
            questionSecondsLeft--;
            updateQuestionTimerDisplay();
        }
    }, 1000);
}

function updateQuestionTimerDisplay() {
    document.getElementById('questionTimerDisplay').innerText = `00:${questionSecondsLeft.toString().padStart(2, '0')}`;
}

function renderActiveQuestion() {
    const q = currentActiveQuiz.questions[currentQIndex];
    const totalQ = currentActiveQuiz.questions.length;

    document.getElementById('questionProgressText').innerText = `Question ${currentQIndex + 1} of ${totalQ}`;
    document.getElementById('questionTypeBadge').innerText = q.type.toUpperCase();
    document.getElementById('currentQuestionText').innerText = q.text;

    const answersBox = document.getElementById('answersContainer');
    answersBox.innerHTML = '';

    const savedAns = userAnswers[q.id] || '';

    if (q.type === 'mcq' || q.type === 'tf') {
        q.choices.forEach(choice => {
            const btn = document.createElement('div');
            const isChecked = savedAns === choice;
            btn.className = `p-3 border rounded-3 cursor-pointer d-flex justify-between align-items-center transition ${isChecked ? 'bg-sage-light border-sage fw-bold text-sage' : 'bg-body hover-lift'}`;
            btn.onclick = () => {
                userAnswers[q.id] = choice;
                renderActiveQuestion();
            };
            btn.innerHTML = `
                <span>${choice}</span>
                ${isChecked ? `<i class="fa-solid fa-circle-check text-sage fs-5"></i>` : `<i class="fa-regular fa-circle text-muted fs-5"></i>`}
            `;
            answersBox.appendChild(btn);
        });
    } else if (q.type === 'blank') {
        const input = document.createElement('input');
        input.type = 'text';
        input.value = savedAns;
        input.placeholder = 'Type your answer...';
        input.className = 'form-control form-control-lg';
        input.oninput = (e) => {
            userAnswers[q.id] = e.target.value.trim();
        };
        answersBox.appendChild(input);
    }

    document.getElementById('prevQBtn').disabled = currentQIndex === 0;
    if (currentQIndex === totalQ - 1) {
        document.getElementById('nextQBtn').classList.add('d-none');
        document.getElementById('submitQuizBtn').classList.remove('d-none');
    } else {
        document.getElementById('nextQBtn').classList.remove('d-none');
        document.getElementById('submitQuizBtn').classList.add('d-none');
    }

    startQuestionTimer();
}

function navigateQuestion(step) {
    currentQIndex += step;
    renderActiveQuestion();
}

function submitActiveQuiz() {
    clearInterval(overallTimerInterval);
    clearInterval(questionTimerInterval);

    let score = 0;
    currentActiveQuiz.questions.forEach(q => {
        if (userAnswers[q.id] && userAnswers[q.id].toString().toLowerCase() === q.answer.toString().toLowerCase()) {
            score++;
        }
    });

    const total = currentActiveQuiz.questions.length;

    if (!currentActiveQuiz.isPublic && currentUser.rollNo) {
        attemptsDB.push({
            quizId: currentActiveQuiz.id,
            studentRoll: currentUser.rollNo,
            studentName: currentUser.name,
            score: score,
            total: total,
            status: 'submitted',
            submittedAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
        });
    }

    alert(`Quiz Submitted Successfully!\n\nYour Score: ${score} / ${total}`);
    currentActiveQuiz = null;
    applyStrictViewControl();
}

