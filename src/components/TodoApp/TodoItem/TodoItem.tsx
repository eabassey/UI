import './TodoItem.css';
import closeIcon from '../../../assets/img/path-copy.svg';
import { Todo } from '../../../models/Todo';
import { useStore } from '../../../hooks/useStore';

export const TodoItem = ({todo}: { todo: Todo}) => {
    const deleteTodo = useStore(state => state.deleteTodo);
    const markTodo = useStore(state => state.markTodo);

    const onChange = (ev: any) => {
        console.log(ev.target.checked);
        markTodo(todo.id, ev.target.checked);
    }

    return (
        <div className='TodoItem'>
        <div className="TodoItem__inner">
            <input type="checkbox" onChange={onChange} checked={todo.completed} className="TodoItem__Checkbox" />
            <span className="Make-a-todo-list Text-Style-3">
                {todo?.title}
            </span>
        </div>
        <img src={closeIcon} onClick={() => deleteTodo(todo.id)} className="Path-Copy"/>
        </div>
    );
}