<template>
  <div>
    <h3>Hello From YT</h3>
    <h4>{{currentVideo}}</h4>
    <div v-if="videoSrc" style="--aspect-ratio: 16/9;">
      <iframe :src=videoSrc width="800" height="450"></iframe>
    </div>
    <input v-on:keyup.enter="searchAPI()" v-model.trim="params.q" placeholder="edit me">
    <button @click="searchAPI()">search</button>
    <ul id="search-list-result">
      <li v-for="item in info.data.items" :key="item.etag">
        <div v-if="item.id.videoId && !item.id.channelId">
          <img :src=item.snippet.thumbnails.high.url @click="loadVideo(item.id.videoId)"/>
          <span v-html='item.snippet.title'></span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
    export default {
      data: ()=>({
        info: {
          data: {
            items: null
          }
        },
        params: {
          part: 'snippet',
          maxResults: 40,
          q: 'marvel',
          key: process.env.VUE_APP_API,
        },
        videoSrc: null,
        currentVideo: null
      }),
      methods: {
        searchAPI() {
          localStorage.q = this.params.q;
          const qs = new URLSearchParams(this.params).toString();
          this.$http
            .get('https://www.googleapis.com/youtube/v3/search?'+qs+'&type=video')
            .then(response => (this.info = response))
            .catch(error => console.dir(error.response.data.error.message))
        },
        loadVideo(videoId) {
          if (videoId) {
            this.$http
            .get('//localhost:3000/video/'+videoId)
            .then(
              response => (
                this.videoSrc = response.data.formats[0].url,
                this.currentVideo = response.data.videoDetails.title
              ),
              window.scrollTo({ top: 0, behavior: 'smooth'})
            )
            .catch(error => console.dir(error))
          }
        }
      },
      mounted () {
        if (localStorage.q) {
          this.params.q = localStorage.q;
        }
      },
    }
</script>

<style scoped>
  input {
    margin:20px 5px 0px;
    padding:5px;
  }
  button {
    border-radius: 0;
    padding:5px;
    border: 1px white solid;
    cursor: pointer;
  }
  iframe {
    display: block;
    margin: 0 auto;
  }
  span {
    display: block;
  }
  ul {
    margin:30px 0;
    padding:0;
    display: flex;
    flex-wrap: wrap;
  }
  ul li:nth-child(4n+0) {
    padding-right: 0;
  }
  ul li {
    list-style: none;
    width: calc( 25% - 7.5px );
    padding-right: 10px;
    height: auto;
  }
  ul li img {
   max-width: 100%;
   cursor: pointer;
  }
  [style*="--aspect-ratio"] > :first-child {
    width: 100%;
    border: 1px darkslategrey solid;
  }
  [style*="--aspect-ratio"] > img {  
    height: auto;
  }
  @supports (--custom:property) {
    [style*="--aspect-ratio"] {
      position: relative;
    }
    [style*="--aspect-ratio"]::before {
      content: "";
      display: block;
      padding-bottom: calc(100% / (var(--aspect-ratio)));
    }
    [style*="--aspect-ratio"] > :first-child {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
    }
  }
  @media screen and (max-width: 780px) {
  ul li {
    width: calc( 50% - 15px );
    padding-right: 20px;
  }
  ul li:nth-child(2n+0) {
    padding-right: 0;
  }

}
</style>