import './ProductButton.css'
import './NavbarButton.css'
import './CartButton.css'

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

export function LButton ({ params, ...rest }) {
  const { className, title, onClick, href, htmlFor } = params || {};

  return (
    <label
      className={className}
      onClick={onClick}
      htmlFor={htmlFor}
      href={href}
      {...rest} // Other props like `disabled`, `type`, etc.
    >
      {title}
    </label>
  );
}
