import "./Button.css";

function Button({ children, handler }) {
  return <button onClick={handler}>{children}</button>;
}

export { Button };
