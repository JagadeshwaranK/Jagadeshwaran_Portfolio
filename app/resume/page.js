import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import ClientEnhancements from '../client-enhancements';

export const metadata = {
  title: 'Resume — Jagadeshwaran K',
  description: 'Full and one-page resume for Jagadeshwaran K.',
};

export default function ResumePage() {
  const resumeMarkup = readFileSync(join(process.cwd(), 'content/resume.html'), 'utf8');

  return (
    <>
      <main dangerouslySetInnerHTML={{ __html: resumeMarkup }} />
      <ClientEnhancements />
    </>
  );
}
