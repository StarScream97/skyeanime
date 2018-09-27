<template>
  <div class="cover">
    <navBar></navBar>
     <div class="container my-2">
      <form class="form">
            <input class=" mr-sm-2" v-model="animeName" type="search" placeholder="Search" aria-label="Search">
            <button class="button my-2 my-sm-0" @click.prevent="searchAnime" type="submit">Search</button>
        </form>   
        <div class="spinner" v-if="!isLoaded">
          <div class="bounce1"></div>
            <div class="bounce2"></div>
            <div class="bounce3"></div>
        </div>
        <section class="recents my-2" v-if="!isSearch">
          <div v-for="recent in recents" :key="recent.index" class="recent">
            <router-link :to="{ name: 'watchAnime', params: { slug: recent.anime.slug, episode:1 }}"><img  v-bind:src="'https://cdn.masterani.me/wallpaper/2/' + recent.anime.wallpaper" v-if="recent.anime.wallpaper" alt="" class="w-100 image">
            <img  v-bind:src="'https://cdn.masterani.me/poster/' + recent.anime.poster" v-else alt="" class="w-100 image">

              <div class="details1">
                    <h3 class="animeTitle">{{recent.anime.title}}</h3>
                    <p class="episodeNumber">Episode{{recent.episode}}</p>
               </div>
            </router-link>
                
          </div>
        </section>
        <section class="recents my-2" v-if="isSearch">
          <div v-for="result in results" :key="result.index" class="recent">
            <router-link :to="{ name: 'watchAnime', params: { slug: result.slug, episode:1 }}"><img  v-bind:src="'https://cdn.masterani.me/poster/' + result.poster.file"  alt="" class="w-100 image">
            <!-- <img  v-bind:src="'https://cdn.masterani.me/poster/' + result.anime.poster" v-else alt="" class="w-100 image"> -->

              <div class="details1">
                    <h3 class="animeTitle">{{result.title}}</h3>
                    <!-- <p class="episodeNumber">Episode{{result.episode}}</p> -->
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
      recents: [],
      results: [],
      isSearch: false,
      isLoaded: false
    };
  },
  components: {
    navBar
  },
  methods: {
    searchAnime: function() {
      this.isLoaded = false;
      this.results = [];
      this.recents = [];
      axios
        .get(
          `${process.env.ROOT_API}
anime/${this.animeName}`
        )
        .then(res => {
          this.results = res.data;
          // console.log(res.data);
          this.isSearch = true;
          this.isLoaded = true;
        });
    }
  },
  created() {
    axios
      .get(
        `${process.env.ROOT_API}
recent`
      )
      .then(res => {
        this.recents = res.data;
        this.isSearch = false;
        this.isLoaded = true;
        //   console.log(res.data);
      });
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
.recents,
.results {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 2em;
}
.recent,
.result {
  grid-column: span 4;
  transition: all 0.5s;
  position: relative;
  overflow: hidden;
  box-shadow: 3px 3px 5px rgb(6, 12, 19);
  transition: all 0.5s;
}

.image {
  width: 100%;
  height: 100%;
}
.image:hover {
  transform: scale(1.05);
  transition: all 0.5s;
}
.recent:hover {
  box-shadow: none;
}

.details1 {
  /* position: absolute; */
  color: black;
}
.animeTitle {
  position: absolute;
  bottom: -8px;
  /* left: 5px; */
  background: white;
  padding: 3px 5px;
}

.episodeNumber {
  position: absolute;
  top: 0;
  right: 0;
  color: white;
  background: rgb(112, 107, 107);
  padding: 3px 5px;
  border-radius: 3px;
}
.image {
  width: 100%;
  max-height: 200px;
  transition: all 0.5s;
}

form {
  margin: 1em 0;
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

@media only screen and (max-width: 800px) {
  form {
    width: 100%;
  }
  form input {
    width: 60%;
  }
  .recent {
    grid-column: span 6;
  }
  .image {
    height: 300px;
  }
}
</style>
