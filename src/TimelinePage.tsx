export default function TimelinePage() {
  return (
    <main id="main" className="page-main timeline-page" tabIndex={-1}>
      <section className="timeline-hero">
        <span className="eyebrow">EXAMPLE PROJECT IDEAS</span>
        <h1>Curiosity <span className="gradient-text">notebook</span></h1>
        <p>Starter prompts for building, puzzles, and new discoveries. Replace them with approved projects whenever they are ready.</p>
      </section>

      <section className="content-section portfolio-video-timeline" aria-labelledby="project-ideas-heading">
        <div className="section-heading">
          <span className="eyebrow">A FEW PLACES TO BEGIN</span>
          <h2 id="project-ideas-heading">Questions worth exploring.</h2>
          <p>These are generated examples, not personal facts or finished work.</p>
        </div>
        <div className="feature-grid">
          <article className="feature-card"><span className="feature-icon">01</span><h3>Paper tower</h3><p>Sketch a tower using simple shapes and see how to make the design stable.</p></article>
          <article className="feature-card"><span className="feature-icon">02</span><h3>Pattern puzzle</h3><p>Look at a sequence, find what repeats, and invent a new one of your own.</p></article>
          <article className="feature-card"><span className="feature-icon">03</span><h3>Question hunt</h3><p>Choose a question and explore it with a book or a parent-approved activity.</p></article>
        </div>
      </section>
    </main>
  );
}
