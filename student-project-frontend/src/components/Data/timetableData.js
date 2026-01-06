// ================= COMMON TIMINGS =================
export const COMMON_TIMINGS = {
  P1: "9:00 – 9:55",
  P2: "9:55 – 10:50",
  BREAK1: "10:50 – 11:10",
  P3: "11:10 – 12:05",
  P4: "12:05 – 1:00",
  LUNCH: "1:00 – 2:00",
  P5: "2:00 – 2:45",
  P6: "2:45 – 3:30",
  BREAK2: "3:30 – 3:45",
  P7: "3:45 – 4:30"
};

// ================= WEEK STRUCTURE =================
const WEEK_PATTERN = [
  { day: "Monday",    slots: ["S1","S2","S3","S4","S5","LAB","LAB"] },
  { day: "Tuesday",   slots: ["S2","S1","S4","S3","S5","LAB","LAB"] },
  { day: "Wednesday", slots: ["S3","S1","S2","S4","S5","LAB","LAB"] },
  { day: "Thursday",  slots: ["S2","S3","S1","S4","S5","LAB","LAB"] },
  { day: "Friday",    slots: ["S1","S4","S2","S3","S5","LAB","LAB"] },
  { day: "Saturday",  slots: ["S5","S1","S4","S2","S3","Mentoring","Sports"] }
];

// ================= HELPER =================
const buildTimetable = (subjects) =>
  WEEK_PATTERN.map(d => ({
    day: d.day,
    P1: subjects[d.slots[0]],
    P2: subjects[d.slots[1]],
    P3: subjects[d.slots[2]],
    P4: subjects[d.slots[3]],
    P5: subjects[d.slots[4]],
    P6: subjects[d.slots[5]],
    P7: subjects[d.slots[6]]
  }));

// ================= CSE DATA (8 SEMESTERS) =================
const CSE = {
  1: {
    subjects: {
      S1: "Mathematics-I",
      S2: "C Programming",
      S3: "Engineering Physics",
      S4: "English",
      S5: "Engineering Drawing",
      LAB: "C Programming Lab"
      },
    faculty: {
        "Mathematics-I": "Dr. Rao",
        "C Programming": "Mr. Kumar",
        "Engineering Physics": "Dr. Sharma",
        "English": "Ms. Anjali",
        "Engineering Drawing": "Mr. Reddy",
        "C Programming Lab": "Mr. Kumar"
        }
  },
  2: {
    subjects: {
      S1: "Mathematics-II",
      S2: "Data Structures",
      S3: "Digital Logic",
      S4: "OOP with Java",
      S5: "Environmental Science",
      LAB: "DS Lab"
    }
  },
  3: {
    subjects: {
      S1: "Discrete Mathematics",
      S2: "DBMS",
      S3: "Computer Organization",
      S4: "Operating Systems",
      S5: "Probability",
      LAB: "DBMS Lab"
    }
  },
  4: {
    subjects: {
      S1: "Software Engineering",
      S2: "Computer Networks",
      S3: "Design & Analysis of Algorithms",
      S4: "Web Technologies",
      S5: "Open Elective-I",
      LAB: "WT Lab"
    }
  },
  5: {
    subjects: {
      S1: "Machine Learning",
      S2: "Compiler Design",
      S3: "Cloud Computing",
      S4: "Open Elective-II",
      S5: "Professional Ethics",
      LAB: "ML Lab"
    }
  },
  6: {
    subjects: {
      S1: "Artificial Intelligence",
      S2: "Big Data Analytics",
      S3: "DevOps",
      S4: "Open Elective-III",
      S5: "Research Methodology",
      LAB: "AI Lab"
    }
  },
  7: {
    subjects: {
      S1: "Cyber Security",
      S2: "IoT",
      S3: "Mobile App Development",
      S4: "Project-I",
      S5: "Seminar",
      LAB: "MAD Lab"
    }
  },
  8: {
    subjects: {
      S1: "Project-II",
      S2: "Internship",
      S3: "Entrepreneurship",
      S4: "Management Studies",
      S5: "Elective-IV",
      LAB: "Project Lab"
    }
  }
};

// ================= ECE DATA (8 SEMESTERS) =================
const ECE = {
  1: {
    subjects: {
      S1: "Mathematics-I",
      S2: "Basic Electrical Engineering",
      S3: "Engineering Physics",
      S4: "English",
      S5: "Engineering Drawing",
      LAB: "Electrical Lab"
    }
  },
  2: {
    subjects: {
      S1: "Mathematics-II",
      S2: "Electronic Devices",
      S3: "Network Analysis",
      S4: "Signals & Systems",
      S5: "Environmental Science",
      LAB: "Electronic Devices Lab"
    }
  },
  3: {
    subjects: {
      S1: "Analog Circuits",
      S2: "Digital Electronics",
      S3: "Control Systems",
      S4: "Probability & Random Processes",
      S5: "Managerial Economics",
      LAB: "Analog Circuits Lab"
    }
  },
  4: {
    subjects: {
      S1: "Microprocessors & Microcontrollers",
      S2: "Electromagnetic Fields",
      S3: "Linear IC Applications",
      S4: "Digital Signal Processing",
      S5: "Open Elective-I",
      LAB: "Microprocessor Lab"
    }
  },
  5: {
    subjects: {
      S1: "VLSI Design",
      S2: "Computer Networks",
      S3: "Embedded Systems",
      S4: "Open Elective-II",
      S5: "Professional Ethics",
      LAB: "Embedded Systems Lab"
    }
  },
  6: {
    subjects: {
      S1: "Wireless Communications",
      S2: "Optical Communication",
      S3: "Internet of Things",
      S4: "Open Elective-III",
      S5: "Research Methodology",
      LAB: "IoT Lab"
    }
  },
  7: {
    subjects: {
      S1: "Satellite Communication",
      S2: "Radar Systems",
      S3: "Mobile Communication",
      S4: "Project-I",
      S5: "Seminar",
      LAB: "Communication Systems Lab"
    }
  },
  8: {
    subjects: {
      S1: "Project-II",
      S2: "Internship",
      S3: "Entrepreneurship",
      S4: "Management Studies",
      S5: "Elective-IV",
      LAB: "Project Lab"
    }
  }
};

// ================= CIVIL DATA (8 SEMESTERS) =================
const CIVIL = {
  1: {
    subjects: {
      S1: "Mathematics-I",
      S2: "Engineering Mechanics",
      S3: "Engineering Chemistry",
      S4: "English",
      S5: "Engineering Drawing",
      LAB: "Surveying Lab"
    }
  },
  2: {
    subjects: {
      S1: "Mathematics-II",
      S2: "Strength of Materials",
      S3: "Fluid Mechanics",
      S4: "Building Materials",
      S5: "Environmental Science",
      LAB: "Strength of Materials Lab"
    }
  },
  3: {
    subjects: {
      S1: "Structural Analysis-I",
      S2: "Geotechnical Engineering-I",
      S3: "Hydrology",
      S4: "Transportation Engineering-I",
      S5: "Managerial Economics",
      LAB: "Geotechnical Lab"
    }
  },
  4: {
    subjects: {
      S1: "Structural Analysis-II",
      S2: "Geotechnical Engineering-II",
      S3: "Environmental Engineering-I",
      S4: "Concrete Technology",
      S5: "Open Elective-I",
      LAB: "Concrete Lab"
    }
  },
  5: {
    subjects: {
      S1: "Design of RC Structures-I",
      S2: "Environmental Engineering-II",
      S3: "Transportation Engineering-II",
      S4: "Open Elective-II",
      S5: "Professional Ethics",
      LAB: "Environmental Engineering Lab"
    }
  },
  6: {
    subjects: {
      S1: "Design of Steel Structures",
      S2: "Water Resources Engineering",
      S3: "Construction Planning & Management",
      S4: "Open Elective-III",
      S5: "Research Methodology",
      LAB: "Water Resources Lab"
    }
  },
  7: {
    subjects: {
      S1: "Bridge Engineering",
      S2: "Earthquake Engineering",
      S3: "Remote Sensing & GIS",
      S4: "Project-I",
      S5: "Seminar",
      LAB: "GIS Lab"
    }
  },
  8: {
    subjects: {
      S1: "Project-II",
      S2: "Internship",
      S3: "Entrepreneurship",
      S4: "Management Studies",
      S5: "Elective-IV",
      LAB: "Project Lab"
    }
  }
};

// ================= MECH DATA (8 SEMESTERS) =================
const MECH = {
  1: {
    subjects: {
      S1: "Mathematics-I",
      S2: "Engineering Mechanics",
      S3: "Engineering Physics",
      S4: "English",
      S5: "Engineering Drawing",
      LAB: "Workshop Practice"
    }
  },
  2: {
    subjects: {
      S1: "Mathematics-II",
      S2: "Thermodynamics",
      S3: "Strength of Materials",
      S4: "Manufacturing Processes",
      S5: "Environmental Science",
      LAB: "Manufacturing Lab"
    }
  },
  3: {
    subjects: {
      S1: "Fluid Mechanics",
      S2: "Kinematics of Machinery",
      S3: "Material Science",
      S4: "Thermal Engineering-I",
      S5: "Managerial Economics",
      LAB: "Fluid Mechanics Lab"
    }
  },
  4: {
    subjects: {
      S1: "Dynamics of Machinery",
      S2: "Thermal Engineering-II",
      S3: "Machine Design-I",
      S4: "Metrology",
      S5: "Open Elective-I",
      LAB: "Thermal Lab"
    }
  },
  5: {
    subjects: {
      S1: "Machine Design-II",
      S2: "Heat Transfer",
      S3: "CAD/CAM",
      S4: "Open Elective-II",
      S5: "Professional Ethics",
      LAB: "CAD/CAM Lab"
    }
  },
  6: {
    subjects: {
      S1: "Finite Element Analysis",
      S2: "Production Planning & Control",
      S3: "Refrigeration & Air Conditioning",
      S4: "Open Elective-III",
      S5: "Research Methodology",
      LAB: "RAC Lab"
    }
  },
  7: {
    subjects: {
      S1: "Automobile Engineering",
      S2: "Robotics",
      S3: "Mechatronics",
      S4: "Project-I",
      S5: "Seminar",
      LAB: "Mechatronics Lab"
    }
  },
  8: {
    subjects: {
      S1: "Project-II",
      S2: "Internship",
      S3: "Entrepreneurship",
      S4: "Management Studies",
      S5: "Elective-IV",
      LAB: "Project Lab"
    }
  }
};


// ================= EEE DATA (8 SEMESTERS) =================
const EEE = {
  1: {
    subjects: {
      S1: "Mathematics-I",
      S2: "Basic Electrical Engineering",
      S3: "Engineering Physics",
      S4: "English",
      S5: "Engineering Drawing",
      LAB: "Electrical Engineering Lab"
    }
  },
  2: {
    subjects: {
      S1: "Mathematics-II",
      S2: "Electrical Circuits",
      S3: "Electronic Devices",
      S4: "Electromagnetic Fields",
      S5: "Environmental Science",
      LAB: "Electrical Circuits Lab"
    }
  },
  3: {
    subjects: {
      S1: "Electrical Machines-I",
      S2: "Power Systems-I",
      S3: "Control Systems",
      S4: "Measurements & Instrumentation",
      S5: "Managerial Economics",
      LAB: "Electrical Machines Lab"
    }
  },
  4: {
    subjects: {
      S1: "Electrical Machines-II",
      S2: "Power Systems-II",
      S3: "Power Electronics",
      S4: "Microprocessors",
      S5: "Open Elective-I",
      LAB: "Power Electronics Lab"
    }
  },
  5: {
    subjects: {
      S1: "Utilization of Electrical Energy",
      S2: "Digital Control Systems",
      S3: "Renewable Energy Systems",
      S4: "Open Elective-II",
      S5: "Professional Ethics",
      LAB: "Renewable Energy Lab"
    }
  },
  6: {
    subjects: {
      S1: "HVDC Transmission",
      S2: "Smart Grid",
      S3: "Electric Drives",
      S4: "Open Elective-III",
      S5: "Research Methodology",
      LAB: "Electric Drives Lab"
    }
  },
  7: {
    subjects: {
      S1: "FACTS Controllers",
      S2: "Power Quality",
      S3: "Energy Management",
      S4: "Project-I",
      S5: "Seminar",
      LAB: "Simulation Lab"
    }
  },
  8: {
    subjects: {
      S1: "Project-II",
      S2: "Internship",
      S3: "Entrepreneurship",
      S4: "Management Studies",
      S5: "Elective-IV",
      LAB: "Project Lab"
    }
  }
};




// ================= FINAL EXPORT =================
export const TIMETABLE = {
  BTECH: {
    CSE: Object.fromEntries(
      Object.entries(CSE).map(([sem, data]) => [
        Number(sem),
        { 
            timetable: buildTimetable(data.subjects), 
            faculty: data.faculty || {}
        }
      ])
    ),

    ECE: Object.fromEntries(
      Object.entries(ECE).map(([sem, data]) => [
        Number(sem),
        { 
          timetable: buildTimetable(data.subjects),
          faculty: data.faculty || {}
        }
      ])
    ),

    EEE: Object.fromEntries(
      Object.entries(EEE).map(([sem, data]) => [
        Number(sem),
        { 
          timetable: buildTimetable(data.subjects),
          faculty: data.faculty || {}
        }
      ])
    ),

    MECH: Object.fromEntries(
      Object.entries(MECH).map(([sem, data]) => [
        Number(sem),
        { timetable: buildTimetable(data.subjects), faculty: data.faculty || {} }
      ])
    ),

    CIVIL: Object.fromEntries(
      Object.entries(CIVIL).map(([sem, data]) => [
        Number(sem),
        { timetable: buildTimetable(data.subjects), faculty: data.faculty || {} }
      ])
    )
  }
};

