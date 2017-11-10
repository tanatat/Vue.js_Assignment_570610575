<template>
    <div class="container">
        <h2>User information:</h2>
        <div v-if="user.photoURL">
        <p>Profile Photo:</p>
        <img :src="user.photoURL" style="height: 120px">
        </div>
        <br>
        <p>ID: {{ user.userId }}</p>
        <p>Name: {{ user.name }}</p>
        <p>Birth Date: {{ user.birthdate }}</p>
        <p>Email: {{ user.email }}</p>
        <p>Website: {{ user.url }}</p>
        <p>Facebook: {{user.facebook }}</p>
        <p>Phone: {{ user.phone }}</p>
  </div>
</template>

<script>
export default {
  name: 'About',
  data() {
    return {
      user: {
        photoURL: '',
        userId: '',
        name: '',
        birthdate: '',
        email: '',
        url: '',
        facebook: '',
        phone: ''
      }
    };
  },
  mounted() {
    console.log("About page");
    console.log(this.$route.params.user);
    this.user = this.$route.params.user;
  }
};
</script>