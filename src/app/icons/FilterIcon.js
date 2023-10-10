import * as React from "react"

function FilterIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 7a1 1 0 011-1h16a1 1 0 110 2H4a1 1 0 01-1-1zm3 5a1 1 0 011-1h10a1 1 0 110 2H7a1 1 0 01-1-1zm3 5a1 1 0 011-1h4a1 1 0 110 2h-4a1 1 0 01-1-1z"
        fill="#696969"
      />
    </svg>
  )
}

export default FilterIcon
