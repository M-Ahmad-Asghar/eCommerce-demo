import * as React from "react"

function Chevronup(props) {
    return (
        <svg viewBox="0 -4.5 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M544.345 1213.39l-9.73-10.79a2.087 2.087 0 00-1.631-.61 2.085 2.085 0 00-1.63.61l-9.73 10.79a2.136 2.136 0 000 3.01c.828.83 2.169.83 2.997 0l8.363-9.27 8.365 9.27c.827.83 2.169.83 2.996 0s.827-2.18 0-3.01"
                transform="translate(-521 -1202)"
                fill={props.fill || "#ccc"}
                stroke="none"
                strokeWidth={1}
                fillRule="evenodd"
            />
        </svg>
    )
}

export default Chevronup
