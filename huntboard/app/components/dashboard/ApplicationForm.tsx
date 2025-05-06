"use client";
import { useState } from "react";
import styles from "./ApplicationForm.module.css";

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAdd({
      id: Date.now(),
      ...formData,
      status: "Applied"
    });
    setFormData({ company: "", position: "", date: "" });
  };

  return (
    <section className={styles.formSection}>
      <h2>Add New Application</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div>
          <label>Company</label>
          <input name="company" value={formData.company} onChange={handleChange} required />
        </div>
        <div>
          <label>Position</label>
          <input name="position" value={formData.position} onChange={handleChange} required />
        </div>
        <div>
          <label>Date</label>
          <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        </div>
        <button type="submit">Add</button>
      </form>
    </section>
  );
}
