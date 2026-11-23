<script setup>
defineProps({
  listing: {
    type: Object,
    required: true,
    default: () => ({
      name: '', price: 0, room_type: '', 
      reviews: 0, rating: 0,
      availability: 0, min_nights: 0, host_name: ''
    })
  }
})
</script>

<template>
  <div class="meu-popup-vue">
    <div class="popup-header">
      <h3>{{ listing.name }}</h3>
    </div>
    
    <div class="popup-body">
      <p class="price">{{ listing.price }}€ <span class="night">/ noite</span></p>
      
      <div class="details-row">
        <span class="tag">{{ listing.room_type }}</span>
        <span class="rating" v-if="listing.reviews > 0">
          ★ {{ listing.rating }} <span class="review-count">({{ listing.reviews }} reviews)</span>
        </span>
      </div>

      <hr class="divider">

      <div class="stats-grid">
        <div class="stat-item">
          <span class="stat-label">Disponibilidade</span>
          <span class="stat-value">{{ listing.availability }} dias/ano</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Mín. Noites</span>
          <span class="stat-value">{{ listing.min_nights }} noites</span>
        </div>
      </div>
      
      <p class="host">Anfitrião: <strong>{{ listing.host_name }}</strong></p>
    </div>
  </div>
</template>

<style scoped>
.meu-popup-vue {
  font-family: 'Inter', sans-serif;
  color: #333;
  padding: 5px;
  min-width: 200px;
}

.popup-header h3 {
  margin: 0 0 8px 0;
  font-size: 1rem;
  font-weight: 700;
  color: #2d6e72;
  border-bottom: 1px solid #eee;
  padding-bottom: 8px;
}

.popup-body .price {
  font-size: 1.2rem;
  font-weight: 700;
  margin: 0 0 10px 0;
  color: #444;
}

.popup-body .night {
  font-size: 0.8rem;
  font-weight: 400;
  color: #888;
}

.details-row { margin-bottom: 10px; }

.tag {
  background: #f0f2f5;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  color: #666;
  border: 1px solid #ddd;
}

.rating {
  font-size: 0.85rem;
  font-weight: 700;
  color: #f39c12;
  margin-left: 8px;
}

.review-count {
  font-weight: 400;
  color: #888;
  font-size: 0.75rem;
  margin-left: 2px;
}

.divider {
  border: 0;
  border-top: 1px solid #eee;
  margin: 10px 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 12px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  background: #f9f9f9;
  padding: 6px;
  border-radius: 4px;
}

.stat-label { font-size: 0.7rem; color: #888; text-transform: uppercase; }
.stat-value { font-size: 0.85rem; font-weight: 600; color: #444; }
.host { font-size: 0.8rem; color: #888; margin: 0; }
</style>