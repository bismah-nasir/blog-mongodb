export default function Nav({ articles, setArticle, selectedArticle }) {
  return (
    <nav>
      {!articles || articles.length === 0 ? (
        "No articles"
      ) : (
        articles.map((a) => (
          <div
            key={a._id}
            className={`article-item ${selectedArticle?._id === a._id ? "selected" : ""}`}
            onClick={() => setArticle(a)}
          >
            {a.title}
          </div>
        ))
      )}
    </nav>
  );
}