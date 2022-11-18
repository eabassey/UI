
import { useStore } from '../../../hooks/useStore';
import './TextInput.css';

export const TextInput = () => {
    const createTodo = useStore(state => state.createTodo);
    const handleKey = (ev: any) => {
        if (ev.key == 'Enter') {
            const title = ev.target.value;
            createTodo(title);
            ev.target.value = '';
        }
    }
    return (
        <div>
            <input type="text" onKeyDown={handleKey} className="Add-a-new-todo" placeholder="Add a new todo" />
            <div className="Line-Copy"></div>
        </div>
    );
}