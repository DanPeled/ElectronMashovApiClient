import * as mashov from './mashov-api.js'
let timetable = '';

let loginInfo;

let currentDayIndex = 0;
let daysArray = [];

const schoolList = document.getElementById('schoolList');
const schoolInputfield = document.getElementById('schoolInput');
const yearInputfield = document.getElementById('year');
const usernameInputfield = document.getElementById('username');
const passwordInputfield = document.getElementById('password');
const loginButtonfield = document.getElementById('loginButton');
const timetableContainer = document.getElementById('timetableContainer');
const prevDayButton = document.getElementById('prevDayButton');
const nextDayButton = document.getElementById('nextDayButton');
const gradesContainer = document.getElementById('gradesContainer');
const homeworkContainer = document.getElementById('homeworkContainer');
const behavingContainer = document.getElementById('behavingContainer');
const messagesListContainer = document.getElementById('messagesListContainer');
const rememberMeInputfield = document.getElementById("remember-me");

function hideTimetableAndGrades() {
    timetableContainer.style.display = 'none';
    gradesContainer.style.display = 'none';
    prevDayButton.style.display = 'none';
    nextDayButton.style.display = 'none';
}

function formatDate(inputDate) {
    const date = new Date(inputDate);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}

async function fetchAndPopulateSchools() {
    try {
        const response = await fetch('https://web.mashov.info/api/schools');
        const schools = await response.json();

        schoolList.innerHTML = '';

        schools.forEach(school => {
            const option = document.createElement('option');
            option.value = school.semel;
            option.textContent = school.name;
            schoolList.appendChild(option);
        });
    } catch (error) {
        console.error(error);
    }
}

schoolList.addEventListener('change', () => {
    const selectedSemel = schoolList.value;
    loginButtonfield.disabled = !(selectedSemel !== undefined);
});

loginButtonfield.addEventListener('click', login);
async function login() {
    try {
        const semel = schoolInputfield.value;
        const year = yearInputfield.value;
        const username = usernameInputfield.value;
        const password = passwordInputfield.value;

        loginInfo = await mashov.loginToMashov(semel, year, username, password);
        const tempLoginInfo = { ...loginInfo };
        let displayName = await tempLoginInfo[2].json();
        displayName = displayName.credential;
        displayName = displayName.displayName;

        loginInfo = await mashov.loginToMashov(semel, year, username, password);
        document.getElementById("displayName").innerHTML = (displayName);
        document.getElementById('after-login').style.display = "block";
        document.getElementById('login').style.display = "none";
        if (rememberMeInputfield.checked) {
            localStorage.setItem("semel", semel);
            localStorage.setItem("password", password);
            localStorage.setItem("username", username);
        }
        return loginInfo;
    }
    catch (error) {
        console.error(error);
    }
}

function restoreDetails() {
    const semel = localStorage.getItem("semel");
    const year = yearInputfield.value;
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");
    schoolInputfield.value = semel;
    usernameInputfield.value = username;
    passwordInputfield.value = password;
    loginButton.removeAttribute("disabled");
    if (semel != "")
        login();
}

document.getElementById('timeTableButton').addEventListener('click', async () => {
    await login();
    gradesContainer.style.display = 'none';
    homeworkContainer.style.display = 'none';
    behavingContainer.style.display = 'none';
    messagesListContainer.style.display = "none";

    try {
        timetable = await mashov.get(loginInfo, 'timetable');

        timetableContainer.style.display = 'block';
        prevDayButton.style.display = 'block';
        nextDayButton.style.display = 'block';

        timetable.forEach(item => {
            if (!daysArray.includes(item.timeTable.day)) {
                daysArray.push(item.timeTable.day);
            }
        });

        displayTimetableForCurrentDay();
    } catch (error) {
        console.error(error);
    }
});

document.getElementById('getHomeworkButton').addEventListener('click', async () => {
    timetableContainer.style.display = 'none';
    gradesContainer.style.display = 'none';
    behavingContainer.style.display = 'none';
    prevDayButton.style.display = 'none';
    messagesListContainer.style.display = "none";
    nextDayButton.style.display = 'none';
    try {
        await login();
        const homework = await mashov.get(loginInfo, 'homework');

        homeworkContainer.style.display = 'block';

        homeworkContainer.innerHTML = '';

        if (homework.length === 0) {
            const noHomeworkMessage = document.createElement('p');
            noHomeworkMessage.textContent = 'No homework available.';
            homeworkContainer.appendChild(noHomeworkMessage);
        } else {
            const homeworkTable = document.createElement('table');
            homeworkTable.innerHTML = `
                <thead>
                    <tr>
                        <th>Subject</th>
                        <th>Remark</th>
                        <th>Homework</th>
                        <th>Lesson Date</th>
                    </tr>
                </thead>
                <tbody id="homeworkBody">
                </tbody>
            `;
            homeworkContainer.appendChild(homeworkTable);

            const homeworkBody = document.getElementById('homeworkBody');
            homework.forEach(work => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${work.subjectName}</td>
                    <td>${work.remark}</td>
                    <td>${work.homework}</td>
                    <td>${formatDate(work.lessonDate)}</td>
                `;
                homeworkBody.appendChild(row);
            });
        }
    } catch (error) {
        console.error(error);
    }
});

document.getElementById('getGradesButton').addEventListener('click', async () => {
    await login();
    timetableContainer.style.display = 'none';
    homeworkContainer.style.display = 'none';
    behavingContainer.style.display = 'none';
    prevDayButton.style.display = 'none';
    nextDayButton.style.display = 'none';
    messagesListContainer.style.display = "none";

    try {
        const grades = await mashov.get(loginInfo, 'grades');
        console.log(grades);
        gradesContainer.style.display = 'block';

        gradesContainer.innerHTML = '';

        if (grades.length === 0) {
            const noGradesMessage = document.createElement('p');
            noGradesMessage.textContent = 'No grades available.';
            gradesContainer.appendChild(noGradesMessage);
        } else {
            const gradesTable = document.createElement('table');
            gradesTable.innerHTML = `
                <thead>
                    <tr>
                        <th>Subject</th>
                        <th>Type</th>
                        <th>Event</th>
                        <th>Grade</th>
                        <th>Event Date</th>
                        <th>Teacher Name</th>
                    </tr>
                </thead>
                <tbody id="gradesBody">
                </tbody>
            `;
            gradesContainer.appendChild(gradesTable);

            const gradesBody = document.getElementById('gradesBody');
            grades.forEach(grade => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${grade.subjectName}</td>
                    <td>${grade.gradeType}</td>
                    <td>${grade.gradingEvent}</td>
                    <td>${grade.grade}</td>
                    <td>${formatDate(grade.eventDate)}</td>
                    <td>${grade.teacherName}</td>
                `;
                gradesBody.appendChild(row);
            });
        }
    } catch (error) {
        console.error(error);
    }
});
document.getElementById("getMessagesButton").addEventListener('click', async () => {
    timetableContainer.style.display = 'none';
    homeworkContainer.style.display = 'none';
    behavingContainer.style.display = 'none';
    gradesContainer.style.display = 'none';
    prevDayButton.style.display = 'none';
    nextDayButton.style.display = 'none';
    try {
        messagesListContainer.style.display = "block";
        await login();
        const mailList = await mashov.getMail(loginInfo, 20);

        messagesListContainer.innerHTML = '';
        if (mailList.length === 0) {
            const noMessagesMessage = document.createElement('p');
            noMessagesMessage.textContent = 'No behavings available.';
            messagesListContainer.appendChild(noMessagesMessage);
        } else {
            const messagesTable = document.createElement('table');
            messagesListContainer.appendChild(messagesTable);
            messagesTable.innerHTML = `
                <thead>
                    <tr>
                        <th>Subject</th>
                        <th>Sender</th>
                        <th>Send Time</th>
                    </tr>
                </thead>
                <tbody id="messagesBody">
                </tbody>
            `;
            messagesListContainer.appendChild(messagesTable);
            mailList.forEach(mail => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${mail.subject}</td>
                    <td>${mail.messages[0].senderName}</td>
                    <td>${formatDate(mail.messages[0].sendTime)}</td>
                `;
                row.setAttribute('id', `mailRowBtn-${mail.conversationId}`);
                row.addEventListener('click', async () => {
                    let messageData = await mashov.getMessageData(loginInfo, mail.conversationId);
                    localStorage.setItem(`messageData-${mail.conversationId}`, JSON.stringify(messageData));
                    localStorage.setItem(`clickedMail`, mail.conversationId);
                    window.location.href = "./Pages/mail.html";
                });
                row.style.cursor = "pointer";
                row.addEventListener('mouseover', () => {
                    row.style.color = '#b8b7b7'; // Change to your desired color
                });

                row.addEventListener('mouseout', () => {
                    row.style.color = ''; // Reset to the default color
                });
                document.getElementById("messagesBody").appendChild(row);
            });
        }
    } catch (error) {
        console.error(error);
    }
});
document.getElementById("getBehavingsButton").addEventListener('click', async () => {
    timetableContainer.style.display = 'none';
    homeworkContainer.style.display = 'none';
    gradesContainer.style.display = 'none';
    prevDayButton.style.display = 'none';
    messagesListContainer.style.display = "none";
    nextDayButton.style.display = 'none';
    try {
        await login();
        const behavings = await mashov.get(loginInfo, 'behave');

        behavingContainer.style.display = 'block';

        behavingContainer.innerHTML = '';

        if (behavings.length === 0) {
            const noBehavingsMessage = document.createElement('p');
            noBehavingsMessage.textContent = 'No behavings available.';
            behavingContainer.appendChild(noBehavingsMessage);
        } else {
            const behavingsTable = document.createElement('table');
            behavingsTable.innerHTML = `
                <thead>
                    <tr>
                        <th>Subject</th>
                        <th>Type</th>
                        <th>Justification</th>
                        <th>Teacher</th>
                        <th>Lesson Date</th>
                    </tr>
                </thead>
                <tbody id="behaveBody">
                </tbody>
            `;
            behavingContainer.appendChild(behavingsTable);

            const behaveBody = document.getElementById('behaveBody');
            behavings.forEach(behave => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${behave.subject}</td>
                    <td>${behave.achvaName}</td>
                    <td>${behave.justification}</td>
                    <td>${behave.reporter}</td>
                    <td>${formatDate(behave.lessonDate)}</td>
                `;
                behaveBody.appendChild(row);
            });
        }
    } catch (error) {
        console.error(error);
    }
});

nextDayButton.addEventListener('click', () => {
    if (currentDayIndex < daysArray.length - 1) {
        currentDayIndex++;
        displayTimetableForCurrentDay();
    }
});

prevDayButton.addEventListener('click', () => {
    if (currentDayIndex > 0) {
        currentDayIndex--;
        displayTimetableForCurrentDay();
    }
});

function displayTimetableForCurrentDay() {
    const days = ["Sunday", "Monday", "Tuesday", "Wednsday", "Thursday", "Friday", "Saturday"];
    daysArray.sort();

    const currentDay = daysArray[currentDayIndex];

    const currentDayTimetable = timetable.filter(item => item.timeTable.day === currentDay);

    currentDayTimetable.sort((a, b) => {
        return parseInt(a.timeTable.lesson) - parseInt(b.timeTable.lesson);
    });
    const div = document.createElement('div');
    div.innerHTML = `<h1>${days[currentDayIndex]}</h1>`;
    const dayTable = document.createElement('table');
    div.appendChild(dayTable);
    dayTable.innerHTML = `
        <thead>
            <tr>
                <th>Lesson</th>
                <th>Room</th>
                <th>Subject</th>
                <th>Teacher</th>
            </tr>
        </thead>
        <tbody id="currentDayTimetable">
        </tbody>
    `;

    timetableContainer.innerHTML = '';
    timetableContainer.appendChild(div);

    const currentDayTableBody = document.getElementById('currentDayTimetable');
    currentDayTimetable.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.timeTable.lesson}</td>
            <td>${item.timeTable.roomNum}</td>
            <td>${item.groupDetails.subjectName}</td>
            <td>${item.groupDetails.groupTeachers[0].teacherName}</td>
        `;
        currentDayTableBody.appendChild(row);
    });
}

restoreDetails();
fetchAndPopulateSchools();
hideTimetableAndGrades();
