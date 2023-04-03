let panelVisible = true;
let controlPanel;
let slider;
let buttonToggle;
let colorPicker;
let pickedColor;
let squareColor;

let pickerCursorX;
let pickerCursorY;

function setup() {
	// createMetaTag();
  createCanvas(windowWidth, windowHeight);
	background(0);

  // Create control panel
  controlPanel = createDiv();
  controlPanel.position(0, 0);
  controlPanel.style('width', '50%');
  controlPanel.style('height', '100%');
  controlPanel.style('background-color', 'rgba(255,255,255, 0)');
  controlPanel.style('display', 'block');

  // Create a slider
  slider = createSlider(0, 255, 0);
  slider.position(20, 20);
  slider.parent(controlPanel);

  // Create a button to toggle the control panel
  buttonToggle = createButton("Hide Panel");
  buttonToggle.position(width - width * 0.15, height * 0.05);
  buttonToggle.mouseClicked(togglePanel);

  // Create color picker
  colorPicker = createGraphics(100, 100);
  generateColorPicker();
	
	// Picker cursor initiation
	pickerCursorX = controlPanel.x + 10;
	pickerCursorY = controlPanel.y + 50;



  // Initial square color
  squareColor = color(255);

  // Create picked color indicator
  pickedColor = createDiv();
  pickedColor.position(20, 50 + colorPicker.height);
	console.log(colorPicker.height);
  pickedColor.style('width', '50px');
  pickedColor.style('height', '50px');
  pickedColor.style('background-color', squareColor.toString());
  pickedColor.parent(controlPanel);
}

function draw() {
  background(0);



  // Draw the square with picked color
  fill(squareColor);
  rect(width / 2 - 50, height / 2 - 50, 100, 100);
	
  // Draw the color picker if the control panel is visible
  if (panelVisible) {
		
		noStroke()
		fill(255, 255, 255);
		rect(0, 0, width * 0.5, height);	
    
		image(colorPicker, controlPanel.x + 10, controlPanel.y + 50);
		console.log(colorPicker.height); // test
		stroke(0);
		fill(squareColor);
		ellipse(pickerCursorX, pickerCursorY, 10, 10);
  }
	
	if (mouseIsPressed) {
		if (panelVisible && mouseX > controlPanel.x + 10 && mouseX < controlPanel.x + 10 + colorPicker.width && mouseY > controlPanel.y + 50 && mouseY < controlPanel.y + 50 + colorPicker.height) {
			let x = mouseX - (controlPanel.x + 10);
			let y = mouseY - (controlPanel.y + 50);

			squareColor = color(colorPicker.get(x, y))

			pickerCursorX = mouseX;
			pickerCursorY = mouseY;
			
			pickedColor.style('background-color', squareColor);

		}
	}

	fill(0, 255, 255);
	rect(width / 2, height / 2, 100, 100);
	

	
}

function togglePanel() {
  panelVisible = !panelVisible;
  controlPanel.style('display', panelVisible ? 'block' : 'none');
  buttonToggle.html(panelVisible ? 'Hide Panel' : 'Show Panel');
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  controlPanel.position(0, 0);
  buttonToggle.position(width - width * 0.15, height * 0.05);
}

function generateColorPicker() {
  for (let x = 0; x < colorPicker.width; x++) {
    for (let y = 0; y < colorPicker.height; y++) {
      let hue = floor(map(x, 0, colorPicker.width, 0, 360));
      let saturation = floor(map(y, 0, colorPicker.height, 0, 100));
      colorPicker.stroke(color("hsb(" + hue + ", " + saturation + "%, 100%)"));
      colorPicker.strokeWeight(2);
			colorPicker.point(x, y);
    }
  }
	colorPicker.noFill();
	colorPicker.stroke(0);
	colorPicker.strokeWeight(1);
	colorPicker.rect(0, 0, colorPicker.width, colorPicker.height); 
}

// function createMetaTag() {
// 	let meta = createElement('meta');
// 	meta.attribute('name', 'viewport');
// 	meta.attribute('content', 'user-scalable=no,initial-scale=1,maximum-scale=1,minimum-scale=1,width=device-width,height=device-height');

// 	let head = select('head');
// 	meta.parent(head);
// }

function touchMoved() {
  // prevent the display from moving around when you touch it
  return false;
}

// function touchEnded() {
//   var fs = fullscreen();
//   if (!fs) {
//     fullscreen(true);
//   }
// }

// window.addEventListener('load', function() {
// 	setTimeout(function() {
// 		window.scrollTo(0, 1);
// 	}, 0);
// });
