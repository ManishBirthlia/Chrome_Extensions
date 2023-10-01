let minute = 0,
  second = 0,
  hour = 0,
  watchTimerRef,
  leetcode_stopWatch_pause_img,
  leetcode_stopWatch_resume_img,
  leetcode_stopWatch_view_img,
  leetcode_stopWatch_hide_img,
  leetcode_stopWatch_stop_img,
  leetcode_stopWatch_replay_img,
  pauseImage = chrome.runtime.getURL("images/pause.png"),
  playImage = chrome.runtime.getURL("images/play.png"),
  viewImage = chrome.runtime.getURL("images/view.png"),
  hideImage = chrome.runtime.getURL("images/hide.png"),
  stopImage = chrome.runtime.getURL("images/stop.png"),
  replayImage = chrome.runtime.getURL("images/replay.png"),
  leetcodeNavbarID;
window.addEventListener("load", function () {
  function injectMyHtml() {
    let leetCodeN = document.getElementsByTagName("nav")[0];
    let leetCodeNav = leetCodeN.querySelector("div");
    let leetCodeNavBar = leetCodeNav.querySelector("ul");
    let newElement = document.createElement("div");
    newElement.innerHTML = `<div class="leetcode_stopWatch">
<img
  class="leetcode_stopWatch_img"
  id="leetcode_stopWatch_pause_img"
  src=${pauseImage}
  width="18px"
  height="15px"
  alt="Click to stop the timer"
/>
<img
class="leetcode_stopWatch_img"
id="leetcode_stopWatch_resume_img"
  src=${playImage}
  width="18px"
  height="15px"
  alt="Click to resume the timer"
  />
  <h1 class="leetcode_Watch">00:00:00</h1>
  <img
  class="leetcode_stopWatch_img"
  id="leetcode_stopWatch_view_img"
  src=${viewImage}
  width="18px"
  height="18px"
  alt="Click to view or hide the timer"
  />
  <img
  class="leetcode_stopWatch_img"
  id="leetcode_stopWatch_hide_img"
  src=${hideImage}
  width="18px"
  height="18px"
  alt="Click to view or hide the timer"
/>
<img
class="leetcode_stopWatch_img"
  id="leetcode_stopWatch_stop_img"
  src=${stopImage}
  width="18px"
  height="18px"
  alt="Click to stop the timer"
  />
  <img
  class="leetcode_stopWatch_img"
  id="leetcode_stopWatch_replay_img"
  src=${replayImage}
  width="18px"
  height="17px"
  alt="Click to restart the timer"
/>
</div>`;
    console.log(leetCodeNavBar);
    console.log(newElement);
    leetCodeNavBar.append(newElement);
    leetcode_stopWatch_pause_img = document.querySelector(
      "#leetcode_stopWatch_pause_img"
    );
    leetcode_stopWatch_resume_img = document.querySelector(
      "#leetcode_stopWatch_resume_img"
    );
    leetcode_stopWatch_view_img = document.querySelector(
      "#leetcode_stopWatch_view_img"
    );
    leetcode_stopWatch_hide_img = document.querySelector(
      "#leetcode_stopWatch_hide_img"
    );
    leetcode_stopWatch_stop_img = document.querySelector(
      "#leetcode_stopWatch_stop_img"
    );
    leetcode_stopWatch_replay_img = document.querySelector(
      "#leetcode_stopWatch_replay_img"
    );
    watchTimerRef = document.querySelector(".leetcode_Watch");
    leetcode_stopWatch_resume_img.style.display = "none";
    leetcode_stopWatch_hide_img.style.display = "none";
    leetcode_stopWatch_replay_img.addEventListener("click", (event) => {
      if (event.target.id === "leetcode_stopWatch_replay_img")
        restartStopWatch();
    });
    leetcode_stopWatch_stop_img.addEventListener("click", (event) => {
      if (event.target.id === "leetcode_stopWatch_stop_img") stopStopWatch();
    });
    leetcode_stopWatch_hide_img.addEventListener("click", (event) => {
      if (event.target.id === "leetcode_stopWatch_hide_img")
        toggleHideStopWatch();
    });
    leetcode_stopWatch_view_img.addEventListener("click", (event) => {
      if (event.target.id === "leetcode_stopWatch_view_img")
        toggleHideStopWatch();
    });
    leetcode_stopWatch_resume_img.addEventListener("click", (event) => {
      if (event.target.id === "leetcode_stopWatch_resume_img")
        togglePauseStopWatch();
    });
    leetcode_stopWatch_pause_img.addEventListener("click", (event) => {
      if (event.target.id === "leetcode_stopWatch_pause_img")
        togglePauseStopWatch();
    });
  }
  if(document.getElementsByTagName("nav")[0]) injectMyHtml();
});

function updateWatch() {
  second++;
  if (second == 60) {
    minute++;
    second = 0;
    if (minute == 60) {
      minute = 0;
      hour++;
      if (hour == 24) {
        hour = 0;
      }
    }
  }
  let m = minute > 9 ? minute : "0" + minute,
    s = second > 9 ? second : "0" + second,
    h = hour > 9 ? hour : "0" + hour;
  watchTimerRef.innerText = h + ":" + m + ":" + s;
}
function setStartingValue() {
  minute = 0;
  second = 0;
  hour = 0;
  watchTimerRef.innerText = "00:00:00";
}
let timesetter = setInterval(updateWatch, 1000);
const togglePauseStopWatch = () => {
  if (leetcode_stopWatch_resume_img.style.display === "none") {
    clearInterval(timesetter);
    leetcode_stopWatch_pause_img.style.display = "none";
    leetcode_stopWatch_resume_img.style.display = "";
  } else {
    timesetter = setInterval(updateWatch, 1000);
    leetcode_stopWatch_pause_img.style.display = "";
    leetcode_stopWatch_resume_img.style.display = "none";
  }
};
const toggleHideStopWatch = () => {
  if (leetcode_stopWatch_hide_img.style.display === "none") {
    watchTimerRef.style.display = "none";
    leetcode_stopWatch_hide_img.style.display = "";
    leetcode_stopWatch_view_img.style.display = "none";
  } else {
    watchTimerRef.style.display = "";
    leetcode_stopWatch_hide_img.style.display = "none";
    leetcode_stopWatch_view_img.style.display = "";
  }
};
const stopStopWatch = () => {
  setStartingValue();
  if (leetcode_stopWatch_resume_img.style.display === "none") {
    togglePauseStopWatch();
  }
};
const restartStopWatch = () => {
  setStartingValue();
  if (leetcode_stopWatch_resume_img.style.display !== "none") {
    togglePauseStopWatch();
  }
};
