<template>
  <div class="col-md-2 col-sm-4 q-pa-md">
    <q-card>
      <q-menu context-menu>
        <div>
          <q-list>
            <q-item @click="dialogEditCard()" clickable v-ripple v-close-popup>
              <q-item-section avatar>
                <q-icon name="tune"> </q-icon>
              </q-item-section>
              <q-item-section> Edit </q-item-section>
            </q-item>
            <q-item clickable v-ripple v-close-popup>
              <q-item-section avatar>
                <q-icon name="image"></q-icon>
              </q-item-section>
              <q-item-section> Upload Image </q-item-section>
            </q-item>
          </q-list>
        </div>
      </q-menu>
      <q-img
        @click="changeSong(Props._id)"
        class="darkent cursor-pointer"
        style="height: 100px; width: 100%"
        :style="`background-image:linear-gradient(0deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.3)), url(${
          urlImage || 'https://picsum.photos/id/160/200/100'
        })`"
      >
        <q-icon class="iconPlay" size="40px" name="play_circle"> </q-icon>
      </q-img>
      <q-input
        v-on:dblclick="dobleclick"
        text
        dense
        borderless
        :readonly="disable"
        v-model="title"
        class="q-pa-sm"
        autogrow
      >
      </q-input>
    </q-card>
  </div>
</template>

<style lang="scss">
.darkent {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
</style>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import Songs from 'src/stores/indexed/songs';
import { inject, ref, watch } from 'vue-demi';
import DialogEdit from './DialogEdit.vue';
const emit = defineEmits(['EditUpdate']);
const $q = useQuasar();
const OSong = new Songs();
const title = ref();
const urlImage = ref();
const disable = ref(true);
const selectSong = inject<{
  value: { _id: string | undefined; change: number };
}>('selectSong');
const Props = defineProps({
  title: String,
  _id: String,
  img: File,
  loop: Boolean,
  fadeOut: Number,
  fadeIn: Number,
});

const props = ref(Props);
title.value = props.value.title;
if (!!Props.img) {
  console.log('entro');
  urlImage.value = URL.createObjectURL(Props.img);
}
const changeSong = (_id: string | undefined) => {
  if (selectSong?.value === undefined) return;
  selectSong.value._id = _id;
  selectSong.value.change += 1;
};
const dobleclick = () => {
  disable.value = false;
};

const dialogEditCard = () => {
  $q.dialog({
    component: DialogEdit,
    componentProps: {
      name: Props.title,
      loop: Props.loop,
      img: Props.img,
      fadeOut: Props.fadeOut,
      fadeIn: Props.fadeIn,
    },
  }).onOk(async (element) => {
    console.log(element);
    await OSong.data.update(Props._id as string, element);
    emit('EditUpdate');
  });
};

watch(Props, () => {
  if (!!Props.img) {
    urlImage.value = URL.createObjectURL(Props.img);
  }
});
watch(Props, () => {
  title.value = props.value.title;
});
</script>
