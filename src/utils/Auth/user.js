import {computed } from 'vue';
import {useStorage} from '@vueuse/core'

const state = useStorage("session",{});


export const isLoggedIn = computed(() => !!state.value.accessToken)
export const token = () => state.value.accessToken;
export const userId = computed(()=> state.value.id);
export const set= (data) => {
    state.value = data;
  }
export const unset = () => {
    state.value = {};
    localStorage.removeItem('session')
}
