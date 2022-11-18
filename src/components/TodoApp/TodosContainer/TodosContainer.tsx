
import { useEffect, useState } from 'react';
import { useStore } from '../../../hooks/useStore';
import { FilterBy } from '../../../models/FilterBy';
import { Filter } from '../Filter/Filter';
import { Logo } from '../Logo/Logo';
import { TextInput } from '../TextInput/TextInput';
import { Title } from '../Title/Title';
import { TodoItem } from '../TodoItem/TodoItem';
import './TodosContainer.css';


export const TodosContainer = () => {
    const [filterBy, setFilterBy] = useState<FilterBy>('all');
    const listTodos = useStore(state => state.listTodos);
    const todos = useStore(state => state.todos);

    useEffect(() => {
        listTodos(filterBy);
    }, [filterBy]);

    return (
        <div className="TodosContainer">
            <Logo />
            <Title />
            <TextInput />
            <div>
                {todos.map((todo) => (
                    <TodoItem key={todo.id} todo={todo} />
                ))}
            </div>
            <Filter setFilterBy={setFilterBy}/>
        </div>
    );
}