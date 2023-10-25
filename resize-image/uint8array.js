const fs = require("fs");
const sharp = require("sharp");

// Read the input image file into a buffer
const inputBuffer = fs.readFileSync("./images/input.png");

// Create a typed array from the buffer
const inputTypedArray = new Uint8Array(inputBuffer);

// Process the image using the Sharp library
sharp(inputBuffer)
  .resize(300, 200) // Resize the image
  .toBuffer() // Convert the processed image to a buffer
  .then((outputBuffer) => {
    // Save the modified image to a new file
    fs.writeFileSync("output.png", outputBuffer);
    console.log("Image processing complete.");
  })
  .catch((err) => {
    console.error("Error processing image:", err);
  });
