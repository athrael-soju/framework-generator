---
name: correlate
description: Execute RECON Correlate stage to cross-reference findings and assign confidence levels.
---

# Correlate

Cross-reference findings from multiple sources to verify accuracy, resolve conflicts, and identify patterns.

## Inputs

| Input | Source |
|-------|--------|
| explore_findings | Explore stage output |
| seed_file | Receive stage output (for context) |

### Input Format

**From Explore stage (`output/recon/{date}/{subject}-explore.md`):**

```markdown
## Professional Platforms
### LinkedIn
- **Status:** Found
- **Findings:** {details}

## Social Media
### Twitter/X
- **Findings:** {details}

## Data Sufficiency
**Assessment:** Sufficient
```

## Process

**1. Verify Identity** - Confirm findings are about the right person:
- Cross-reference names across platforms
- Match photos if available
- Check for unique identifiers (employer + role combinations)

**2. Cross-Reference Facts** - Compare claims across sources:
- Employment dates and roles
- Education claims
- Location information
- Skills and expertise

**3. Identify Conflicts** - Log discrepancies:
- Date mismatches
- Role title differences
- Contradictory claims
- Possible identity confusion

**4. Assign Confidence Levels**:
- High: 3+ sources agree, or 1 authoritative source
- Medium: 2 sources agree, or 1 reliable source
- Low: Single source, unverified

**5. Detect Patterns** - Look for:
- Career trajectory themes
- Interest clusters
- Network patterns
- Communication style
- Value signals

**6. Flag Anomalies** - Note anything unusual

## Output

Save to `output/recon/{date}/`.

| File | Content |
|------|---------|
| `run.md` | Append Correlate summary |
| `{subject}-correlate.md` | Correlated findings |

### Run Log (run.md) - Append

```markdown
---

## Correlate - {date}

**Identity verification:** Verified / Likely correct / Uncertain
**Facts corroborated:** {count}
**Conflicts found:** {count}
**Conflicts resolved:** {count}

**Patterns identified:**
- {pattern 1}
- {pattern 2}

**Output:** `{subject}-correlate.md`
```

### Correlated Findings ({subject}-correlate.md)

```markdown
# RECON Correlate: {Subject Name}

Correlated: {date}
Sources cross-referenced: {count}

## Identity Verification

**Status:** Verified / Likely correct / Uncertain
**Rationale:** {why this determination}

### Verified Identifiers
| Identifier | Value | Sources | Confidence |
|------------|-------|---------|------------|
| Name | {name} | {sources} | High |
| LinkedIn | {url} | Direct | High |
| Twitter/X | @{handle} | {cross-ref} | {level} |

## Corroborated Facts

### Professional
| Fact | Sources | Confidence |
|------|---------|------------|
| Current: {title} at {company} | LinkedIn, company site | High |
| Previous: {role} | LinkedIn, news | Medium |

### Personal
| Fact | Sources | Confidence |
|------|---------|------------|
| Location: {city} | LinkedIn, Twitter | High |
| Interests: {topics} | Twitter, blog | Medium |

## Conflicts Identified

| Item | Source A | Source B | Resolution |
|------|----------|----------|------------|
| {fact} | {version A} | {version B} | {resolved/flagged} |

## Patterns Observed

### Career Pattern
{trajectory, focus areas}

### Interest Clusters
- **{Cluster 1}:** {topics}
- **{Cluster 2}:** {topics}

### Communication Style
{observations}

### Value Signals
{causes, opinions observed}

## Anomalies

| Observation | Potential Meaning |
|-------------|-------------------|
| {anomaly} | {interpretation} |

## Correlation Status

**Unresolved conflicts:** {count}
**Recommendation:** Proceed to Outline / Return to Explore for {gaps}
```

## Quality Criteria

- [ ] Identity verified or status clear
- [ ] All facts have confidence level assigned
- [ ] Conflicts explicitly logged
- [ ] Conflicts resolved or flagged
- [ ] Patterns identified (at least 2 categories)
- [ ] Clear recommendation on proceeding

## Completion

Present: Correlation summary with identity status and conflict count.
- If conflicts resolvable -> Outline
- If conflicts need more data -> Return to Explore
