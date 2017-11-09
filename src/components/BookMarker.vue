<template v:onload="fetchData">
    <div class="container">
        <div class="header clearfix">
            <h3 class="text-muted">Bookmarker</h3>
        </div>

        <div class="jumbotron">
            <h2>Bookmark Your Favorite Sites</h2>
            <form>
                <div class="form-group" @submit.prevent="validateBeforeSubmit">
                    <p :class="{ 'control': true }">
                        <label>Site Name</label>
                        <input v-model="book.siteName" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('book.siteName') }" name="Name" type="text" placeholder="Bookmark name">
                        <p><span v-show="errors.has('Name')" class="help is-danger">{{ errors.first('Name') }}</span></p>
                    </p>
                </div>
                <div class="form-group">
                    <p :class="{ 'control': true }">
                        <label>Site URL</label>
                        <input v-model="book.siteUrl" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('book.siteUrl') }" name="URL" type="text" placeholder="Bookmark URL">
                        <p><span v-show="errors.has('URL')" class="help is-danger">{{ errors.first('URL') }}</span></p>
                    </p>
                </div>
                <p class="control">
                <div class="btn btn-primary" type="submit" @click="validateBeforeSubmit">Submit</div>
            </form>
        </div>

        <div class="well" v-for="b in books" :key="b.key">
            <h3> {{ b.siteName}}
                <a class="btn btn-default" target="_blank" v-bind:href="b.siteUrl">Visit</a>
                <a class="btn btn-danger" @click="deleteData(b.key)">Delete </a>
            </h3>
        </div>

      
    </div>
</template>

<script src="https://vue-firebase-tutorial2.firebaseio.com/"></script>
<script>
    import Vue from 'vue';
    import VeeValidate from 'vee-validate';
    Vue.use(VeeValidate);
    export default {
        data() {
            return {
                email: '',
                book: {
                    siteName: '',
                    siteUrl: ''
                },
                books: []
            }
        },
        methods: {
            validateBeforeSubmit() {
                console.log(this.errors);
                this.$validator.validateAll();
                console.log('validating');
                if (!this.errors.any()) {
                    this.bookmarking();
                }
            },
            bookmarking() {
                this.$http.post('' + 'bookmarks.json', this.book)
                .then(response => {         
                    console.log(response);
                    this.fetchData();
                    this.book.siteName = ''
                    this.book.siteUrl = ''
                }, error => {               
                    console.log(error);
                });
            },
            fetchData() {
                this.$http.get('' + 'bookmarks.json')
                .then(response => {
                    return response.json();           
                })
                .then(data => {                     
                    const resultArray = [];
                    for (let key in data) {
                        var temp = new Object()
                        temp['key'] = key
                        temp['siteName'] = data[key].siteName
                        temp['siteUrl'] = data[key].siteUrl
                        resultArray.push(temp)
                    }
                    this.books = resultArray;        
                });     
            },
            deleteData(key){
                this.$http.delete('' + 'bookmarks/' + key + '.json')
                .then(response => {
                    this.fetchData();
                    return response;           
                },error => {               
                    console.log(error);
                })
                
            }
        },
        created() {
            this.fetchData();
        }
    }
</script>
