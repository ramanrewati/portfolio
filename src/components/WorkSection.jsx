import React, { useState } from 'react';
import { crtAudio } from '../utils/crtAudio';

export default function WorkSection({ onHoverProject }) {
  const [activeHover, setActiveHover] = useState(null);

  const projects = [
    {
      id: '01',
      number: '01',
      title: 'PRESCHOOL SURVEILLANCE',
      statement: 'Turning ordinary camera feeds into an intelligent understanding of what is happening inside a preschool.',
      paragraphs: [
        'I built an end-to-end AI surveillance system designed around one difficult environment: children, crowded rooms, constant movement, partial visibility and multiple simultaneous activities.',
        'The system transforms continuous camera feeds into structured, searchable information rather than leaving operators with hours of footage to manually inspect.',
        'It combines visual detection, identity, tracking and activity understanding to maintain context across a live environment.',
        'The interesting challenge was never a single model. It was getting multiple perception systems to cooperate reliably in real time. Detection had to remain useful in crowded scenes. Identity could not block the primary video pipeline. Activity understanding had to happen asynchronously. Multiple camera streams had to be processed without allowing expensive inference to collapse the rest of the system.',
        'The work became an exercise in designing the architecture around uncertainty. Frames get missed. Faces disappear. Children overlap. Models disagree. Networks fluctuate. The system still has to make useful decisions.',
        'I worked across the complete path from video ingestion and inference to tracking, asynchronous processing, backend services, alerts and deployment. The result was not simply another computer vision demo. It was a scalable surveillance intelligence system designed to operate continuously in the messy conditions of the real world.'
      ],
      focus: ['REAL-TIME VISION', 'MULTI-CAMERA SYSTEMS', 'TRACKING + IDENTITY', 'ACTIVITY UNDERSTANDING', 'ASYNC INFERENCE', 'SCALABLE DEPLOYMENT'],
      annotation: 'signal acquired / humans detected',
    },
    {
      id: '02',
      number: '02',
      title: 'ZERO EGRESS',
      altTitle: 'TRANSLATION WITHOUT LEAVING THE DEVICE.',
      statement: 'Co-built an offline enterprise translation system for Indic languages where sensitive data never needs to leave the edge device.',
      paragraphs: [
        'Enterprise translation becomes a very different problem when sending text to an external cloud API is not acceptable.',
        'I co-built a translation system designed around that constraint. The system runs locally on edge hardware and provides translation for Indic languages without requiring sensitive enterprise information to leave the device.',
        'No dependency on external inference APIs. No unnecessary movement of internal documents across infrastructure. No assumption that connectivity will always exist.',
        'The project required treating privacy, deployment constraints and model performance as parts of the same engineering problem.',
        'Running AI locally means compute, memory and latency suddenly become hard constraints rather than abstract infrastructure concerns. The challenge became finding the right balance between model capability and operational reality.',
        'The result was an offline translation architecture built for environments where data sovereignty matters as much as translation quality.'
      ],
      focus: ['EDGE AI', 'INDIC LANGUAGES', 'OFFLINE INFERENCE', 'ZERO EGRESS', 'ENTERPRISE PRIVACY', 'RESOURCE-CONSTRAINED AI'],
      annotation: 'DATA LEFT DEVICE: 0 BYTES',
    },
    {
      id: '03',
      number: '03',
      title: 'MEMORY, WITHOUT THE LEAKS',
      statement: 'Worked on the memory problem for AI agents at Nightangle, an early-stage US healthcare startup, where remembering context also meant knowing what must never be remembered carelessly.',
      paragraphs: [
        'AI agents become significantly more useful when they can remember. In healthcare, that same capability becomes significantly more complicated.',
        'I worked on solving memory for AI agents at Nightangle, where persistent context had to coexist with strict privacy requirements around personally identifiable information.',
        'The problem was larger than storing conversation history. What information should persist? What should be redacted? When should something be retrieved? How do you maintain useful context without turning memory into a growing archive of sensitive information?',
        'PII redaction and compliance therefore became architectural constraints rather than cleanup steps.',
        'The work explored how agent memory can remain useful while controlling what information enters long-term storage, what is retrieved later and where sensitive information exists throughout the pipeline.',
        'The broader problem was designing an AI system that could remember enough to be useful without forgetting that it operates in a privacy-sensitive environment.'
      ],
      focus: ['AI AGENTS', 'MEMORY SYSTEMS', 'PII REDACTION', 'PRIVACY', 'COMPLIANCE', 'HEALTHCARE AI'],
      annotation: 'MEMORY ≠ STORE EVERYTHING',
    }
  ];

  return (
    <section
      id="work"
      style={{
        width: '100%',
        padding: 'clamp(2rem, 5vw, 4rem)',
        position: 'relative',
        zIndex: 10,
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      }}
    >
      {/* Section Header */}
      <div className="reveal-on-scroll" style={{ marginBottom: '4rem' }}>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            color: 'var(--color-warning-red)',
            letterSpacing: '0.1em',
            marginBottom: '0.5rem',
          }}
        >
          WORK
        </div>
        <h2
          className="font-display text-phosphor"
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 800,
            textTransform: 'uppercase',
            margin: '0 0 1rem 0',
          }}
        >
          THINGS I'VE BUILT
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '14px',
            color: 'var(--color-signal-grey)',
            maxWidth: '620px',
          }}
        >
          systems, experiments and hypotheses that survived contact with reality.
        </p>
      </div>

      {/* Project Cards List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5rem' }}>
        {projects.map((project) => (
          <article
            key={project.id}
            className="reveal-on-scroll"
            onMouseEnter={() => {
              setActiveHover(project.id);
              crtAudio.playChannelZip();
              if (onHoverProject) onHoverProject(project.id);
            }}
            onMouseLeave={() => setActiveHover(null)}
            style={{
              position: 'relative',
              backgroundColor: activeHover === project.id ? 'rgba(255, 255, 255, 0.02)' : 'transparent',
              borderLeft: activeHover === project.id ? '3px solid var(--color-warning-red)' : '1px solid rgba(255, 255, 255, 0.1)',
              padding: 'clamp(1.5rem, 3vw, 2.5rem)',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {/* Number */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                color: 'var(--color-signal-grey)',
                marginBottom: '1rem',
              }}
            >
              <span>WORK / {project.number}</span>
            </div>

            {/* Title */}
            <h3
              className="font-display text-phosphor"
              style={{
                fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                fontWeight: 800,
                marginBottom: '0.8rem',
                lineHeight: 1.05,
              }}
            >
              {project.title}
            </h3>

            {project.altTitle && (
              <div
                className="font-display"
                style={{
                  fontSize: 'clamp(1.4rem, 3.2vw, 2.2rem)',
                  color: 'var(--color-signal-grey)',
                  marginBottom: '1rem',
                  lineHeight: 1.1,
                }}
              >
                {project.altTitle}
              </div>
            )}

            {/* Short Statement */}
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '15px',
                fontWeight: 600,
                color: 'var(--color-phosphor-white)',
                marginBottom: '1.5rem',
                maxWidth: '800px',
              }}
            >
              {project.statement}
            </div>

            {/* Detailed Body Paragraphs */}
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '14px',
                color: 'var(--color-signal-grey)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                maxWidth: '860px',
                marginBottom: '2rem',
                lineHeight: 1.7,
              }}
            >
              {project.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Technical Focus Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {project.focus.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    color: 'var(--color-phosphor-white)',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    padding: '4px 10px',
                    letterSpacing: '0.05em',
                  }}
                >
                  `{tag}`
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
