const fs = require('fs');
const { createCanvas } = require('canvas');

// Shopify colors
const colors = {
    px: '#95BF47', // Right - Shopify green
    nx: '#5E8E3E', // Left - Darker green
    py: '#002E25', // Top - Dark background
    ny: '#002E25', // Bottom - Dark background
    pz: '#95BF47', // Front - Shopify green
    nz: '#5E8E3E'  // Back - Darker green
};

// Create directory if it doesn't exist
if (!fs.existsSync('src/assets/envmap')) {
    fs.mkdirSync('src/assets/envmap', { recursive: true });
}

// Create each face of the environment map
Object.entries(colors).forEach(([face, color]) => {
    const canvas = createCanvas(256, 256);
    const ctx = canvas.getContext('2d');
    
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 256, 256);
    
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(`src/assets/envmap/${face}.png`, buffer);
    console.log(`Created ${face}.png`);
});