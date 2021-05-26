import * as React from 'react'

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      width="1rem"
      height="1rem"
      {...props}
    >
      <path
        d="M32 464a48 48 0 0048 48h288a48 48 0 0048-48V96H32zm272-288a16 16 0 0132 0v224a16 16 0 01-32 0zm-96 0a16 16 0 0132 0v224a16 16 0 01-32 0zm-96 0a16 16 0 0132 0v224a16 16 0 01-32 0z"
        opacity={0.4}
      />
      <path
        d="M432 32H312l-9.4-18.7A24 24 0 00281.1 0H166.8a23.72 23.72 0 00-21.4 13.3L136 32H16A16 16 0 000 48v32a16 16 0 0016 16h416a16 16 0 0016-16V48a16 16 0 00-16-16zM128 160a16 16 0 00-16 16v224a16 16 0 0032 0V176a16 16 0 00-16-16zm96 0a16 16 0 00-16 16v224a16 16 0 0032 0V176a16 16 0 00-16-16zm96 0a16 16 0 00-16 16v224a16 16 0 0032 0V176a16 16 0 00-16-16z"
        className="prefix__fa-primary"
      />
    </svg>
  )
}

export default SvgComponent
