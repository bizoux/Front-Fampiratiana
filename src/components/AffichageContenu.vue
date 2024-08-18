<template>
  <div>
    <transition-group name="fade" tag="div">
      <CENTER><div v-for="(item, index) in visibleItems" :key="item.id" class="fade-item">
        {{ item.name }}
      </div></CENTER>
    </transition-group>
  </div>
</template>

<script>
export default {
    name:"AffichageContenu",
  data() {
    return {
      items: [
        { id: 1, name: "ANDRIATSITOHAINARIVO" },
        { id: 2, name: "JAFFRELOT" },
        { id: 3, name: "BIZOUX" },
        { id: 4, name: "ABRIVARD" },
      ], // Liste d'éléments à afficher
      visibleItems: [], // Les éléments visibles à l'écran
    };
  },
  mounted() {
    this.displayItemsOneByOne();
  },
  methods: {
    displayItemsOneByOne() {
      this.items.forEach((item, index) => {
        setTimeout(() => {
          this.visibleItems.push(item);
        }, index * 500); // Délai de 500ms entre chaque élément
      });
    },
  },
};
</script>

<style scoped>
.fade-item {
  opacity: 0;
  animation: fadeIn 1s forwards;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
