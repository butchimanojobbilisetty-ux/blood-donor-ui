import React, { useState, useRef, useEffect } from 'react';

const SearchableSelect = ({
    options = [],
    value,
    onChange,
    placeholder = "Select...",
    label,
    name,
    disabled = false,
    required = false
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState(value || '');
    const wrapperRef = useRef(null);

    // Sync internal search term with external value prop
    useEffect(() => {
        setSearchTerm(value || '');
    }, [value]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const filteredOptions = options.filter(option =>
        option && option.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelect = (option) => {
        // Mock event object for compatibility with standard handleChange
        const event = {
            target: { name, value: option },
            preventDefault: () => { }
        };
        onChange(event);
        setSearchTerm(option);
        setIsOpen(false);
    };

    const handleInputChange = (e) => {
        const newValue = e.target.value;
        setSearchTerm(newValue);
        setIsOpen(true);
        onChange(e);
    };

    return (
        <div className="relative space-y-1" ref={wrapperRef}>
            {label && (
                <label className="text-xs font-black text-secondary tracking-widest uppercase px-1">
                    {label}
                </label>
            )}
            <div className="relative">
                <input
                    type="text"
                    name={name}
                    value={searchTerm}
                    onChange={handleInputChange}
                    onFocus={() => !disabled && setIsOpen(true)}
                    placeholder={placeholder}
                    disabled={disabled}
                    required={required}
                    autoComplete="off"
                    className={`input-field w-full text-sm py-2 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                />

                {/* Dropdown Arrow Icon */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
                    >
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </div>

                {/* Dropdown Menu */}
                {isOpen && !disabled && (
                    <div className="absolute z-50 w-full mt-1 bg-white rounded-xl shadow-xl border border-gray-100 max-h-60 overflow-auto animate-in fade-in zoom-in-95 duration-100">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option, index) => (
                                <div
                                    key={index}
                                    onClick={() => handleSelect(option)}
                                    className="px-4 py-3 hover:bg-primary/5 cursor-pointer text-gray-700 hover:text-primary transition-colors border-b border-gray-50 last:border-none text-sm font-medium"
                                >
                                    {option}
                                </div>
                            ))
                        ) : (
                            <div className="px-4 py-3 text-gray-400 text-sm text-center italic">
                                Any value is accepted.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchableSelect;
