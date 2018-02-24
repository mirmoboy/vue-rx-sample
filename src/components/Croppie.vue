<template lang='pug'>
    .container
        div
            label Choose image 
            input(type='file', @change='onFileChange')
        div
            img(ref='croppieContainer', :src='selectedImage')
        div
            p {{ selectedImage }}
            button(@click='onCrop') Upload
        div
            //- img(:src='image')
</template>

<script>
import "croppie";
import "croppie/croppie.css";
import { setTimeout } from 'timers';

export default {
  mounted() {
    this.initCroppie();
  },
  data() {
    return {
      croppie: null,
      selectedImage: "https://i0.wp.com/lovecuteanimals.objects.cdn.dream.io/wp-content/uploads/2016/01/Cute-Netherland-Dwarf-Rabbit.jpg",
      image: '',
      file: null
    };
  },
  methods: {
    initCroppie() {
      let el = this.$refs.croppieContainer;

      el.addEventListener("update", ev => {
        this.$emit("update", ev.detail);
      });
      this.croppie = new Croppie(el, {
        viewport: { width: 300, height: 300 },
        boundary: { width: 400, height: 400 },
        showZoomer: true
      });
      console.log('initCroppie')
    },
    destroyCroppie() {
      this.croppie.destroy();
    },
    onCrop() {
      const self = this;
      let options = {
        format: "blob",
        quality: 1,
        circle: false
      };
      this.croppie.result(options).then(function(blob, qwe) {
        console.log("onCrop");
        self.image = blob;
      });
    },
    onFileChange(e) {
      const self = this;
      self.destroyCroppie();
      self.selectedImage = "https://beebom-redkapmedia.netdna-ssl.com/wp-content/uploads/2016/01/Reverse-Image-Search-Engines-Apps-And-Its-Uses-2016.jpg";
      setTimeout( () => {
          self.initCroppie();
      }, 500)

      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },
    createImage(file) {
      var image = new Image();
      var reader = new FileReader();
      var self = this;
      console.log(file)
      self.file = file

      reader.onload = e => {
        self.image = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
};
</script>
