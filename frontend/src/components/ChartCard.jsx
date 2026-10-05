export default function ChartCard({ title, children }) {
  return (
    <section className="panel chart-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">HISTORY</p>
          <h2>{title}</h2>
        </div>
      </div>
      <div className="chart-container">{children}</div>
    </section>
  );
}