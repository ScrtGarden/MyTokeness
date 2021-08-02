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
        d="M512 208c0 79.5-114.625 144-256 144S0 287.5 0 208 114.625 64 256 64s256 64.5 256 144z"
        opacity={0.4}
      />
      <path
        d="M0 320c0 27.75 17.999 53.375 48 74.375V330c-18.875-12-35.375-25.375-48-40.375V320zm80 92.5c27.125 12.875 59.625 22.875 96 28.75V377c-35.375-6-67.75-15.875-96-29v64.5zM464 330v64.375c29.999-21 48-46.625 48-74.375v-30.375c-12.625 15-29.125 28.375-48 40.375zM336 441.375c36.375-6 68.875-16 96-28.875V348c-28.25 13.125-60.625 23-96 29v64.375zM208 381.25v64c15.625 1.5 31.5 2.75 48 2.75s32.375-1.25 48-2.75v-64c-16 1.75-32 2.625-48 2.75-16-.125-32-1-48-2.75z"
        className="prefix__fa-primary"
      />
    </svg>
  )
}

export default SvgComponent
