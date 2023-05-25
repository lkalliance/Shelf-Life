import "./Button.css";

function Button({ children, handler, className }) {
  return (
    <button className={className} onClick={handler}>
      {children}
    </button>
  );
}

export { Button };
