import type { Task } from '@/types'
import TodoItem from './TodoItem'
import styles from '@/styles/Todo.module.css'

interface Props {
  tasks: Task[]
  onToggle(i: number): void
  onDelete(i: number): void
}

export default function TodoList({ tasks, onToggle, onDelete }: Props) {
  return (
    <ul className={styles.taskList}>
      {tasks.map((t, i) => (
        <TodoItem
          key={i}
          task={t}
          onToggle={() => onToggle(i)}
          onDelete={() => onDelete(i)}
        />
      ))}
    </ul>
  )
}
