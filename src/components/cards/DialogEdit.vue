<template>
  <!-- notice dialogRef here -->
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide"
    persistent
    @keyup.enter="onOKClick"
  >
    <q-card
      class="q-dialog-plugin q-pa-md"
      @dragover.prevent
      @drop.prevent="imageHandlerDrag"
    >
      <q-input v-model="nameCard" label="name"></q-input>
      <div class="row items-center q-my-sm">
        <q-toggle v-model="loopBool" left-label label="Loop?"></q-toggle>
        <span class="q-mr-xs">Fade in</span>
        <q-input
          v-model="fadeInRef"
          filled
          mask="##"
          maxlength="2"
          style="width: 11%"
          class="q-pa-none q-mr-sm"
          dense
          borderless
        ></q-input>
        <span class="q-mr-xs">Fade out</span>
        <q-input
          v-model="fadeOutRef"
          filled
          mask="##"
          maxlength="2"
          style="width: 11%"
          class="q-pa-none"
          dense
          borderless
        ></q-input>
      </div>

      <q-img
        @click="upImage"
        class="cardImg cursor-pointer"
        style="border: 2px dashed; border-radius: 20px"
        :src="url"
      >
      </q-img>
      <input ref="uploader" @change="imageHandler" type="file" hidden />
      <!--
        ...content
        ... use q-card-section for it?
      -->

      <!-- buttons example -->
      <q-card-actions align="right">
        <q-btn color="primary" label="Edit" @click="onOKClick" />
        <q-btn color="primary" label="Cancel" @click="onCancelClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style lang="scss">
.cardImg {
  height: 200px;
  width: 100%;
  border: 2px dashed;
  border-radius: 20px;
}
</style>

<script lang="ts">
import { useDialogPluginComponent } from 'quasar';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  props: {
    loop: Boolean,
    name: String,
  },

  emits: [
    // REQUIRED; need to specify some events that your
    // component will emit through useDialogPluginComponent()
    ...useDialogPluginComponent.emits,
  ],

  setup(props) {
    // REQUIRED; must be called inside of setup()
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
      useDialogPluginComponent();
    // dialogRef      - Vue ref to be applied to QDialog
    // onDialogHide   - Function to be used as handler for @hide on QDialog
    // onDialogOK     - Function to call to settle dialog with "ok" outcome
    //                    example: onDialogOK() - no payload
    //                    example: onDialogOK({ /*.../* }) - with payload
    // onDialogCancel - Function to call to settle dialog with "cancel" outcome
    const uploader = ref<HTMLElement>();
    const url = ref<string>();

    // info to upload
    const loopBool = ref(props.loop);
    const nameCard = ref(props.name);
    const file = ref<File>();

    const upImage = () => {
      uploader.value?.click();
    };
    const imageHandler = (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (!target.files) return;
      url.value = URL.createObjectURL(target?.files[0]);
      file.value = target?.files[0];
    };
    const imageHandlerDrag = (event: DragEvent) => {
      file.value = event.dataTransfer?.files[0];
      url.value = URL.createObjectURL(file.value as File);
    };

    return {
      loopBool,
      uploader,
      nameCard,

      url,
      upImage,
      imageHandler,
      imageHandlerDrag,
      // This is REQUIRED;
      // Need to inject these (from useDialogPluginComponent() call)
      // into the vue scope for the vue html template
      dialogRef,
      onDialogHide,

      // other methods that we used in our vue html template;
      // these are part of our example (so not required)
      onOKClick() {
        // on OK, it is REQUIRED to
        // call onDialogOK (with optional payload)
        onDialogOK({
          loop: loopBool.value,
          title: nameCard.value,
          img: file.value,
        });
        // or with payload: onDialogOK({ ... })
        // ...and it will also hide the dialog automatically
      },

      // we can passthrough onDialogCancel directly
      onCancelClick: onDialogCancel,
    };
  },
});
</script>
