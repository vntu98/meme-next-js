import React from 'react'

type ButtonProps = {
  type?: "button" | "submit" | "reset",
  className?: string,
  isLoading?: boolean,
  colorStroke?: string,
  onClick?: () => void
}

const Button: React.FC<ButtonProps> = ({ type, className, isLoading, children, colorStroke, onClick }) => {
  return (
    <button onClick={onClick} type={type} className={className} disabled={isLoading}>
      {
        isLoading
          ? <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" style={{margin: 'auto', display: 'block'}} width="1em" height="1em" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
              <g>
                <path d="M50 15A35 35 0 1 0 74.74873734152916 25.251262658470843" fill="none" stroke={colorStroke} strokeWidth={12} />
                <path d="M49 3L49 27L61 15L49 3" fill="#85a2b6" />
                <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="0.11587485515643105s" values="0 50 50;360 50 50" keyTimes="0;1" />
              </g>
          </svg>
          : <></>
      }
      <span>{children}</span>
    </button>
  )
}

Button.defaultProps = {
  colorStroke: "#fff"
}

export default Button