/************************************************************************
 * Filename: complex_app.js
 * Description: A sophisticated and elaborate JavaScript code.
 ************************************************************************/

// Employee class
class Employee {
  constructor(id, name, salary) {
    this.id = id;
    this.name = name;
    this.salary = salary;
  }

  // Calculate employee bonus based on salary
  calculateBonus() {
    let bonus = 0;
    if (this.salary > 5000) {
      bonus = this.salary * 0.1;
    } else if (this.salary > 3000) {
      bonus = this.salary * 0.08;
    } else {
      bonus = this.salary * 0.05;
    }
    return bonus;
  }
}

// Department class
class Department {
  constructor(name, employees) {
    this.name = name;
    this.employees = employees;
  }

  // Get total department bonus
  getDepartmentBonus() {
    let totalBonus = 0;
    for (let employee of this.employees) {
      totalBonus += employee.calculateBonus();
    }
    return totalBonus;
  }

  // Get average salary of department employees
  getAverageSalary() {
    let totalSalary = 0;
    for (let employee of this.employees) {
      totalSalary += employee.salary;
    }
    return totalSalary / this.employees.length;
  }
}

// Create employees
const employee1 = new Employee(1, "John Doe", 6000);
const employee2 = new Employee(2, "Jane Smith", 4000);
const employee3 = new Employee(3, "Mike Johnson", 3500);

// Create department
const employees = [employee1, employee2, employee3];
const department = new Department("IT Department", employees);

// Output department information
console.log(`Department Name: ${department.name}`);
console.log(`Total Department Bonus: $${department.getDepartmentBonus().toFixed(2)}`);
console.log(`Average Salary: $${department.getAverageSalary().toFixed(2)}`);