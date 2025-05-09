"use client";
import { useEffect, useState } from "react";
import Header from "../components/globals/Header";
import Sidebar from "../components/dashboard/Sidebar";
import ApplicationForm from "../components/dashboard/ApplicationForm";
import ApplicationTable from "../components/dashboard/ApplicationTable";
import styles from "../components/dashboard/Dashboard.module.css";
import { Application } from "../components/dashboard/Types";
import { ApplicationsOverTime } from "../components/dashboard/ApplicationsOverTime";
import { PositionPieChart } from "../components/dashboard/PositionPieChart";
import { StatusBarChart } from "../components/dashboard/StatusBarChart";
import { useRouter } from "next/navigation";
import { getAccessToken } from "../components/utils/auth";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState<Application[]>([]);

  const [selectedSection, setSelectedSection] = useState("Job Applications");

  useEffect(() => {
    const verifyToken = async () => {
      const token = await getAccessToken();
      if (!token) {
        router.push("/");
      } else {
        setLoading(false);
      }
    };
    verifyToken();
  }, [router]);

  useEffect(() => {
    const verifyTokenAndFetch = async () => {
      const token = await getAccessToken();
      if (!token) {
        router.push("/");
        return;
      }

      const res = await fetch("http://127.0.0.1:8000/api/applications/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setApplications(data);
        setLoading(false);
      } else {
        console.error("Failed to fetch applications");
        setLoading(false);
      }
    };

    verifyTokenAndFetch();
  }, [router]);

  if (loading) return <p>Loading...</p>;

  const handleAddApplication = (newApp: Application) => {
    setApplications(prev => [...prev, newApp]);
  };

  const handleStatusChange = async (id: number, newStatus: string) => {
    const token = await getAccessToken();
    if (!token) {
      alert("You must be logged in to update status.");
      return;
    }

    const res = await fetch(`http://127.0.0.1:8000/api/applications/${id}/update/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ status: newStatus })
    });

    if (res.ok) {
      setApplications(prev =>
        prev.map(app =>
          app.id === id ? { ...app, status: newStatus } : app
        )
      );
    } else {
      const err = await res.text();
      console.error("Failed to update status:", err);
      alert("Could not update status.");
    }
  };

  const positionData = Object.entries(
    applications.reduce((acc, app) => {
      acc[app.position] = (acc[app.position] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([position, count]) => ({ position, count }));

  type Status = "Applied" | "Interview" | "Rejected" | "Offer";

  const statusCounts: Record<Status, number> = {
    Applied: 0,
    Interview: 0,
    Rejected: 0,
    Offer: 0,
  };

  applications.forEach(app => {
    if (statusCounts[app.status as Status] !== undefined) {
      statusCounts[app.status as Status]++;
    }
  });

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
          {selectedSection === "Job Applications" && (
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
                  <PositionPieChart data={positionData} />
                </div>
                <div className={styles.graphBottomRight}>
                  <StatusBarChart counts={statusCounts} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
