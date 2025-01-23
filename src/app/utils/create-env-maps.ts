const { createCanvas } = require('canvas');
const fs = require('fs');

class EnvironmentMapGenerator {
  private colors = {
    px: '#95BF47', // Right - Shopify green
    nx: '#5E8E3E', // Left - Darker green
    py: '#002E25', // Top - Dark background
    ny: '#002E25', // Bottom - Dark background
    pz: '#95BF47', // Front - Shopify green
    nz: '#5E8E3E'  // Back - Darker green
  };

  private createColorMap(color: string): Buffer {
    const canvas = createCanvas(256, 256);
    const ctx = canvas.getContext('2d');
    
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 256, 256);
    
    return canvas.toBuffer('image/png');
  }

  public generateMaps(): void {
    const dir = 'src/assets/envmap';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    Object.entries(this.colors).forEach(([face, color]) => {
      const buffer = this.createColorMap(color);
      fs.writeFileSync(`${dir}/${face}.png`, buffer);
      console.log(`Created ${face}.png`);
    });
  }
}

const generator = new EnvironmentMapGenerator();
generator.generateMaps();