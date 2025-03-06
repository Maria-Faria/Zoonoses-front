import { InputHTMLAttributes, RefObject } from "react";
import styles from './style.module.css'

interface inputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string
    reference?: RefObject<HTMLInputElement | null> 
}

export default function Input({ label, reference, ...props }: inputProps) {
    return (
        <div className={styles.labelAndInput}>
            <label>{label}</label>
            
            <input ref={reference} {...props} />
        </div>
    )
}