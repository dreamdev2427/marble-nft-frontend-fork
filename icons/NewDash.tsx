import { SVGProps } from 'react'

export const NewDash = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      fill=""
      width="20"
      height="20"
      viewBox="10 10 30 30"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M36,30H12V12H36Zm-4-8.8H28l-3,3.06-4-7.15L18,21.2H16M24,30v6m-6,0H30" stroke="black" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"></path>
    </svg>
  )
}
