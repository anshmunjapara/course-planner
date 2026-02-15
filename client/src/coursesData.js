export const initialCourses = [
  {
    id: "CS100",
    label: "CS 100 - Introduction to Computers",
    description:
      "Introduction to the development of computers and computer applications. Topics will include: impact of computers on society, computer organization and operation, construction and representation of algorithms, and applications of computers in the problem-solving process.",
    prereqs: null,
    notes:
      "This class may not be taken for credit if credit has been received for any course numbered above CS 100",
    required: false,
  },
  {
    id: "CS110",
    label: "CS 110 - Programming and Problem Solving",
    description:
      "An introduction to problem-solving techniques, the fundamental concepts of programming, and the software design process. Topics will include: data types, control structures, scope rules, functions, files, and the mechanics of running, testing and debugging. Problems will be drawn from various science disciplines.",
    prereqs: null,
    required: true,
  },
  {
    id: "CS115",
    label: "CS 115 - Object-Oriented Design",
    description:
      "This course focuses on the concepts of object-oriented programming. Topics include data abstraction, classes, composition and inheritance, subtyping, dynamic binding, polymorphism and dynamic memory management. Other topics include type systems, two-dimensional arrays, records, references, searching and sorting algorithms, language translation. Software engineering: comprehensibility, correctness, efficiency, refactoring.",
    prereqs: {
      type: "logic",
      operator: "AND",
      operands: [
        { type: "course", courseId: "CS110", minGrade: 65 },
        {
          type: "logic",
          operator: "OR",
          operands: [
            { type: "course", courseId: "MATH110", concurrentOk: true },
          ],
        },
      ],
    },
    required: true,
  },
  {
    id: "CS165",
    label: "CS 165 - Introduction to Programming with Python",
    description:
      "An introduction to problem-solving techniques using Python. This course will introduce fundamental programming principles and topics: data types, expressions, control structures, elementary data structures, functions, files, and the mechanics of running, testing and debugging. These concepts will be applied to problem solving and applications in data analysis.",
    prereqs: null,
    required: false,
  },
  {
    id: "CS180",
    label: "CS 180 - Human Centred Design",
    description:
      "An overview of human-centred design concepts and the fundamentals of computer graphics in the context of graphical user interfaces. Topics include understanding the user, accessibility and inclusive design, user-centred evaluation methods, graphics output, and the human vision system.",
    prereqs: {
      type: "course",
      courseId: "CS110",
    },
    required: true,
  },
  {
    id: "CS201",
    label: "CS 201 - Introduction to Digital Systems",
    description:
      "Hardware paradigms, logic minimization, sequential and combinational circuits, register transfer notation. Numerical data representation, number bases, floating-point and two's-complement representation, representation of non-numeric data, records and arrays. Von Neumann architecture, control units, instruction sets, assembly language programming, addressing modes, subroutines, basic building blocks, computer components.",
    prereqs: {
      type: "course",
      courseId: "CS110",
    },
    required: true,
  },
  {
    id: "CS203",
    label: "CS 203 - Java Programming and Applications",
    description:
      "Learn to program in the Java programming language. Topics will include the basic building blocks of procedural programming, object-oriented programming, event-oriented programming, graphical user interfaces, simple data structures including arrays and linked lists, and advanced topic including recursion and threads. Problems will be drawn from various science and engineering disciplines.",
    prereqs: {
      type: "course",
      courseId: "CS115",
    },
    required: false,
  },
  {
    id: "CS205",
    label: "CS 205 - Introduction to Multimedia Systems",
    description:
      "Multimedia is the use of computers to integrate texts, graphics, video, animation, and sound in an interactive experience. The course introduces these elements of multimedia and their associated technologies. Students will gain an appreciation of each element and be able to combine them into a finished work.",
    prereqs: {
      type: "course",
      courseId: "CS110",
    },
    required: false,
  },
  {
    id: "CS207",
    label: "CS 207 - Building Interactive Gadgets",
    description:
      "An introduction to building and controlling interactive devices for multimedia art and DIY projects. Build robots, new musical instruments, wearable computers and more. Learn about sensots and actuators: WiFi, Bluetooth, GPS; hardware platforms such as the Arduino; and software platforms such as Processing and MaxMSP.",
    prereqs: {
      type: "logic",
      operator: "OR",
      operands: [
        { type: "course", courseId: "CS100" },
        { type: "course", courseId: "CS110" },
        { type: "credit_hours", value: 30 },
      ],
    },
    required: false,
  },
  {
    id: "CS210",
    label: "CS 210: Data Structures and Abstractions",
    description:
      "This course introduces data abstraction, data structures and their implementations, the basics of algorithmic analysis, and the fundamental computing algorithms. Topics include stacks, queues, heaps, recursion, Master Theorem, asymptotic notation, computational complexity, empirical performance measurement, recursion based sorting algorithms, hashing, and trees (including binary trees, B-trees, and AVL trees).",
    prereqs: {
      type: "logic",
      operator: "AND",
      operands: [
        { type: "course", courseId: "CS115", minGrade: 65 },
        { type: "course", courseId: "MATH110", minGrade: 50 },
      ],
    },
    required: true,
  },
  {
    id: "CS220",
    label: "CS 220 - Theoretical Foundations",
    description:
      "Finite and discrete algebraic structures relating to computers; sets, functions, relations. Machine-oriented logic. Combinatorial problems and algorithms. Finite automata and formal language theory.",
    prereqs: {
      type: "logic",
      operator: "AND",
      operands: [
        { type: "course", courseId: "CS210" },
        { type: "course", courseId: "MATH221" },
        {
          type: "logic",
          operator: "OR",
          operands: [
            { type: "course", courseId: "STAT160" },
            { type: "course", courseId: "STAT200" },
          ],
        },
      ],
    },
    required: true,
  },
  {
    id: "CS261",
    label: "CS 261 - Methods in Numerical Analysis",
    description:
      "Topics will include number systems and errors, solutions of polynomial and other nonlinear equations, interpolation, numerical differentiation and integration, and the cubic spline.",
    prereqs: {
      type: "logic",
      operator: "AND",
      operands: [
        { type: "course", courseId: "MATH111" },
        { type: "course", courseId: "MATH122" },
        {
          type: "logic",
          operator: "OR",
          operands: [
            { type: "course", courseId: "CS110" },
            { type: "course", courseId: "CS165" },
            { type: "course", courseId: "STAT165" },
          ],
        },
      ],
    },
    required: false,
  },
  {
    id: "CS265",
    label: "CS 265 - Introduction to Data Science",
    description:
      "This course introduces data science including current programming languages and libraries for performing data analysis. Topics include data exploration and preparation, data visualization and presentation, computing with data, and an introduction to data modeling and predictive analysis. Technical and communication skills used by data scientists will be introduced.",
    prereqs: {
      type: "logic",
      operator: "AND",
      operands: [
        { type: "course", courseId: "CS110" },
        { type: "course", courseId: "STAT160" },
      ],
    },
    required: false,
  },
  {
    id: "CS280",
    label: "CS 280 - Society, Ethics, & the Profession",
    description:
      "The social and ethical aspects of computing. Professional ethics and communication. A survey of issues related to intellectual property, privacy and civil liberties, sustainability, security policies and laws, computer crimes, and supporting diversity, equity, inclusion, and accessibility in software systems.",
    prereqs: {
      type: "logic",
      operator: "AND",
      operands: [
        { type: "course", courseId: "CS180" },
        { type: "course", courseId: "ENGL100" },
      ],
    },
    required: true,
  },
  {
    id: "CS285",
    label: "CS 285 - Web & Database Programming",
    description:
      "This course shows how interactive database-driven web applications are designed and implemented. Appropriate protocols and languages for web and database programming will be discussed, with a focus on client-server architectures, interface design, event-driven programming. information management, data modeling, database systems, APIs. model-view-controller design patterns.",
    prereqs: {
      type: "logic",
      operator: "AND",
      operands: [
        { type: "course", courseId: "CS210" },
        { type: "course", courseId: "CS280" },
      ],
    },
    required: true,
  },
  // Commented-out courses remain unchanged...
  {
    id: "MATH110",
    label: "MATH 110 - Calculus I",
    description:
      "An introduction to differential calculus. Topics include: functions, limits, continuity, differentiation, and applications of the derivative. Problems will be drawn from various disciplines.",
    prereqs: null,
    required: true,
  },
  {
    id: "MATH221",
    label: "MATH 221 - Proofs",
    description:
      "An introductory course intended to familiarize students with mathematical reasoning and proof techniques, including direct reasoning, indirect reasoning, and mathematical induction. Topics include elementary number theory, logic, sets, functions, and relations.",
    prereqs: null,
    required: true,
  },
  {
    id: "MATH111",
    label: "MATH 111 - Calculus II",
    description:
      "Differentiation and integration of exponential and logarithmic functions; methods of integration and applications; indeterminate forms, L'Hospital's rule and improper integrals; sequences, series, power series and Taylor series.",
    prereqs: { type: "course", courseId: "MATH110" },
    required: true,
  },
  {
    id: "MATH112",
    label: "MATH 112 - Applied Calculus II",
    description:
      "An introduction to calculus in two and three variables, first-order differential equations, infinite series, and calculus of trigonometric functions.",
    prereqs: { type: "course", courseId: "MATH110" },
    required: false,
  },
  {
    id: "MATH213",
    label: "MATH 231 - Euclidean Geometry",
    description:
      "This course is intended to familiarize the student with Euclidean geometry. Topics include the postulates and theorems of both classical and modern Euclidean geometry.",
    prereqs: { type: "course", courseId: "MATH221" },
    required: false,
  },
  {
    id: "MATH122",
    label: "MATH 122 - Linear Algebra I",
    description:
      "A course intended to introduce students to elementary linear algebra, particularly at a computational and applied level. Topics include matrices and systems of equations, inversion, determinants, vectors, inner products, eigenvectors and eigenvalues.",
    prereqs: null,
    required: true,
  },
  {
    id: "MATH261",
    label: "MATH 261 - Methods of Numerical Analysis",
    description:
      "Topics will include number systems and errors, solutions of polynomial and other nonlinear equations, interpolation, numerical differentiation and integration, and the cubic spline.",
    prereqs: {
      type: "logic",
      operator: "AND",
      operands: [
        { type: "course", courseId: "MATH111" },
        { type: "course", courseId: "MATH122" },
        {
          type: "logic",
          operator: "OR",
          operands: [
            { type: "course", courseId: "CS110" },
            { type: "course", courseId: "CS165" },
            { type: "course", courseId: "STAT165" },
          ],
        },
      ],
    },
    required: false,
  },
  {
    id: "MATH361",
    label: "MATH 361 - Numerical Analysis I",
    description:
      "Least squares and other approximations. Difference equations. Solutions of algebraic systems. Symbol manipulators.",
    prereqs: {
      type: "logic",
      operator: "AND",
      operands: [
        { type: "course", courseId: "MATH213" },
        {
          type: "logic",
          operator: "OR",
          operands: [
            { type: "course", courseId: "CS261" },
            { type: "course", courseId: "MATH261" },
          ],
        },
      ],
    },
    required: false,
  },
  {
    id: "STAT160",
    label: "STAT160 - Introductory Statistics",
    description:
      "A comprehensive introduction to probability, probability distributions, sampling distributions, basic techniques of statistical inference, analysis of variance, linear regression, inference for categorical variables, and nonparametric statistics.",
    prereqs: null,
    required: true,
  },
  {
    id: "STAT300",
    label: "STAT 300 - Statistical Learning and Predictive Modeling",
    description:
      "Selected topics and techniques in statistical learning and predictive modeling, including linear models, logistic regression models, regression trees, classification models and statistical software.",
    prereqs: {
      type: "logic",
      operator: "AND",
      operands: [
        { type: "course", courseId: "MATH122" },
        { type: "course", courseId: "STAT252" },
        {
          type: "logic",
          operator: "OR",
          operands: [
            { type: "course", courseId: "CS110" },
            { type: "course", courseId: "CS165" },
            { type: "course", courseId: "STAT165" },
          ],
        },
      ],
    },
    required: false,
  },
  {
    id: "STAT301",
    label: "STAT 301 - Introduction to Statistical Computing",
    description:
      "Selected topics and techniques in statistical learning and predictive modeling, including linear models, logistic regression models, regression trees, classification models and statistical software.",
    prereqs: {
      type: "logic",
      operator: "AND",
      operands: [
        { type: "course", courseId: "MATH122" },
        { type: "course", courseId: "STAT252" },
        { type: "course", courseId: "CS265" },
      ],
    },
    required: false,
  },
  {
    id: "STAT252",
    label: "STAT 252 - Introduction to Statistical Inference",
    description:
      "Sampling distribution theory and the Central Limit Theorem; large sample theory; methods of estimation and hypothesis testing including maximum likelihood estimation, likelihood ratio testing, and confidence interval construction.",
    prereqs: null,
    required: false,
  },
  {
    id: "STAT165",
    label: "STAT 165 - Introduction to Programming with Python",
    description:
      "An introduction to problem-solving techniques using Python. This course will introduce fundamental programming principles and topics: data types, expressions, control structures, elementary data structures, functions, files, and the mechanics of running, testing and debugging. These concepts will be applied to problem solving and applications in data analysis.",
    prereqs: null,
    required: false,
  },
  {
    id: "STAT200",
    label: "STAT 200 - Introductory Statistics",
    description:
      "A comprehensive introduction to probability, probability distributions, sampling distributions, basic techniques of statistical inference, analysis of variance, linear regression, inference for categorical variables, and nonparametric statistics.",
    prereqs: null,
    required: false,
  },
  {
    id: "ENGL100",
    label: "ENGL 100 - Introductory Statistics",
    description:
      "A comprehensive introduction to probability, probability distributions, sampling distributions, basic techniques of statistical inference, analysis of variance, linear regression, inference for categorical variables, and nonparametric statistics.",
    prereqs: null,
    required: true,
  },
  {
    id: "CS301",
    label: "CS 301 - Digital Systems Architecture",
    description:
      "Latency and bandwidth, cache memory, virtual memory, data compression, fault handling. Fundamentals of I/O, interrupts, external storage, buses, networks, multimedia support. Multiprocessor and parallel architectures, parallel decomposition, pipelining, shared memory systems, interconnection networks, cache consistency, memory consistency. Computational paradigms, performance evaluation, and effect of proximity.",
    prereqs: {
      type: "course",
      courseId: "CS201",
    },
    required: true,
  },
  {
    id: "CS315",
    label: "CS 315 - Introduction to Computer Graphics",
    description:
      "Introduction to graphics hardware and software. Two-dimensional graphics rendering algorithms. Basic three-dimensional modeling, transformations, viewing geometry, lighting and shading, hidden surface removal, and texture mapping.",
    prereqs: {
      type: "logic",
      operator: "AND",
      operands: [
        { type: "course", courseId: "CS210" },
        { type: "course", courseId: "MATH122" },
      ],
    },
    required: false,
  },
  {
    id: "CS320",
    label: "CS 320 - Artificial Intelligence",
    description:
      "Foundations and main methods of Artificial Intelligence. Problem characteristics and spaces. Search and optimization techniques with a focus on uninformed and heuristic algorithms. Two player games and constraint satisfaction. Modelling and simulation. Comparison of logic-based, fuzzy, and probabilistic reasoning and knowledge representation methodologies.",
    prereqs: {
      type: "course",
      courseId: "CS220",
    },
    notes:
      "Students may only receive credit for one of CS 320 or ENSE 411 (ENSE 496AC).",
    required: true,
  },
  {
    id: "CS321",
    label: "CS 321 - Machine Learning",
    description:
      "Understand, develop, and apply mechanisms for supervised, unsupervised, and reinforcement learning. Selection of a proper machine learning algorithm for a problem, data preprocessing, evaluation techniques, interpretation of the resulting models, explaining model shortcomings. Biased data sets and other sources of error. Ethical and societal implications of machine learning to practical problems.",
    prereqs: {
      type: "course",
      courseId: "CS320",
    },
    required: false,
  },
  {
    id: "CS330",
    label: "CS 330 - Introduction to Operating Systems",
    description:
      "Overview of operating systems: functionality, and design issues. Operating system principles: structures, abstractions, APIs, resource allocation, proximity, virtualization. Concurrency: process state, context switches, process communication, synchronization. Scheduling: preemption, schedulers, processes, and threads. Memory management. Security and protection. File systems. User interface. Distributed algorithms: consensus, termination, and fault tolerance.",
    prereqs: {
      type: "course",
      courseId: "CS210",
    },
    required: true,
  },
  {
    id: "CS335",
    label: "CS 335 - Computer Networks",
    description:
      "Network architectures and protocols, networked applications, reliable data delivery, routing and forwarding, local area networks, resource allocation, mobility, reliability through redundancy. Security: secure design, defensive programming, threats and attacks, network security, cryptography.",
    prereqs: {
      type: "logic",
      operator: "AND",
      operands: [
        { type: "course", courseId: "CS210", concurrentOk: true },
        {
          type: "logic",
          operator: "OR",
          operands: [
            { type: "course", courseId: "STAT160", concurrentOk: true },
            { type: "course", courseId: "STAT200", concurrentOk: true },
          ],
        },
      ],
    },
    required: true,
  },
  {
    id: "CS340",
    label: "CS 340 - Advanced Data Structures and Algorithm Design",
    description:
      "Fundamental algorithms: depth- and breadth-first traversals, pattern matching, and graph algorithms. Algorithmic strategies: brute-force, greedy, divide-and-conquer, backtracking, branch-and-bound, dynamic programming, and randomized. Algorithm analysis, complexity theory, performance evaluation. Parallelism: fundamentals, algorithms, communication.",
    prereqs: {
      type: "course",
      courseId: "CS220",
    },
    required: true,
  },
  {
    id: "CS350",
    label: "CS 350 - Programming Language Concepts",
    description:
      "Introduction to the theory and implementation of programming languages. Functional programming: immutable data, algebraic datatypes, recursion, and higher-order functions. Type-directed development and equational reasoning. Implementation of programming languages: grammars, syntax trees, program translation, and interpreters. Semantic models of languages: substitution, environments, and mutable state, along with alternate models such as lazy evaluation or dynamic scope.",
    prereqs: {
      type: "course",
      courseId: "CS220",
    },
    required: true,
  },
  {
    id: "CS361",
    label: "CS 361 - Numerical and Symbolic Computing",
    description:
      "Least squares and other approximations. Difference equations. Solutions of algebraic systems. Symbol manipulators.",
    prereqs: {
      type: "logic",
      operator: "AND",
      operands: [
        {
          type: "logic",
          operator: "OR",
          operands: [
            { type: "course", courseId: "CS261", minGrade: 60 },
            { type: "course", courseId: "MATH261", minGrade: 60 },
          ],
        },
        { type: "course", courseId: "MATH213", minGrade: 60 },
      ],
    },
    required: false,
  },
  {
    id: "CS365",
    label: "CS 365 - Data Wrangling",
    description:
      "Introduction to the fundamentals of data wrangling including processes of data acquisition, integration, transformation, and cleaning throughout the data life cycle. Emphasis on the importance of data quality with topics in data integrity, security, and social responsibility. Techniques for effective visualization and communication through project work.",
    prereqs: {
      type: "course",
      courseId: "CS265",
    },
    required: false,
  },
  {
    id: "CS372",
    label: "CS 372 - Software Engineering Methodology",
    description:
      "Fundamental principles of designing programs and developing large software systems that meet specifications and that are safe, secure, reliable and maintainable. Software process models, software project management, requirements engineering, software design, software construction, software verification and validation, software tools and environments, software evolution, software reliability.",
    prereqs: {
      type: "logic",
      operator: "OR",
      operands: [{ type: "course", courseId: "CS285" }],
    },
    required: true,
  },
  {
    id: "CS375",
    label: "CS 375 - Database Systems",
    description:
      "Database systems concepts, data modelling, the role of data in applications, the data lifecycle, approaches to managing large volumes of data, relational databases, NoSQL databases, query languages and construction, query processing and database management system internals, data security and privacy.",
    prereqs: {
      type: "course",
      courseId: "CS210",
    },
    required: false,
  },
  // ... all the commented-out courses remain unchanged ...
  {
    id: "CS401",
    label: "CS 401 - Advanced Digital Systems Architecture",
    description:
      "Advances in computer architecture. Topics will be selected from performance enhancements, digital signal processing architectures, architectures for networks and distributed systems, architectures for mobile devices, and recently proposed architectures.",
    prereqs: {
      type: "course",
      courseId: "CS301",
    },
    required: false,
  },
  {
    id: "CS405",
    label: "CS 405 - Computer Graphics",
    description:
      "Advanced topics in computer graphics, including special modeling techniques for natural phenomenon, advanced illumination models and rendering algorithms.",
    prereqs: {
      type: "course",
      courseId: "CS315",
    },
    required: false,
  },
  {
    id: "CS408",
    label: "CS 408 - Animation Software Design",
    description:
      "This course teaches the design and implementation of software for creating animations. Topics include history of animation, technical background, motion control, keyframe-based animation, kinematics, physically based animation, fluid animation, modelling and animating human figures, facial animation, modelling behavior, and special models for animation.",
    prereqs: {
      type: "logic",
      operator: "OR",
      operands: [
        { type: "course", courseId: "CS315" },
        { type: "course", courseId: "CS320" },
        { type: "course", courseId: "CS330" },
        { type: "course", courseId: "CS340" },
      ],
    },
    required: false,
  },
  {
    id: "CS409",
    label: "CS 409 - Interactive Entertainment Software",
    description:
      "This course teaches the design and implementation of interactive entertainment software, including computer games. Topics include history of interactive software, social factors, principles of interactive entertainment, hardware platforms, current software development tools, game design, game architecture, game physics, collision detection, game graphics, artificial intelligence for games, audio, game production and business aspects.",
    prereqs: {
      type: "logic",
      operator: "OR",
      operands: [
        { type: "course", courseId: "CS315" },
        { type: "course", courseId: "CS320" },
        { type: "course", courseId: "CS330" },
        { type: "course", courseId: "CS340" },
      ],
    },
    required: false,
  },
  {
    id: "CS410",
    label: "CS 410 - Introduction to Compiler Design",
    description:
      "High-level programming language specification. Lexical and syntactic structure, regular expression, finite automata, and lexical analyzer. Context-free grammars and parsing. LR parsers. Symbol tables. Storage allocation. Code optimization and generation.",
    prereqs: {
      type: "logic",
      operator: "AND",
      operands: [{ type: "course", courseId: "CS340" }],
    },
    required: false,
  },
  {
    id: "CS411",
    label: "CS 411 - Computability and Formal Languages",
    description:
      "The notion of effective procedure and Turing machine. The universal Turing machine. Nondeterministic Turing machine. Recursive functions and other computable functions. The halting problem and unsolvability. Grammar and formal language. Finite automata and regular grammars. Context-free grammars and push-down automata. Post correspondence problem. The Chomsky hierarchy of languages and context-sensitive language.",
    prereqs: null,
    required: false,
  },
  {
    id: "CS412",
    label: "CS 412 - Algorithm Analysis",
    description:
      "A formal algorithmic language. Measures of complexity for time and space. Worst-case, average-case, and best-case analysis. Lower and upper bounds of algorithms (techniques include comparison trees, adversary arguments, and reduction). P and NP classes. NP-hardness and NP- completeness. Introduction to parallel computational models and algorithms.",
    prereqs: {
      type: "logic",
      operator: "AND",
      operands: [{ type: "course", courseId: "CS340" }],
    },
    required: false,
  },
  {
    id: "CS421",
    label: "CS 421 - Advanced Artificial Intelligence",
    description:
      "Advanced Artificial Intelligence approaches to approximate reasoning and machine learning. Decision trees and other selected data-based knowledge models. Topics may include logic programming and PROLOG, LISP, Artificial Intelligence in games, data mining, natural language processing, pattern recognition, and planning.",
    prereqs: {
      type: "logic",
      operator: "AND",
      operands: [
        { type: "course", courseId: "CS320" },
        { type: "course", courseId: "CS340" },
      ],
    },
    required: false,
  },
  {
    id: "CS425",
    label: "CS 425 - Computer Vision",
    description:
      "Theory and practice of digital image processing. Topics include fundamentals of visual perception, image formation, representation, and encoding, compression, morphological processing, harmonic analysis, neural networks, feature detection, segmentation, and pattern classification.",
    prereqs: {
      type: "logic",
      operator: "AND",
      operands: [
        { type: "course", courseId: "CS340" },
        { type: "course", courseId: "MATH110" },
        { type: "course", courseId: "MATH122" },
      ],
    },
    required: false,
  },
  {
    id: "CS427",
    label: "CS 427 - Introduction to Computer Audio",
    description:
      "The purpose of this course is to provide a broad overview of many areas of computer audio, including: Digital representation and compression; Psychoacoustics; Surround Sound; Speech recognition and Music Information Retrieval; MIDI and New interfaces for music; and video game sound.",
    prereqs: {
      type: "logic",
      operator: "OR",
      operands: [
        { type: "course", courseId: "CS315" },
        { type: "course", courseId: "CS320" },
        { type: "course", courseId: "CS340" },
      ],
    },
    required: false,
  },
  {
    id: "CS428",
    label: "CS 428 - Human Computer Communications",
    description:
      "This course stresses the importance of good interfaces and the relationship of user interface design to human-computer interaction. Other topics include: interface quality and methods of evaluation; interface design examples; dialogue genre; user-centered design and task analysis; prototyping and the iterative design cycle.",
    prereqs: {
      type: "logic",
      operator: "AND",
      operands: [
        {
          type: "logic",
          operator: "OR",
          operands: [{ type: "course", courseId: "CS285" }],
        },
        { type: "course", courseId: "CS280" },
      ],
    },
    required: false,
  },
  {
    id: "CS430",
    label: "CS 430 - Advanced Topics in Operating Systems",
    description:
      "Advanced operating system concepts. Topics include one or more of the following: distributed systems, real-time operating systems, intelligent networks, communications protocols, and database process control within a client-server framework.",
    prereqs: {
      type: "course",
      courseId: "CS330",
    },
    required: false,
  },
  {
    id: "CS435",
    label: "CS 435 - Cybersecurity",
    description:
      "Foundations of cybersecurity, including a survey of different types of threats. Privacy, including individual and societal impacts. Secure coding and attack prevention techniques. Cryptography, including classical and current approaches to data encryption. Security analysis, design, and engineering.",
    prereqs: {
      type: "logic",
      operator: "AND",
      operands: [
        { type: "course", courseId: "CS330" },
        { type: "course", courseId: "CS335" },
      ],
    },
    required: false,
  },
  {
    id: "CS437",
    label: "CS 437 - Information Visualization",
    description:
      "Focuses on design, development, and study of interactive visualization techniques for the analysis, exploration, and explanation of abstract information.",
    prereqs: {
      type: "logic",
      operator: "AND",
      operands: [
        {
          type: "logic",
          operator: "OR",
          operands: [{ type: "course", courseId: "CS285" }],
        },
        {
          type: "logic",
          operator: "OR",
          operands: [
            { type: "course", courseId: "CS205" },
            { type: "course", courseId: "CS315" },
          ],
        },
      ],
    },
    required: false,
  },
  {
    id: "CS455",
    label: "CS 455 - Mobile Computing",
    description:
      "Mobile Computing focuses on the design and implementation of software in a networked mobile environment. Primary topics include software development practices, network computing, graphics programming, and human-computer interaction for modern mobile devices.",
    prereqs: {
      type: "logic",
      operator: "AND",
      operands: [
        { type: "course", courseId: "CS340" },
        {
          type: "logic",
          operator: "OR",
          operands: [
            { type: "course", courseId: "CS205" },
            { type: "course", courseId: "CS315" },
            { type: "course", courseId: "CS335" },
          ],
        },
      ],
    },
    required: false,
  },
  {
    id: "CS461",
    label: "CS 461 - Advanced Topics in Numerical Analysis",
    description:
      "Numerical solutions of ordinary differential equations. Numerical solutions of partial differential equations. Linear and non-linear problems.",
    prereqs: {
      type: "logic",
      operator: "OR",
      operands: [
        { type: "course", courseId: "CS361", minGrade: 60 },
        { type: "course", courseId: "MATH361", minGrade: 60 },
      ],
    },
    required: false,
  },
  {
    id: "CS465",
    label: "CS 465 - Data Mining",
    description:
      "Knowledge Discovery from Data (KDD). Topics include knowledge discovery, data preparation, data warehousing, pattern mining, classification and regression, cluster analysis, outlier detection, mining complex data types.",
    prereqs: {
      type: "logic",
      operator: "AND",
      operands: [
        { type: "course", courseId: "CS340" },
        { type: "course", courseId: "CS365" },
        { type: "course", courseId: "CS375" },
      ],
    },
    required: false,
  },
  {
    id: "CS476",
    label: "CS 476 - Software Development Project",
    description:
      "Software development projects following all the phases of the software process. Project planning and scheduling. Semester-long group projects with real-world applications.",
    prereqs: {
      type: "course",
      courseId: "CS372",
    },
    required: true,
  },
  {
    id: "CS496",
    label: "CS 496 - Data Science Capstone",
    description:
      "Capstone course for data science majors. Applying data scientific methodologies to real data challenges and effectively communicating findings. Covers ethical issues and responsible practices.",
    prereqs: {
      type: "logic",
      operator: "AND",
      operands: [
        { type: "course", courseId: "STAT300" },
        { type: "course", courseId: "STAT301" },
        { type: "course", courseId: "CS280" },
        {
          type: "logic",
          operator: "OR",
          operands: [
            { type: "course", courseId: "CS412" },
            { type: "course", courseId: "CS465" },
          ],
        },
      ],
    },
    required: false,
  },
  // {
  //   id: "CS290AE",
  //   label: "CS 290AE - Intro to Digital Multimedia",
  //   description:
  //     "This course will focus on digital graphic and website design students will learn industry standard and motion graphic software packages: Adobe Photoshop & Premiere, Flash MX, Dreamweaver MX. Students will participate in problem-solving environment using timelines.",
  //   prereqs: {
  //     type: "course",
  //     courseId: "CS100",
  //   },
  // },
  // {
  //   id: "CS290AF",
  //   label: "CS 290AF - Java Programming Language",
  //   description:
  //     "Introduction to Java (based on an instructor-led Sun course offered in industry). The course covers topics such as arrays, exceptions, GUI interfaces, GUI event handling, Threads, I/O streams and Networking.",
  //   prereqs: {
  //     type: "course",
  //     courseId: "CS210",
  //     minGrade: 65,
  //   },
  // },
  // {
  //   id: "CS290AG",
  //   label: "CS 290AG - Topics in Societal and Ethical Considerations",
  //   description:
  //     "This course will involve exploration of various considerations of computerized society and what it means to be a professional therein. The student will examine the history of computing, the history of the computing profession, Ethics of professional conduct, intellectual property, and computer crime.",
  //   prereqs: {
  //     type: "permission",
  //     description: "Written permission from the Instructor is required",
  //   },
  // },
  // {
  //   id: "CS290AH",
  //   label: "CS 290AH - Online Lab Design and Development",
  //   description:
  //     "The student will make an independent study of Web-based delivery of labs and tutorials. Project work will be required. The student and supervisor must present a detailed outline of the proposed study to the head of the department for approval.",
  //   prereqs: {
  //     type: "permission",
  //     description: "Written permission of instructor required",
  //   },
  // },
  // {
  //   id: "CS290AI",
  //   label: "CS 290AI - Computer Technology for Live Performance",
  //   description:
  //     "Exploration of the way computer technology can impact various aspects of the performing arts including lighting, sound, props and set design as well as projection mapping, virtual/augmented reality, and interactive performance.",
  //   prereqs: null,
  // },
  // {
  //   id: "CS290AJ",
  //   label: "CS 290AJ - Interactive Simulation Methods",
  //   description:
  //     "In this course students will use the Blender 3D modelling suite to develop visually stimulating - yet physically accurate - models in domains such as classical mechanics, chaos theory, and complex systems and bring learning to life in interactive 3D simulations.",
  //   prereqs: {
  //     type: "logic",
  //     operator: "OR",
  //     operands: [
  //       { type: "course", courseId: "CS100" },
  //       { type: "course", courseId: "CS110" },
  //       { type: "credit_hours", value: 30 },
  //     ],
  //   },
  // },
  // {
  //   id: "CS290AK",
  //   label: "CS 290AK - Topics in Data Acquisition and Analysis",
  //   description:
  //     "Introduced to data collection techniques by developing their own sensor modules, running experiments and verifying the results. Students will learn microcontroller programming for data collection as well as regression techniques and error analysis for calibration and verification.",
  //   prereqs: {
  //     type: "logic",
  //     operator: "OR",
  //     operands: [
  //       { type: "course", courseId: "CS100" },
  //       { type: "course", courseId: "CS110" },
  //       { type: "credit_hours", value: 30 },
  //     ],
  //   },
  // },
  // {
  //   id: "CS290AL",
  //   label: "CS 290AL - Introductory Topics in Artificial Intelligence",
  //   description:
  //     "A course in special topics in which the student makes an independent study in Artificial Intelligence at the second-year level under the supervision of a faculty member in the department.",
  //   prereqs: {
  //     type: "permission",
  //     description: "Permission of the Instructor is required",
  //   },
  // },
  // {
  //   id: "CS390AK",
  //   label: "CS 390AK - Web Content Development and Production",
  //   description:
  //     "Explore various leading-edge technologies for digital multimedia content creation and production for web-based delivery. Examine issues for media conversion and compression, and their effect on communication. Students will demonstrate these ideas in a web-based project.",
  //   prereqs: null,
  // },
  // {
  //   id: "CS390AL",
  //   label: "CS 390AL - Business Analyst for the Web",
  //   description:
  //     "It has become imperative for successful businesses and organizations to have presence on the World Wide Web. Students will take on a website concept or an existing underperforming website as the basis of a project. Students will study and employ techniques for requirements: planning and management, elicitation, analysis and documentation, communication, and implementation. Students will document their analysis and create a prototype of their designs.",
  //   prereqs: null,
  // },
  // {
  //   id: "CS390AM",
  //   label: "CS 390AM - User Interface Implementation and Evaluation",
  //   description:
  //     "User Interfaces are an essential part of any interactive software application. Ideally, the interface will accommodate users from beginners to experts by providing a low threshold and a high ceiling to interactions with the software. Students will implement a user interface with existing tool kits and then evaluate their interface with users.",
  //   prereqs: {
  //     type: "permission",
  //     description: "Written permission of instructor is required",
  //   },
  // },
  // {
  //   id: "CS390AO",
  //   label: "CS 390AO - Mobile Computing",
  //   description:
  //     "Developing software applications (called apps) for mobile computing platforms such as smart phones, tablets and personal media devices. Topics may include touch-screen interfaces, power management, graphics optimization, communication, location, and mobile browsers. App marketplaces and network carrier policies will also be discussed.",
  //   prereqs: {
  //     type: "course",
  //     courseId: "CS115",
  //   },
  // },
  // {
  //   id: "CS390AP",
  //   label: "CS 390AP - Special Topics in Virtual Reality",
  //   description:
  //     "Introductory topics in virtual reality. Environments, Platforms, Locomotion, Physiology, Applications.",
  //   prereqs: null,
  // },
  // {
  //   id: "CS390AR",
  //   label: "CS 390AR - Intermediate Topics in Artificial Intelligence",
  //   description:
  //     "A course in special topics in which the student makes an independent study in Artificial Intelligence at the third-year level under the supervision of a faculty member in the department.",
  //   prereqs: {
  //     type: "permission",
  //     description: "Under the supervision of a faculty member",
  //   },
  // },

  // {
  //   id: "CS490CA",
  //   label: "CS 490CA - Constraint Processing",
  //   description:
  //     "Search Techniques. Constraint Satisfaction. Constraint Logic Programming. Constraint Solvers. Applications.",
  //   prereqs: {
  //     type: "course",
  //     courseId: "CS340",
  //     minGrade: 70,
  //   },
  // },

  // {
  //   id: "CS490AB",
  //   label: "CS 490AB - User Interfaces for Databases",
  //   description:
  //     "A course in special topics in which the student makes an independent study in computer science under the supervision of a faculty member in the department.",
  //   prereqs: {
  //     type: "permission",
  //     detail: "Detailed outline and approval from department head required.",
  //   },
  // },
  // {
  //   id: "CS490AD",
  //   label: "CS 490AD - Parallel Computer Architecture",
  //   description:
  //     "A course in special topics in which the student makes an independent study in computer science under the supervision of a faculty member in the department.",
  //   prereqs: {
  //     type: "permission",
  //     detail: "Detailed outline and approval from department head required.",
  //   },
  // },
  // {
  //   id: "CS490AJ",
  //   label: "CS 490AJ - User Inter Constru VisualBasic",
  //   description:
  //     "A course in special topics in which the student makes an independent study in computer science under the supervision of a faculty member in the department.",
  //   prereqs: {
  //     type: "permission",
  //     detail: "Detailed outline and approval from department head required.",
  //   },
  // },
  // {
  //   id: "CS490AL",
  //   label: "CS 490AL - Special Topics: Computer Graph",
  //   description:
  //     "Special topics in computer graphics: 3D viewing transformation and perspective projection, ray-tracing and radiosity rendering techniques, multiresuolution surface models, special advanced modelling techniques.",
  //   prereqs: null,
  // },
  // {
  //   id: "CS490AP",
  //   label: "CS 490AP - Emerging User Interface Design",
  //   description:
  //     "Discover new and emerging principles of UI design. Derive guidelines directly applicable to industrial applications from research in the fields of Psychology, HCI, and Software Engineering Methodologies.",
  //   prereqs: {
  //     type: "course",
  //     courseId: "CS428",
  //   },
  // },
  // {
  //   id: "CS490AT",
  //   label: "CS 490AT - Adv. Obj. Oriented Prog.in C++",
  //   description:
  //     "The student will investigate topics related to object oriented programming in C++ and will implement a class hierarchy for several data structures and algorithms.",
  //   prereqs: null,
  // },
  // {
  //   id: "CS490AV",
  //   label: "CS 490AV - Topics in Data Comm & Network",
  //   description:
  //     "Topics in Data Communications and Networks: Protocol Concepts, Local Area Networking, Wide Area Networking, Network Programming.",
  //   prereqs: {
  //     type: "course",
  //     courseId: "CS335",
  //   },
  // },
  // {
  //   id: "CS490BK",
  //   label: "CS 490BK - Server-side web applications",
  //   description:
  //     "Students will study the concepts and competing technologies involved in web-based application development and will use JSP, servlets, HTTP, and JDBC.",
  //   prereqs: {
  //     type: "course",
  //     courseId: "CS285",
  //   },
  // },
  // {
  //   id: "CS490BS",
  //   label: "CS 490BS - Applied Image Processing",
  //   description:
  //     "Study of basic image processing algorithms. Applications of selected techniques to practical problems. A term project is required.",
  //   prereqs: {
  //     type: "permission",
  //     detail: "Written permission of instructor is required.",
  //   },
  // },
  // {
  //   id: "CS490CA",
  //   label: "CS 490CA - Constraint Processing",
  //   description:
  //     "Search Techniques. Constraint Satisfaction. Constraint Logic Programming. Constraint Solvers. Applications.",
  //   prereqs: {
  //     type: "course",
  //     courseId: "CS340",
  //     minGrade: 70,
  //   },
  // },
  // {
  //   id: "CS490CD",
  //   label: "CS 490CD - Robot Motion Planning",
  //   description:
  //     "Configuration Space, Cell Decomposition Methods, Roadmap Methods, Manipulation Planning, Multiple Robots, Moving Objects.",
  //   prereqs: {
  //     type: "course",
  //     courseId: "CS340",
  //     minGrade: 75,
  //   },
  // },
  // {
  //   id: "CS490CN",
  //   label: "CS 490CN - Open Source Software Development",
  //   description:
  //     "This course will introduce students to software development in an open source environment, including methodology and philosophy.",
  //   prereqs: {
  //     type: "permission",
  //     detail: "Permission of the instructor required.",
  //   },
  // },
  // {
  //   id: "CS490CP",
  //   label: "CS 490CP - Web Service Design",
  //   description:
  //     "This course will explore issues around the design, coding, and deployment of web-based services for public use.",
  //   prereqs: {
  //     type: "permission",
  //     detail: "Written permission of instructor is required.",
  //   },
  // },
  // {
  //   id: "CS490CR",
  //   label: "CS 490CR - Foundations and Applications in Data Mining",
  //   description:
  //     "Foundations and applications of data mining. Topics include data preparation, transformation, classification, and prediction.",
  //   prereqs: {
  //     type: "logic",
  //     operator: "OR",
  //     operands: [
  //       {
  //         type: "logic",
  //         operator: "AND",
  //         operands: [
  //           { type: "course", courseId: "CS320" },
  //           { type: "course", courseId: "CS340" },
  //         ],
  //       },
  //       {
  //         type: "permission",
  //         detail: "Written permission of instructor is required.",
  //       },
  //     ],
  //   },
  // },
  // {
  //   id: "CS490CX",
  //   label: "CS 490CX - Mobile Computing",
  //   description:
  //     "Mobile Computing focuses on the design and implementation of software in a networked mobile environment.",
  //   prereqs: {
  //     type: "logic",
  //     operator: "AND",
  //     operands: [
  //       { type: "course", courseId: "CS335" },
  //       {
  //         type: "logic",
  //         operator: "OR",
  //         operands: [{ type: "course", courseId: "CS315" }],
  //       },
  //     ],
  //   },
  // },
  // {
  //   id: "CS490DI",
  //   label: "CS 490DI - Knowledge Representation and Reasoning",
  //   description:
  //     "The course examines some of the techniques used to represent knowledge in artificial intelligence, and the associated methods of automated reasoning.",
  //   prereqs: null,
  // },
  // {
  //   id: "CS490DK",
  //   label: "CS 490DK - Topics in Advanced Networks",
  //   description:
  //     "Software-Defined Networking (SDN), Network Virtualization, Network Functions Virtualization (NFV), and 5G and beyond Mobile Networks.",
  //   prereqs: {
  //     type: "course",
  //     courseId: "CS335",
  //   },
  // },
  // {
  //   id: "CS490DO",
  //   label: "CS 490DO - Verified Programs and Proofs",
  //   description:
  //     "Development of proven-correct programs and computer-checked proofs using functional programming, dependent types and type theory.",
  //   prereqs: {
  //     type: "course",
  //     courseId: "CS350",
  //   },
  // },
  // {
  //   id: "CS491AL",
  //   label: "CS 491AL - Operating Systems Programming",
  //   description:
  //     "Study of the UNIX operating system. Assignments involve advanced programming in C and x86 assembly to implement enhancements to a functional kernel.",
  //   prereqs: {
  //     type: "permission",
  //     detail:
  //       "Permission of the instructor and senior undergraduate background in OS and architecture.",
  //   },
  // },
];
