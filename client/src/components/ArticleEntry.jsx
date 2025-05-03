export default function ArticleEntry({ title, setTitle, body, setBody, handleSubmit }) {
  return (
    <div className="article-entry">
      <form className="entry-form">
        <input
          type="text"
          placeholder="Title"
          className="form-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Body"
          className="form-textarea"
          rows="8"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <button className="submit-button" onClick={handleSubmit}>Create</button>
      </form>
    </div>
  );
}