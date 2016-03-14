var readerLoad = function(e) {
  // e.target.result === reader.result
  console.log(e.target.result.byteLength);
  shp(e.target.result).then(function (geojson) {
    console.log(geojson);
  });
}

var handleZippedShapefile = function (file) {
  var reader = new FileReader();
  reader.onload = readerLoad;
  reader.readAsArrayBuffer(file);
}

var makeButtonOverlay = function (div, b, title) {
  var overlayButton = L.DomUtil.create('button', "btn  btn-primary span3", div);
  overlayButton.type = "button";
  overlayButton.innerHTML = title;
  L.DomEvent.addListener(overlayButton, "click", function() {
      b.click();
  });
  return overlayButton;
};

var makeUploadInput = function (div, then) {
  var uploadButton = L.DomUtil.create('input', div);
  uploadButton.type = "file";
  uploadButton.style="display:none;";
  uploadButton.onchange = function() {
    var file = uploadButton.files[0];
    then(file);
  }
  return uploadButton;
};

addButton = function (handler, title) {
  // Creates container div, input button
  var div = L.DomUtil.create('form', 'bgroup');
  var uploadButton = makeUploadInput(div, handler);

  // Makes the 'input' button look less bad
  var overlayButton = makeButtonOverlay(div, uploadButton, title);
  return div;
};

var zippedShapeControl = L.Control.extend({ //creating the buttons
  options: {
    position: 'topright'
  },
  onAdd: addButton.bind(this, handleZippedShapefile, "Upload Zipped Shapefile")
});

m.addControl(new zippedShapeControl());