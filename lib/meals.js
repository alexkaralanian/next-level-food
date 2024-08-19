import sql from 'better-sqlite3';
const db = sql('meals.db');

export async function getMeals() {
  console.log('HELLO');
  const stmt = await db.prepare('SELECT * FROM meals');
  return stmt.all();
}

export function getMeal(slug) {
  const stmt = db.prepare('SELECT * FROM meals WHERE slug = ?');
  return stmt.get(slug);
}
