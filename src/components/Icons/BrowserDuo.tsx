import * as React from 'react'

function SvgComponent(props: React.SVGProps<SVGSVGElement>): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width="1rem"
      height="1rem"
      {...props}
    >
      <path
        d="M0 224v192c0 35.346 28.654 64 64 64h384c35.346 0 64-28.654 64-64V224H0zm76-64h40c6.625 0 12-5.375 12-12v-40c0-6.625-5.375-12-12-12H76c-6.625 0-12 5.375-12 12v40c0 6.625 5.375 12 12 12z"
        opacity={0.4}
      />
      <path
        d="M448 32H64C28.654 32 0 60.654 0 96v128h512V96c0-35.346-28.654-64-64-64zM128 148c0 6.625-5.375 12-12 12H76c-6.625 0-12-5.375-12-12v-40c0-6.625 5.375-12 12-12h40c6.625 0 12 5.375 12 12v40zm320 0c0 6.625-5.375 12-12 12H172c-6.625 0-12-5.375-12-12v-40c0-6.625 5.375-12 12-12h264c6.625 0 12 5.375 12 12v40z"
        className="prefix__fa-primary"
      />
    </svg>
  )
}

export default SvgComponent
