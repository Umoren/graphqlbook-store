import Vue from 'vue';
import App from './layout/App.vue';
import router from './router';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './registerServiceWorker';
import VueApollo from "vue-apollo";
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';


// create a provider

const apolloProvider = new VueApollo({
  defaultClient : new ApolloClient({
    uri: 'https://book-recorder.herokuapp.com/v1/graphql'
  })
})

Vue.use(VueApollo, gql);

Vue.config.productionTip = false

new Vue({
  router,
  apolloProvider,
  render: h => h(App)
}).$mount('#app')
