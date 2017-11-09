<template>
  <div class="sign-up-validate">
      <form @submit.prevent="validateBeforeSubmit">
        <p>Let's create a new account!</p>

        <p :class="{ 'control': true }">
            <input v-model="user.name" v-validate="'required|name'" :class="{'input': true, 'is-danger': errors.has('user.name') }" name="Name" type="text" placeholder="Full Name"><br>
            <p><span v-show="errors.has('Name')" class="help is-danger">{{ errors.first('Name') }}</span></p>
        </p>

        <p :class="{ 'control': true }">
            <input v-model="user.birthdate" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('user.birthdate') }" name="Birthdate" type="date" placeholder="Birthdate">
            <p><span v-show="errors.has('Birthdate')" class="help is-danger">{{ errors.first('Birthdate') }}</span></p>
        </p>

        <p :class="{ 'control': true }">
            <input v-model="user.email" v-validate="'required|email'" :class="{'input': true, 'is-danger': errors.has('user.email') }" name="Email" type="text" placeholder="Email">
            <p><span v-show="errors.has('Email')" class="help is-danger">{{ errors.first('Email') }}</span></p>
        </p>

        <p :class="{ 'control': true }">
            <input v-model="user.password1" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('user.password1') }" name="Password" type="password" placeholder="Password">
            <p><span v-show="errors.has('Password')" class="help is-danger">{{ errors.first('Password') }}</span></p>
        </p>

        <p :class="{ 'control': true }">
            <input v-model="user.password2" v-validate="'required|confirmed:Password'" :class="{'input': true, 'is-danger': errors.has('user.password2') }" name="Confirm Password" type="password" placeholder="Confirm Password">
            <p><span v-show="errors.has('Confirm Password')" class="help is-danger">{{ errors.first('Confirm Password') }}</span></p>
        </p>

        <p :class="{ 'control': true }">
            <input v-model="user.facebook" v-validate="'required|regex:^(https:\/\/www\.facebook.com\/)?([^:\/\n]+)'" :class="{'input': true, 'is-danger': errors.has('user.facebook') }" name="Facebook" type="text" placeholder="Facebook">
            <p><span v-show="errors.has('Facebook')" class="help is-danger">{{ errors.first('Facebook') }}</span></p>
        </p>

        <p :class="{ 'control': true }">
            <input v-model="user.website" v-validate="'regex:^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n]+)'" :class="{'input': true, 'is-danger': errors.has('user.website') }" name="Facebook" type="text" placeholder="Website">
            <p><span v-show="errors.has('Website')" class="help is-danger">{{ errors.first('Website') }}</span></p>
        </p>

        <input type="text" v-model="user.phone" placeholder="Phone number"><br>
        <button  @click="signup">Sign Up</button>



        <!-- <p>Let's create a new account!</p>
        
        <div class="form-group" :class="{'has-error': errors.has('user.name') }">
        <input type="text" ref="name" v-model="user.name" v-validate.initial="user.name" data-rules="required|alpha|min:5" placeholder="Full Name"><br>
        <p class="text-danger" v-if="errors.has('user.name')">{{ errors.first('user.name') }}</p>
        </div>

        <div class="form-group" :class="{'has-error': errors.has('user.birthdate') }">
        <input type="date" ref="birthdate" v-model="user.birthdate" v-validate.initial="user.birthdate" data-rules="required|alpha|min:5" placeholder="Birthdate"><br>
        <p class="text-danger" v-if="errors.has('user.birthdate')">{{ errors.first('user.birthdate') }}</p>
        </div>

        <div class="form-group" :class="{'has-error': errors.has('user.email') }">
        <input type="email" ref="email" v-model="user.email" v-validate.initial="user.email" data-rules="required|email" placeholder="Email"><br>
        <p class="text-danger" v-if="errors.has('user.email')">{{ errors.first('user.email') }}</p>
        </div>

        <input type="password" v-model="user.password1" placeholder="Password"><br>
        
        <input type="password" ref="password2" v-model="user.password2" placeholder="Confirm password"><br>
        
        <div class="form-group" :class="{'has-error': errors.has('user.website') }">
        <input type="text" ref="url" v-model="user.website" v-validate.initial="user.website" data-rules="required|url" placeholder="Website"><br>
        <p class="text-danger" v-if="errors.has('user.website')">{{ errors.first('user.website') }}</p>
        </div>

        <div class="form-group" :class="{'has-error': errors.has('user.facebook') }">
        <input type="text" ref="url" v-model="user.facebook" v-validate.initial="user.facebook" data-rules="required|url" placeholder="Facebook"><br>
        <p class="text-danger" v-if="errors.has('user.facebook')">{{ errors.first('user.facebook') }}</p>
        </div>

        <input type="text" v-model="user.phone" placeholder="Phone number"><br>

        <button  @click="signup">Sign Up</button> -->
      </form>
      <span>or go back to <router-link to="/login">login</router-link>.</span>
  </div>
</template>

<script>
import firebase from 'firebase';
import Vue from 'vue';
import VeeValidate from 'vee-validate';

Vue.use(VeeValidate);

VeeValidate.Validator.extend('passphrase', {
    getMessage: field => 'Sorry dude, wrong pass phrase.',
    validate: value => value.toUpperCase() == 'Demogorgon'.toUpperCase()
});

export default {
  name: 'signUpValidate',
  data() {
      return {
          user: {
              name: '',
              birthdate: '',
              email: '',
              password1: '',
              password2: '',
              website: '',
              facebook: '',
              phone: ''
          }
      }
  },
  methods: {
      validateBeforeSubmit() {
          this.$validator.validateAll();
          console.log(this.errors)
          if (!this.errors.any()) {
              this.signup();
          }
      },
      signup() {
            firebase.auth().createUserWithEmailAndPassword(this.user.email, this.user.password1).then( 
                user => {
                    alert('Your accound has been created!');
                    this.$router.push({ name: 'Hello'});
                }, 
                error => {
                    var errorCode = error.code;
                    var errorMsg = error.message;
                    if (errorCode == 'auth/weak-password') {
                        alert('The password is too week');
                    } else {
                        alert('Oops.' + errorMsg);
                    }
                }
            );
        }
    }
}
</script>

<style scoped>
    .signUp {
        margin-top: 40px;
    }
    input {
        margin: 5px 0;
        width: 40%;
        padding: 15px;
    }
    button {
        margin-top: 10px;
        width: 10%;
        cursor: pointer;
    }
    span {
        display: block;
        margin-top: 20px;
        font-size: 11px;
    }

</style>

