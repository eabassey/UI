import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { Todo } from '../models/Todo';
import produce from 'immer';

interface State {
    user: any;
    error: any;
    todos: Todo[];
    login: (email: string, password: string) => any;
    logout: () => Promise<void>;
    listTodos: () => Promise<void>;
    createTodo: (title: string) => Promise<void>;
    deleteTodo: (id: number) => Promise<void>;
    markTodo: (id: number, completed: boolean) => Promise<void>;
}

export const useStore = create<State>()(
    devtools(
        // persist(
            (set) => ({
                user: null,
                error: null,
                todos: [],
                
                //
                login: async (email: string, password: string) => {
                    try {
                        const res = await fetch('http://localhost:3000/api/login', {
                            method: 'POST',
                            // headers: {
                            //     authorization: `Bearer ${localStorage.getItem('jwt_access_token')}`  
                            // },
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                email: email.trim(),
                                password: password.trim(),
                            })
                        });
                        const data = await res.json();
                        if (res.status === 200 || res.status === 201) {
                            localStorage.setItem('user', JSON.stringify(data));
                            set({ user: data, error: null});
                            return data;
                        } else {
                            set({error: data, user: null});
                            return null;
                        }
                    } catch (error) {
                        set({ error, user: null })
                    }
                },

                logout: async () => {
                    localStorage.removeItem('user');
                    localStorage.removeItem('foodstyles-storage');
                    set({ user: null, error: null});
                },

                listTodos: async() => {
                    try {
                        const user = localStorage.getItem('user') || '{}';
                        const token = JSON.parse(user)?.token; 
                        const res = await fetch('http://localhost:3000/api/todos', {
                            method: 'GET',
                                headers: {
                                    'Content-Type': 'application/json',
                                    authorization: `Bearer ${token}`  
                            },
                        });
                        const data = await res.json();
                        if (res.status === 200) {
                            set({ todos: data, error: null});
                        } else {
                            set({error: data, todos: []});
                        }
                    } catch (error) {
                        set({ error, todos: [] })
                    }
                },

                createTodo: async(title: string) => {
                    try {
                        const user = localStorage.getItem('user') || '{}';
                        const token = JSON.parse(user)?.token; 
                        const res = await fetch('http://localhost:3000/api/todos', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                authorization: `Bearer ${token}`  
                            },
                            body: JSON.stringify({
                                title: title.trim(),
                            })
                        });
                        const data = await res.json();
                        if (res.status === 200) {
                            set(state => ({ todos: [...state.todos, data], error: null}));
                        } else {
                            set({error: data, todos: []});
                        }
                    } catch (error) {
                        set({ error, todos: [] })
                    }
                },
                
                deleteTodo: async(id: number) => {
                    try {
                        const user = localStorage.getItem('user') || '{}';
                        const token = JSON.parse(user)?.token; 
                        const res = await fetch(`http://localhost:3000/api/todos/${id}`, {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json',
                                authorization: `Bearer ${token}`  
                            },
                        });
                        const data = await res.json();
                        if (res.status === 200) {
                            set(state => ({ todos: state.todos.filter(t => t.id !== id), error: null}));
                        } else {
                            set({error: data});
                        }
                    } catch (error) {
                        set({ error })
                    }
                },

                markTodo: async(id: number, completed: boolean) => {
                    try {
                        const user = localStorage.getItem('user') || '{}';
                        const token = JSON.parse(user)?.token; 
                        const res = await fetch(`http://localhost:3000/api/todos/${id}`, {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json',
                                authorization: `Bearer ${token}`  
                            },
                            body: JSON.stringify({
                                completed,
                            })
                        });
                        const data: Todo = (await res.json()) as any ;
                        if (res.status === 200) {
                            set((state) => {
                                const todos = produce(state.todos, (draft) => {
                                    const idx = state.todos.findIndex(t => t.id === data.id);
                                    draft[idx].completed = data.completed;
                                });
                                return { todos, error: null};
                            });
                        } else {
                            set({error: data });
                        }
                    } catch (error) {
                        set({ error })
                    }
                },

            }),
        //     {
        //         name: 'foodstyles-storage'
        //     }
        // )
    )
)