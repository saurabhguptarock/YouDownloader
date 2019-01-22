const electron = require("electron");
const { ipcRenderer } = electron;
$("#url").each(function() {
  var elem = $(this);
  elem.data("oldVal", elem.val());
  elem.bind("propertychange change click keyup input paste", function(event) {
    if (elem.data("oldVal") != elem.val()) {
      elem.data("oldVal", elem.val());
      document.getElementById("download").classList.remove("disabled");
    }
    if (!elem.data("oldVal")) {
      document.getElementById("download").classList.add("disabled");
    }
  });
});

// const Swal = require("sweetalert2");
$("#download").click(() => {
  var url = document.getElementById("url");
  str = url.value;
  document.getElementById("inputs").classList.add("animated");
  document.getElementById("inputs").classList.add("slideOutUp");
  document
    .getElementsByTagName("iframe")
    .item(0).src = `https://www.youtube.com/embed/${str}`;
  document.getElementById("hidden").classList.remove("hiddendiv");
  document.getElementById("frame").classList.add("animated");
  document.getElementById("frame").classList.add("slideInLeft");
  document.getElementById("quality").classList.add("animated");
  document.getElementById("quality").classList.add("slideInRight");
  // ipcRenderer.send("yurl", str);
});
$("#form").submit(e => {
  e.preventDefault();
  var url = document.getElementById("url");
  str = url.value;
  document.getElementById("inputs").classList.add("animated");
  document.getElementById("inputs").classList.add("slideOutUp");
  document
    .getElementsByTagName("iframe")
    .item(0).src = `https://www.youtube.com/embed/${str}`;
  document.getElementById("hidden").classList.remove("hiddendiv");
  document.getElementById("frame").classList.add("animated");
  document.getElementById("frame").classList.add("slideInLeft");
  document.getElementById("quality").classList.add("animated");
  document.getElementById("quality").classList.add("slideInRight");
  // ipcRenderer.send("yurl", str);
});
