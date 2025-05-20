import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface BaseState {}

export const useBaseStore = create<BaseState>()(
    devtools(
        persist(
            (set)=>({

            }),
            {name : 'base-store'}
        ),
        
    )
);
