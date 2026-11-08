import PageHeader from '../components/layout/PageHeader';
import styles from './Pages.module.css';

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <PageHeader
        title="About GeoPolitics AI"
        subtitle="How the platform turns news coverage into structured, explorable insights."
      />
      <article className={`${styles.section} ${styles.prose}`}>
        <h2>What the system does</h2>
        <p>
          GeoPolitics AI collects reporting from monitored publishers, organises related coverage,
          and presents concise signals that help readers explore geopolitical events. It is a
          research aid, not a replacement for original reporting.
        </p>

        <h2>Data sources</h2>
        <p>
          Article metadata and available text come from external news feeds and publisher pages.
          Source availability, update frequency, and text completeness vary.
        </p>

        <h2>AI-generated summaries</h2>
        <p>
          Summaries condense available article text. They may omit nuance or reproduce errors in
          the source, so readers should use the original article for context and verification.
        </p>

        <h2>Categories and entities</h2>
        <p>
          Automated classifiers assign broad categories and detect countries, people, and
          organisations. Ambiguous names and multi-topic articles can lead to imperfect labels.
        </p>

        <h2>Sentiment</h2>
        <p>
          Sentiment estimates whether the tone of coverage is positive, negative, or neutral. It
          does not measure factual accuracy, public opinion, or the moral character of an event.
        </p>

        <h2>Trending topics</h2>
        <p>
          Trend scores combine recent article volume and growth relative to an earlier comparison
          window. A high score indicates increased coverage, not importance or truth.
        </p>

        <h2>Credibility indicator</h2>
        <p>
          The score combines defined factors such as source reliability, corroboration, content
          completeness, and recency. <strong>It is not a fact-check.</strong> The factor breakdown
          is shown so readers can understand why a score was assigned.
        </p>

        <h2>Limitations and disclaimer</h2>
        <ul>
          <li>Coverage reflects only sources currently monitored by the platform.</li>
          <li>Automated analysis can contain classification, extraction, and summarisation errors.</li>
          <li>Missing or delayed source data can distort comparisons and trends.</li>
          <li>Always consult multiple original sources before making consequential decisions.</li>
        </ul>
      </article>
    </div>
  );
}
