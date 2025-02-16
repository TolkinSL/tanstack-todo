import styles from './TodoText.module.css';
import cn from 'classnames';

interface TodoTextProps {
  isActive: boolean;
  caption: string;
  description?: string;
}

const TodoText: React.FC<TodoTextProps> = ({
  isActive,
  caption,
  description,
}) => {
  return (
    <div className={styles.main}>
      <p
        className={cn(styles.activeTodo, styles.mainCaption, {
          [styles.completeTodo]: isActive,
        })}
      >
        {caption}
      </p>
      <p
        className={cn(styles.activeTodo, styles.mainDescription, {
          [styles.completeTodo]: isActive,
        })}
      >
        {description}
      </p>
    </div>
  );
};

export default TodoText;
