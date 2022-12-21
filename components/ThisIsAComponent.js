import React, { useEffect, useState } from 'react'
// import { BiChevronDown } from 'react-icons/bi'
// import { AiOutlineSearch } from 'react-icons/ai'

const Selector = () => {
    const [countries, setCountries] = useState(null)
    const [inputValue, setInputValue] = useState('')
    const [selected, setSelected] = useState('')
    const [open, setOpen] = useState(false)

    useEffect(() => {
        fetch('https://restcountries.com/v2/all?fields=name')
            .then((res) => res.json())
            .then((data) => {
                setCountries(data)
            })
    }, [])
    return (
        <div className="w-full text-black">
            <div
                onClick={() => setOpen(!open)}
                className={`bg-white w-full p-2 flex items-center justify-between`}
            >
                Select exercise
            </div>
            <ul
                className={`bg-white overflow-y-auto ${
                    open ? 'max-h-60' : 'max-h-0'
                } `}
            >
                <div className="flex items-center px-2 sticky top-0 bg-white"></div>
                {countries?.map((country) => (
                    <li
                        key={country?.name}
                        className={`p-2 text-sm hover:bg-sky-600 hover:text-white
            ${
                country?.name?.toLowerCase() === selected?.toLowerCase() &&
                'bg-sky-600 text-white'
            }
            ${
                country?.name?.toLowerCase().startsWith(inputValue)
                    ? 'block'
                    : 'hidden'
            }`}
                        onClick={() => {
                            if (
                                country?.name?.toLowerCase() !==
                                selected.toLowerCase()
                            ) {
                                setSelected(country?.name)
                                setOpen(false)
                                setInputValue('')
                            }
                        }}
                    >
                        {country?.name}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Selector
