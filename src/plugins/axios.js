"use strict";

import Vue from 'vue';
import axios from "axios";
import ls from "./localStorage.js";
import { Message } from 'element-ui';

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
    baseURL: process.env.VUE_APP_API_BASE_URL || "",
    timeout: 60 * 1000, // Timeout
    // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
    function(config) {
        // Do something before request is sent
        const token = ls.exists('tokenInfo') && ls.get('tokenInfo').token || ''

        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config;
    },
    function(error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
_axios.interceptors.response.use(
    function(response) {
        // Do something with response data
        if (response.headers.Authorization) {
            ls.set('Authorization', response.headers.Authorization)
        }
        // Do something with response data
        if (response.data.success) {
            return response.data.data;
        } else {
            Message.error(response.data.message);
        }
    },
    function(error) {
        // Do something with response error
        return Promise.reject(error);
    }
);

Plugin.install = function(Vue, options) {
    Vue.axios = _axios;
    window.axios = _axios;
    Object.defineProperties(Vue.prototype, {
        $http: {
            get() {
                return _axios;
            }
        }
    });
};

Vue.use(Plugin)

export default Plugin;