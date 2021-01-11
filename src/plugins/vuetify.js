import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/lib/util/colors';
Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        dark: {
            background : "#000000",
        },
        light: {
            background: colors.blue.accent1,  
        }
    }
});
