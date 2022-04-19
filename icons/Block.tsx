import { SVGProps } from 'react'

export const Block = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      fill="none"
      width="20"
      height="20"
      viewBox="0 0 50 50"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
    <path d="M32 38V26l6-4.8v12.32L32 38zM10 26h21v12H10V2" stroke="black" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"></path>
    </svg>
  )
}
