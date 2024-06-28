import './ProductButton.css'
import './NavbarButton.css'

export function Button ({ params, ...rest }) {
  const { className, title, onClick } = params || {};

  return (
    <button
      className={className}
      onClick={onClick}
      {...rest} // Other props like `disabled`, `type`, etc.
    >
      {title}
    </button>
  );
}

export function AButton ({ params, ...rest }) {
  const { className, title, onClick, href } = params || {};

  return (
    <a
      className={className}
      onClick={onClick}
      href={href}
      {...rest} // Other props like `disabled`, `type`, etc.
    >
      {title}
    </a>
  );
}
