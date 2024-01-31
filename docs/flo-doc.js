"use strict";

var langs = [
  ["index", "English"],
  ["ru",    "Русский"]
];

function on_language_changed() {
  let i = this.options[this.selectedIndex].value;
  window.location.assign(langs[i][0] + ".html");
}

//-----------------------------------------------------------------------------

function on_body_loaded() {
  
  // Language selector
  
  let sel = document.getElementById("idSelectLanguage");
  let opt;
  for (let i = 0; i < langs.length; i++) {
    opt = document.createElement("option");
    opt.value = i;
    opt.insertAdjacentText("beforeend", langs[i][1]);
    sel.appendChild(opt);
    if (document.URL.match(/\/([^\/]*?)\.html/)[1] == langs[i][0]) {
      sel.selectedIndex = i;
    }
  }
  sel.addEventListener("change", on_language_changed);
  
  //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  
  // Table of content
  
  let toc_div = document.getElementById("idDivTOC");
  
  let headers = [];
  
  for (const e of document.getElementsByTagName("*")) {
    switch(e.tagName) {
      case "H1":
      case "H2":
      case "H3":
        headers.push(e)
    }
  }
  
  for (let i = 0; i < headers.length; i++) {
    let h = headers[i];
    h.id = "id_" + h.tagName.toLowerCase() + "_" + i.toString();
    toc_div.insertAdjacentHTML("beforeend", "<a class=\"toc\" href=\"#" + h.id + "\"" +
    "style=\"margin-left: " + parseInt(h.id.substring(4, 5) - 1) + "0px;\">" + h.innerHTML + "</a>");
  }
}
