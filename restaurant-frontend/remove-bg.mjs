// remove-bg.mjs
// Script Node.js pour supprimer le fond noir des photos d'ingrédients burger
// et les sauvegarder en PNG transparent

import { Jimp } from 'jimp';
import { readdirSync } from 'fs';
import { join, extname, basename } from 'path';

const INPUT_DIR  = './src/assets/ingredients';
const OUTPUT_DIR = './src/assets/ingredients';

// Seuil de "noirceur" : un pixel est considéré comme fond noir si
// R < threshold ET G < threshold ET B < threshold
const THRESHOLD = 45;

// Un peu de "frange" : les pixels gris sombre semi-transparents près des bords
// sont progressivement effacés plutôt que coupés brusquement
const FEATHER_RANGE = 30;

async function removeBlackBackground(inputPath, outputPath) {
  const image = await Jimp.read(inputPath);
  const { width, height } = image.bitmap;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const r = image.bitmap.data[idx + 0];
      const g = image.bitmap.data[idx + 1];
      const b = image.bitmap.data[idx + 2];

      const brightness = Math.max(r, g, b);

      if (brightness < THRESHOLD) {
        image.bitmap.data[idx + 3] = 0;
      } else if (brightness < THRESHOLD + FEATHER_RANGE) {
        const alpha = Math.round(((brightness - THRESHOLD) / FEATHER_RANGE) * 255);
        image.bitmap.data[idx + 3] = alpha;
      }
    }
  }

  await image.write(outputPath);
  console.log(`✅ ${basename(inputPath)} → ${basename(outputPath)}`);
}

async function main() {
  const files = readdirSync(INPUT_DIR).filter(f =>
    f.endsWith('.jpg') || f.endsWith('.jpeg')
  );

  console.log(`\n🍔 Suppression du fond noir pour ${files.length} images...\n`);

  for (const file of files) {
    const inputPath  = join(INPUT_DIR, file);
    const outputName = basename(file, extname(file)) + '.png';
    const outputPath = join(OUTPUT_DIR, outputName);
    try {
      await removeBlackBackground(inputPath, outputPath);
    } catch (err) {
      console.error(`❌ Erreur sur ${file}:`, err.message);
    }
  }

  console.log('\n✨ Terminé ! Les PNG transparents sont dans src/assets/ingredients/\n');
  console.log('📝 N\'oubliez pas de mettre à jour les imports dans RealBurgerViewer.jsx');
  console.log('   Remplacez .jpg par .png dans chaque import.\n');
}

main();
