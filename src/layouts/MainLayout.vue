<template>
  <q-layout view="hHh LpR fFf">
    <q-header bordered class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          {{ title }}
        </q-toolbar-title>
        <q-space></q-space>
        <selectedDevice />
        <q-toggle
          dark
          v-model="dark"
          @update:model-value="darkMode(dark)"
          color="dark"
          icon="dark_mode"
        ></q-toggle>
      </q-toolbar>

      <q-tabs align="center">
        <q-route-tab to="/Music" label="Music Library" />
        <q-route-tab to="/Sounds" label="Sounds Library" />
      </q-tabs>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <MusicPlayer />
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script lang="ts">
import { provide, ref } from 'vue';
import { useQuasar } from 'quasar';
import SelectedDevice from 'src/components/SelectDevice.vue';
import MusicPlayer from 'src/components/MusicPlayer.vue';

export interface HTMLMediaSink extends HTMLMediaElement {
  setSinkId(id: string): void;
}

export default {
  components: { SelectedDevice, MusicPlayer },
  setup() {
    const title = ref('aaaaaaa');
    const selectedDevice = ref('');
    const selectedSong = ref<{ _id: string; change: number }>({
      _id: '',
      change: 0,
    });
    provide('selectedDevice', selectedDevice);
    provide('selectSong', selectedSong);
    const leftDrawerOpen = ref(false);
    const dark = ref(true);
    const $q = useQuasar();
    $q.dark.set(dark.value);
    const darkMode = (dark: boolean) => {
      console.log(dark);
      $q.dark.set(dark);
    };

    return {
      dark,
      title,
      leftDrawerOpen,
      darkMode,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
};
</script>
