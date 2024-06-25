class Student {
  constructor(name, age, math, physical, chemistry) {
    this.name = name;
    this.age = age;
    this.math = math;
    this.physical = physical;
    this.chemistry = chemistry;
    this.avg = this.calculateAvg();
    this.rank = this.calculateRank();
  }

  calculateAvg() {
    return parseFloat(((this.math + this.physical + this.chemistry) / 3).toFixed(2));
  }

  calculateRank() {
    const avg = this.avg;
    if (avg >= 8.0) return 'GIOI';
    if (avg >= 6.5) return 'KHA';
    if (avg >= 5.0) return 'TB';
    return 'YEU';
  }
}

class ManagerStudent {
  constructor() {
    this.students = [];
  }

  addStudent(student) {
    this.students.push(student);
    console.log(`Đã thêm học sinh: ${student.name}`);
  }

  findStudentByName(name) {
    const foundStudent = this.students.find(student => student.name === name);
    if (foundStudent) {
      console.log(`Đã tìm thấy học sinh: ${foundStudent.name}`);
    } else {
      console.log(`Không tìm thấy học sinh có tên là ${name}`);
    }
    return foundStudent;
  }

  getExcellentStudents() {
    const excellentStudents = this.students.filter(student => student.rank === 'GIOI');
    console.log('Danh sách học sinh xuất sắc:');
    excellentStudents.forEach(student => {
      console.log(`${student.name} - Điểm trung bình: ${student.avg}`);
    });
    return excellentStudents;
  }

  sortStudents() {
    this.students.sort((a, b) => {
      if (a.name === b.name) {
        return a.avg - b.avg;
      }
      return a.name.localeCompare(b.name);
    });
    console.log('Đã sắp xếp danh sách học sinh theo thứ tự tăng dần:');
    this.students.forEach(student => {
      console.log(`${student.name} - Điểm trung bình: ${student.avg}`);
    });
  }

  smartSearch(content) {
    const exactMatches = [];
    const partialMatches = [];
    const typoMatches = [];

    const cleanContent = content.toLowerCase();

    for (const student of this.students) {
      const studentName = student.name.toLowerCase();

      if (studentName === cleanContent) {
        exactMatches.push(student);
      } else if (studentName.includes(cleanContent)) {
        partialMatches.push(student);
      } else if (this.isTypoMatch(studentName, cleanContent)) {
        typoMatches.push(student);
      }
    }

    const results = [
      ...exactMatches.map(student => ({ ...student, rank: 10 })),
      ...partialMatches.map(student => ({ ...student, rank: 9 })),
      ...typoMatches.map(student => ({ ...student, rank: 8 }))
    ];

    results.sort((a, b) => {
      if (b.rank !== a.rank) {
        return b.rank - a.rank;
      } else {
        return a.name.localeCompare(b.name);
      }
    });

    console.log(`Kết quả tìm kiếm cho "${content}":`);
    results.forEach(student => {
      console.log(`${student.name} - Điểm trung bình: ${student.avg} - Xếp hạng: ${student.rank}`);
    });

    return results;
  }

  isTypoMatch(name, content) {
    if (Math.abs(name.length - content.length) > 1) return false;
    let differences = 0;
    for (let i = 0; i < Math.min(name.length, content.length); i++) {
      if (name[i] !== content[i]) differences++;
      if (differences > 1) return false;
    }
    return true;
  }
}

// Tạo đối tượng ManagerStudent
const manager = new ManagerStudent();

// Thêm các học sinh vào danh sách
manager.addStudent(new Student('Alice', 18, 8.5, 7.5, 8.0));
manager.addStudent(new Student('Bob', 17, 7.0, 8.0, 6.5));
manager.addStudent(new Student('Carol', 16, 9.0, 9.0, 9.5));
manager.addStudent(new Student('David', 17, 6.5, 7.0, 6.0));
manager.addStudent(new Student('Eve', 18, 5.5, 6.0, 6.5));
manager.addStudent(new Student('Frank', 16, 8.0, 8.5, 7.5));
manager.addStudent(new Student('Grace', 17, 7.5, 7.0, 7.0));
manager.addStudent(new Student('Henry', 18, 4.5, 5.0, 4.0));

// Sắp xếp học sinh
manager.sortStudents();

// Lấy danh sách học sinh rank GIOI
const excellentStudents = manager.getExcellentStudents();

// Tìm kiếm học sinh có tên là 'Alice'
const searchResult = manager.smartSearch('Alice');
