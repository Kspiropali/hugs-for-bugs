// global headers for all requests
let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
const nameRegex = /^[a-zA-Z\-]+$/;
let leaderboard_users = [];

// update trees with student's grades
const updateTrees = () => {
  const name = document.cookie.split("=")[1];

  let raw = JSON.stringify({
    name,
  });

  let requestOptions = {
    credentials: "include",
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  fetch("/statistics/questions", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      // For the leaf popup behavior
      // script.js
      let array1 = [];
      let array2 = [];
      let array3 = [];
      const leaves = document.querySelectorAll(".popup-button");
      const popupContainer = document.querySelector(".popup-container");
      const popup = document.getElementById("popup");

      // setting up subjects
      document.querySelector("#subject1").textContent = result[0].topic;
      document.querySelector("#subject2").textContent = result[1].topic;
      document.querySelector("#subject3").textContent = result[2].topic;

      leaves.forEach((leaf) => {
        if (leaf.classList.contains("tree1")) {
          array1.push(leaf);
        } else if (leaf.classList.contains("tree2")) {
          array2.push(leaf);
        } else if (leaf.classList.contains("tree3")) {
          array3.push(leaf);
        }
      });

      let array = [array1, array2, array3];
      for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array[i].length; j++) {
          try {
            let result_grade = result[i].questions[j].result;

            //changing color scheme based on result
            if (result_grade === "Perfect") {
              array[i][j].style.backgroundColor = "green";
            } else if (result_grade === "Normal") {
              array[i][j].style.backgroundColor = "yellow";
            } else if (result_grade === "Bad") {
              array[i][j].style.backgroundColor = "red";
            } else if (result_grade === "Skipped") {
              array[i][j].style.backgroundColor = "grey";
            }

            // making it visible
            array[i][j].style.display = "block";

            //adding popup on mouse hover listener
            array[i][j].addEventListener("mouseenter", () => {
              let responsiveWeight = 1
              if (window.innerWidth < 561) {
                responsiveWeight = 1.2
              }
              const buttonRect = array[i][j].getBoundingClientRect();
              const containerRect = popupContainer.getBoundingClientRect();
              const leftOffset =
                (buttonRect.left - containerRect.left + buttonRect.width / 1.9 + 20);
              const topOffset = (buttonRect.top - containerRect.top - 25) * responsiveWeight;

              popup.textContent = array[i][j].getAttribute("data-popup");
              popupContainer.style.left = `${leftOffset}px`;
              popupContainer.style.top = `${topOffset - popup.offsetHeight}px`;
              popupContainer.style.display = "block";
              popup.style.display = "block";
              popup.textContent = result[i].questions[j].question;
            });

            //adding hide popup on mouse leave listener
            array[i][j].addEventListener("mouseleave", () => {
              popupContainer.style.display = "none";
              popup.style.display = "none";
            });
          } catch (error) {}
        }
      }
    });
};

// cookie helper function
const deleteAllCookies = () => {
  let cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.slice(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
};

async function asyncLogin(e) {
  e.preventDefault();
  deleteAllCookies();
  let button = document.querySelector("#login_create_btn");
  let name = document.querySelector("#username").value;

  if (!name || !nameRegex.test(name)) {
    button.value = "NO!";
    button.style.background = "red";
    button.setAttribute("disabled", "disabled");
    return;
  }

  let data = JSON.stringify({
    name,
  });

  let requestOptions = {
    method: "POST",
    credentials: "include",
    headers: myHeaders,
    body: data,
    redirect: "follow",
  };

  fetch("/login", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      if (result === "Student's name does not exist in the database!") {
        button.removeAttribute("disabled");
        button.value = "REGISTER";
        button.style.backgroundColor = "green";
      } else if (result === "Logged in!") {
        // switch to logged in ui
        button.removeAttribute("disabled");
        button.value = "LOGIN";
        button.style.backgroundColor = "blue";
      }
    })
    .catch((error) => console.log("error", error));
}

// login button handler
document.querySelector("#loginForm").addEventListener("submit", (e) => {
  e.preventDefault();
  let buttonValue = document.querySelector("#login_create_btn").value;

  let data = JSON.stringify({
    name: e.target.username.value,
  });

  let requestOptions = {
    credentials: "include",
    method: "POST",
    headers: myHeaders,
    body: data,
    redirect: "follow",
  };

  requestOptions.headers.append("body", data);

  if (buttonValue === "REGISTER") {
    fetch("/register", requestOptions)
      .then((response) => response.text())
      .catch((error) => console.log("error", error));
  }

  fetch("/login", requestOptions)
    .then((response) => response.text())
    .then(() => {
      // switch to logged in ui
      document.querySelector("#loginForm").style.display = "none";
      document.querySelector("#btn-play").style.display = "block";
      document.querySelector("#btn-logout").style.display = "block";
      updateTrees();
    })
    .catch((error) => console.log("error", error));
});

// logout button handler
document.querySelector("#btn-logout").addEventListener("click", () => {
  deleteAllCookies();
  window.location.reload();
});

// handle Play button clicked
document.querySelector("#btn-play").addEventListener("click", () => {
  if (!document.cookie.includes("user=")) {
    deleteAllCookies();
    window.location = "/";
  }
  window.location = "/question";
});

// check if user is logged in already
if (document.cookie) {
  document.querySelector("#loginForm").style.display = "none";
  document.querySelector("#btn-play").style.display = "block";
  document.querySelector("#btn-logout").style.display = "block";
  updateTrees();
}

document.querySelector("#username").addEventListener("keyup", asyncLogin);

(function () {
  fetch("/statistics/best", { method: "POST" })
    .then((response) => response.json())
    .then((result) => {
      if (result.length === 0) {
        return;
      } else if (result.length === leaderboard_users.length) {
        return;
      }

      let leaderboard = document.querySelector("#leaderboard_data");
      leaderboard.innerHTML = "";

      result.forEach((element) => {
        leaderboard_users.includes(result) ? 0 : leaderboard_users.push(result);
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

  setTimeout(arguments.callee, 400);
})();


// Slider functionality

// Array of trees
const trees = document.querySelectorAll(".tree-container");

// Index counter
let currentIndex = 0;

// Left button
document.querySelectorAll(".btn-slider")[0].addEventListener("click", () => slider("left"));

// Right button
document.querySelectorAll(".btn-slider")[1].addEventListener("click", () => slider("right"));

// Slider function
function slider(direction) {

  if (direction === "left") {
    trees[currentIndex].classList.toggle("hidden-element");

    if (currentIndex === 0) {
      trees[trees.length - 1].classList.toggle("hidden-element");
      currentIndex = trees.length - 1;
    } else {
      trees[currentIndex - 1].classList.toggle("hidden-element");
      currentIndex--;
    }
  }
  else if (direction === "right") {
    trees[currentIndex].classList.toggle("hidden-element");

    if (currentIndex === trees.length - 1) {
      trees[0].classList.toggle("hidden-element");
      currentIndex = 0;
    } else {
      trees[currentIndex + 1].classList.toggle("hidden-element");
      currentIndex++;
    }
  }
}

// Start of stop slider on certain window width
window.addEventListener("resize", toggleSlider);
window.addEventListener("load", toggleSlider);

function toggleSlider() {
  if (window.innerWidth < 1171 && !trees[0].classList.contains("hidden-element")) {
    for(let i = 1; i < trees.length; i++) {
      trees[i].classList.add("hidden-element");
    }
  }
  if (window.innerWidth > 1170) {
    for(let i = 0; i < trees.length; i++) {
      trees[i].classList.remove("hidden-element");
    }
  }
}