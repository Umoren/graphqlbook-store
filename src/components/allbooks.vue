<template name="all-books" :key="componentKey">
    <div class="allBooks">
        <div class="text-center">
            <router-link to="/addbook" class="btn btn-outline-danger text-white  mb-3 " > Add New Book  </router-link>
        </div>
        <ApolloQuery 
            :query=" gql => gql`
            query allBooks{
                books{
                id
                title
                description
                created_at
                written_by
                
                }
            }
            `"
            :variables="{
                limit: $options.pageSize
            }"
            >
          
            <template v-slot="{ result: { loading, error, data } }">
                <div v-if="loading" class="loading apollo"> Loading ...</div>

                <div v-else-if="error"> Oh Yikes :) </div>

                
                <div v-if="data" >
                
                    <div class="row"  > 
                        <div v-for="book in data.books" class="col-md-4 col-sm-12 col-lg-4 col-xl-4 " :key="book.id"> 
                            <div class="card shadow-lg  bg-danger mb-3">
                                <div class="card-body ">
                                    
                                    <h5 class="card-title" >{{book.title}}</h5>
                                    <div class=" justify-content-between">
                                        <p class="small "> written by: {{book.written_by}}</p>
                                        <p class="small "> {{book.created_at}}</p>
                                    </div>
                                        <p class="card-text"> {{book.description }} </p>
                                
                                    <div class="text-right"> 
                                        <button class="btn btn-sm btn-dark" @click="removeBook(book)"> delete book</button>
                                </div>
                            </div>
                            
                            <!-- <small> {{book.is_completed}}</small> -->


                            </div>
                        </div>
                    </div>
                    
                </div>    

                <div v-else class="no-result apollo text-center"> <h2>Nothing dey here </h2></div>   
            </template>
        </ApolloQuery>
    </div>
</template>

<script>
import gql from 'graphql-tag';

const REMOVE_BOOK = gql `
  mutation delete_books($id: Int!){
  delete_books(where: {id: {_eq: $id}}){
    affected_rows
  }
}
  
`;

export const ALL_BOOKS = gql `
    query allBooks{
        books {
            id
            title
            description
            is_completed
            author{
            id
            name
            }
        }
}`;


export default {
  name: 'AllBooks',

  mounted(){
      this.forceRerender();
  },

  data(){
      return{
          componentKey: 0
      }
  },
  methods: {
 
   async removeBook(book){
    await this.$apollo.mutate({
        mutation: REMOVE_BOOK,
        variables: {
          id: book.id
        },
        refetchQueries: [
          {
            query: ALL_BOOKS
          }       
          
        ]
      })
    },

    forceRerender() {
      this.componentKey += 1;  
    }
  }
 
}
</script>

<style scoped>
    .allBooks{
        margin-top: 2em;
    }
</style>