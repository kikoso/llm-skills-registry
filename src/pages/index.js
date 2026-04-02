import Head from 'next/head';
import registry from '../registry.json';

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>LLM Skills Registry</title>
      </Head>

      <header>
        <h1>Skill Registry</h1>
        <p className="subtitle">The hub for LLM skills and manifests</p>
        <nav className="nav">
          <a href="/">Home</a>
          <a href="/submit">Submit Skill</a>
        </nav>
      </header>

      <main>
        <div className="skill-list">
          {registry.map((skill) => (
            <div key={skill.name} className="skill-card">
              <div className="skill-name">{skill.name}</div>
              <p>{skill.description}</p>
              <div>
                {skill.tags?.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
              <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#666' }}>
                By {skill.author} • v{skill.version}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
