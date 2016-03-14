addButton = function (map) {
  var div = L.DomUtil.create('form', 'bgroup');
  var uploadButton = L.DomUtil.create('input', 'uploadShape', div);
  uploadButton.type = "file";
  uploadButton.id = "input";
  uploadButton.onchange = function() {
    var file = document.getElementById("input").files[0];
    handleFile(file);
  }

  // Makes the 'input' button look better
  var doneButton = L.DomUtil.create('button', "btn  btn-primary span3", div);
  doneButton.type = "button";
  doneButton.innerHTML = "Upload Zipped Shapefile";
  L.DomEvent.addListener(doneButton, "click", function() {
      uploadButton.click();
  });

  return div;
};

var NewButton = L.Control.extend({ //creating the buttons
  options: {
    position: 'topright'
  },
  onAdd: addButton
});

m.addControl(new NewButton());