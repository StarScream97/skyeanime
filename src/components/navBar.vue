
<template>
  <div class="bg">
    <div class="container">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <router-link to="/" class="navbar-brand">Skye</router-link>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon icon"></span>
          </button>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
          <div class="navbar-nav ml-auto">
          <li class="nav-item">
                  <router-link to="/trending" class="nav-link">Trending</router-link>
              </li>
              <li class="nav-item">
                  <router-link to="/recent" class="nav-link">Latest</router-link>
              </li>
              
          </div>
        </div>
      </nav>
    </div>      
    </div>
</template>

<script>
export default {
  data() {
    return {
      animeName: ""
    };
  },
  methods: {
    searchAnime() {
      if (this.animeName != "")
        this.$router.push({
          name: "searchAnime",
          params: { name: this.animeName }
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bg {
  background: #343a40;
}
.nav-link {
  transition: all 0.5s;
  color: white !important;
}
.nav-link:hover {
  text-decoration: none !important;
  font-size: 1.05rem;
  transition: all 0.5s;
  /* color: white !important; */
}

.navbar-brand {
  font-family: "Poppins";
  font-size: 1.4rem;
}
.navbar-brand:hover {
  text-decoration: none !important;
  color: white;
}
</style>

