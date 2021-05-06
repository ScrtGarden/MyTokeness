import * as React from 'react'

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 640 512"
      width="1rem"
      height="1rem"
      {...props}
    >
      <path
        d="M439 254.14L576 215v178a32.07 32.07 0 01-24.2 31l-216.4 54.1a65 65 0 01-31 0L88.24 424A31.9 31.9 0 0164 393V215l137 39.2a46 46 0 0013.3 1.9 48.64 48.64 0 0041.5-23.5L320 126l64.3 106.6a48.47 48.47 0 0041.4 23.4 46 46 0 0013.3-1.86z"
        opacity={0.4}
      />
      <path
        d="M638.34 143.84L586.84 41a16.33 16.33 0 00-16.7-8.9L320 64l91.7 152.1a16.44 16.44 0 0018.5 7.3l197.9-56.5a16.47 16.47 0 0010.24-23.06zM53.24 41L1.74 143.84a16.3 16.3 0 0010.1 23l197.9 56.5a16.44 16.44 0 0018.5-7.3L320 64 69.84 32.14A16.34 16.34 0 0053.24 41z"
        className="prefix__fa-primary"
      />
    </svg>
  )
}

export default SvgComponent
