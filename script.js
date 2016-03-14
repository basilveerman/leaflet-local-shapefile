var loadArrayBuffer = function(e) {
  // e.target.result === reader.result
  console.log(e.target.result.byteLength);
  shp(e.target.result).then(function (geojson) {
    console.log(geojson);
  }).catch(function(err) {
    console.log(err);
  });
}

var handleZippedShapefileBuffer = function (file) {
  var reader = new FileReader();
  reader.onload = loadArrayBuffer;
  reader.readAsArrayBuffer(file);
}

var handleZippedShapefileFname = function (file) {
  shp(file.name).then(function (geojson) {
      console.log(geojson);
    });
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

var zippedShapeControlBuffer = L.Control.extend({ //creating the buttons
  options: {
    position: 'topright'
  },
  onAdd: addButton.bind(this, handleZippedShapefileBuffer, "Upload Zipped Shapefile (ArrayBuffer based")
});

m.addControl(new zippedShapeControlBuffer());

var zippedShapeControlFname = L.Control.extend({ //creating the buttons
  options: {
    position: 'topright'
  },
  onAdd: addButton.bind(this, handleZippedShapefileFname, "Upload Zipped Shapefile (filename based)")
});

m.addControl(new zippedShapeControlFname());