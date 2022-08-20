<template>
  <audio ref="hola" src=""></audio>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const hola = ref();
const test = async () => {
  var aCtx;
  var microphone;

  navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
    aCtx = new AudioContext();
    microphone = aCtx.createMediaStreamSource(stream);
    var destination = aCtx.destination;
    microphone.connect(destination);
  });
};

void test();
</script>
