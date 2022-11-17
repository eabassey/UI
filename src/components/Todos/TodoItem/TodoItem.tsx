import './TodoItem.css';
import closeIcon from '../../../assets/img/path-copy.svg';

export const TodoItem = ({title}: any) => {
    return (
        <div className='TodoItem'>
        <div className="TodoItem__inner">
            <input type="checkbox" className="TodoItem__Checkbox" />
            <span className="Make-a-todo-list Text-Style-3">
                {title}
            </span>
        </div>
        <img src={closeIcon} className="Path-Copy"/>
        </div>
    );
}