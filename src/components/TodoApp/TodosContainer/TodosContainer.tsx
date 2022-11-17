
import { useEffect } from 'react';
import { useStore } from '../../../hooks/useStore';
import { Filter } from '../Filter/Filter';
import { Logo } from '../Logo/Logo';
import { TextInput } from '../TextInput/TextInput';
import { Title } from '../Title/Title';
import { TodoItem } from '../TodoItem/TodoItem';
import './TodosContainer.css';


export const TodosContainer = () => {
    const listTodos = useStore(state => state.listTodos);
    const todos = useStore(state => state.todos);

    useEffect(() => {
        listTodos();
    }, []);

    return (
        <div className="TodosContainer">
            <Logo />
            <Title />
            <TextInput />
            {todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
            ))}
            <Filter />
        </div>
    );
}