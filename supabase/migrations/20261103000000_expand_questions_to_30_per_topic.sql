-- Migration: Expand every quiz to 30 questions so users get fresh sets each attempt.
-- This replaces the questions JSONB column on all 8 existing quizzes.
-- Safe to run more than once (uses ON CONFLICT / WHERE NOT EXISTS guards).

-- ─────────────────────────────────────────────
-- 1. Programming Fundamentals – 30 questions
-- ─────────────────────────────────────────────
update public.quizzes
set questions = $q$[
  {"id":"pf1","text":"Which construct repeats a block while a condition is true?","options":["loop","class","array","compiler"],"correctIndex":0,"explanation":"Loops repeat work according to a condition."},
  {"id":"pf2","text":"What does a compiler do?","options":["Executes only HTML","Translates source code to machine code","Stores data in tables","Draws a user interface"],"correctIndex":1},
  {"id":"pf3","text":"Which data type stores true or false?","options":["Boolean","Integer","String","Float"],"correctIndex":0},
  {"id":"pf4","text":"What is an algorithm?","options":["A step-by-step solution","A hardware device","A database table","A programming error"],"correctIndex":0},
  {"id":"pf5","text":"Which operator checks equality in most programming languages?","options":["=","==","+","%"],"correctIndex":1},
  {"id":"pf6","text":"What is the output of 17 % 5?","options":["2","3","5","12"],"correctIndex":0},
  {"id":"pf7","text":"A variable is best described as?","options":["A named storage location","A CPU register only","A loop type","A file extension"],"correctIndex":0},
  {"id":"pf8","text":"Which statement exits a loop immediately in C-like languages?","options":["continue","break","return type","import"],"correctIndex":1},
  {"id":"pf9","text":"What is debugging?","options":["Finding and fixing errors","Compressing source code","Designing a database","Installing an OS"],"correctIndex":0},
  {"id":"pf10","text":"Which is a valid function purpose?","options":["Reuse a task","Increase screen brightness","Create hardware","Replace memory"],"correctIndex":0},
  {"id":"pf11","text":"What does 'recursion' mean in programming?","options":["A function calling itself","A type of loop only","A sorting method","A hardware interrupt"],"correctIndex":0},
  {"id":"pf12","text":"Which keyword is used to define a function in Python?","options":["def","func","function","define"],"correctIndex":0},
  {"id":"pf13","text":"What is the purpose of a return statement?","options":["Send a value back from a function","Print to screen","Import a module","Declare a variable"],"correctIndex":0},
  {"id":"pf14","text":"Which of the following is a logical operator?","options":["AND","ADD","MUL","SUB"],"correctIndex":0},
  {"id":"pf15","text":"What is pseudocode?","options":["Informal description of an algorithm","A compiled language","A database query","A network protocol"],"correctIndex":0},
  {"id":"pf16","text":"Which data structure stores items in key-value pairs?","options":["Dictionary","Array","Stack","Queue"],"correctIndex":0},
  {"id":"pf17","text":"What does IDE stand for?","options":["Integrated Development Environment","Internal Data Engine","Input Display Editor","Interpreted Dynamic Execution"],"correctIndex":0},
  {"id":"pf18","text":"Which symbol typically starts a single-line comment in Python?","options":["#","//","/*","--"],"correctIndex":0},
  {"id":"pf19","text":"An infinite loop runs?","options":["Forever unless broken","Exactly once","Only during compilation","Only in debug mode"],"correctIndex":0},
  {"id":"pf20","text":"What is a syntax error?","options":["Violation of language grammar rules","A runtime crash","A logic mistake","A hardware fault"],"correctIndex":0},
  {"id":"pf21","text":"Which statement skips the rest of the current loop iteration?","options":["continue","break","pass","return"],"correctIndex":0},
  {"id":"pf22","text":"What does 'int' represent in C/Java?","options":["Integer data type","Internal function","Input terminal","Index of table"],"correctIndex":0},
  {"id":"pf23","text":"A flowchart is used to?","options":["Visualise program logic","Compile code","Store data","Design hardware"],"correctIndex":0},
  {"id":"pf24","text":"Which concept hides implementation details inside an object?","options":["Encapsulation","Inheritance","Recursion","Polymorphism"],"correctIndex":0},
  {"id":"pf25","text":"What is a constant?","options":["A value that cannot change","A mutable variable","A loop counter","A file pointer"],"correctIndex":0},
  {"id":"pf26","text":"Which operator performs integer division in Python 3?","options":["//","/","%","**"],"correctIndex":0},
  {"id":"pf27","text":"What does 'print()' do in Python?","options":["Displays output to the console","Saves a file","Compiles code","Allocates memory"],"correctIndex":0},
  {"id":"pf28","text":"A for loop iterates over?","options":["A sequence of items","Only integers","Only strings","Hardware registers"],"correctIndex":0},
  {"id":"pf29","text":"Which paradigm treats computation as functions?","options":["Functional programming","Procedural programming","Object-oriented","Logic programming"],"correctIndex":0},
  {"id":"pf30","text":"What is the time complexity of accessing an array element by index?","options":["O(1)","O(n)","O(log n)","O(n²)"],"correctIndex":0}
]$q$::jsonb,
question_count = 30
where category = 'Programming Fundamentals';

-- ─────────────────────────────────────────────
-- 2. Data Structures – 30 questions
-- ─────────────────────────────────────────────
update public.quizzes
set questions = $q$[
  {"id":"ds1","text":"Which structure follows LIFO order?","options":["Queue","Stack","Array","Graph"],"correctIndex":1},
  {"id":"ds2","text":"Which structure follows FIFO order?","options":["Stack","Tree","Queue","Heap"],"correctIndex":2},
  {"id":"ds3","text":"What is the first node of a linked list called?","options":["Root","Head","Leaf","Tail pointer"],"correctIndex":1},
  {"id":"ds4","text":"Binary search requires which condition?","options":["Sorted data","A linked list","Duplicate values","A hash table"],"correctIndex":0},
  {"id":"ds5","text":"What is the average lookup time of a good hash table?","options":["O(1)","O(n)","O(n²)","O(log n) always"],"correctIndex":0},
  {"id":"ds6","text":"A tree node with no children is a?","options":["Root","Leaf","Parent","Branch"],"correctIndex":1},
  {"id":"ds7","text":"Which traversal visits left subtree, root, right subtree?","options":["Preorder","Inorder","Postorder","Level order"],"correctIndex":1},
  {"id":"ds8","text":"What is push used for on a stack?","options":["Add an item","Remove an item","Sort items","Search items"],"correctIndex":0},
  {"id":"ds9","text":"Which data structure is ideal for a print queue?","options":["Queue","Stack","Binary tree","Set"],"correctIndex":0},
  {"id":"ds10","text":"What is the worst-case time for linear search?","options":["O(1)","O(log n)","O(n)","O(n log n)"],"correctIndex":2},
  {"id":"ds11","text":"A doubly linked list node contains?","options":["Data and two pointers","Data only","Data and one pointer","Only pointers"],"correctIndex":0},
  {"id":"ds12","text":"Which tree property ensures O(log n) operations?","options":["Balance","Depth only","Number of leaves","Colour"],"correctIndex":0},
  {"id":"ds13","text":"What does 'pop' do on a stack?","options":["Removes and returns the top element","Adds an element","Sorts the stack","Clears all elements"],"correctIndex":0},
  {"id":"ds14","text":"Which data structure uses nodes with left and right children?","options":["Binary tree","Hash table","Array","Stack"],"correctIndex":0},
  {"id":"ds15","text":"Enqueue adds an element to which end of a queue?","options":["Rear","Front","Middle","Random"],"correctIndex":0},
  {"id":"ds16","text":"Which sorting algorithm has O(n log n) average case?","options":["Merge sort","Bubble sort","Selection sort","Insertion sort"],"correctIndex":0},
  {"id":"ds17","text":"A graph where edges have direction is called?","options":["Directed graph","Undirected graph","Tree","Heap"],"correctIndex":0},
  {"id":"ds18","text":"What is a circular linked list?","options":["Last node points to head","No tail node","Only one element","A bidirectional list"],"correctIndex":0},
  {"id":"ds19","text":"Which operation on a min-heap always returns the smallest element?","options":["Extract-min","Insert","Delete-max","Search"],"correctIndex":0},
  {"id":"ds20","text":"What is the space complexity of an adjacency matrix for V vertices?","options":["O(V²)","O(V)","O(E)","O(1)"],"correctIndex":0},
  {"id":"ds21","text":"Which traversal explores all neighbours before going deeper?","options":["BFS","DFS","Inorder","Postorder"],"correctIndex":0},
  {"id":"ds22","text":"A trie is mainly used for?","options":["String/prefix lookups","Sorting integers","Network routing","Heap operations"],"correctIndex":0},
  {"id":"ds23","text":"What does 'deque' stand for?","options":["Double-ended queue","Delayed queue","Directed queue","Dense queue"],"correctIndex":0},
  {"id":"ds24","text":"Which data structure backs a recursive function call?","options":["Call stack","Queue","Array","Graph"],"correctIndex":0},
  {"id":"ds25","text":"In Big-O, O(1) means?","options":["Constant time","Linear time","Quadratic time","Logarithmic time"],"correctIndex":0},
  {"id":"ds26","text":"An AVL tree self-balances using?","options":["Rotations","Sorting","Hashing","Recursion only"],"correctIndex":0},
  {"id":"ds27","text":"Which search algorithm works in O(log n)?","options":["Binary search","Linear search","Jump search (worst)","Hash search"],"correctIndex":0},
  {"id":"ds28","text":"A priority queue is often implemented with a?","options":["Heap","Linked list","Stack","Trie"],"correctIndex":0},
  {"id":"ds29","text":"What is an adjacency list?","options":["Each vertex stores its neighbours","A 2D matrix","A sorted array","A hash of edges"],"correctIndex":0},
  {"id":"ds30","text":"Bubble sort repeatedly?","options":["Swaps adjacent out-of-order elements","Divides array in half","Builds a heap","Uses a pivot"],"correctIndex":0}
]$q$::jsonb,
question_count = 30
where category = 'Data Structures';

-- ─────────────────────────────────────────────
-- 3. Database Systems – 30 questions
-- ─────────────────────────────────────────────
update public.quizzes
set questions = $q$[
  {"id":"db1","text":"Which key uniquely identifies every row in a table?","options":["Foreign key","Primary key","Composite view","Index"],"correctIndex":1},
  {"id":"db2","text":"Which SQL command retrieves rows?","options":["SELECT","UPDATE","DELETE","ALTER"],"correctIndex":0},
  {"id":"db3","text":"A foreign key primarily enforces?","options":["Referential integrity","File compression","Encryption","Sorting"],"correctIndex":0},
  {"id":"db4","text":"Which clause filters rows before grouping?","options":["WHERE","HAVING","ORDER BY","JOIN"],"correctIndex":0},
  {"id":"db5","text":"What does SQL stand for?","options":["Structured Query Language","Simple Queue Logic","System Query Link","Sequential Question Language"],"correctIndex":0},
  {"id":"db6","text":"Which normal form removes partial dependency?","options":["1NF","2NF","3NF","BCNF"],"correctIndex":1},
  {"id":"db7","text":"Which operation combines matching rows from two tables?","options":["JOIN","DROP","GRANT","COMMIT"],"correctIndex":0},
  {"id":"db8","text":"What does COMMIT do in a transaction?","options":["Makes changes permanent","Deletes a table","Starts a query","Creates a backup"],"correctIndex":0},
  {"id":"db9","text":"Which aggregate counts rows?","options":["COUNT","SUM","AVG","MAX"],"correctIndex":0},
  {"id":"db10","text":"An index is mainly used to?","options":["Speed up retrieval","Store passwords","Replace tables","Avoid SQL"],"correctIndex":0},
  {"id":"db11","text":"What does ROLLBACK do?","options":["Undoes uncommitted changes","Deletes all rows","Creates an index","Grants permissions"],"correctIndex":0},
  {"id":"db12","text":"Which SQL clause filters groups?","options":["HAVING","WHERE","GROUP BY","ORDER BY"],"correctIndex":0},
  {"id":"db13","text":"ACID stands for?","options":["Atomicity Consistency Isolation Durability","Array Commit Index Data","Abstract Class Interface Design","Aggregation Constraint Index Default"],"correctIndex":0},
  {"id":"db14","text":"A view is?","options":["A stored query","A physical table copy","An index structure","A stored procedure"],"correctIndex":0},
  {"id":"db15","text":"Which join returns all rows from both tables?","options":["FULL OUTER JOIN","INNER JOIN","LEFT JOIN","CROSS JOIN"],"correctIndex":0},
  {"id":"db16","text":"Normalisation primarily aims to?","options":["Reduce redundancy","Speed up queries","Encrypt data","Add indexes"],"correctIndex":0},
  {"id":"db17","text":"Which command removes all rows but keeps the table structure?","options":["TRUNCATE","DROP","DELETE all","ALTER"],"correctIndex":0},
  {"id":"db18","text":"What is a stored procedure?","options":["Precompiled SQL saved in the DB","A backup file","A type of index","A constraint"],"correctIndex":0},
  {"id":"db19","text":"Which type of key references another table's primary key?","options":["Foreign key","Candidate key","Super key","Composite key"],"correctIndex":0},
  {"id":"db20","text":"What does GROUP BY do?","options":["Aggregates rows sharing a value","Sorts rows","Filters rows","Joins tables"],"correctIndex":0},
  {"id":"db21","text":"3NF removes?","options":["Transitive dependencies","Partial dependencies","All redundancy","Multi-valued dependencies"],"correctIndex":0},
  {"id":"db22","text":"Which SQL keyword removes duplicate rows in a result?","options":["DISTINCT","UNIQUE","LIMIT","FILTER"],"correctIndex":0},
  {"id":"db23","text":"An ER diagram models?","options":["Entities and their relationships","Network topology","Program flowcharts","UI layouts"],"correctIndex":0},
  {"id":"db24","text":"Which isolation level prevents dirty reads?","options":["READ COMMITTED","READ UNCOMMITTED","SERIALIZABLE","REPEATABLE READ"],"correctIndex":0},
  {"id":"db25","text":"What is a candidate key?","options":["A minimal superkey","A foreign key set","A composite index","A redundant column"],"correctIndex":0},
  {"id":"db26","text":"Which command adds a new column to an existing table?","options":["ALTER TABLE ... ADD","INSERT INTO","UPDATE SET","CREATE COLUMN"],"correctIndex":0},
  {"id":"db27","text":"Deadlock in a database occurs when?","options":["Transactions wait on each other indefinitely","A query times out","A table is locked exclusively","An index is missing"],"correctIndex":0},
  {"id":"db28","text":"Which NoSQL model stores documents as JSON-like objects?","options":["Document store","Key-value store","Column family","Graph DB"],"correctIndex":0},
  {"id":"db29","text":"A trigger automatically runs when?","options":["A DML event occurs","A SELECT runs","A user logs in","A backup starts"],"correctIndex":0},
  {"id":"db30","text":"Which aggregate returns the largest value?","options":["MAX","MIN","SUM","COUNT"],"correctIndex":0}
]$q$::jsonb,
question_count = 30
where category = 'Database Systems';

-- ─────────────────────────────────────────────
-- 4. Operating Systems – 30 questions
-- ─────────────────────────────────────────────
update public.quizzes
set questions = $q$[
  {"id":"os1","text":"Which component manages computer hardware resources?","options":["Operating system","Text editor","Compiler","Browser"],"correctIndex":0},
  {"id":"os2","text":"A program currently being executed is a?","options":["Process","File","Thread pool","Device driver"],"correctIndex":0},
  {"id":"os3","text":"Which scheduling algorithm uses time slices?","options":["Round robin","FCFS only","Priority inversion","Paging"],"correctIndex":0},
  {"id":"os4","text":"Virtual memory uses which storage as an extension of RAM?","options":["Disk","Keyboard","Cache only","GPU"],"correctIndex":0},
  {"id":"os5","text":"What is a deadlock?","options":["Processes wait forever for resources","A fast CPU","A backup process","A file system"],"correctIndex":0},
  {"id":"os6","text":"Which memory is fastest?","options":["CPU cache","Hard disk","Optical disk","USB drive"],"correctIndex":0},
  {"id":"os7","text":"A thread is?","options":["A lightweight unit of execution","A database row","A network cable","A file system"],"correctIndex":0},
  {"id":"os8","text":"Which is a file system responsibility?","options":["Organizing files","Writing JavaScript","Resolving DNS","Rendering HTML"],"correctIndex":0},
  {"id":"os9","text":"Paging divides memory into fixed-size?","options":["Pages and frames","Processes and threads","Keys and values","Tables and rows"],"correctIndex":0},
  {"id":"os10","text":"Which mode has unrestricted hardware access?","options":["Kernel mode","User mode","Safe mode","Sleep mode"],"correctIndex":0},
  {"id":"os11","text":"What is a semaphore used for?","options":["Process synchronisation","File encryption","Network routing","Memory allocation"],"correctIndex":0},
  {"id":"os12","text":"FCFS scheduling processes jobs in?","options":["Arrival order","Priority order","Shortest job first","Round-robin"],"correctIndex":0},
  {"id":"os13","text":"Which condition is NOT required for deadlock?","options":["Preemption allowed","Mutual exclusion","Hold and wait","Circular wait"],"correctIndex":0},
  {"id":"os14","text":"A context switch is?","options":["Saving and loading process state","A hardware interrupt","Swapping files","A network operation"],"correctIndex":0},
  {"id":"os15","text":"The page table maps?","options":["Virtual to physical addresses","Files to inodes","Threads to cores","Ports to services"],"correctIndex":0},
  {"id":"os16","text":"An inode stores?","options":["File metadata","File data directly","Network packets","Process state"],"correctIndex":0},
  {"id":"os17","text":"Which IPC mechanism passes data through a shared buffer?","options":["Pipe","Signal","Socket (UDP)","Mutex"],"correctIndex":0},
  {"id":"os18","text":"Thrashing occurs when?","options":["Too much time spent paging","CPU runs too fast","Disk is full","Network congested"],"correctIndex":0},
  {"id":"os19","text":"Which OS component handles I/O device communication?","options":["Device driver","Scheduler","Linker","Shell"],"correctIndex":0},
  {"id":"os20","text":"A zombie process is?","options":["Finished but not reaped by parent","A runaway loop","A malware type","An orphan thread"],"correctIndex":0},
  {"id":"os21","text":"Multiprogramming improves?","options":["CPU utilisation","Network bandwidth","Disk speed","Screen resolution"],"correctIndex":0},
  {"id":"os22","text":"Which page replacement policy replaces the least recently used page?","options":["LRU","FIFO","Optimal","Random"],"correctIndex":0},
  {"id":"os23","text":"A mutex differs from a semaphore because?","options":["Only the locking thread can unlock it","It allows multiple threads","It is slower","It uses files"],"correctIndex":0},
  {"id":"os24","text":"Which system call creates a new process in Unix?","options":["fork()","exec()","wait()","kill()"],"correctIndex":0},
  {"id":"os25","text":"Segmentation divides memory into?","options":["Variable-size logical segments","Fixed pages","Equal partitions","Registers"],"correctIndex":0},
  {"id":"os26","text":"The shell is?","options":["A user interface to the OS","The OS kernel","A device driver","A file system"],"correctIndex":0},
  {"id":"os27","text":"Which scheduling aims to minimise average waiting time?","options":["SJF","FCFS","Round robin","Priority"],"correctIndex":0},
  {"id":"os28","text":"An interrupt is?","options":["A signal to the CPU to handle an event","A type of memory","A file operation","A network packet"],"correctIndex":0},
  {"id":"os29","text":"Copy-on-write optimises?","options":["Memory sharing after fork","File encryption","Context switching","Disk I/O"],"correctIndex":0},
  {"id":"os30","text":"Which file allocation method suffers from external fragmentation?","options":["Contiguous","Linked","Indexed","Extent-based"],"correctIndex":0}
]$q$::jsonb,
question_count = 30
where category = 'Operating Systems';

-- ─────────────────────────────────────────────
-- 5. Computer Networks – 30 questions
-- ─────────────────────────────────────────────
update public.quizzes
set questions = $q$[
  {"id":"net1","text":"Which protocol translates domain names to IP addresses?","options":["DNS","FTP","SMTP","ARP"],"correctIndex":0},
  {"id":"net2","text":"Which layer routes packets in the OSI model?","options":["Network layer","Transport layer","Session layer","Physical layer"],"correctIndex":0},
  {"id":"net3","text":"TCP is best described as?","options":["Connection-oriented and reliable","Wireless only","A database protocol","A markup language"],"correctIndex":0},
  {"id":"net4","text":"Which device forwards packets between networks?","options":["Router","Monitor","Hub only","Keyboard"],"correctIndex":0},
  {"id":"net5","text":"HTTPS secures HTTP using?","options":["TLS","SQL","CSS","DNS"],"correctIndex":0},
  {"id":"net6","text":"What is an IPv4 address length?","options":["32 bits","16 bits","64 bits","128 bits"],"correctIndex":0},
  {"id":"net7","text":"Which protocol transfers web pages?","options":["HTTP","SSH","POP3","SNMP"],"correctIndex":0},
  {"id":"net8","text":"A MAC address operates at which OSI layer?","options":["Data link","Application","Transport","Presentation"],"correctIndex":0},
  {"id":"net9","text":"Which port is the default for HTTPS?","options":["443","80","21","25"],"correctIndex":0},
  {"id":"net10","text":"A LAN usually covers?","options":["A small local area","The whole internet","Only satellites","One continent"],"correctIndex":0},
  {"id":"net11","text":"UDP differs from TCP because it is?","options":["Connectionless and faster","Connection-oriented","Error-correcting","Slower"],"correctIndex":0},
  {"id":"net12","text":"The OSI model has how many layers?","options":["7","4","5","6"],"correctIndex":0},
  {"id":"net13","text":"Which device operates only at the physical layer?","options":["Hub","Switch","Router","Firewall"],"correctIndex":0},
  {"id":"net14","text":"What does ARP resolve?","options":["IP address to MAC address","Domain to IP","Port to protocol","Packet to frame"],"correctIndex":0},
  {"id":"net15","text":"Which protocol is used for email delivery between servers?","options":["SMTP","IMAP","POP3","FTP"],"correctIndex":0},
  {"id":"net16","text":"An IPv6 address is how many bits long?","options":["128","32","64","256"],"correctIndex":0},
  {"id":"net17","text":"Which topology connects all devices to a central node?","options":["Star","Bus","Ring","Mesh"],"correctIndex":0},
  {"id":"net18","text":"NAT stands for?","options":["Network Address Translation","Node Access Table","Network Allocation Token","Null Address Tag"],"correctIndex":0},
  {"id":"net19","text":"Which layer of TCP/IP handles end-to-end communication?","options":["Transport","Internet","Network access","Application"],"correctIndex":0},
  {"id":"net20","text":"A subnet mask is used to?","options":["Divide IP into network and host parts","Encrypt packets","Resolve domain names","Assign MAC addresses"],"correctIndex":0},
  {"id":"net21","text":"Which protocol automatically assigns IP addresses?","options":["DHCP","DNS","ARP","SNMP"],"correctIndex":0},
  {"id":"net22","text":"SSL/TLS operates at which OSI layer?","options":["Presentation/Session","Physical","Network","Data link"],"correctIndex":0},
  {"id":"net23","text":"Ping uses which protocol?","options":["ICMP","TCP","UDP","HTTP"],"correctIndex":0},
  {"id":"net24","text":"A packet-switched network sends data as?","options":["Individual packets that may take different paths","A continuous stream on a fixed path","Radio signals","Serial bits only"],"correctIndex":0},
  {"id":"net25","text":"What does a firewall do?","options":["Filters network traffic by rules","Boosts Wi-Fi signal","Assigns IP addresses","Translates protocols"],"correctIndex":0},
  {"id":"net26","text":"Which port does FTP use by default?","options":["21","80","25","443"],"correctIndex":0},
  {"id":"net27","text":"A VLAN logically segments a network at which layer?","options":["Data link","Network","Transport","Application"],"correctIndex":0},
  {"id":"net28","text":"Latency is best defined as?","options":["Time for data to travel from source to destination","Total data transferred","Bits per second","Packet loss rate"],"correctIndex":0},
  {"id":"net29","text":"Which routing protocol is used within an autonomous system?","options":["OSPF","BGP","HTTP","SMTP"],"correctIndex":0},
  {"id":"net30","text":"A WAN covers?","options":["Large geographic areas","A single building","Only two computers","A campus network"],"correctIndex":0}
]$q$::jsonb,
question_count = 30
where category = 'Computer Networks';

-- ─────────────────────────────────────────────
-- 6. Web Development – 30 questions
-- ─────────────────────────────────────────────
update public.quizzes
set questions = $q$[
  {"id":"web1","text":"Which language structures a web page?","options":["HTML","CSS","SQL","C"],"correctIndex":0},
  {"id":"web2","text":"Which language is mainly used for page styling?","options":["CSS","HTML","Python","JSON"],"correctIndex":0},
  {"id":"web3","text":"Which HTTP method is commonly used to retrieve a resource?","options":["GET","POST","DELETE","PATCH"],"correctIndex":0},
  {"id":"web4","text":"What does DOM stand for?","options":["Document Object Model","Data Output Method","Digital Object Memory","Document Order Map"],"correctIndex":0},
  {"id":"web5","text":"Which HTML element creates a hyperlink?","options":["a","link","p","img"],"correctIndex":0},
  {"id":"web6","text":"JSON is commonly used to?","options":["Exchange structured data","Style elements","Compile C code","Encrypt disks"],"correctIndex":0},
  {"id":"web7","text":"Which status code means Not Found?","options":["404","200","201","500"],"correctIndex":0},
  {"id":"web8","text":"JavaScript runs in a browser mainly to?","options":["Add interactivity","Replace all HTML","Store BIOS","Route network packets"],"correctIndex":0},
  {"id":"web9","text":"Which CSS layout system is one-dimensional?","options":["Flexbox","Grid","Table","Float"],"correctIndex":0},
  {"id":"web10","text":"What does responsive design adapt to?","options":["Screen sizes","Database schemas","CPU architecture","File permissions"],"correctIndex":0},
  {"id":"web11","text":"Which HTTP status means OK?","options":["200","301","404","500"],"correctIndex":0},
  {"id":"web12","text":"REST APIs typically exchange data in which format?","options":["JSON","XML only","CSV","Binary"],"correctIndex":0},
  {"id":"web13","text":"Which HTML tag defines the largest heading?","options":["h1","h6","header","title"],"correctIndex":0},
  {"id":"web14","text":"CSS selects elements by class using?","options":[".classname","#classname","*classname","@classname"],"correctIndex":0},
  {"id":"web15","text":"Which JavaScript method adds an element at the end of an array?","options":["push()","pop()","shift()","splice()"],"correctIndex":0},
  {"id":"web16","text":"What is CORS?","options":["Cross-Origin Resource Sharing","Core Object Rendering System","Client-Origin Request Security","Content Output Rendering Schema"],"correctIndex":0},
  {"id":"web17","text":"Which attribute makes an input field required in HTML5?","options":["required","mandatory","must","validate"],"correctIndex":0},
  {"id":"web18","text":"What does SPA stand for in web development?","options":["Single Page Application","Secure Protocol Access","Server Push Architecture","Static Page Aggregator"],"correctIndex":0},
  {"id":"web19","text":"Which HTTP method is used to fully update a resource?","options":["PUT","GET","DELETE","HEAD"],"correctIndex":0},
  {"id":"web20","text":"localStorage stores data?","options":["In the browser with no expiry","On the server","In cookies only","In session only"],"correctIndex":0},
  {"id":"web21","text":"Which tag embeds a script in HTML?","options":["script","code","js","link"],"correctIndex":0},
  {"id":"web22","text":"CSS Grid is best for?","options":["Two-dimensional layouts","One-dimensional layouts","Animations only","Database tables"],"correctIndex":0},
  {"id":"web23","text":"Which HTTP status indicates a server error?","options":["500","200","301","404"],"correctIndex":0},
  {"id":"web24","text":"What is a cookie?","options":["Small data stored in the browser by the server","A type of database","A CSS property","An HTML tag"],"correctIndex":0},
  {"id":"web25","text":"Which tool bundles JavaScript modules?","options":["Webpack","Notepad","MySQL","Apache"],"correctIndex":0},
  {"id":"web26","text":"The box model in CSS includes?","options":["Content, padding, border, margin","Only content and border","Width and height only","Flex and grid"],"correctIndex":0},
  {"id":"web27","text":"What is semantic HTML?","options":["Using meaningful tags like article and nav","Using only div and span","Minified HTML","Encrypted HTML"],"correctIndex":0},
  {"id":"web28","text":"Which JavaScript feature allows asynchronous code to look synchronous?","options":["async/await","callbacks only","setTimeout","eval"],"correctIndex":0},
  {"id":"web29","text":"What does CDN stand for?","options":["Content Delivery Network","Central Data Node","Client Domain Name","Code Distribution Network"],"correctIndex":0},
  {"id":"web30","text":"Which HTTP method deletes a resource?","options":["DELETE","REMOVE","CLEAR","DESTROY"],"correctIndex":0}
]$q$::jsonb,
question_count = 30
where category = 'Web Development';

-- ─────────────────────────────────────────────
-- 7. Software Engineering – 30 questions
-- ─────────────────────────────────────────────
update public.quizzes
set questions = $q$[
  {"id":"se1","text":"What is the main purpose of version control?","options":["Track changes to code","Compile programs","Host databases","Create UI colors"],"correctIndex":0},
  {"id":"se2","text":"Which test checks a small isolated unit of code?","options":["Unit test","System test","Acceptance test","Load test"],"correctIndex":0},
  {"id":"se3","text":"Agile development emphasizes?","options":["Iterative delivery and feedback","One final release only","No planning","Avoiding users"],"correctIndex":0},
  {"id":"se4","text":"A requirement describes?","options":["What a system should do","How RAM works","A CSS property","A SQL keyword"],"correctIndex":0},
  {"id":"se5","text":"Which Git command records staged changes?","options":["git commit","git clone","git fetch","git status"],"correctIndex":0},
  {"id":"se6","text":"Refactoring means?","options":["Improve code without changing behavior","Add a database","Delete all tests","Release a product"],"correctIndex":0},
  {"id":"se7","text":"A UML use-case diagram shows?","options":["User interactions with a system","Network packet routes","SQL query results","CPU registers"],"correctIndex":0},
  {"id":"se8","text":"Which principle reduces duplication?","options":["DRY","KISS only","FIFO","ACID"],"correctIndex":0},
  {"id":"se9","text":"Code review helps teams?","options":["Find issues and share knowledge","Avoid tests","Increase bugs","Remove documentation"],"correctIndex":0},
  {"id":"se10","text":"A bug is?","options":["A defect in software","A version tag","A test plan","A database key"],"correctIndex":0},
  {"id":"se11","text":"What is continuous integration?","options":["Merging code frequently with automated builds","Manual deployment only","Writing tests after release","Designing UML diagrams"],"correctIndex":0},
  {"id":"se12","text":"The Waterfall model is?","options":["A sequential development process","Iterative and incremental","Focused on sprints","Based on prototyping"],"correctIndex":0},
  {"id":"se13","text":"Which SOLID principle says a class should have one reason to change?","options":["Single Responsibility","Open/Closed","Liskov Substitution","Interface Segregation"],"correctIndex":0},
  {"id":"se14","text":"A sprint in Scrum typically lasts?","options":["1-4 weeks","6 months","1 year","1 day"],"correctIndex":0},
  {"id":"se15","text":"Integration testing checks?","options":["Interactions between combined modules","A single function","UI only","Database schema"],"correctIndex":0},
  {"id":"se16","text":"A design pattern is?","options":["A reusable solution to a common problem","A programming language","A testing tool","A build system"],"correctIndex":0},
  {"id":"se17","text":"Which Git command creates a new branch?","options":["git branch","git merge","git pull","git push"],"correctIndex":0},
  {"id":"se18","text":"SOLID stands for a set of?","options":["Object-oriented design principles","Database normalisation rules","Network protocols","Testing strategies"],"correctIndex":0},
  {"id":"se19","text":"Technical debt refers to?","options":["Cost of poor design decisions made for speed","Actual financial debt","Hardware costs","Licensing fees"],"correctIndex":0},
  {"id":"se20","text":"A pull request is used to?","options":["Propose and review code changes","Download a repository","Delete a branch","Run tests locally"],"correctIndex":0},
  {"id":"se21","text":"Which testing type verifies the system meets business requirements?","options":["Acceptance testing","Unit testing","Regression testing","Load testing"],"correctIndex":0},
  {"id":"se22","text":"Pair programming means?","options":["Two developers work at one machine","Writing tests in pairs","Deploying twice","Merging two branches"],"correctIndex":0},
  {"id":"se23","text":"The Singleton pattern ensures?","options":["Only one instance of a class exists","Classes inherit one parent","Interfaces are segregated","Functions are pure"],"correctIndex":0},
  {"id":"se24","text":"Which diagram shows the structure of classes and their relationships?","options":["Class diagram","Sequence diagram","Use case diagram","Activity diagram"],"correctIndex":0},
  {"id":"se25","text":"DevOps aims to?","options":["Bridge development and operations for faster delivery","Replace agile","Remove testing","Avoid version control"],"correctIndex":0},
  {"id":"se26","text":"Which metric measures test coverage?","options":["Code coverage %","Lines of code","Number of commits","Sprint velocity"],"correctIndex":0},
  {"id":"se27","text":"A microservice architecture splits an app into?","options":["Small independently deployable services","One large binary","Monolithic layers","Only frontend and backend"],"correctIndex":0},
  {"id":"se28","text":"What does TDD stand for?","options":["Test-Driven Development","Type-Defined Design","Tool-Dependent Debugging","Timed Deployment Directive"],"correctIndex":0},
  {"id":"se29","text":"The Open/Closed principle states that code should be?","options":["Open for extension, closed for modification","Open source only","Closed source","Open for all modifications"],"correctIndex":0},
  {"id":"se30","text":"Which tool is commonly used for automated builds?","options":["Jenkins","Notepad","MySQL","Photoshop"],"correctIndex":0}
]$q$::jsonb,
question_count = 30
where category = 'Software Engineering';

-- ─────────────────────────────────────────────
-- 8. Theory of Computation – 30 questions
-- ─────────────────────────────────────────────
update public.quizzes
set questions = $q$[
  {"id":"toc1","text":"A finite automaton has?","options":["Finite states","Infinite memory","No transitions","Only one input"],"correctIndex":0},
  {"id":"toc2","text":"A DFA has how many transitions per state for each input symbol?","options":["Exactly one","Zero only","At least two","Infinitely many"],"correctIndex":0},
  {"id":"toc3","text":"Which machine recognizes context-free languages?","options":["Pushdown automaton","Finite automaton only","Assembler","Router"],"correctIndex":0},
  {"id":"toc4","text":"Regular expressions describe?","options":["Regular languages","All possible languages","Database queries","Only binary files"],"correctIndex":0},
  {"id":"toc5","text":"The empty string is commonly denoted by?","options":["epsilon","delta","sigma","lambda only in code"],"correctIndex":0},
  {"id":"toc6","text":"A grammar consists of terminals, nonterminals, productions, and?","options":["A start symbol","A database","A CPU","An IP address"],"correctIndex":0},
  {"id":"toc7","text":"The Church-Turing thesis concerns?","options":["What is effectively computable","Network speed","Database normalization","UI design"],"correctIndex":0},
  {"id":"toc8","text":"A Turing machine has an unbounded?","options":["Tape","Stack only","Number of states","Input alphabet"],"correctIndex":0},
  {"id":"toc9","text":"Which language class is recognized by a DFA?","options":["Regular","Context-sensitive only","Undecidable","Recursive enumerable only"],"correctIndex":0},
  {"id":"toc10","text":"The halting problem is?","options":["Undecidable","A sorting algorithm","A network protocol","A normal form"],"correctIndex":0},
  {"id":"toc11","text":"An NFA differs from a DFA in that it can have?","options":["Multiple transitions for the same input","Only one accept state","No epsilon transitions","Unlimited memory"],"correctIndex":0},
  {"id":"toc12","text":"Every NFA can be converted to an equivalent?","options":["DFA","PDA","Turing machine","Context-free grammar"],"correctIndex":0},
  {"id":"toc13","text":"A context-free grammar generates?","options":["Context-free languages","Regular languages only","Recursively enumerable languages","Decidable languages"],"correctIndex":0},
  {"id":"toc14","text":"The pumping lemma for regular languages is used to?","options":["Prove a language is NOT regular","Generate regular expressions","Build a DFA","Convert grammars"],"correctIndex":0},
  {"id":"toc15","text":"A language is decidable if?","options":["A TM always halts and accepts or rejects","A DFA recognises it","A PDA accepts it","It is context-free"],"correctIndex":0},
  {"id":"toc16","text":"Epsilon transitions in an NFA mean?","options":["State changes without consuming input","The machine rejects","The tape moves left","Only one path exists"],"correctIndex":0},
  {"id":"toc17","text":"Which closure property holds for regular languages under union?","options":["Closed (union of two regular is regular)","Not closed","Only closed for finite languages","Closed only for DFAs"],"correctIndex":0},
  {"id":"toc18","text":"A PDA extends an NFA with?","options":["A stack","A tape","Infinite states","Multiple heads"],"correctIndex":0},
  {"id":"toc19","text":"Chomsky Normal Form requires grammar rules of the form?","options":["A→BC or A→a","A→ε only","A→aB","S→A|B"],"correctIndex":0},
  {"id":"toc20","text":"A recursively enumerable language is accepted by?","options":["A Turing machine","A DFA","A PDA","A finite automaton"],"correctIndex":0},
  {"id":"toc21","text":"The complement of a decidable language is?","options":["Also decidable","Undecidable","Context-free","Regular"],"correctIndex":0},
  {"id":"toc22","text":"Which problem asks if two CFGs generate the same language?","options":["CFL equivalence (undecidable)","Post correspondence problem","Halting problem","3-SAT"],"correctIndex":0},
  {"id":"toc23","text":"A universal Turing machine can?","options":["Simulate any other Turing machine","Only accept regular languages","Run faster than all TMs","Solve the halting problem"],"correctIndex":0},
  {"id":"toc24","text":"The set of all strings over alphabet Σ is denoted?","options":["Σ*","Σ+","Σ⁰","Σ∅"],"correctIndex":0},
  {"id":"toc25","text":"Ambiguity in a grammar means?","options":["A string has more than one parse tree","Grammar has no start symbol","Grammar produces no strings","All strings are rejected"],"correctIndex":0},
  {"id":"toc26","text":"Rice's theorem states that any non-trivial property of TM languages is?","options":["Undecidable","Decidable","Regular","Context-free"],"correctIndex":0},
  {"id":"toc27","text":"Which language class is strictly larger than regular languages?","options":["Context-free","Regular","Finite","Counter"],"correctIndex":0},
  {"id":"toc28","text":"An accept state in an automaton is also called?","options":["Final state","Start state","Trap state","Dead state"],"correctIndex":0},
  {"id":"toc29","text":"The language {aⁿbⁿ | n ≥ 0} is?","options":["Context-free but not regular","Regular","Decidable but not CFL","Undecidable"],"correctIndex":0},
  {"id":"toc30","text":"P vs NP asks whether?","options":["Every problem verifiable in polynomial time is also solvable in polynomial time","All problems are decidable","NFA = DFA in power","Context-free = regular"],"correctIndex":0}
]$q$::jsonb,
question_count = 30
where category = 'Theory of Computation';
