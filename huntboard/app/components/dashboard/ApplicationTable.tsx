import styles from "./ApplicationTable.module.css";

type Application = {
  id: number;
  company: string;
  position: string;
  date: string;
  status: string;
};

interface Props {
  applications: Application[];
}

export default function ApplicationTable({ applications }: Props) {
  return (
    <section className={styles.tableSection}>
      <h2>Applications</h2>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.tableCell}>Company</th>
              <th className={styles.tableCell}>Position</th>
              <th className={styles.tableCell}>Date</th>
              <th className={styles.tableCell}>Status</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app: Application) => (
              <tr key={app.id}>
                <td className={styles.tableCell}>{app.company}</td>
                <td className={styles.tableCell}>{app.position}</td>
                <td className={styles.tableCell}>{app.date}</td>
                <td className={styles.tableCell}>
                  <span className={`${styles.status} ${styles[app.status.toLowerCase()]}`}>
                    {app.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
