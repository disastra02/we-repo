import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios';

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Custom css
import './assets/base.css';

// Setting default url axios
axios.defaults.baseURL = 'http://localhost:5000/api/v1';

createApp(App).mount('#app')
