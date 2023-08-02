// global headers for all requests
let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

fetch("http://localhost:8080/statistics/best", { method: "POST" })
  .then((response) => response.json())
  .then((result) => {
    let leaderboard = document.querySelector("#leaderboard_data");
    result.forEach((element) => {
      let li = document.createElement("li");
      let span_name = document.createElement("span");
      let span_points = document.createElement("span");

      span_name.textContent = element.name;
      span_points.textContent = element.points;

      li.append(span_name);
      li.append(span_points);

      leaderboard.append(li);
    });
  })
  .catch((error) => console.log("error", error));

// login button handler
document.querySelector("#loginForm").addEventListener("submit", (e) => {
  e.preventDefault();

  let data = JSON.stringify({
    name: e.target.username.value,
  });

  let requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: data,
    redirect: "follow",
  };

  requestOptions.headers.append("body", data);

  fetch("http://localhost:8080/login", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      if (result === "Student's name does not exist in the database!") {
        alert("Wrong username!");
        document.querySelector("#username").value = "";
        return;
      }
      // switch to logged in ui
      document.querySelector("#loginForm").style.display = "none";
      document.querySelector("#btn-play").style.display = "block";
      document.querySelector("#btn-logout").style.display = "block";
      updateTrees();
    })
    .catch((error) => console.log("error", error));
});

// logout button handler
document.querySelector("#btn-logout").addEventListener("click", (e) => {
  deleteAllCookies();
  window.location.reload();
});

// cookie helper function
function deleteAllCookies() {
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}

// check if user is logged in already
if (document.cookie) {
  document.querySelector("#loginForm").style.display = "none";
  document.querySelector("#btn-play").style.display = "block";
  document.querySelector("#btn-logout").style.display = "block";
}

// handle Play button clicked
document.querySelector("#btn-play").addEventListener("click", (e) => {
  if (!document.cookie.includes("user=")) {
    deleteAllCookies();
    window.location = "/";
  }
  window.location = "/question";
});

const updateTrees = () => {
  const name = document.cookie.split("=")[1];

  var raw = JSON.stringify({
    name,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  fetch("http://localhost:8080/statistics/questions", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      // For the leaf popup behavior
      // script.js
      const leaves = document.querySelectorAll(".popup-button");
      const popupContainer = document.querySelector(".popup-container");
      const popup = document.getElementById("popup");
      
      // setting up subjects
      document.querySelector("#subject1").textContent = result[0].topic;
      document.querySelector("#subject2").textContent = result[1].topic;
      document.querySelector("#subject3").textContent = result[2].topic;

      leaves.forEach((leaf) => {
        leaf.addEventListener("mouseenter", () => {
          const buttonRect = leaf.getBoundingClientRect();
          const containerRect = popupContainer.getBoundingClientRect();
          const leftOffset =
            buttonRect.left - containerRect.left + buttonRect.width / 1.9;
          const topOffset = buttonRect.top - containerRect.top - 25;

          popup.textContent = leaf.getAttribute("data-popup");
          popupContainer.style.left = `${leftOffset}px`;
          popupContainer.style.top = `${topOffset - popup.offsetHeight}px`;
          popupContainer.style.display = "block";
          popup.style.display = "block";
          popup.textContent =
            "THis is a very big question for studentaaaaa aaaaaaaaaaaaaaaaaaaas";
        });

        leaf.addEventListener("mouseleave", () => {
          popupContainer.style.display = "none";
          popup.style.display = "none";
        });
      });
    })
    .catch((error) => console.log("error", error));
};
