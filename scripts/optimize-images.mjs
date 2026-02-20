import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const IMAGE_ROOT = path.resolve("assets/images");
const SUPPORTED_EXTENSIONS = new Set([".png", ".jpg", ".jpeg"]);

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) return walk(fullPath);
      return [fullPath];
    }),
  );

  return files.flat();
}

async function optimizeImage(imagePath) {
  const ext = path.extname(imagePath).toLowerCase();
  if (!SUPPORTED_EXTENSIONS.has(ext)) {
    return null;
  }

  const outputPath = imagePath.replace(/\.(png|jpe?g)$/i, ".webp");
  const inputBuffer = await fs.readFile(imagePath);
  const optimizedBuffer = await sharp(inputBuffer)
    .rotate()
    .resize({ width: 1920, withoutEnlargement: true })
    .webp({ quality: 78, effort: 5 })
    .toBuffer();

  await fs.writeFile(outputPath, optimizedBuffer);

  const inputStat = await fs.stat(imagePath);
  const outputStat = await fs.stat(outputPath);

  return {
    source: imagePath,
    output: outputPath,
    savings: inputStat.size - outputStat.size,
  };
}

async function main() {
  const files = await walk(IMAGE_ROOT);
  const results = [];

  for (const imagePath of files) {
    const result = await optimizeImage(imagePath);
    if (result) {
      results.push(result);
    }
  }

  if (!results.length) {
    console.log("No PNG/JPG images found to optimize.");
    return;
  }

  const totalSavings = results.reduce((sum, item) => sum + item.savings, 0);
  results.forEach(({ source, output, savings }) => {
    console.log(
      `${path.relative(process.cwd(), source)} -> ${path.relative(process.cwd(), output)} (${Math.max(savings, 0)} bytes saved)`,
    );
  });

  console.log(
    `Optimized ${results.length} images. Total savings: ${Math.max(totalSavings, 0)} bytes.`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
