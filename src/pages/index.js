import Head from 'next/head';
import Link from 'next/link';
import { useState, useMemo } from 'react';
import registry from '../registry.json';

export default function Home() {
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState(null);

  const allTags = useMemo(() => {
    const tags = new Set();
    registry.forEach(skill => {
      skill.tags?.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, []);

  const filteredSkills = useMemo(() => {
    return registry.filter(skill => {
      const matchesSearch = 
        skill.name.toLowerCase().includes(search.toLowerCase()) ||
        skill.description.toLowerCase().includes(search.toLowerCase()) ||
        skill.author.toLowerCase().includes(search.toLowerCase());
      
      const matchesTag = !selectedTag || skill.tags?.includes(selectedTag);
      
      return matchesSearch && matchesTag;
    });
  }, [search, selectedTag]);

  return (
    <div className="container">
      <Head>
        <title>FindSkills.dev | LLM Skill Registry</title>
        <meta name="description" content="Discover and install verified skills for your AI agents and LLMs." />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>

      <header>
        <h1>FindSkills.dev</h1>
        <p className="subtitle">The open registry for LLM skills and AI agent tool manifests.</p>
        <nav className="nav">
          <Link href="/">Explore</Link>
          <Link href="/submit">Submit a Skill</Link>
        </nav>
      </header>

      <main>
        <div className="filters">
          <input 
            type="text" 
            placeholder="Search by name, description, or author..." 
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          
          <div className="tag-filters">
            <button 
              className={`tag-btn ${!selectedTag ? 'active' : ''}`}
              onClick={() => setSelectedTag(null)}
            >
              All Skills
            </button>
            {allTags.map(tag => (
              <button 
                key={tag} 
                className={`tag-btn ${selectedTag === tag ? 'active' : ''}`}
                onClick={() => setSelectedTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="results-meta">
          Showing {filteredSkills.length} {filteredSkills.length === 1 ? 'skill' : 'skills'}
        </div>

        <div className="skill-list">
          {filteredSkills.map((skill) => (
            <div key={skill.name} className="skill-card">
              <div className="skill-name">{skill.name}</div>
              <p>{skill.description}</p>
              <div className="tags-container">
                {skill.tags?.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
              
              <div className="skill-actions">
                <button 
                  className="action-btn primary"
                  onClick={() => {
                    navigator.clipboard.writeText(skill.manifestUrl);
                    alert('Manifest URL copied to clipboard!');
                  }}
                >
                  Install Skill
                </button>
                <a 
                  href={skill.manifestUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="action-btn secondary"
                  title="View Manifest JSON"
                >
                  JSON
                </a>
                {skill.homepageUrl && (
                  <a 
                    href={skill.homepageUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="action-btn secondary"
                    title="View Documentation"
                  >
                    Docs
                  </a>
                )}
              </div>

              <div className="footer-meta">
                <span>By {skill.author}</span>
                <span>v{skill.version}</span>
              </div>
            </div>
          ))}
          {filteredSkills.length === 0 && (
            <div className="no-results">
              <h3>No skills found</h3>
              <p>Try adjusting your search or filters.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
