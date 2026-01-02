import "../styles/dashboard.css";

/* UI */
import StatCard from "../components/ui/StatCard";
import InfoCard from "../components/ui/InfoCard";

/* Attendance */
import AttendanceReport from "../components/attendance/AttendanceReport";
import AttendanceDateRange from "../components/attendance/AttendanceDateRange";
import OverallAttendanceReport from "../components/attendance/OverallAttendanceReport";

/* Charts */
import AttendanceChart from "../components/charts/AttendanceChart";
import OverallAttendanceChart from "../components/charts/OverallAttendanceChart";
import SubjectMarksChart from "../components/charts/SubjectMarksChart";

/* Exam */
import ExamList from "../components/exam/ExamList";
import ExamPapers from "../components/exam/ExamPapers";
import SyllabusCompletion from "../components/exam/SyllabusCompletion";

/* Subject */
import SubjectReport from "../components/subject/SubjectReport";
import RankList from "../components/subject/RankList";
import WeakStudents from "../components/subject/WeakStudents";

/* Results */
import ConsolidatedMarkSheet from "../components/marksheet/ConsolidatedMarkSheet";
import OverallResultSummary from "../components/results/OverallResultSummary";
import TopperList from "../components/results/TopperList";

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="dashboard-content">

        {/* ================= KPI CARDS ================= */}
        <section className="dashboard-section">
          <div className="dashboard-grid">
            <StatCard
              title="Total Students"
              value="1,240"
              subText="+5% from last month"
              trend="up"
            />

            <StatCard
              title="Average Attendance"
              value="87%"
              subText="-2% this week"
              trend="down"
            />

            <StatCard
              title="Pass Percentage"
              value="92%"
              subText="+3% improvement"
              trend="up"
            />
          </div>
        </section>

        {/* ================= EXAMS ================= */}
        <section id="exams" className="dashboard-section">
          <h1>Exam Management</h1>

          <div className="dashboard-grid">
            <InfoCard title="Exams by Semester">
              <ExamList />
            </InfoCard>

            <InfoCard title="Exam Papers">
              <ExamPapers />
            </InfoCard>

            <InfoCard title="Syllabus Completion">
              <SyllabusCompletion />
            </InfoCard>
          </div>
        </section>

        {/* ================= ATTENDANCE ================= */}
        <section id="attendance" className="dashboard-section">
          <h1>Attendance</h1>

          <div className="dashboard-grid">
            <InfoCard title="Attendance Report">
              <AttendanceReport />
            </InfoCard>

            <InfoCard title="Attendance Trend">
              <AttendanceChart />
            </InfoCard>

            <InfoCard title="Date Range">
              <AttendanceDateRange />
            </InfoCard>

            <InfoCard title="Overall Attendance">
              <OverallAttendanceReport />
            </InfoCard>

            <InfoCard title="Overall Attendance Chart">
              <OverallAttendanceChart />
            </InfoCard>
          </div>
        </section>

        {/* ================= PERFORMANCE ================= */}
        <section id="performance" className="dashboard-section">
          <h1>Performance</h1>

          <div className="dashboard-grid">
            <InfoCard title="Subject Performance">
              <SubjectReport />
            </InfoCard>

            <InfoCard title="Marks Distribution">
              <SubjectMarksChart />
            </InfoCard>
          </div>
        </section>

        {/* ================= RANKINGS ================= */}
        <section id="rankings" className="dashboard-section">
          <h1>Rankings</h1>

          <div className="dashboard-grid">
            <InfoCard title="Rank List">
              <RankList />
            </InfoCard>

            <InfoCard title="Weak Students">
              <WeakStudents />
            </InfoCard>
          </div>
        </section>

        {/* ================= RESULTS ================= */}
        <section id="results" className="dashboard-section">
          <h1>Results</h1>

          <div className="dashboard-grid">
            <InfoCard title="Overall Result Summary">
              <OverallResultSummary />
            </InfoCard>

            <InfoCard title="Top Performers">
              <TopperList />
            </InfoCard>
          </div>
        </section>

        {/* ================= MARK SHEET ================= */}
        <section id="marksheet" className="dashboard-section">
          <h1>Mark Sheet</h1>

          <div className="dashboard-grid full-width">
            <InfoCard title="Consolidated Mark Sheet">
              <ConsolidatedMarkSheet />
            </InfoCard>
          </div>
        </section>

      </div>
    </div>
  );
}

export default Dashboard;
