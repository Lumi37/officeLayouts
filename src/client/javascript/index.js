import { highlightOffice } from "./modules/highlightOffice.js";

const svgContainer = document.querySelector("#svgContainer");
const log = document.querySelector("#log");
const powerOutlet = document.querySelector('#powerOutlet')
let selectedShape;  
svgContainer.addEventListener("click", (e) => {
  selectedShape = highlightOffice(e.target, selectedShape);
  log.innerHTML = e.target.id;
  powerOutlet.value = e.target.dataset.outlet
});
