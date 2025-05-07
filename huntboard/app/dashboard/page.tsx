"use client";
import { useState } from "react";
import Header from "../components/globals/Header";
import Sidebar from "../components/dashboard/Sidebar";
import ApplicationForm from "../components/dashboard/ApplicationForm";
import ApplicationTable from "../components/dashboard/ApplicationTable";
import styles from "../components/dashboard/Dashboard.module.css"
import { Application } from "../components/dashboard/Types";
import { ApplicationsOverTime } from "../components/dashboard/ApplicationsOverTime";
import { PositionPieChart } from "../components/dashboard/PositionPieChart";
import { StatusBarChart } from "../components/dashboard/StatusBarChart";


export default function Home() {
  const [applications, setApplications] = useState([
    { id: 1, company: "Google", position: "Frontend Developer", date: "2025-05-01", status: "Applied" },
    { id: 2, company: "Microsoft", position: "Software Engineer", date: "2025-04-28", status: "Interview" },
    { id: 3, company: "Apple", position: "UX Designer", date: "2025-07-25", status: "Rejected" },
    { id: 4, company: "Google", position: "Frontend Developer", date: "2025-18-01", status: "Applied" },
    { id: 5, company: "Microsoft", position: "Software Engineer", date: "2025-30-28", status: "Interview" },
    { id: 6, company: "Apple", position: "UX Designer", date: "2025-02-25", status: "Rejected" },
    { id: 7, company: "Google", position: "Frontend Developer", date: "2025-03-01", status: "Applied" },
    { id: 8, company: "Microsoft", position: "Software Engineer", date: "2025-03-28", status: "Interview" },
    { id: 9, company: "Apple", position: "UX Designer", date: "2025-04-25", status: "Rejected" },
    { id: 10, company: "Google", position: "Frontend Developer", date: "2025-02-01", status: "Applied" },
    { id: 11, company: "Microsoft", position: "Software Engineer", date: "2025-02-28", status: "Interview" },
    { id: 12, company: "Apple", position: "UX Designer", date: "2025-02-25", status: "Rejected" }
  ]);

  const handleAddApplication = (newApp: Application) => {
    setApplications(prev => [...prev, newApp]);
  };

  const handleStatusChange = (id: number, newStatus: string) => {
    setApplications(prev =>
      prev.map(app =>
        app.id === id ? { ...app, status: newStatus } : app
      )
    );
  };

  const [selectedSection, setSelectedSection] = useState("Job Applications");
  
  const timeData = Object.entries(
    applications.reduce((acc, app) => {
      acc[app.date] = (acc[app.date] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  )
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([date, count]) => ({ date, count }));

  return (
    <>
      <Header />
      <div className={styles.parent}>
        <div className={styles.div1}>
          <Sidebar selected={selectedSection} onSelect={setSelectedSection} />
        </div>
        <div className={styles.div2}>
          {selectedSection == "Job Applications" && (
            <>
              <ApplicationForm onAdd={handleAddApplication} />
              <ApplicationTable applications={applications} onStatusChange={handleStatusChange} />
            </>
          )}

          {selectedSection === "Analytics" && (
            <div className={styles.analyticsGrid}>
            <div className={styles.graphTop}>
              <ApplicationsOverTime data={timeData} />
            </div>
            <div className={styles.graphBottomRow}>
              <div className={styles.graphBottomLeft}>
                <p>g</p>
              </div>
              <div className={styles.graphBottomRight}>
                <p>g</p>
              </div>
            </div>
          </div>
          )}
          
        </div>
      </div>
    </>
  );
}
