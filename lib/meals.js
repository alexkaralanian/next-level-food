import sql from 'better-sqlite3';
import { S3 } from '@aws-sdk/client-s3';
import slugify from 'slugify';
import xss from 'xss';

const s3 = new S3({
  region: 'us-east-1',
});
const db = sql('meals.db');

export async function getMeals() {
  const stmt = await db.prepare('SELECT * FROM meals');
  return stmt.all();
}

export function getMeal(slug) {
  const stmt = db.prepare('SELECT * FROM meals WHERE slug = ?');
  return stmt.get(slug);
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);
  const extension = meal.image.name.split('.').pop();
  const fileName = `${meal.slug}.${extension}`;
  const bufferedImage = await meal.image.arrayBuffer();

  await s3.putObject({
    Bucket: 'alex-karalanian-next-level-food-images',
    Key: fileName,
    Body: Buffer.from(bufferedImage),
    ContentType: meal.image.type,
  });

  meal.image = fileName;

  db.prepare(
    `
    INSERT INTO meals (title, summary, instructions, image, creator, creator_email, slug)
    VALUES (@title, @summary, @instructions, @image, @creator, @creator_email, @slug)
  `
  ).run(meal);
}
