-- BSc Computer Science starter library. Safe to run more than once.
insert into public.quizzes (title, description, category, difficulty, question_count, duration_minutes, questions)
select title, description, category, difficulty, 10, 12, questions::jsonb
from (values
('Programming Fundamentals','Core concepts of programming, algorithms, and C/Python basics.','Programming Fundamentals','Easy',$q$[
{"id":"pf1","text":"Which construct repeats a block while a condition is true?","options":["loop","class","array","compiler"],"correctIndex":0,"explanation":"Loops repeat work according to a condition."},
{"id":"pf2","text":"What does a compiler do?","options":["Executes only HTML","Translates source code to machine code","Stores data in tables","Draws a user interface"],"correctIndex":1},
{"id":"pf3","text":"Which data type stores true or false?","options":["Boolean","Integer","String","Float"],"correctIndex":0},
{"id":"pf4","text":"What is an algorithm?","options":["A step-by-step solution","A hardware device","A database table","A programming error"],"correctIndex":0},
{"id":"pf5","text":"Which operator checks equality in most programming languages?","options":["=","==","+","%"],"correctIndex":1},
{"id":"pf6","text":"What is the output of 17 % 5?","options":["2","3","5","12"],"correctIndex":0},
{"id":"pf7","text":"A variable is best described as?","options":["A named storage location","A CPU register only","A loop type","A file extension"],"correctIndex":0},
{"id":"pf8","text":"Which statement exits a loop immediately in C-like languages?","options":["continue","break","return type","import"],"correctIndex":1},
{"id":"pf9","text":"What is debugging?","options":["Finding and fixing errors","Compressing source code","Designing a database","Installing an OS"],"correctIndex":0},
{"id":"pf10","text":"Which is a valid function purpose?","options":["Reuse a task","Increase screen brightness","Create hardware","Replace memory"],"correctIndex":0}
]$q$),
('Data Structures','Arrays, linked lists, stacks, queues, trees, and their properties.','Data Structures','Medium',$q$[
{"id":"ds1","text":"Which structure follows LIFO order?","options":["Queue","Stack","Array","Graph"],"correctIndex":1},
{"id":"ds2","text":"Which structure follows FIFO order?","options":["Stack","Tree","Queue","Heap"],"correctIndex":2},
{"id":"ds3","text":"What is the first node of a linked list called?","options":["Root","Head","Leaf","Tail pointer"],"correctIndex":1},
{"id":"ds4","text":"Binary search requires which condition?","options":["Sorted data","A linked list","Duplicate values","A hash table"],"correctIndex":0},
{"id":"ds5","text":"What is the average lookup time of a good hash table?","options":["O(1)","O(n)","O(n²)","O(log n) always"],"correctIndex":0},
{"id":"ds6","text":"A tree node with no children is a?","options":["Root","Leaf","Parent","Branch"],"correctIndex":1},
{"id":"ds7","text":"Which traversal visits left subtree, root, right subtree?","options":["Preorder","Inorder","Postorder","Level order"],"correctIndex":1},
{"id":"ds8","text":"What is push used for on a stack?","options":["Add an item","Remove an item","Sort items","Search items"],"correctIndex":0},
{"id":"ds9","text":"Which data structure is ideal for a print queue?","options":["Queue","Stack","Binary tree","Set"],"correctIndex":0},
{"id":"ds10","text":"What is the worst-case time for linear search?","options":["O(1)","O(log n)","O(n)","O(n log n)"],"correctIndex":2}
]$q$),
('Database Systems','Relational models, SQL, keys, normalization, and transactions.','Database Systems','Medium',$q$[
{"id":"db1","text":"Which key uniquely identifies every row in a table?","options":["Foreign key","Primary key","Composite view","Index"],"correctIndex":1},
{"id":"db2","text":"Which SQL command retrieves rows?","options":["SELECT","UPDATE","DELETE","ALTER"],"correctIndex":0},
{"id":"db3","text":"A foreign key primarily enforces?","options":["Referential integrity","File compression","Encryption","Sorting"],"correctIndex":0},
{"id":"db4","text":"Which clause filters rows before grouping?","options":["WHERE","HAVING","ORDER BY","JOIN"],"correctIndex":0},
{"id":"db5","text":"What does SQL stand for?","options":["Structured Query Language","Simple Queue Logic","System Query Link","Sequential Question Language"],"correctIndex":0},
{"id":"db6","text":"Which normal form removes partial dependency?","options":["1NF","2NF","3NF","BCNF"],"correctIndex":1},
{"id":"db7","text":"Which operation combines matching rows from two tables?","options":["JOIN","DROP","GRANT","COMMIT"],"correctIndex":0},
{"id":"db8","text":"What does COMMIT do in a transaction?","options":["Makes changes permanent","Deletes a table","Starts a query","Creates a backup"],"correctIndex":0},
{"id":"db9","text":"Which aggregate counts rows?","options":["COUNT","SUM","AVG","MAX"],"correctIndex":0},
{"id":"db10","text":"An index is mainly used to?","options":["Speed up retrieval","Store passwords","Replace tables","Avoid SQL"],"correctIndex":0}
]$q$),
('Operating Systems','Processes, memory, scheduling, files, and operating system services.','Operating Systems','Medium',$q$[
{"id":"os1","text":"Which component manages computer hardware resources?","options":["Operating system","Text editor","Compiler","Browser"],"correctIndex":0},
{"id":"os2","text":"A program currently being executed is a?","options":["Process","File","Thread pool","Device driver"],"correctIndex":0},
{"id":"os3","text":"Which scheduling algorithm uses time slices?","options":["Round robin","FCFS only","Priority inversion","Paging"],"correctIndex":0},
{"id":"os4","text":"Virtual memory uses which storage as an extension of RAM?","options":["Disk","Keyboard","Cache only","GPU"],"correctIndex":0},
{"id":"os5","text":"What is a deadlock?","options":["Processes wait forever for resources","A fast CPU","A backup process","A file system"],"correctIndex":0},
{"id":"os6","text":"Which memory is fastest?","options":["CPU cache","Hard disk","Optical disk","USB drive"],"correctIndex":0},
{"id":"os7","text":"A thread is?","options":["A lightweight unit of execution","A database row","A network cable","A file system"],"correctIndex":0},
{"id":"os8","text":"Which is a file system responsibility?","options":["Organizing files","Writing JavaScript","Resolving DNS","Rendering HTML"],"correctIndex":0},
{"id":"os9","text":"Paging divides memory into fixed-size?","options":["Pages and frames","Processes and threads","Keys and values","Tables and rows"],"correctIndex":0},
{"id":"os10","text":"Which mode has unrestricted hardware access?","options":["Kernel mode","User mode","Safe mode","Sleep mode"],"correctIndex":0}
]$q$),
('Computer Networks','Network models, protocols, addressing, routing, and web communication.','Computer Networks','Medium',$q$[
{"id":"net1","text":"Which protocol translates domain names to IP addresses?","options":["DNS","FTP","SMTP","ARP"],"correctIndex":0},
{"id":"net2","text":"Which layer routes packets in the OSI model?","options":["Network layer","Transport layer","Session layer","Physical layer"],"correctIndex":0},
{"id":"net3","text":"TCP is best described as?","options":["Connection-oriented and reliable","Wireless only","A database protocol","A markup language"],"correctIndex":0},
{"id":"net4","text":"Which device forwards packets between networks?","options":["Router","Monitor","Hub only","Keyboard"],"correctIndex":0},
{"id":"net5","text":"HTTPS secures HTTP using?","options":["TLS","SQL","CSS","DNS"],"correctIndex":0},
{"id":"net6","text":"What is an IPv4 address length?","options":["32 bits","16 bits","64 bits","128 bits"],"correctIndex":0},
{"id":"net7","text":"Which protocol transfers web pages?","options":["HTTP","SSH","POP3","SNMP"],"correctIndex":0},
{"id":"net8","text":"A MAC address operates at which OSI layer?","options":["Data link","Application","Transport","Presentation"],"correctIndex":0},
{"id":"net9","text":"Which port is the default for HTTPS?","options":["443","80","21","25"],"correctIndex":0},
{"id":"net10","text":"A LAN usually covers?","options":["A small local area","The whole internet","Only satellites","One continent"],"correctIndex":0}
]$q$),
('Web Development','HTML, CSS, JavaScript, HTTP, APIs, and modern browser basics.','Web Development','Easy',$q$[
{"id":"web1","text":"Which language structures a web page?","options":["HTML","CSS","SQL","C"],"correctIndex":0},
{"id":"web2","text":"Which language is mainly used for page styling?","options":["CSS","HTML","Python","JSON"],"correctIndex":0},
{"id":"web3","text":"Which HTTP method is commonly used to retrieve a resource?","options":["GET","POST","DELETE","PATCH"],"correctIndex":0},
{"id":"web4","text":"What does DOM stand for?","options":["Document Object Model","Data Output Method","Digital Object Memory","Document Order Map"],"correctIndex":0},
{"id":"web5","text":"Which HTML element creates a hyperlink?","options":["a","link","p","img"],"correctIndex":0},
{"id":"web6","text":"JSON is commonly used to?","options":["Exchange structured data","Style elements","Compile C code","Encrypt disks"],"correctIndex":0},
{"id":"web7","text":"Which status code means Not Found?","options":["404","200","201","500"],"correctIndex":0},
{"id":"web8","text":"JavaScript runs in a browser mainly to?","options":["Add interactivity","Replace all HTML","Store BIOS","Route network packets"],"correctIndex":0},
{"id":"web9","text":"Which CSS layout system is one-dimensional?","options":["Flexbox","Grid","Table","Float"],"correctIndex":0},
{"id":"web10","text":"What does responsive design adapt to?","options":["Screen sizes","Database schemas","CPU architecture","File permissions"],"correctIndex":0}
]$q$),
('Software Engineering','Development processes, testing, design, version control, and quality.','Software Engineering','Medium',$q$[
{"id":"se1","text":"What is the main purpose of version control?","options":["Track changes to code","Compile programs","Host databases","Create UI colors"],"correctIndex":0},
{"id":"se2","text":"Which test checks a small isolated unit of code?","options":["Unit test","System test","Acceptance test","Load test"],"correctIndex":0},
{"id":"se3","text":"Agile development emphasizes?","options":["Iterative delivery and feedback","One final release only","No planning","Avoiding users"],"correctIndex":0},
{"id":"se4","text":"A requirement describes?","options":["What a system should do","How RAM works","A CSS property","A SQL keyword"],"correctIndex":0},
{"id":"se5","text":"Which Git command records staged changes?","options":["git commit","git clone","git fetch","git status"],"correctIndex":0},
{"id":"se6","text":"Refactoring means?","options":["Improve code without changing behavior","Add a database","Delete all tests","Release a product"],"correctIndex":0},
{"id":"se7","text":"A UML use-case diagram shows?","options":["User interactions with a system","Network packet routes","SQL query results","CPU registers"],"correctIndex":0},
{"id":"se8","text":"Which principle reduces duplication?","options":["DRY","KISS only","FIFO","ACID"],"correctIndex":0},
{"id":"se9","text":"Code review helps teams?","options":["Find issues and share knowledge","Avoid tests","Increase bugs","Remove documentation"],"correctIndex":0},
{"id":"se10","text":"A bug is?","options":["A defect in software","A version tag","A test plan","A database key"],"correctIndex":0}
]$q$),
('Theory of Computation','Automata, formal languages, grammars, and computability foundations.','Theory of Computation','Hard',$q$[
{"id":"toc1","text":"A finite automaton has?","options":["Finite states","Infinite memory","No transitions","Only one input"],"correctIndex":0},
{"id":"toc2","text":"A DFA has how many transitions per state for each input symbol?","options":["Exactly one","Zero only","At least two","Infinitely many"],"correctIndex":0},
{"id":"toc3","text":"Which machine recognizes context-free languages?","options":["Pushdown automaton","Finite automaton only","Assembler","Router"],"correctIndex":0},
{"id":"toc4","text":"Regular expressions describe?","options":["Regular languages","All possible languages","Database queries","Only binary files"],"correctIndex":0},
{"id":"toc5","text":"The empty string is commonly denoted by?","options":["epsilon","delta","sigma","lambda only in code"],"correctIndex":0},
{"id":"toc6","text":"A grammar consists of terminals, nonterminals, productions, and?","options":["A start symbol","A database","A CPU","An IP address"],"correctIndex":0},
{"id":"toc7","text":"The Church-Turing thesis concerns?","options":["What is effectively computable","Network speed","Database normalization","UI design"],"correctIndex":0},
{"id":"toc8","text":"A Turing machine has an unbounded?","options":["Tape","Stack only","Number of states","Input alphabet"],"correctIndex":0},
{"id":"toc9","text":"Which language class is recognized by a DFA?","options":["Regular","Context-sensitive only","Undecidable","Recursive enumerable only"],"correctIndex":0},
{"id":"toc10","text":"The halting problem is?","options":["Undecidable","A sorting algorithm","A network protocol","A normal form"],"correctIndex":0}
]$q$)
) as seed(title, description, category, difficulty, questions)
where not exists (select 1 from public.quizzes q where q.title = seed.title);
