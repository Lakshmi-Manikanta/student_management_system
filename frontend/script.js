const form = document.getElementById("studentForm");
const studentList = document.getElementById("studentList");

// Add student
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const student = {
    name: document.getElementById("name").value,
    rollNumber: document.getElementById("rollNumber").value,
    department: document.getElementById("department").value,
    year: document.getElementById("year").value
  };

  const res = await fetch("http://localhost:5000/api/students/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(student)
  });

  const data = await res.json();
  alert(data.message);

  form.reset();
  loadStudents();
});

// Fetch students
async function loadStudents() {
  const res = await fetch("http://localhost:5000/api/students");
  const students = await res.json();

  studentList.innerHTML = "";

  students.forEach(s => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${s.name} - ${s.rollNumber} - ${s.department}
      <button onclick="deleteStudent('${s._id}')">Delete</button>
    `;
    studentList.appendChild(li);
  });
}

async function deleteStudent(id) {
  await fetch(`http://localhost:5000/api/students/${id}`, {
    method: "DELETE"
  });
  loadStudents();
}
