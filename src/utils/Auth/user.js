import {computed } from 'vue';
import {useStorage} from '@vueuse/core'

const state = useStorage("session",{});

console.log(state.value.accessToken)

export const isLoggedIn = computed(() => !!state.value.accessToken)
export const token = () => state.value.accessToken;
export const userId = computed(()=> state.value.id);
// export const unset = () => {
//     state.value = {};
//     localStorage.removeItem('session')
// }
