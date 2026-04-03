import Head from 'next/head';
import Link from 'next/link';

export default function Submit() {
  const generateGitHubUrl = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const skill = Object.fromEntries(formData);
    skill.tags = skill.tags.split(',').map(t => t.trim());
    skill.createdAt = new Date().toISOString();
    
    const filename = `${skill.name.toLowerCase().replace(/\s+/g, '-')}.json`;
    const content = encodeURIComponent(JSON.stringify(skill, null, 2));
    const url = `https://github.com/kikoso/llm-skills-registry/new/main?filename=skills/${filename}&value=${content}`;
    
    window.open(url, '_blank');
  };

  return (
    <div className="container">
      <Head>
        <title>Submit Skill | FindSkills.dev</title>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>

      <header>
        <h1>Submit a Skill</h1>
        <p className="subtitle">Share your manifest with the community. Submissions are handled via GitHub Pull Requests.</p>
        <nav className="nav">
          <Link href="/">Back to Registry</Link>
          <Link href="/submit">Submit</Link>
        </nav>
      </header>

      <main>
        <form className="submit-form" onSubmit={generateGitHubUrl}>
          <div className="form-group">
            <label>Skill Name</label>
            <input name="name" placeholder="e.g., GitHub Assistant" required />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea name="description" placeholder="What can an LLM do with this skill?" required rows="4" />
          </div>
          <div className="form-group">
            <label>Version</label>
            <input name="version" placeholder="1.0.0" pattern="\d+\.\d+\.\d+" required />
          </div>
          <div className="form-group">
            <label>Author</label>
            <input name="author" placeholder="Your name or handle" required />
          </div>
          <div className="form-group">
            <label>Manifest URL (Raw JSON/MD)</label>
            <input name="manifestUrl" placeholder="https://raw.githubusercontent.com/..." type="url" required />
          </div>
          <div className="form-group">
            <label>Documentation URL (Optional)</label>
            <input name="homepageUrl" placeholder="https://github.com/your-repo" type="url" />
          </div>
          <div className="form-group">
            <label>Tags (comma separated)</label>
            <input name="tags" placeholder="productivity, dev-tools, web" />
          </div>
          
          <button type="submit" className="submit-btn">Propose Skill on GitHub</button>
          
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '1.5rem', textAlign: 'center' }}>
            This will open a pre-filled GitHub page. Click <strong>"Propose changes"</strong> to initiate a review.
          </p>
        </form>
      </main>
    </div>
  );
}
