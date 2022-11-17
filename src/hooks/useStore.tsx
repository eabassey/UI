import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';


interface State {
    user: any;
    error: any;
    login: (email: string, password: string) => any;
    logout: () => Promise<void>;
}

export const useStore = create<State>()(
    devtools(
        persist(
            (set) => ({
                user: null,
                error: null,

                
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
                }
            }),
            {
                name: 'foodstyles-storage'
            }
        )
    )
)