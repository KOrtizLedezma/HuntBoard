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
  onStatusChange?: (id: number, newStatus: string) => void;
}

const statuses = ["Applied", "Interview", "Rejected", "Offer"];

export default function ApplicationTable({ applications, onStatusChange }: Props) {
  return (
    <section className={styles.tableSection}>
      <h2 className={styles.title}>Current Applications</h2>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.cell_title }>Company</th>
              <th className={styles.cell_title }>Position</th>
              <th className={styles.cell_title }>Date</th>
              <th className={styles.cell_title }>Status</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id} className={styles.row}>
                <td className={styles.cell}>{app.company}</td>
                <td className={styles.cell}>{app.position}</td>
                <td className={styles.cell}>{app.date}</td>
                <td className={styles.cell}>
                <select
                  className={styles.select}
                  value={app.status}
                  onChange={(e) => onStatusChange?.(app.id, e.target.value)}
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
