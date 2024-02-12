import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


const useDeletedTodos = () => {

    const allTodos = useSelector(state => state.login.user.todos);

    const [deletedTodos, setDeletedTodos] = useState([])

    useEffect(() => {
        setDeletedTodos([...allTodos].filter(todo => todo.status.startsWith('DELETED_')))
    },[allTodos])

    return deletedTodos;
}

export default useDeletedTodos;