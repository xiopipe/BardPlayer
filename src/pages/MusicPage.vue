<template>
  <q-page padding>
    <div>
      <MusicCards />
    </div>
    <div class="row col-12 justify-center">
      <div>
        <q-file
          class="q-my-md"
          rounded
          standout
          multiple
          v-model="file"
          @update:model-value="upload()"
        >
        </q-file>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { inject, provide, ref } from 'vue-demi';
import { ORM } from 'src/stores/indexed';
import short from 'short-uuid';
import MusicCards from 'components/MusicCards.vue';

export interface HTMLMediaSink extends HTMLMediaElement {
  setSinkId(id: string): void;
}

export default {
  components: {
    MusicCards,
  },
  setup() {
    const selectedDevice = inject<{ value: string }>('selectedDevice');
    if (!selectedDevice) return;
    const audioSource = ref<HTMLMediaSink>();
    const db = new ORM();
    const file = ref<File[]>();
    const renderMusic = ref(0);
    provide('renderMusic', renderMusic);

    const upload = async () => {
      if (!file.value) return;
      for (let value of file.value.keys()) {
        await db.songs.add({
          _id: short.generate(),
          title: file.value[value].name,
          content: '',
          file: file.value[value],
          order: value,
          loop: true,
        });
      }
      renderMusic.value += 1;
    };

    return {
      file,
      audioSource,
      selectedDevice,
      upload,
    };
  },
};
</script>
