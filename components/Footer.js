import React from 'react'

export default function Footer() {
    return (
        <div className="flex justify-center items-center gap-5 py-3">
            <a
                href="https://www.linkedin.com/in/vincentalbertsson/"
                target="_blank"
                rel="noreferrer"
            >
                <i className="fa-brands fa-linkedin duration-300 hover:opacity-30 cursor-pointer"></i>
            </a>
            <a
                href="https://github.com/valberts"
                target="_blank"
                rel="noreferrer"
            >
                <i className="fa-brands fa-github duration-300 hover:opacity-30 cursor-pointer"></i>
            </a>
        </div>
    )
}
