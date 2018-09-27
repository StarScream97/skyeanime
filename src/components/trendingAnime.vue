<template>
  <div class="cover">
    <navBar></navBar>
     <div class="container">
        <form class="form">
            <input class=" mr-sm-2" v-model="animeName" type="search" placeholder="Search" aria-label="Search">
            <button class="button my-2 my-sm-0" @click.prevent="searchAnime" type="submit">Search</button>
        </form>
        <div class="spinner" v-if="!isLoaded">
          <div class="bounce1"></div>
            <div class="bounce2"></div>
            <div class="bounce3"></div>
        </div>
        <section class="results my-2" v-if="isLoaded">
            <div v-for="result in results" :key="result.index" class="result">
                <router-link :to="{ name: 'watchAnime', params: { slug: result.slug, episode:1 }}"><img v-if="result.poster.file" class="image" v-bind:src="'https://cdn.masterani.me/poster/' + result.poster.file" alt=""><img class="image" v-if="result.poster"  v-bind:src="'https://cdn.masterani.me/poster/' + result.poster" alt="">
                 <div class="details ml-2">
                    <h3 class="animeTitle">{{result.title}}</h3>
               </div>
               </router-link>
               
            </div>

        </section>
        
    </div>
      
  </div>
</template>

<script>
import navBar from "../components/navBar";
export default {
  data() {
    return {
      animeName: "",
      results: [],
      isLoaded: false
    };
  },
  components: {
    navBar
  },
  created() {
    console.log(process.env.ROOT_API);

    axios
      // .get(
      //   "https://cors-anywhere.herokuapp.com/masterani.me/api/anime/trending"
      // )

      .get(`${process.env.ROOT_API}trending`)
      .then(res => {
        this.results = res.data.popular_today;
        this.isLoaded = true;
      });
  },
  methods: {
    searchAnime: function() {
      this.results = [];
      this.isLoaded = false;
      // axios
      //   .get(
      //     `https://cors-anywhere.herokuapp.com/masterani.me/api/anime/search?search=${
      //       this.animeName
      //     }/detailed`
      //   )
      axios.get(`${process.env.ROOT_API}anime/${this.animeName}`).then(res => {
        this.results = res.data;
        this.isLoaded = true;
        // console.log(res);
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2,
h3,
h4,
h5 {
  font-family: "Lora";
  font-size: 1rem;
}

.results {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 1em;
}

.result {
  grid-column: span 3;
  transition: all 0.5s;
  position: relative;
  overflow: hidden;
  box-shadow: 3px 3px 5px rgb(146, 149, 150);
  transition: all 0.5s;
  position: relative;
}

.image:hover {
  transform: scale(1.05);
  transition: all 0.5s;
}

.details1 {
  /* position: absolute; */
  color: black;
}
.animeTitle {
  position: absolute;
  bottom: -8px;
  left: 0;
  background: white;
  padding: 3px 5px;
}

.image {
  width: 100%;
  max-height: 200px;
  transition: all 0.5s;
}
form {
  margin-top: 2em;
  width: 80%;
  margin-left: auto;
  text-align: right;
}
form input {
  width: 30%;
  padding: 4px 7px;
  border: 1px solid black;
  border-radius: 3px;
  color: black;
}
button {
  color: white !important;
  padding: 5px 8px;
  border-radius: 3px;
  border: 0;
  cursor: pointer;
  background: rgb(10, 10, 10);
  font-family: "Lora";
  box-shadow: 3px 3px 3px rgb(19, 18, 18);
  transition: all 0.5s;
}
button:hover {
  box-shadow: none;
  transition: all 0.5s;
}

.spinner {
  margin: 100px auto 0;
  width: 70px;
  text-align: center;
}

.spinner > div {
  width: 18px;
  height: 18px;
  background-color: black;

  border-radius: 100%;
  display: inline-block;
  -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  animation: sk-bouncedelay 1.4s infinite ease-in-out both;
}

.spinner .bounce1 {
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}

.spinner .bounce2 {
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}

@-webkit-keyframes sk-bouncedelay {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
  }
  40% {
    -webkit-transform: scale(1);
  }
}

@keyframes sk-bouncedelay {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  40% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}

@media only screen and (max-width: 600px) {
  form {
    width: 100%;
  }
  form input {
    width: 60%;
  }
  .result {
    grid-column: span 4;
  }
}
</style>
