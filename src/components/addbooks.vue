<template name="addbooks">
    <div class="form_input mx-auto col-md-6">
        <form class="form-group" @submit.prevent>
            <div class="mb-3">
                <label for="title"> Book Title</label>
                <input 
                    type="text" 
                    class="form-control" 
                    placeholder="Book Title"
                    v-model="newTitle"
                />
            </div>

            <div class="mb-3">
                <label for="title"> Author: </label>
                <input 
                    type="text" 
                    class="form-control" 
                    placeholder="Who wrote this book"
                    v-model="newAuthor"
                />
            </div>
       
            <div>
                <label for="description"> Book Description</label>
                <textarea    type="text"
                          class="form-control"
                          placeholder="Book description"
                          v-model="newDesc" />
               
            </div>

            <button class="btn btn-primary mt-2" @click="addBook"  > Add Book</button>
        </form>
    </div>
</template>

<script>

    import gql from "graphql-tag";
    import { ALL_BOOKS } from './allbooks.vue';

     const ADD_BOOKS = gql`
        mutation ($title: String!, $description: String!, $written_by: String!) {
        insert_books(objects: {title: $title, description: $description, written_by: $written_by}) {
            affected_rows
            returning {
                id
                title
                description
                created_at
                written_by
            }
        }

    }`;

   

    export default {
    
        data() {
            return {
                newTitle: '',
                newDesc: '',
                newAuthor: ''
            }
        },
        methods:{
            async addBook() {
                // const { newTitle, newDesc } = this.$data;
                const title = this.newTitle && this.newTitle.trim();
                const description= this.newDesc && this.newDesc.trim() ;
                const written_by = this.newAuthor && this.newAuthor.trim() ;
                await this.$apollo.mutate({
                    mutation: ADD_BOOKS,
                    variables: {    
                        description,
                        title,
                        written_by
                    },
                    update: (cache, { data: { insert_books}}) => {
                        // Read data from cache for this query

                        try {
                            const insertedBook = insert_books.returning;
                            console.log(insertedBook)
                            cache.writeQuery({
                                query: ALL_BOOKS
                            })
                        }
                        catch (err) {
                            console.error(err)
                        }

                    }
                }).then(() => {
                    this.$router.push({path: '/'})
                }).catch(err => console.log(err));

                this.newTitle = '';
                this.newDesc = '';
                this.newAuthor = '';
            },

        
        }
    }
</script>

<style scoped>
    .form-group{
    
      margin: 10px;
      background: rgb(35, 35, 35);
      
      padding: 1em;
      border-radius: 10px;
      color: rgba(248, 248, 248, 0.8);
      text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    
    }
</style>