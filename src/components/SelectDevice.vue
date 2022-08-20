<template>
  <div>
    <q-select
      borderless
      :options="audioDevices"
      emit-value
      dense
      map-options
      option-label="label"
      option-value="deviceId"
      v-model="selectedDevice"
      @update:model-value="storageDevice"
    >
    </q-select>
  </div>
</template>

<script lang="ts">
import { inject, ref } from 'vue-demi';
export default {
  setup() {
    const audioDevices = ref<MediaDeviceInfo[]>([]);
    const selectedDevice = inject<{ value: string }>('selectedDevice');

    const getDevices = async () => {
      await navigator.mediaDevices.getUserMedia({ audio: true });

      const devices = await navigator.mediaDevices.enumerateDevices();
      audioDevices.value = devices.filter((element: MediaDeviceInfo) => {
        if (element.kind === 'audiooutput') {
          return element;
        }
      });

      if (!selectedDevice) return;
      selectedDevice.value = audioDevices.value[0].deviceId;
      localStorage.setItem('device', selectedDevice?.value as string);
      selectedDevice.value = localStorage.getItem('device') as string;
    };
    const storageDevice = () => {
      localStorage.setItem('device', selectedDevice?.value as string);
      if (!selectedDevice) return;
      selectedDevice.value = localStorage.getItem('device') as string;
    };
    void getDevices();

    return { audioDevices, selectedDevice, storageDevice };
  },
};
</script>
