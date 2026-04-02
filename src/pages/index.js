import Head from 'next/head';
import Link from 'next/link';
import { useState, useMemo } from 'react';
import registry from '../registry.json';

export default function Home() {
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState(null);

  // Extract all unique tags from the registry
  const allTags = useMemo(() => {
    const tags = new Set();
    registry.forEach(skill => {
      skill.tags?.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, []);

  // Filter skills based on search query and selected tag
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
        <title>LLM Skills Registry</title>
      </Head>

      <header>
        <h1>Skill Registry</h1>
        <p className="subtitle">The hub for LLM skills and manifests</p>
        <nav className="nav">
          <Link href="/">Home</Link>
          <Link href="/submit">Submit Skill</Link>
        </nav>
      </header>

      <main>
        <div className="filters">
          <input 
            type="text" 
            placeholder="Search skills, authors..." 
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          
          <div className="tag-filters">
            <button 
              className={`tag-btn ${!selectedTag ? 'active' : ''}`}
              onClick={() => setSelectedTag(null)}
            >
              All
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
          Found {filteredSkills.length} {filteredSkills.length === 1 ? 'skill' : 'skills'}
        </div>

        <div className="skill-list">
          {filteredSkills.map((skill) => (
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
          {filteredSkills.length === 0 && (
            <div className="no-results">No skills match your criteria.</div>
          )}
        </div>
      </main>
    </div>
  );
}
