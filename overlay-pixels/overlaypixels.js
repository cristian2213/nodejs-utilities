const fs = require("fs");
const PNG = require("pngjs").PNG;

// Read the original image
const originalBuffer = fs.readFileSync("./images/original.png");
const originalImage = PNG.sync.read(originalBuffer);

// Read the watermark image
const watermarkBuffer = fs.readFileSync("./images/watermark.png");
const watermarkImage = PNG.sync.read(watermarkBuffer);

// Ensure the dimensions of the images are the same
if (
  originalImage.width !== watermarkImage.width ||
  originalImage.height !== watermarkImage.height
) {
  console.error("Image dimensions do not match.");
  process.exit(1);
}

// Overlay the watermark on the original image
for (let y = 0; y < originalImage.height; y++) {
  for (let x = 0; x < originalImage.width; x++) {
    const idx = (originalImage.width * y + x) << 2; // Calculate the pixel index

    // Extract pixel data from the watermark image
    const watermarkPixel = {
      r: watermarkImage.data[idx],
      g: watermarkImage.data[idx + 1],
      b: watermarkImage.data[idx + 2],
      a: watermarkImage.data[idx + 3],
    };

    // Check the alpha (transparency) value of the watermark pixel
    if (watermarkPixel.a > 0) {
      // Overlay the watermark pixel onto the original image
      originalImage.data[idx] = watermarkPixel.r;
      originalImage.data[idx + 1] = watermarkPixel.g;
      originalImage.data[idx + 2] = watermarkPixel.b;
    }
  }
}

// Save the modified image
const outputBuffer = PNG.sync.write(originalImage);
fs.writeFileSync("overlay-result.png", outputBuffer);
console.log("Image processing complete.");
