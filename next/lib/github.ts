const USER = "Luxsss"
const API = "https://api.github.com"

export interface GitHubRepo {
  name: string
  description: string | null
  language: string | null
  url: string
  pushedAt: string
}

export interface ContributionDay {
  date: string
  count: number
  level: number
}

export interface GitHubActivity {
  repos: GitHubRepo[]
  calendar: { total: number; weeks: ContributionDay[][] } | null
}

interface RepoRow {
  name: string
  fork: boolean
  description: string | null
  language: string | null
  html_url: string
  pushed_at: string
}

const LEVELS: Record<string, number> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
}

const headers = (token?: string): HeadersInit => ({
  Accept: "application/vnd.github+json",
  ...(token && { Authorization: `Bearer ${token}` }),
})

async function getRepos(token?: string): Promise<GitHubRepo[]> {
  const response = await fetch(`${API}/users/${USER}/repos?sort=pushed&per_page=10`, { headers: headers(token) })
  if (!response.ok) throw new Error(`repos: HTTP ${response.status}`)
  const rows: RepoRow[] = await response.json()

  // Skip forks and the profile README repository.
  return rows
    .filter((row) => !row.fork && row.name !== USER)
    .slice(0, 3)
    .map((row) => ({
      name: row.name,
      description: row.description,
      language: row.language,
      url: row.html_url,
      pushedAt: row.pushed_at,
    }))
}

// The contribution calendar is only exposed through GraphQL, which requires a token.
async function getCalendar(token: string): Promise<GitHubActivity["calendar"]> {
  const query = `query($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks { contributionDays { date contributionCount contributionLevel } }
        }
      }
    }
  }`
  const response = await fetch(`${API}/graphql`, {
    method: "POST",
    headers: headers(token),
    body: JSON.stringify({ query, variables: { login: USER } }),
  })
  if (!response.ok) throw new Error(`calendar: HTTP ${response.status}`)
  const { data } = await response.json()
  const calendar = data.user.contributionsCollection.contributionCalendar

  return {
    total: calendar.totalContributions,
    weeks: calendar.weeks.map((week: { contributionDays: Record<string, string | number>[] }) =>
      week.contributionDays.map((day) => ({
        date: String(day.date),
        count: Number(day.contributionCount),
        level: LEVELS[String(day.contributionLevel)] ?? 0,
      })),
    ),
  }
}

// The section is a bonus: when GitHub is unreachable it is hidden instead of failing the page.
export async function getGitHubActivity(): Promise<GitHubActivity | null> {
  const token = process.env.GITHUB_TOKEN
  try {
    const [repos, calendar] = await Promise.all([
      getRepos(token),
      token ? getCalendar(token).catch((error) => (console.error("GitHub calendar unavailable:", error), null)) : null,
    ])
    return repos.length > 0 || calendar ? { repos, calendar } : null
  } catch (error) {
    console.error("GitHub activity unavailable:", error)
    return null
  }
}
