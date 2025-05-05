'use client'
import { useCallback } from 'react'
import { useLocalStorageState } from '@/hooks/useLocalStorage'
import type { Task } from '@/types'
import TodoInput from './TodoInput'
import TodoList from './TodoList'
import styles from '@/styles/Todo.module.css'

export default function TodoPage() {
  const [tasks, setTasks] = useLocalStorageState<Task[]>('tasks', [])

  const addTask = useCallback(
    (text: string) => {
      setTasks([...tasks, { text, completed: false }])
    },
    [tasks, setTasks]
  )
  const toggleTask = useCallback(
    (i: number) => {
      setTasks(tasks.map((t, idx) =>
        idx === i ? { ...t, completed: !t.completed } : t
      ))
    },
    [tasks, setTasks]
  )
  const deleteTask = useCallback(
    (i: number) => {
      setTasks(tasks.filter((_, idx) => idx !== i))
    },
    [tasks, setTasks]
  )

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>📝 To-Do List</h1>
      <TodoInput onAdd={addTask} />
      <TodoList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
    </div>
  )
}
