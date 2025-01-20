import type { InputHTMLAttributes } from 'react'
import React from 'react'

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  inputType: string
  placeholder: string
  label?: string
  icon?: React.ReactNode
}

export default function InputField({ inputType, placeholder, label, icon, ...rest }: Readonly<InputFieldProps>) {
  return (
    <div className="w-full">
      <div>
        <label
          className="mb-3 mt-5 block text-xs font-medium text-gray-900"
          htmlFor={inputType}
        >
          {label}
        </label>
        <div className="relative">
          <input
            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
            id={inputType}
            type={inputType}
            name={inputType}
            placeholder={placeholder}
            {...rest}
          />
          {icon}
        </div>
      </div>
    </div>
  )
}
