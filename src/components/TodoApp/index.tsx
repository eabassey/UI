import { Logout } from "../Logout/Logout";
import { TodosContainer } from "./TodosContainer/TodosContainer";



export const TodoApp = () => {

    return (
        <div className="Todos---Web">
          <Logout/>
          <TodosContainer />
        </div>
      )
};