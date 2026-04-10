import SectionLabel from "../../../components/SectionLabel/SectionLabel"
import type { IStats } from "../../../types/statinterface";

interface AnalyticsProps {
  stats: IStats;
}

function Analytics({stats}: AnalyticsProps) {
  return (
    <section className="admin-section">
          <SectionLabel>Analytics</SectionLabel>
          <h2 className="section-title">Traffic_Stats</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value">{stats.siteViews.toLocaleString()}</div>
              <div className="stat-label">Total Site Views</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{stats.projectsCompleted}</div>
              <div className="stat-label">Projects Completed</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{stats.messagesReceived}</div>
              <div className="stat-label">Messages Received</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{stats.yearsOfExperience}+</div>
              <div className="stat-label">Years Experience</div>
            </div>
          </div>
        </section>
  )
}

export default Analytics