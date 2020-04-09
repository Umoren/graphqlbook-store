<template name="default-layout">
  <div class="bg-dark app">
    <section class="row overlay">
      <div class="container-fluid">
        <div class="header text-center mb-3">
          <h2 class="text-uppercase"> My Books Store </h2>
          <h4> Record of all the books i've read</h4>
        </div>

      
            
        <transition name="movieUp">
              <router-view />
          </transition>         
        <div >
          
          
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script>
import Footer from './_partials/footer';
export default {
  components : {
    Footer
  }
}
</script>

<style >
   @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,300;1,400&display=swap');


    .app{
      font-family: 'Nunito Sans', sans-serif;
      
      background: #121212;
      min-height: 100vh;
      overflow-x: hidden;
      margin: 0 auto;
      padding: 0 auto;
    }

    .overlay{
      margin: 30px;
      background: rgb(20, 20, 20);
      /* width: 100%; */
      padding: 1em;
      border-radius: 10px;
      color: rgba(248, 248, 248, 0.8);
      text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    }

</style>