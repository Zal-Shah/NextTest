import type { Task } from '@/types'
import styles from '@/styles/Todo.module.css'

interface Props {
  task: Task
  onToggle(): void
  onDelete(): void
}

export default function TodoItem({ task, onToggle, onDelete }: Props) {
  return (
    <li className={styles.taskItem}>
      <input
        type="checkbox"
        className={styles.checkbox}
        checked={task.completed}
        onChange={onToggle}
      />
      <span
        className={`${styles.taskText} ${
          task.completed ? styles.completed : ''
        }`}
      >
        {task.text}
      </span>
      <button className={styles.completeButton} onClick={onToggle}>
        {task.completed ? 'Undo' : 'Complete'}
      </button>
      <button className={styles.deleteButton} onClick={onDelete}>
        ❌
      </button>
    </li>
  )
}
