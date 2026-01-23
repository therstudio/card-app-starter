export default function CardForm({
  values,
  onChange,
  onSubmit,
  busy,
  error,
  submitText,
}) {
  const previewUrl = values?.card_pic?.trim();

  return (
    <form className="form" onSubmit={onSubmit}>
      {error ? <div className="alert alert--error">{error}</div> : null}

      <div className="form__grid">
        <div className="form__field">
          <label className="label" htmlFor="card_name">
            Card Name
          </label>
          <input
            id="card_name"
            name="card_name"
            className="input"
            value={values.card_name}
            onChange={onChange}
            placeholder="e.g. Lightning Bolt"
            required
            disabled={busy}
          />
        </div>

        <div className="form__field">
          <label className="label" htmlFor="card_pic">
            Card Image URL
          </label>
          <input
            id="card_pic"
            name="card_pic"
            className="input"
            value={values.card_pic}
            onChange={onChange}
            placeholder="https://...jpg"
            required
            disabled={busy}
          />
        </div>
      </div>

      <div className="form__preview">
        <div className="muted">Preview</div>
        <div className="previewBox">
          {previewUrl ? (
            <img className="previewImg" src={previewUrl} alt="Preview" />
          ) : (
            <div className="previewPlaceholder">
              Image preview will appear here
            </div>
          )}
        </div>
      </div>

      <button className="btn btn--primary" type="submit" disabled={busy}>
        {busy ? "Saving..." : submitText}
      </button>
    </form>
  );
}
