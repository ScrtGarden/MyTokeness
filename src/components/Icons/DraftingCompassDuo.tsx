import * as React from 'react'

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width="1rem"
      height="1rem"
      {...props}
    >
      <path
        d="M12.5 249.86c-4.86-7.67-1.89-18 6.05-22.39l28.07-15.57c7.48-4.15 16.61-1.46 21.26 5.72a223.89 223.89 0 0035.75 42.55L71 316.68a288.08 288.08 0 01-58.5-66.82zm487 0c4.86-7.67 1.89-18-6.05-22.39l-28.07-15.57c-7.48-4.15-16.61-1.46-21.26 5.72a223.95 223.95 0 01-257.77 91.26l-32.53 56.35A287.42 287.42 0 00256 384a288.42 288.42 0 00243.5-134.14z"
        opacity={0.4}
      />
      <path
        d="M457.21 344.75a318.63 318.63 0 01-82.85 48.51l54.5 94.4 53.95 23A16 16 0 00505 497.9l7-58.25zM340.9 143.3a96.5 96.5 0 10-169.29-.88L0 439.65l7 58.25a16 16 0 0022.17 12.8l54-23 170.11-294.76c1.07 0 2.14.06 3.22.06h2.24l50.49 87.47a191.71 191.71 0 0082.65-48.85zM256.5 128A31.5 31.5 0 11288 96.5a31.5 31.5 0 01-31.5 31.5z"
        className="prefix__fa-primary"
      />
    </svg>
  )
}

export default SvgComponent
