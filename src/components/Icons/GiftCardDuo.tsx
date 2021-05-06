import * as React from 'react'

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 576 512"
      width="1rem"
      height="1rem"
      {...props}
    >
      <path
        d="M0 416h576v48a48 48 0 01-48 48H48a48 48 0 01-48-48zm528-288h-57.66a88.38 88.38 0 01-78.61 48h-48.48l62.41 51.71a16 16 0 010 22.63l-11.31 11.31a16 16 0 01-22.63 0L288 188.07l-83.73 73.59a16 16 0 01-22.63 0l-11.31-11.31a16 16 0 010-22.63L232.75 176h-48.48a88.38 88.38 0 01-78.61-48H48a48 48 0 00-48 48v144h576V176a48 48 0 00-48-48z"
        opacity={0.4}
      />
      <path
        d="M0 320v96h576v-96zm184.27-144h48.48l-62.41 51.72a16 16 0 000 22.63l11.31 11.31a16 16 0 0022.63 0L288 188.07l83.71 73.58a16 16 0 0022.63 0l11.31-11.31a16 16 0 000-22.63L343.25 176h48.48C440.4 176 480 136.52 480 88S440.4 0 391.73 0c-17.4 0-38.41 2.65-62.2 22.31C317.35 32.37 304.27 47 288 68.89c-16.32-22-29.51-36.61-41.87-46.75C222.37 2.63 201.52 0 184.27 0 135.6 0 96 39.48 96 88s39.6 88 88.27 88zM391.73 48a40 40 0 110 80h-86.67c51.74-76.5 66.14-80 86.67-80zm-207.46 0c20 0 34.83 3.3 86.67 80h-86.67a40 40 0 110-80z"
        className="prefix__fa-primary"
      />
    </svg>
  )
}

export default SvgComponent
