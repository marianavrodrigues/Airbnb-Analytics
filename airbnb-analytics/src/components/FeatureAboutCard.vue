<script setup>
defineProps({
  title: String,
  text: String
})
</script>

<template>
  <div class="feature-card">
    <h3>{{ title }}</h3>
    <p>{{ text }}</p>
  </div>
</template>

<style scoped>
.feature-card{
  background: white;
  border-radius: 12px;
  border: 1px solid #dcdcdc;
  box-shadow: 0 2px 6px rgba(0,0,0,.08);
  padding: 18px;
}

h3{
  margin: 0 0 8px 0;
  font-size: 1rem;
  font-weight: 700;
  color: #666;
}

p{
  margin: 0;
  color: #666;
  line-height: 1.4;
}
</style>
