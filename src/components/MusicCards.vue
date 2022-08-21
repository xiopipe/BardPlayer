<template>
  <div>
    <draggable
      v-model="cards"
      class="row"
      @end="updateItemOrder"
      ghost-class="ghost"
      item-key="id"
    >
      <template #item="{ element }">
        <div>
          <MusicCard
            @EditUpdate="getDataCard"
            :title="element.title"
            :_id="element._id"
            :img="element.img"
            :loop="element.loop"
          >
          </MusicCard>
        </div>
      </template>
    </draggable>
  </div>
</template>

<style lang="scss">
.ghost {
  opacity: 0.3;
  background: $accent;
  border-style: dashed;
  border-radius: 20px;
}
.not-draggable {
  cursor: no-drop;
}
.iconPlay {
  position: absolute;
  top: 60%;
  right: 0%;
}
</style>

<script lang="ts">
import { inject, ref, watch } from 'vue-demi';
import draggable from 'vuedraggable';
import Songs, { ISongs } from 'src/stores/indexed/songs';
import MusicCard from 'src/components/cards/MusicCard.vue';

export default {
  components: {
    draggable,
    MusicCard,
  },
  setup() {
    const OSongs = new Songs();
    const cards = ref<ISongs[]>([]);
    const selectSong = inject<{ value: { _id: string; change: number } }>(
      'selectSong'
    );
    const renderMusic = inject<{ value: number }>('renderMusic');
    const title = ref('');

    const getDataCard = async () => {
      cards.value = await OSongs.data.orderBy('order').toArray();
    };
    void getDataCard();

    const changeSong = (_id: string) => {
      if (selectSong?.value === undefined) return;
      selectSong.value._id = _id;
      selectSong.value.change += 1;
    };

    const updateItemOrder = () => {
      for (let index of cards.value?.keys()) {
        cards.value[index].order = index;
        OSongs.data.update(cards.value[index]._id, cards.value[index]);
      }
    };

    if (!renderMusic) return;

    watch(renderMusic, () => {
      getDataCard();
    });

    return { cards, changeSong, updateItemOrder, getDataCard, title };
  },
};
</script>
