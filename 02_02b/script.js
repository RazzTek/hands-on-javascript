/**
 * Create a light/dark mode switch.
 * References:
 * - https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme
 * - https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
 */

import data from "./data.js";
import Cardlist from "./components/Cardlist.js";

// Add license info to each data object.
const license = {
  license: "Unsplash License",
  license_uri: "https://unsplash.com/license",
};
const newData = data.map((imgData) => {
  const newImgData = { ...imgData, ...license };
  return newImgData;
});

const mainContent = document.querySelector(".main-content");

mainContent.innerHTML = Cardlist(newData);

/**
 * Light/dark mode feature.
 */
const toggle = document.querySelector(".toggle");

const docElement = document.documentElement;

const displayModeOnLoad = ( ) => {

  let dark = false;
  dark = !! (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
  dark = localStorage.getItem("darkMode") === "enabled";
  if (dark)
    {
      docElement.classList.add("dark");
      toggle.setAttribute("aria-pressed", "true");
      localStorage.setItem("darkMode", "enabled");
    }
    else
    {
      docElement.classList.add("light");
      toggle.removeAttribute("aria-pressed");
      localStorage.setItem("darkMode", "disabled");
    }
}
displayModeOnLoad();

// Trigger mode change with toggle.
const toggleDisplayMode = () => {
  if (toggle.getAttribute("aria-pressed") === "true") {
    toggle.removeAttribute("aria-pressed");
    localStorage.setItem("darkMode", "disabled");
  } else {
    toggle.setAttribute("aria-pressed", "true");
    localStorage.setItem("darkMode", "enabled");
  }
  docElement.classList.toggle("light");
  docElement.classList.toggle("dark");

};
toggle.addEventListener("click", () => toggleDisplayMode());
