<template>
  <div v-bind:class="{ dark: isDark }">
    <navBar></navBar>
      <div class="container cover" >
        <div class="playerInfo d-flex justify-content-between flex-wrap pt-5">
            <div class="controls">
                <button class="button mr-1" v-on:click.prevent="playNext">Play Next</button>
                <button class="button" v-on:click.prevent="playPrevious">Play Previous</button>
                <button class="button" @click.prevent="turnDark">Toggle Dark Mode</button>
                <span class="ml-2 episode">Episode: {{episodeNumber}}</span>
            </div>
            <div class="links">
                <span>Quality</span>
                <select v-model="videoSource">
                    <option v-for="link in links" class="link" :key="link.index" :value="link">
                        {{ link.quality }}
                    </option>
                </select>
            </div>
        </div>
        <h3 v-if="error">Sorry, the anime does not seem to have this episode</h3>
        <div v-if="!videoLoaded" class="spinner">
            <div class="bounce1"></div>
            <div class="bounce2"></div>
            <div class="bounce3"></div>
        </div>
        
        <iframe v-if="videoLoaded" class="videoPlayer p-1" :src="this.videoSource.link"  frameborder="0" scrolling="no" allowfullscreen="allowfullscreen">
        </iframe>
    </div>
    </div>
</template>

<script>
import navBar from "../components/navBar";

export default {
  data() {
    return {
      videoDiv: document.createElement("div"),
      mirrors: [],
      links: [],
      videoSource: "",
      episodeNumber: this.$route.params.episode,
      videoLoaded: false,
      error: true,
      isDark: false
    };
  },
  components: {
    navBar
  },
  methods: {
    fetchEpisode: function() {
      this.error = false;
      let anime_url = `${process.env.ROOT_API}anime/watch/${
        this.$route.params.slug
      }/${this.episodeNumber}`;
      axios
        .get(anime_url)
        .then(res => {
          this.videoDiv.innerHTML = res.data;
          this.mirrors = this.videoDiv.querySelector("video-mirrors");

          this.links = JSON.parse(this.mirrors.getAttribute(":mirrors")).map(
            mirror => ({
              quality: mirror.quality,
              id: mirror.id,
              type: mirror.type === 1 ? "sub" : "dub",
              name: mirror.host.name,
              link: `${mirror.host.embed_prefix}${mirror.embed_id}${
                mirror.host.embed_suffix
              }`
            })
          );
          this.videoSource = this.links[0];
          this.videoLoaded = true;
        })
        .catch(err => {
          this.error = true;
        });
    },
    turnDark: function() {
      this.isDark = !this.isDark;
    },
    playNext: function() {
      this.error = false;
      this.episodeNumber++;
      this.$router
        .push({
          name: "watchAnime",
          params: { slug: this.$route.params.slug, episode: this.episodeNumber }
        })
        .catch(err => {
          this.error = true;
        });
    },
    playPrevious: function() {
      this.error = false;
      this.episodeNumber--;
      if (this.episodeNumber == 0) this.episodeNumber = 1;
      this.$router
        .push({
          name: "watchAnime",
          params: { slug: this.$route.params.slug, episode: this.episodeNumber }
        })
        .catch(err => {
          this.error = true;
        });
    }
  },
  watch: {
    episodeNumber: {
      handler: "fetchEpisode",
      immediate: true
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cover {
  /* margin-top: 20vh; */
  height: 100vh;
}
.dark {
  background: black;
  /* color: white; */
}
.links span,
.episode {
  color: rgb(98, 100, 99);
}
.link {
  color: black !important;
}
.videoPlayer {
  width: 100%;
  height: 500px;
  margin-top: 5px;
}
h3 {
  font-family: "Poppins";
  font-size: 1.4rem;
  text-align: center;
  margin-top: 3em;
  margin-bottom: -3em;
}
.button {
  background: #343a40;
  color: white;
  border: 0;
  padding: 4px 5px;
  border-radius: 3px;
  box-shadow: 2px 2px 2px rgb(16, 17, 17);
  transition: all 0.8s;
}

.button:hover {
  box-shadow: none;
  transition: all 0.4s;
  cursor: pointer;
}

/*Spinner*/
.spinner {
  margin: 100px auto 0;
  width: 70px;
  text-align: center;
}

.spinner > div {
  width: 18px;
  height: 18px;
  background-color: rgb(241, 235, 235);

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

@media only screen and (max-width: 700px) {
  .playerInfo {
    position: relative;
  }
  .controls {
    text-align: center;
    margin: 2em 0;
  }
  .links {
    /* display: block; */
    position: absolute;
    top: 7.5em;
    left: 0;
    /* text-align: center; */
    /* display: none; */
  }
}
@media only screen and (max-width: 800px) {
  .cover {
    height: 110vh;
  }
}
</style>
