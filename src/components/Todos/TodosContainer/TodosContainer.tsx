
import { Filter } from '../Filter/Filter';
import { Logo } from '../Logo/Logo';
import { TextInput } from '../TextInput/TextInput';
import { Title } from '../Title/Title';
import { TodoItem } from '../TodoItem/TodoItem';
import './TodosContainer.css';


export const TodosContainer = () => {

    return (
        <div className="TodosContainer">
            <Logo />
            <Title />
            <TextInput />
            <TodoItem title="Make a todo list" />
            <TodoItem title="Make a todo list" />
            <TodoItem title="Make a todo list" />
            <Filter />
        </div>
    );
}