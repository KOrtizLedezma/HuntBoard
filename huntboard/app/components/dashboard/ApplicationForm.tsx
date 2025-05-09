"use client";
import { useState } from "react";
import styles from "./ApplicationForm.module.css";
import { getAccessToken } from "../utils/auth";

type Application = {
  id: number;
  company: string;
  position: string;
  date: string;
  status: string;
};

type Props = {
  onAdd: (app: Application) => void;
};

export default function ApplicationForm({ onAdd }: Props) {
  const [formData, setFormData] = useState({
    company: "",
    position: "",
    date: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = await getAccessToken();
    if (!token) {
      alert("Not authenticated.");
      return;
    }

    const newApp = {
      ...formData,
      status: "Applied",
    };

    const res = await fetch("http://127.0.0.1:8000/api/applications/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newApp),
    });

    if (res.ok) {
      const savedApp = await res.json();
      onAdd({ id: savedApp.id, ...newApp });
      setFormData({ company: "", position: "", date: "" });
    } else {
      const error = await res.json();
      alert("Error: " + JSON.stringify(error));
    }
  };

  return (
    <section className={styles.formSection}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div>
          <input placeholder="Company" name="company" value={formData.company} onChange={handleChange} required />
        </div>
        <div>
          <input placeholder="Position" name="position" value={formData.position} onChange={handleChange} required />
        </div>
        <div>
          <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        </div>
        <button type="submit">Add</button>
      </form>
    </section>
  );
}
