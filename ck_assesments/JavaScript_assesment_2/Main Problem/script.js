var students = [];

// window.onload = function() {
function abc () {
  var storedData = localStorage.getItem("studentsData");
  if (storedData) { 
    students = JSON.parse(storedData);
    renderTable();
  }
};

abc();

function addStudent() {
  var name = prompt("Enter student name:");

  if (!name || name.trim() === "") {
    alert("Name cannot be empty. Please enter a valid name.");
    return;
  }
  var namePattern = /^[A-Za-z\s]+$/;
  if (!namePattern.test(name)) {
    alert("Name can only contain letters and spaces. Please enter a valid name.");
    return;
  }

  var marks = [];
  for (var i = 1; i <= 5; i++) {
    var input = prompt("Enter marks for Subject " + i + " (0–100):", "0");
    var mark = parseFloat(input);

    if (isNaN(mark) || mark < 0 || mark > 100) {
      alert("Invalid input. Please enter a number between 0 and 100.");
      return;
    }

    marks.push(mark);
  }

  var totalMarks = calculateTotal(marks);
  var averageMarks = calculateAverage(marks);

  var student = {
    name: name.trim(),
    marks: marks,
    total: totalMarks,
    average: averageMarks
  };

  students.push(student);
  saveData();
  renderTable();
}

// Calculate total marks
function calculateTotal(marks) {
  var sum = 0;
  for (var i = 0; i < marks.length; i++) {
    sum += marks[i];
  }
  return sum;
}

function calculateAverage(marks) {
  var total = calculateTotal(marks);
  return (total / marks.length).toFixed(2);
}

const renderTable = () => {
  var table = document.getElementById("marksTable");

  while (table.rows.length > 1) {
    table.deleteRow(1);
  }

  for (var i = 0; i < students.length; i++) {
    var student = students[i];
    var newRow = table.insertRow(-1);

    var nameCell = newRow.insertCell(0);
    nameCell.textContent = student.name;

    for (var j = 0; j < student.marks.length; j++) {
      var cell = newRow.insertCell(j + 1);
      cell.textContent = student.marks[j];
    }

    var totalCell = newRow.insertCell(6);
    totalCell.textContent = student.total;

    var avgCell = newRow.insertCell(7);
    avgCell.textContent = student.average;

   
  }

  
}

function saveData() {
  localStorage.setItem("studentsData", JSON.stringify(students));
}
