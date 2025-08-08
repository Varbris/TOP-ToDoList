import "./style.css";
import { header } from "./header";
import { main } from "./main";

(function launch() {
  const body = document.getElementById("body");
  body.appendChild(header());
  body.appendChild(main());
})();
