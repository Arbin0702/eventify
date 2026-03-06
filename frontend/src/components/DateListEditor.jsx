export default function DateListEditor({ dates, setDates, error }) {
  function updateDate(index, value) {
    const next = [...dates];
    next[index] = value;
    setDates(next);
  }

  function addDate() {
    setDates([...dates, ""]);
  }

  function removeDate(index) {
    const next = dates.filter((_, i) => i !== index);
    setDates(next.length ? next : [""]);
  }

  return (
    <div>
      {dates.map((date, index) => (
        <div key={index} className="row" style={{ marginTop: index === 0 ? 0 : 10 }}>
          <input
            className="input"
            type="date"
            value={date}
            onChange={(e) => updateDate(index, e.target.value)}
            style={{ flex: 1 }}
          />

          <button
            type="button"
            className="btn ghost"
            onClick={() => removeDate(index)}
            disabled={dates.length === 1}
          >
            Remove
          </button>
        </div>
      ))}

      <div className="row" style={{ marginTop: 12 }}>
        <button type="button" className="btn" onClick={addDate}>
          + Add another date
        </button>
      </div>

      {error ? <div className="fieldError">{error}</div> : null}
    </div>
  );
}