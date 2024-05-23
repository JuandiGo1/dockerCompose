document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    fetch('/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: e.target.username.value,
            password: e.target.password.value
        })
    }).then(response => response.text()).then(data => alert(data));
});

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    fetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: e.target.usernameLogin.value,
            password: e.target.passwordLogin.value
        })
    }).then(response => {
        if (response.ok) {
            window.location.href = '/notes';
        } else {
            response.text().then(data => alert(data));
        }
    });
});

document.getElementById('addStudentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id: e.target.id.value,
            name: e.target.name.value,
            grade: e.target.grade.value
        })
    }).then(response => response.json()).then(data => alert('Student added successfully!'));
});

document.getElementById('updateStudentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    fetch('/api/notes/' + e.target.updateId.value, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            grade: e.target.updateGrade.value
        })
    }).then(response => response.json()).then(data => alert('Grade updated successfully!'));
});

document.getElementById('getStudentsButton').addEventListener('click', function() {
    fetch('/api/notes')
        .then(response => response.json())
        .then(data => {
            const studentsList = document.getElementById('studentsList');
            studentsList.innerHTML = '<ul>' + data.map(student => `<li>${student.id} - ${student.name}: ${student.grade}</li>`).join('') + '</ul>';
        });
});
