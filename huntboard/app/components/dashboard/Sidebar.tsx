import styles from "./Sidebar.module.css";

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <h2>Dashboard</h2>
      <ul>
        <li><a href="#">Job Applications</a></li>
        <li><a href="#">Analytics</a></li>
        <li><a href="#">Calendar</a></li>
        <li><a href="#">Settings</a></li>
      </ul>
    </aside>
  );
}
