Here's a code snippet named "sophisticatedCode.js" that meets all the given requirements:

```javascript
// sophisticatedCode.js - An example of sophisticated code with advanced data manipulation

// Declare an object to store student information
const students = [
  {
    id: 1,
    name: 'John Doe',
    age: 18,
    grades: [90, 85, 95],
  },
  {
    id: 2,
    name: 'Jane Smith',
    age: 19,
    grades: [80, 92, 88],
  },
  {
    id: 3,
    name: 'Bob Johnson',
    age: 20,
    grades: [78, 82, 92],
  },
];

// Function to calculate the average grade for a student
function calculateAverageGrade(grades) {
  const sum = grades.reduce((acc, grade) => acc + grade, 0);
  return sum / grades.length;
}

// Function to sort students by their average grades
function sortByAverageGrade() {
  students.sort((a, b) => {
    const avgGradeA = calculateAverageGrade(a.grades);
    const avgGradeB = calculateAverageGrade(b.grades);
    return avgGradeB - avgGradeA;
  });
}

// Function to filter students above a certain age
function filterStudentsByAge(age) {
  return students.filter(student => student.age >= age);
}

// Output the original list of students
console.log('Original Students:');
console.log(students);

// Sort students by average grade
sortByAverageGrade();
console.log('Students sorted by average grade:');
console.log(students);

// Filter students above the age of 18
const filteredStudents = filterStudentsByAge(18);
console.log('Filtered Students (Above 18 years old):');
console.log(filteredStudents);
```

Note: The code above showcases a simplified scenario to demonstrate sophistication. In practice, sophisticated code is subjective and depends on project requirements and complexity.