import "./style.css";
import { header } from "./header";
import { main } from "./main";

document.addEventListener("DOMContentLoaded", () => {
  const body = document.getElementById("body");
  body.innerHTML = "";
  body.appendChild(header());
  body.appendChild(main());
});
