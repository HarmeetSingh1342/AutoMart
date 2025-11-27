export default function Button({ text, onClick, children }) {
  return (
    <button className="btn" onClick={onClick}>
      {children || text}
    </button>
  );
}
