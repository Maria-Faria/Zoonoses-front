import { InputHTMLAttributes } from "react";
import styles from './style.module.css'

interface inputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string
}

export default function Input({ label, ...props }: inputProps) {
    return (
        <div className={styles.labelAndInput}>
            <label>{label}</label>
            
            <input {...props} />
        </div>
    )
}