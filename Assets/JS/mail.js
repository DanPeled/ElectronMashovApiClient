let messageID = localStorage.getItem("clickedMail");
let messageData = localStorage.getItem(`messageData-${messageID}`);
messageData = JSON.parse(messageData);
const renderMail = async function () {
    try {
        document.getElementById("mailSubject").innerHTML += messageData.subject;
        document.getElementById("mailDiv").innerHTML += messageData.messages[0].body;
    } catch (error) {
        console.log(error);
    }
}
renderMail();