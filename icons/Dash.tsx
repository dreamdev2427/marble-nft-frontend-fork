import { SVGProps } from 'react'

export const Dash = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      fill="none"
      width="19"
      height="19"
      viewBox="0 0 24 24"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M10.5 3H3.5V10H10.5V3Z" stroke="black" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"></path>
      <path d="M21.5 3H14.5V10H21.5V3Z" stroke="black" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"></path>
      <path d="M21.5 14H14.5V21H21.5V14Z" stroke="black" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"></path>
      <path d="M10.5 14H3.5V21H10.5V14Z" stroke="black" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"></path>
    </svg>
  )
}
