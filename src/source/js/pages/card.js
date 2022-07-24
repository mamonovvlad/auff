"use strict";
const toggleInformation = document.querySelector(".toggle-information");
//const button = toggleInformation.querySelectorAll(".button");
const tabs = document.querySelector(".tabs");
const listsContent = document.querySelector(".lists__content");

document.addEventListener("DOMContentLoaded", () => {
  
  //Tabs content
  if (toggleInformation && toggleInformation.querySelectorAll(".button")) {
    const button = toggleInformation.querySelectorAll(".button")
    button.forEach((btn, idx) => {
      btn.addEventListener("click", () => {
        removeClass();
        if (idx === 0) {
          btn.classList.add("active");
          listsContent.style.display = "block";
          tabs.style.display = "none";
        } else {
          btn.classList.add("active");
          listsContent.style.display = "none";
          tabs.style.display = "block";
        }
        
      });
    });
    const removeClass = () => {
      for (let i = 0; i < button.length; i++) {
        button[i].classList.remove("active");
      }
    };
  }
});