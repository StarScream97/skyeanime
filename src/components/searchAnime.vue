<template>
  <div class="cover">
    <navBar></navBar>
     <div class="container">
       
        
        <section class="recents my-2">
            <div v-for="recent in recents" :key="recent.index" class="recent">
                <router-link :to="{ name: 'watchAnime', params: { slug: recent.slug, episode:1 }}"><img class="image" v-bind:src="'https://cdn.masterani.me/poster/' + recent.poster.file" alt="">
                 <div class="details1 ml-2">
                    <h3>{{recent.title}}</h3>
                    <p>{{recent.started_airing_date}}</p>
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
      animeName: this.$route.params.name,
      recents: []
    };
  },
  components: {
    navBar
  },
  methods: {
    // searchAnime: function() {
    //   this.recents = [];
    //   axios
    //     .get(
    //       `https://www.masterani.me/api/anime/search?search=${
    //         this.animeName
    //       }/detailed`
    //     )
    //     .then(res => {
    //       this.recents = res.data;
    //       console.log(res.data);
    //     });
    // }
    setName: function() {
      this.animeName = this.$route.params.name;
    }
  },
  created() {
    this.results = [];
    axios
      .get(`${process.env.ROOT_API}anime/${this.$route.params.name}`)
      .then(res => {
        this.recents = res.data;
        // console.log(res.data);
      });
  },
  watch: {
    $route: {
      handler: "setName",
      immediate: true
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
.recents {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 1em 2em;
}
.recent {
  grid-column: span 4;
  transition: all 0.5s;
  position: relative;
  overflow: hidden;
  box-shadow: 3px 3px 5px rgb(146, 149, 150);
  transition: all 0.5s;
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
  width: 90%;
  max-height: 200px;
  transition: all 0.5s;
}

@media only screen and (max-width: 800px) {
}
</style>
