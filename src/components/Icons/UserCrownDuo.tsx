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
      <path d="M352 96H96V0l64 32 64-32 64 32 64-32z" opacity={0.4} />
      <path
        d="M313.6 304h-16.71a174 174 0 01-145.78 0H134.4A134.4 134.4 0 000 438.4V464a48 48 0 0048 48h352a48 48 0 0048-48v-25.6A134.4 134.4 0 00313.6 304zM224 272a128 128 0 00128-128v-16H96v16a128 128 0 00128 128z"
        className="prefix__fa-primary"
      />
    </svg>
  )
}

export default SvgComponent
