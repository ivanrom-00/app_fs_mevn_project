import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        selectedStar: false,
        stars: 0,
        starPosition: 0,
    },
    mutations: {
        setStars(state) {
            state.stars = state.starPosition;
        }
    },
    actions: {
        setStarsAction(context) {
            context.commit('setStars');
        }
    },
    getters: {
        selectedStar(state) {
            return state.selectedStar;
        },
        stars(state) {
            return state.stars;
        },
    },
});