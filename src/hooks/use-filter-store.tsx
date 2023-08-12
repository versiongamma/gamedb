import { create } from 'zustand';

type Filter = {
  filter: string;
  changeFilter: (value: string) => void;
};

const useFilterStore = create<Filter>((set) => ({
  filter: '',
  changeFilter: (value: string) => set(() => ({ filter: value })),
}));

export default useFilterStore;
