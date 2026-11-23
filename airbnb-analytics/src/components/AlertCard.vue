<script setup>


</script>

<template>
  <div class="alert-card">
    <div class="titulo-alert">
      <div class="icon-slot">
        <slot name="icon"></slot>
      </div>
      <h3>
        <slot name="header"></slot>
      </h3>
    </div>

    <div class="titulo-content">
      <slot></slot>
    </div>

    <div class="titulo-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style scoped>
.alert-card {
  flex: 0 0 auto;
  min-width: 0;
  border: 1px solid #dcdcdc;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  padding: 0.6rem 0.9rem;
  font-family: 'Roboto', sans-serif;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 0.4rem;
  overflow: hidden;
  height: 100px;
}

.alert-card.danger {
  background-color: #F9E9E9;
  border-color: #FFBABA;
  color: #CD3838;
}

.alert-card.location {
  background-color: #EAF9E9;
  border-color: #BEFFBA;
  color: #44CD38;
}

.alert-card.success {
  background-color: #E9F6F9;
  border-color: #BAE8FF;
  color: #388ACD;
}

.alert-card.info {
  background-color: #F9F3E9;
  border-color: #FFDFBA;
  color: #CD7D38;
}

.titulo-alert {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.2rem;
}

.titulo-alert h3 {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
}

.titulo-content {
  font-size: 0.85rem;
  line-height: 1.4;
  margin-top: 0.2rem;
}

.titulo-content ul{
  padding-left: 1.2rem;
  margin: 0;
}

.icon-slot :deep(img) {
  width: 28px;
  height: 28px;
  object-fit: contain;
}

.titulo-content > * {
  margin-top: 0;
}
</style>