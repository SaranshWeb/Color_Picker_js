// Get references to DOM elements
const colorInput = document.getElementById('colorInput');
const colorPreview = document.getElementById('colorPreview');
const hexCode = document.getElementById('hexCode');
const rgbCode = document.getElementById('rgbCode');
const hslCode = document.getElementById('hslCode');

// Convert HEX to RGB
function hexToRgb(hex) {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgb(${r}, ${g}, ${b})`;
}

// Convert HEX to HSL
function hexToHsl(hex) {
  const bigint = parseInt(hex.slice(1), 16);
  const r = ((bigint >> 16) & 255) / 255;
  const g = ((bigint >> 8) & 255) / 255;
  const b = (bigint & 255) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
}

// Update the color codes
colorInput.addEventListener('input', () => {
  const selectedColor = colorInput.value;
  colorPreview.style.backgroundColor = selectedColor;

  hexCode.textContent = selectedColor;
  rgbCode.textContent = hexToRgb(selectedColor);
  hslCode.textContent = hexToHsl(selectedColor);
});
