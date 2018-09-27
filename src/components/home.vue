<template>
  <div class="cover">
    <navBar></navBar>
     <div class="showcaseTexts container">
         <h1>Skye Anime</h1>
         <p>The ultimate place for HD Subbed and Dubbed Anime.</p>
         
         <p class="mt-2 project">A project by <a href="http://manishkarki.com.np" target="_blank">Manish Karki</a> </p>
         <div class="links d-flex">
             <div class="link mr-2">
                   <a href="https://github.com/StarScream97" target="_blank"><i class="fab fa-github"></i></a>
             </div>
             <div class="link">
                <a href="http://facebook.com/97starscream" target="_blank"> <i class="fab fa-facebook"></i></a>
             </div>
         </div>
         
     </div>
      
  </div>
</template>

<script>
import navBar from "../components/navBar";
export default {
  data() {
    return {};
  },
  components: {
    navBar
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-family: "Poppins";
}
p {
  font-family: "Lora";
}

.showcaseTexts {
  color: white;
  width: 70%;
  margin: 10em auto;
}
a {
  color: rgb(255, 255, 255);
}
a:hover {
  text-decoration: none;
  color: rgb(218, 214, 214);
}
.cover {
  background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)),
    url("http://getwallpapers.com/wallpaper/full/8/2/9/652853.jpg");
  background-position: center;
  background-size: cover;
  height: 100vh;
}

@media only screen and (max-width: 800px) {
  .cover {
    background-position: left top;
  }
}
</style>
