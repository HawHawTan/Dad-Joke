const navbar = document.querySelector(".navbar");
const html = document.querySelector("html");
const h1 = document.querySelector("h1");
const dad_icon = document.querySelector(".dad-icon");
const burgerIcon = document.querySelector(".navbar-burger");
const navbar_List = document.querySelector(".navbar-menu");
const checkbox = document.getElementById("toggle");
const loader = document.querySelector("#preloader");
const modal = document.querySelector(".modal");
const ol = document.querySelector(".ol");
const footer = document.querySelectorAll(".bottom-text");

//card
const joke_card = document.querySelector(".card");
const history_section = document.querySelector(".history");
const history_box = document.querySelector(".box");

// text
const card_text = document.querySelector("p");
const navbar_text = document.querySelectorAll(".navbar-text");
const footer_text = document.querySelectorAll(".footer_text");
const history_title = document.querySelector(".title_history");

// buttons
const next_button = document.querySelector("#next");
const clear_button = document.querySelector(".clear");
const history_button = document.querySelector("#history");
const xMark_button = document.querySelector(".xmark");

// save data
const getDarkMode = JSON.parse(localStorage.getItem("checkbox"));

// for history
let printNewLine;
let newLI;

//to blur out
const onOff = document.querySelector(".popover1");
const joke_box = document.querySelector(".popover2");
const history_butt = document.querySelector(".popover3");
const clear_butt = document.querySelector(".popover4");
const next_butt = document.querySelector(".popover5");


// save click
let saveCheckboxClick = checkbox.onclick;
const saveHistoryClick = history_button.onclick;
const saveNexClick = next_button.onclick;

// https://github.com/apnsngr/bulma-popover
function start_instruction() {
  if (JSON.parse(localStorage.getItem("save")) == null || JSON.parse(localStorage.getItem("save")).length <= 1) {
    let i;
    const blurArr = [
      next_butt,
      clear_butt,
      history_section,
      history_butt,
      joke_box,
      onOff,
    ];

    history_button.onclick  = null;
    next_button.onclick = null;
    checkbox.disabled = true;
    confirm("Plese read through this:\n \nIt will show you how it works first, please allow it to show you the functions of the dad jokes \n \nEnjoy!");
    for (i = 0; i < blurArr.length; i++) {
      blurArr[i].classList.add("blur_background");
    }

    let arr = blurArr.length;

    const interval_1 = setInterval(() => {
      arr--;

      blurArr[arr].classList.remove("blur_background");
      blurArr[arr].classList.add("is-popover-active");
      console.log("is running second " + arr);

      const interval_2 = setInterval(() => {
        if (blurArr.indexOf(history_section) != arr) {
          blurArr[arr].classList.add("blur_background");
          blurArr[arr].classList.remove("is-popover-active");
        }

        console.log("add back" + arr);

        // openning history button early
        if (blurArr.indexOf(history_section) + 1 == arr) {
          history_button.onclick = saveHistoryClick;
          history_button.click();
          console.log(blurArr.indexOf(history_section));
          console.log(arr);
          // history_section.remove("blur_background")
          let interval_3 = setInterval(() => {
            history_section.classList.remove("history_active");
            ol.innerHTML = " ";
            history_button.onclick = saveHistoryClick;
            clearInterval(interval_3);
          }, 7000);
        }
        clearInterval(interval_2);

        if (arr == 0) {
          clearInterval(interval_1);
          clearInterval(interval_2);
          checkbox.disabled = false;
          next_button.onclick = saveNexClick;
          
          let interval_4 = setInterval(() => {
            for (let i = 0; i < blurArr.length; i++) {
              blurArr[i].classList.remove("blur_background");
            }
            clearInterval(interval_4);
          }, 1000);
          console.log("done no more");
        }
      }, 2500);
    }, 3000);
  }
}

const save = (joke) =>{
  // checking if "save" exist
  let data = JSON.parse(localStorage.getItem("save"));
  if (data == null) {
    data = [];
  }
  data.push(joke)

  // setting "save"
  localStorage.setItem("save", JSON.stringify(data));
}

const defaultDarkMode = async () => {
  const jokes = await getDadJoke();
  // making checkbox equal to true from getDarkMode
  if ((checkbox.checked = getDarkMode)) {
    darkModeList();
  }
  setTimeout(() => {
    loader.style.opacity = "0";
    setTimeout(() => {
      loader.style.display = "none";
    }, 800);
  }, 700);
  card_text.innerHTML = jokes;
  save(jokes);

  start_instruction();
};

const darkMode = () => {
  localStorage.setItem("checkbox", checkbox.checked);
  darkModeList();
  closeHistory();
  checkbox.disabled = true;
  setTimeout(() => {
    checkbox.disabled = false;
  }, 1000);
};

function darkModeList() {
  html.classList.toggle("darkMode");
  dad_icon.classList.toggle("dad-icon-dark");
  joke_card.classList.toggle("darkMode-card");
  loader.style.backgroundColor = "black";
  card_text.classList.toggle("darkMode-content");

  footer_text.forEach((e) => {
    e.classList.toggle("darkMode-text");
  });

  navbar_text.forEach((e) => {
    e.classList.toggle("navbar-text-true");
    e.classList.toggle("darkMode-text");
  });

  history_box.classList.toggle("darkMode-card");
  history_title.classList.toggle("darkMode-text");

  footer.forEach((e) => {
    e.classList.toggle("darkMode-text");
  });
}

const next = async () => {
  card_text.innerHTML = " ";
  card_text.classList.add("run");

  card_text.style.animation = "none";
  card_text.offsetHeight;
  card_text.style.animation = null;

  const jokes = await getDadJoke();
  save(jokes);
  card_text.innerHTML = jokes;

  const newLI = document.createElement("li");
  newLI.append(jokes);
  newLI.classList.add("load");
  ol.append(newLI);
  if (checkbox.checked) {
    newLI.classList.toggle("darkMode-text");
  }
  //http://jsfiddle.net/Bxn2t/1/
};

function showHistory() {
  if (JSON.parse(localStorage.getItem("save"))) {
    JSON.parse(localStorage.getItem("save")).forEach((elem, index) => {
      printNewLine = setTimeout(() => {
        newLI = document.createElement("li");
        newLI.append(elem);
        ol.append(newLI);
        newLI.classList.add("load");
        if (checkbox.checked) {
          newLI.classList.toggle("darkMode-text");
        }
      }, 500 * index);
    });
  }
  if (JSON.parse(localStorage.getItem("save")) == null) {
    ol.innerHTML = " ";
  }
}

const history = () => {
  history_button.onclick = null;
  history_section.classList.add("history_active");
  showHistory();
};

const closeHistory = () => {
  clearInterval(printNewLine);
  history_section.classList.remove("history_active");
  ol.innerHTML = " ";
  setTimeout(() => {
    history_button.onclick = saveHistoryClick;
    console.log("onclick is back");
  }, 1000);
};

clear_button.addEventListener("click", () => {
  localStorage.removeItem("save");
  showHistory();
});

xMark_button.addEventListener("click", closeHistory);

const getDadJoke = async () => {
  try {
    const config = { headers: { Accept: "application/json" } };
    const res = await axios.get("https://icanhazdadjoke.com/", config);
    return res.data.joke;
  } catch (e) {
    return "NO JOKES AVAILABLE! SORRY :(  " + e;
  }
};
