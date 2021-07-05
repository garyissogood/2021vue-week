import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';

createApp({
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    login() {
      const api = 'https://vue3-course-api.hexschool.io/admin/signin';
      axios.post(api, this.user).then((res) => {
        if (res.data.success) {
          const { token, expired } = res.data;
          // 寫入 cookie token
          // expires 設置有效時間
          document.cookie = `token=${token};expires=${new Date(expired)};`;
          window.location = 'products.html';
        } else {
          alert(res.data.message);
        }
      }).catch((err) => {
        console.log(err);
      });
    },
  },
}).mount('#app');