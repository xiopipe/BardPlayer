<template>
  <div>
    <p>{{ title }}</p>
    <ul>
      <li v-for="todo in todos" :key="todo.id" @click="increment">
        {{ todo.id }} - {{ todo.content }}
      </li>
    </ul>
    <p>Count: {{ todoCount }} / {{ meta.totalCount }}</p>
    <p>Active: {{ active ? 'yes' : 'no' }}</p>
    <p>Clicks on todos: {{ clickCount }}</p>
    <br />
    <div style="background-color: red" @click="counter.increment">
      hola mundo {{ counter.counter }}
    </div>
    <input type="text" v-model="counter.counter" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref, toRef, Ref } from 'vue';
import { Todo, Meta } from './models';
import { useCounterStore } from 'src/stores/example-store';

function useClickCount() {
  const clickCount = ref(0);
  function increment() {
    clickCount.value += 1;
    return clickCount.value;
  }

  return { clickCount, increment };
}

function useDisplayTodo(todos: Ref<Todo[]>) {
  const todoCount = computed(() => todos.value.length);
  return { todoCount };
}

export default defineComponent({
  name: 'ExampleComponent',
  props: {
    title: {
      type: String,
      required: true,
    },
    todos: {
      type: Array as PropType<Todo[]>,
      default: () => [],
    },
    meta: {
      type: Object as PropType<Meta>,
      required: true,
    },
    active: {
      type: Boolean,
    },
  },
  setup(props) {
    const counter = useCounterStore();
    counter.increment();
    console.log(counter.counter);
    console.log(props.todos);
    return {
      ...useClickCount(),
      ...useDisplayTodo(toRef(props, 'todos')),
      counter,
    };
  },
});
</script>
