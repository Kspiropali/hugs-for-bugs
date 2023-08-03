let requestOptions = {
    method: "POST",
    redirect: "follow",
};

// cookie helper function
function deleteAllCookies() {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.slice(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}

fetch("/question/random", requestOptions)
    .then((response) => response.json())
    .then((result) => {
        // question
        document.querySelector("#question_text").textContent = result.question;

        // answers
        document.querySelector("#answer1_text").textContent = result.answers[0];
        document.querySelector("#answer2_text").textContent = result.answers[1];
        document.querySelector("#answer3_text").textContent = result.answers[2];
        document.querySelector("#answer4_text").textContent = result.answers[3];
    })
    .catch((error) => console.log("error", error));

document.querySelector("#btn-submit-answers").addEventListener("click", (e) => {
    e.preventDefault();
    let studentAnswer = "";

    if (document.querySelector("#answer1").checked) {
        studentAnswer = document.querySelector("#answer1_text").textContent;
    } else if (document.querySelector("#answer2").checked) {
        studentAnswer = document.querySelector("#answer2_text").textContent;
    } else if (document.querySelector("#answer3").checked) {
        studentAnswer = document.querySelector("#answer3_text").textContent;
    } else if (document.querySelector("#answer4").checked) {
        studentAnswer = document.querySelector("#answer4_text").textContent;
    } else {
        return;
    }

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
        question: document.querySelector("#question_text").textContent,
        answer: studentAnswer,
        name: document.cookie.split("=")[1],
    });

    let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
    };

    fetch("/question/verify", requestOptions)
        .then((response) => response.text())
        .then((result) => {
            if (result === "Incorrect!") {
            } else if (result === "Correct!") {
            } else {
                deleteAllCookies();
                window.location = "/";
            }
        })
        .catch(() => {
            window.location = "/";
        });

    window.location = "/question";
    // TODO: add a limit counter everytime student launches the questions page
});

document.querySelector("#btn-exit").addEventListener("click", () => {
    window.onbeforeunload = function () {
        return "Are you sure you want to leave?";
    };

    window.location = "/";
});
