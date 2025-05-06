"use client";
import { useState } from "react";
import Header from "../components/globals/Header";
import Sidebar from "../components/dashboard/Sidebar";
import ApplicationForm from "../components/dashboard/ApplicationForm";
import ApplicationTable from "../components/dashboard/ApplicationTable";
import styles from "../components/dashboard/Dashboard.module.css"
import { Application } from "../components/dashboard/Types";

export default function Home() {
  const [applications, setApplications] = useState([
    { id: 1, company: "Google", position: "Frontend Developer", date: "2025-05-01", status: "Applied" },
    { id: 2, company: "Microsoft", position: "Software Engineer", date: "2025-04-28", status: "Interview" },
    { id: 3, company: "Apple", position: "UX Designer", date: "2025-04-25", status: "Rejected" }
  ]);

  const handleAddApplication = (newApp: Application) => {
    setApplications(prev => [...prev, newApp]);
  };

  return (
    <>
      <Header />
      <div className={styles.parent}>
        <div className={styles.div1}><Sidebar /></div>
        <div className={styles.div2}>
          <ApplicationForm onAdd={handleAddApplication} />
          <div className={styles.div3}><ApplicationTable applications={applications} /></div>
        </div>
      </div>
    </>
  );
}
