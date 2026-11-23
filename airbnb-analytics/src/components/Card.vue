<script setup>


</script>

<template>
    <div class="card">
        <div class="titulo-card">
            <h3>
                <slot name="header"></slot>
            </h3>
            
            <div class="circulo-icon">
                <slot name="icon"></slot>
            </div>
        </div>

        <div class="card-content">
            <slot></slot>
        </div>

        <div class="card-footer">
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<style scoped>
.card {
    flex: 1;
    min-width: 220px;
    width: 100%; 
    background-color: white;
    border: 1px solid #dcdcdc;
    border-radius: 12px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    padding: 1.2rem 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1rem;
}

.titulo-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.titulo-card h3 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #444;
}

.circulo-icon {
  width: 45px;
  height: 45px;
  background-color: #CEE6EA;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

:slotted(.img-card) {
  width: 24px;
  height: 24px;
  display: block;
}

:slotted(h1) {
  margin: 0;
  font-weight: 700;
  font-size: 2rem;
  color: #444;
}

:slotted(.positivo) {
  color: #2ecc71;
  font-size: 0.9rem;
  font-weight: 600;
  margin: 0;
}

:slotted(.negativo) {
  color: #e74c3c;
  font-size: 0.9rem;
  font-weight: 600;
  margin: 0;
}
</style>