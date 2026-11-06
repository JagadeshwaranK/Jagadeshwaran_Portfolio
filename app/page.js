import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import ClientEnhancements from './client-enhancements';
import MotionEffects from './motion-effects';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  const portfolioMarkup = readFileSync(join(process.cwd(), 'content/portfolio.html'), 'utf8');
  return (
    <>
      <div className="min-h-screen" dangerouslySetInnerHTML={{ __html: portfolioMarkup }} />
      <ClientEnhancements />
      <MotionEffects />
    </>
  );
}
