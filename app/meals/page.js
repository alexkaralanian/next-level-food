import MealsGrid from '@/components/meals/meals-grid';
import styles from './page.module.css';
import Link from 'next/link';
import { getMeals } from '@/lib/meals';
import { Suspense } from 'react';

export const metadata = {
  title: 'All Meals',
  description: 'Browse the delicious meals shared byour vibrant community.',
};

async function Meals() {
  const meals = await getMeals();
  return <MealsGrid meals={meals} />;
}

export default function MealsPage() {
  return (
    <>
      <header className={styles.header}>
        <h1>
          Delicious meals, created{' '}
          <span className={styles.highlight}>by you</span>
        </h1>

        <p>
          {`Choose your favorite recipe and cook it yourself. It's easy and fun.`}
        </p>
        <p className={styles.cta}>
          <Link href="meals/share">Share your favorite recipe</Link>
        </p>
      </header>
      <main>
        <Suspense fallback={<p className={styles.loading}>Loading...</p>}>
          <Meals />
        </Suspense>
      </main>
    </>
  );
}
