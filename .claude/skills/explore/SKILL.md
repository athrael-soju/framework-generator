---
name: explore
description: Execute RECON Explore stage to search across sources and gather raw findings.
---

# Explore

Systematically search across all source categories to gather raw findings about the subject.

## Inputs

| Input | Source |
|-------|--------|
| seed_file | Receive stage output |

### Input Format

**From Receive stage (`output/recon/{date}/{subject}-seed.md`):**

```markdown
## Identifiers
| Type | Value | Confidence |
|------|-------|------------|
| Name | {name} | High |
| LinkedIn | {url} | {level} |

## Context
**Purpose:** {why researching}
**Depth:** {Quick / Standard / Deep}

## Starting Points
| Source | URL/Handle | Notes |
```

## Process

**1. Search Professional Platforms**
- LinkedIn profile and activity
- Company websites mentioning them
- Crunchbase if applicable

**2. Search Social Media**
- Twitter/X profile and tweets
- Instagram if public
- YouTube channel if exists
- Other platforms as relevant

**3. Search Developer Platforms**
- GitHub repositories and activity
- Stack Overflow contributions
- npm/PyPI packages if applicable

**4. Search Content Platforms**
- Personal blog or website
- Medium, Substack, or similar
- Podcast appearances

**5. Search Academic Sources**
- Google Scholar publications
- ResearchGate profile
- Conference talks

**6. Search News/Media**
- Google News mentions
- Industry publication features
- Interview appearances

**7. Search Public Records** (if Deep depth)
- Court records
- Property records
- Business filings

**8. Assess Data Sufficiency**
- Count sources found vs. checked
- Identify critical missing info
- Determine if sufficient to proceed

## Output

Save to `output/recon/{date}/`.

| File | Content |
|------|---------|
| `run.md` | Append Explore summary |
| `{subject}-explore.md` | Raw findings by source |

### Run Log (run.md) - Append

```markdown
---

## Explore - {date}

**Sources checked:** {count}
**Sources found:** {count}
**Data sufficiency:** Sufficient / Insufficient / Marginal

**Key findings:**
- {summary point 1}
- {summary point 2}

**Output:** `{subject}-explore.md`
```

### Explore Findings ({subject}-explore.md)

```markdown
# RECON Explore: {Subject Name}

Explored: {date}
Sources checked: {count}

## Professional Platforms

### LinkedIn
- **URL:** {url}
- **Status:** Found / Not found / Private
- **Findings:**
  - Current role: {title at company}
  - Previous: {roles}
  - Education: {schools}
  - Skills: {listed skills}
  - Activity: {recent posts}

### Company Profiles
- **Mentions found:** {yes/no}
- **Details:** {what was found}

## Social Media

### Twitter/X
- **Handle:** @{handle}
- **Status:** Found / Not found / Private
- **Findings:**
  - Bio: {bio text}
  - Followers: {count}
  - Topics: {what they tweet about}
  - Tone: {style}
  - Notable: {significant posts}

### Instagram
- **Status:** {found/not found/private}
- **Findings:** {if applicable}

### YouTube
- **Status:** {found/not found}
- **Findings:** {if applicable}

## Developer Platforms

### GitHub
- **Username:** {username}
- **Status:** Found / Not found
- **Findings:**
  - Repositories: {count, notable}
  - Languages: {primary}
  - Activity: {level}

## Content & Publications

### Blog/Newsletter
- **URL:** {url or "not found"}
- **Findings:** {topics, frequency}

### Academic
- **Publications:** {count}
- **Notable:** {titles}

## News & Media

### Mentions
| Date | Source | Context |
|------|--------|---------|
| {date} | {outlet} | {summary} |

### Podcast Appearances
| Podcast | Topic | Date |
|---------|-------|------|
| {name} | {subject} | {date} |

## Public Records

{If searched}
| Type | Summary |
|------|---------|
| {type} | {findings} |

## Data Sufficiency

**Sources found:** {X} of {Y} checked
**Key gaps:** {missing critical info}
**Assessment:** Sufficient / Insufficient / Marginal

{If insufficient: recommend user decision}
```

## Quality Criteria

- [ ] All relevant source categories checked
- [ ] Each source marked as found/not found/private
- [ ] Raw findings captured without interpretation
- [ ] URLs documented for verification
- [ ] Data sufficiency assessed
- [ ] Gaps explicitly noted

## Completion

Present: Source coverage summary and sufficiency assessment.
- If Sufficient -> Correlate
- If Insufficient -> Ask user to proceed with partial data or abort
