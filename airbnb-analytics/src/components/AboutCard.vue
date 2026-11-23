<script setup>
defineProps({
  icon: String,
  title: String,
  text: String
})
</script>

<template>
  <div class="about-card">
    <div class="about-head">
      <div class="icon-circle">
        <img :src="icon" />
      </div>
      <h2>{{ title }}</h2>
    </div>

    <p>{{ text }}</p>
  </div>
</template>

<style scoped>
.about-card{
  background-color: white;
  border-radius: 12px;
  border: 1px solid #dcdcdc;
  box-shadow: 0 2px 6px rgba(0,0,0,.1);
  padding: 20px;
}

.about-head{
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 8px;
}

.icon-circle{
  width: 44px;
  height: 44px;
  border-radius: 900px;
  background: #CEE6EA;
  display: grid;
  place-items: center;
}

.icon-circle img{
  width: 24px;
  height: 25px;
}

h2{
  margin: 0;
  font-size: 1.1rem;
  font-weight: 700;
  color: #636363;
}

p{
  margin: 0;
  color: #636363;
  line-height: 1.4;
}
</style>
