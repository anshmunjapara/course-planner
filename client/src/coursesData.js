export const initialCourses = [
  // --- YEAR 1 (Roots) ---
  {
    id: "CS110",
    label: "CS 110: Programming I",
    prereqs: null
  },
  {
    id: "MATH110",
    label: "MATH 110: Calculus I",
    prereqs: null
  },
  {
    id: "MATH122",
    label: "MATH 122: Linear Algebra",
    prereqs: null
  },
  {
    id: "CS100",
    label: "CS 100: Intro to CS",
    prereqs: null
  },
  {
    id: "ENGL100",
    label: "ENGL 100: Critical Reading",
    prereqs: null
  },

  // --- YEAR 1/2 (Early Branches) ---
  {
    id: "CS115",
    label: "CS 115: Programming II",
    prereqs: {
      type: "course",
      courseId: "CS110",
      minGrade: 50
    }
  },
  {
    id: "STAT160",
    label: "STAT 160: Intro Stats",
    prereqs: {
      type: "course",
      courseId: "MATH110",
      minGrade: 50
    }
  },

  // --- YEAR 2 (The Bottleneck) ---
  {
    id: "CS210",
    label: "CS 210: Data Structures",
    prereqs: {
      type: "logic",
      operator: "AND",
      operands: [
        { type: "course", courseId: "CS115", minGrade: 50 },
        { type: "course", courseId: "MATH110", minGrade: 50 }
      ]
    }
  },
  {
    id: "CS215",
    label: "CS 215: Web Programming",
    prereqs: {
      type: "course",
      courseId: "CS115",
      minGrade: 50
    }
  },
  {
    id: "CS280",
    label: "CS 280: Risk & Society",
    prereqs: {
      type: "logic",
      operator: "OR",
      operands: [
        { type: "course", courseId: "CS100", minGrade: 50 },
        { type: "course", courseId: "CS110", minGrade: 50 }
      ]
    }
  },
  // Added CS 201/301 logic (Digital Systems often requires CS 110)
  {
    id: "CS301",
    label: "CS 301: Digital Systems",
    prereqs: {
       type: "logic",
       operator: "AND",
       operands: [
         { type: "course", courseId: "CS110", minGrade: 50 },
        //  { type: "course", courseId: "MATH102", minGrade: 50 } // Assuming MATH102 or general math
       ]
    }
  },

  // --- YEAR 3 (Advanced Logic) ---
  {
    id: "CS340",
    label: "CS 340: Adv Data Structures",
    prereqs: {
      type: "logic",
      operator: "AND",
      operands: [
        { type: "course", courseId: "CS210", minGrade: 60 },
        {
          type: "logic",
          operator: "OR",
          operands: [
            { type: "course", courseId: "MATH110", minGrade: 50 },
            { type: "course", courseId: "MATH122", minGrade: 50 }
          ]
        }
      ]
    }
  },
  {
    id: "CS320",
    label: "CS 320: AI",
    prereqs: {
      type: "logic",
      operator: "AND",
      operands: [
        { type: "course", courseId: "CS210", minGrade: 50 },
        { type: "course", courseId: "STAT160", minGrade: 50 }
      ]
    }
  },
  {
    id: "CS310",
    label: "CS 310: Architecture",
    prereqs: {
      type: "logic",
      operator: "AND",
      operands: [
        { type: "course", courseId: "CS210", minGrade: 50 },
        { type: "course", courseId: "CS301", minGrade: 50 } // Often links to Digital Systems
      ]
    }
  },
  // NEW: Operating Systems (Heavy prereqs)
  {
    id: "CS330",
    label: "CS 330: Operating Systems",
    prereqs: {
      type: "logic",
      operator: "AND",
      operands: [
        { type: "course", courseId: "CS210", minGrade: 50 },
        { type: "course", courseId: "CS301", minGrade: 50 }
      ]
    }
  },
  // NEW: Networks (Requires Stats)
  {
    id: "CS335",
    label: "CS 335: Networks",
    prereqs: {
      type: "logic",
      operator: "AND",
      operands: [
        { type: "course", courseId: "CS210", minGrade: 50 },
        { type: "course", courseId: "STAT160", minGrade: 50 }
      ]
    }
  },
  // NEW: Database Systems
  {
    id: "CS290", // Sometimes 290 or 390
    label: "CS 290: Databases",
    prereqs: {
      type: "course",
      courseId: "CS210",
      minGrade: 50
    }
  },

  // --- YEAR 4 (Electives & Capstone) ---
  {
    id: "CS412",
    label: "CS 412: HCI",
    prereqs: {
      type: "course",
      courseId: "CS215",
      minGrade: 50
    }
  },
  // NEW: Security (Requires OS and Networks usually)
  {
    id: "CS455",
    label: "CS 455: Security",
    prereqs: {
      type: "logic",
      operator: "OR",
      operands: [
        { type: "course", courseId: "CS330", minGrade: 50 },
        { type: "course", courseId: "CS335", minGrade: 50 }
      ]
    }
  },
  // NEW: Software Engineering (Capstone-ish)
  {
    id: "CS476",
    label: "CS 476: Software Eng.",
    prereqs: {
      type: "logic",
      operator: "AND",
      operands: [
        { type: "course", courseId: "CS210", minGrade: 70 }, // High grade requirement
        { type: "course", courseId: "ENGL100", minGrade: 50 } // Writing requirement
      ]
    }
  },
  // NEW: Computer Graphics (Math heavy)
  {
    id: "CS405",
    label: "CS 405: Graphics",
    prereqs: {
      type: "logic",
      operator: "AND",
      operands: [
        { type: "course", courseId: "CS340", minGrade: 50 },
        { type: "course", courseId: "MATH122", minGrade: 50 }
      ]
    }
  }
];