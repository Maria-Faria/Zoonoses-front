import { InputHTMLAttributes } from "react";
import './style.css'

interface inputProps extends InputHTMLAttributes<HTMLInputElement> {}

export default function Input({ ...props }: inputProps) {
    return (
        <input {...props} />
    )
}