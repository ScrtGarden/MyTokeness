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
        d="M256 0c5.314.012 13.516 1.639 18.406 3.664l192 80.009C484.312 91.064 496 108.568 496 127.975 496 385.156 306.838 512 256.047 512c-.016 0-.031-.004-.047-.004V0z"
        opacity={0.4}
      />
      <path
        d="M256 511.996c-.016 0-.031.004-.047.004C204.922 512 16 385.258 16 127.975c0-19.407 11.688-36.911 29.594-44.302l192-80.009C242.484 1.639 250.686.012 256 0v511.996z"
        className="prefix__fa-primary"
      />
    </svg>
  )
}

export default SvgComponent
