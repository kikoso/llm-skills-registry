import Head from 'next/head';

export default function Submit() {
  const GITHUB_REPO = 'https://github.com/kikoso/llm-skills-registry/new/main/skills';

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
        <title>Submit Skill - LLM Skills Registry</title>
      </Head>

      <header>
        <h1>Submit a Skill</h1>
        <p className="subtitle">Add your skill to the public registry via GitHub</p>
        <nav className="nav">
          <a href="/">Home</a>
          <a href="/submit">Submit Skill</a>
        </nav>
      </header>

      <main>
        <form className="submit-form" onSubmit={generateGitHubUrl}>
          <div className="form-group">
            <label>Skill Name</label>
            <input name="name" placeholder="Weather Pro" required />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea name="description" placeholder="Short description of what it does" required rows="3" />
          </div>
          <div className="form-group">
            <label>Version</label>
            <input name="version" placeholder="1.0.0" pattern="\d+\.\d+\.\d+" required />
          </div>
          <div className="form-group">
            <label>Author</label>
            <input name="author" placeholder="Your GitHub handle" required />
          </div>
          <div className="form-group">
            <label>Manifest URL</label>
            <input name="manifestUrl" placeholder="https://..." type="url" required />
          </div>
          <div className="form-group">
            <label>Tags (comma separated)</label>
            <input name="tags" placeholder="utility, weather, api" />
          </div>
          <button type="submit">Prepare Submission on GitHub</button>
          <p style={{ fontSize: '0.8rem', color: '#666' }}>
            Note: This will open a pre-filled GitHub "New File" page. You'll need to click "Propose changes" to open a PR.
          </p>
        </form>
      </main>
    </div>
  );
}
