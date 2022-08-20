<template>
  <div class="row justify-center">
    <audio
      ref="audioSource"
      v-on:pause="musicStop()"
      v-on:play="musicPlay()"
      src=""
    ></audio>
    <div class="row justify-center col-12">
      <q-icon
        v-if="!play"
        @click="currentPlay()"
        class="cursor-pointer"
        size="40px"
        name="play_circle"
      ></q-icon>
      <q-icon
        v-if="play"
        @click="stopIt()"
        class="cursor-pointer"
        size="40px"
        name="pause_circle"
      ></q-icon>
    </div>
    <div class="col-8">
      <q-slider
        :min="0"
        :max="100"
        v-model="playerSlide"
        @update:model-value="changeBar"
      >
      </q-slider>
    </div>
  </div>
</template>

<script lang="ts">
import { inject, onMounted, ref, watch } from 'vue-demi';
import { ORM } from 'src/stores/indexed';
import Songs from 'src/stores/indexed/songs';

export interface HTMLMediaSink extends HTMLMediaElement {
  setSinkId(id: string): void;
}
export default {
  setup() {
    const audioSource = ref<HTMLMediaSink>();
    const play = ref(false);
    const playerSlide = ref<number>();
    const duration = ref<number>();
    const current = ref<number>();
    const db = new ORM();
    const selectedDevice = inject<{ value: string }>('selectedDevice');
    const selectSong = inject<{ value: { _id: string; change: number } }>(
      'selectSong'
    );
    if (!selectedDevice) return;
    if (selectSong === undefined) return;
    const currentPlay = () => {
      if (!audioSource.value) return;
      audioSource.value.currentTime = current.value || 0;
    };
    const playIt = async () => {
      const song = await db.songs.get(selectSong.value._id);
      if (song?.file != undefined) {
        const file = song.file;
        if (!file) return;
        if (!audioSource.value) return;
        audioSource.value.src = URL.createObjectURL(file);
        audioSource.value.setSinkId(selectedDevice.value);
        audioSource.value.loop = true;
        audioSource.value?.play();
      } else {
        const songs = new Songs();
        const song = await songs.data.toArray();
        if (!audioSource.value) return;
        if (!song[0].file) return;
        audioSource.value.src = URL.createObjectURL(song[0].file);
        audioSource.value.setSinkId(selectedDevice.value);
        audioSource.value.loop = true;
        audioSource.value?.play();
      }
    };

    const stopIt = () => {
      audioSource.value?.pause();
    };

    const musicStop = () => {
      play.value = false;
    };
    const musicPlay = () => {
      play.value = true;
    };
    const changeBar = async () => {
      if (!audioSource.value) return;
      if (!playerSlide.value) return;
      audioSource.value.currentTime = Number(
        ((playerSlide.value * audioSource.value.duration) / 100).toFixed(2)
      );
    };

    onMounted(() => {
      audioSource.value?.addEventListener('timeupdate', () => {
        if (!audioSource.value) return;
        if (!audioSource.value?.duration) return;
        playerSlide.value = Number(
          (
            (audioSource.value?.currentTime / audioSource.value?.duration) *
            100
          ).toFixed(2)
        );
        current.value = audioSource.value?.currentTime;
      });
    });
    watch(selectSong.value, async () => {
      void playIt();
      play.value = !play.value;
    });
    watch(selectedDevice, () => {
      if (!audioSource.value) return;
      audioSource.value.setSinkId(selectedDevice.value);
    });
    const test = () => {
      console.log('entro');
    };
    return {
      audioSource,
      play,
      playerSlide,
      duration,
      changeBar,
      playIt,
      currentPlay,
      stopIt,
      musicStop,
      musicPlay,
      test,
    };
  },
};
</script>
