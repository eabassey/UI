import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { Todo } from '../models/Todo';
import produce from 'immer';
import { FilterBy } from '../models/FilterBy';

interface State {
    user: any;
    error: any;
    todos: Todo[];
    login: (email: string, password: string) => any;
    logout: () => Promise<void>;
    signup: (name: string, email: string, password: string) => Promise<void>;
    listTodos: (filterBy?: FilterBy) => Promise<void>;
    createTodo: (title: string) => Promise<void>;
    deleteTodo: (id: number) => Promise<void>;
    markTodo: (id: number, completed: boolean) => Promise<void>;
}

export const useStore = create<State>()(
    devtools(
        // persist(
            (set) => ({
                user: JSON.parse(localStorage.getItem('user') || '{}'),
                error: null,
                todos: [],
                
                //
                login: async (email: string, password: string) => {
                    try {
                        const res = await fetch(`${import.meta.env.VITE_API_URI}/api/login`, {
                            method: 'POST',
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

                signup: async (name: string, email: string, password: string) => {
                    try {
                        const res = await fetch(`${import.meta.env.VITE_API_URI}/api/signup`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                name: name.trim(),
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

                listTodos: async(filterBy: FilterBy = 'all') => {
                    try {
                        const user = localStorage.getItem('user') || '{}';
                        const token = JSON.parse(user)?.token; 
                        const res = await fetch(`http://localhost:3000/api/todos?filterBy=${filterBy}`, {
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
                        const res = await fetch(`${import.meta.env.VITE_API_URI}/api/todos`, {
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
                        const res = await fetch(`${import.meta.env.VITE_API_URI}/api/todos/${id}`, {
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
                        const res = await fetch(`${import.meta.env.VITE_API_URI}/api/todos/${id}`, {
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