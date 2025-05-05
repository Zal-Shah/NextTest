'use client'
import { useState, useCallback } from 'react'
import styles from '@/styles/Todo.module.css'

interface Props { onAdd(text: string): void }

export default function TodoInput({ onAdd }: Props) {
  const [value, setValue] = useState('')

  const submit = useCallback(() => {
    const trimmed = value.trim()
    if (!trimmed) return
    onAdd(trimmed)
    setValue('')
  }, [value, onAdd])

  return (
    <div className={styles.inputGroup}>
      <input
        className={styles.taskInput}
        type="text"
        placeholder="Enter task…"
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && submit()}
      />
      <button className={styles.addButton} onClick={submit}>
        Add
      </button>
    </div>
  )
}
