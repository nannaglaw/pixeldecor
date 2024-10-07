<script setup>
import { ref } from 'vue';
import Navbar from "../components/Navbar.vue";
import { furnitureItems } from "@/data/furnitureData.js";

const draggedItem = ref(null);
const droppedItems = ref([]);
const dragOffset = ref({ x: 0, y: 0 });
const draggedIndex = ref(null);
const selectedIndex = ref(null);


const startDrag = (evt, item, index = null) => {
    evt.dataTransfer.effectAllowed = 'move';
    draggedItem.value = item;
    draggedIndex.value = index;


    const rect = evt.target.getBoundingClientRect();
    dragOffset.value = {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
};


const handleDrop = (evt) => {
    evt.preventDefault();
    if (draggedItem.value) {
        const dropZone = evt.currentTarget;
        const rect = dropZone.getBoundingClientRect();

        const x = evt.clientX - rect.left - dragOffset.value.x;
        const y = evt.clientY - rect.top - dragOffset.value.y;

        if (draggedIndex.value === null) {
            // Hvis det er et nyt item, tilføjes det til droppedItems med zIndex 10 som start
            droppedItems.value.push({
                item: draggedItem.value,
                x: x,
                y: y,
                zIndex: 10 // Standard zIndex for alle nye elementer
            });
        } else {
            // Hvis det er et eksisterende item, opdaterer vi kun dets position
            droppedItems.value[draggedIndex.value].x = x;
            droppedItems.value[draggedIndex.value].y = y;
        }
    }
    draggedItem.value = null;
    draggedIndex.value = null;
};


const moveUp = () => {
    if (selectedIndex.value !== null) {
        droppedItems.value[selectedIndex.value].zIndex += 1;
    }
};

const moveDown = () => {
    if (selectedIndex.value !== null && droppedItems.value[selectedIndex.value].zIndex > 0) {
        droppedItems.value[selectedIndex.value].zIndex -= 1;
    }
};

const flipItem = () => {
    if (selectedIndex.value !== null) {
        const currentItem = droppedItems.value[selectedIndex.value];
        if (currentItem.transform && currentItem.transform === 'scaleX(-1)') {
            currentItem.transform = 'scaleX(1)';
        } else {
            currentItem.transform = 'scaleX(-1)';
        }
    }
};


const deleteItem = () => {
    if (selectedIndex.value !== null) {
        droppedItems.value.splice(selectedIndex.value, 1);
        selectedIndex.value = null;
    }
};


const handleDragOver = (evt) => {
    evt.preventDefault();
};


const selectItem = (index) => {
    selectedIndex.value = index;
};
</script>

<template>
    <Navbar />
    <div class="d-flex justify-content-center p-2">
        <div class="border b-container border-mlilla border-5">

            <div class="room drop-zone" @drop="handleDrop" @dragover="handleDragOver">
                <img src="/images/room.png" class="room-img" alt="Room" />


                <div
                    v-for="(dropped, index) in droppedItems"
                    :key="index"
                    class="dropped-item"
                    :draggable="true"
                    @dragstart="startDrag($event, dropped.item, index)"
                    @click="selectItem(index)"
                    :style="{ left: dropped.x + 'px', top: dropped.y + 'px', zIndex: dropped.zIndex, transform: dropped.transform || 'scaleX(1)'}"
                >
                    <template v-if="dropped.item.type === 'image'">
                        <img :src="dropped.item.src" :alt="dropped.item.alt" class="furniture"/>
                    </template>
                </div>
            </div>

            <!-- Knapper til at flytte det valgte element op eller ned i lag -->
            <div v-if="selectedIndex !== null" class="layer-controls">
                <button @click="moveUp"><img src="/images/arrowU.webp" class="img-fluid"></button>
                <button @click="moveDown"><img src="/images/arrowD.webp" class="img-fluid" ></button>
                <button @click="deleteItem"><img src="/images/trash.webp" class="img-fluid" ></button>
                <button @click="flipItem"><img src="/images/rotate.webp" class="img-fluid"></button>
            </div>

            <div class="b2-container border border-4 border-mlilla">
                <div class="container">
                    <div class="row flexroom">
                        <div class="d-flex">
                            <img src="/images/items.webp" class="it ">
                        </div>

                        <div
                            v-for="item in furnitureItems"
                            :key="item.id"
                            class="item"
                            draggable="true"
                            @dragstart="startDrag($event, item)"
                        >
                            <img :src="item.src" :alt="item.alt" class="furniture"/>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>

    <div class="container madeby">
        <div class="">
            <img src="/images/nanna.webp" class="img-fluid">
        </div>
    </div>

</template>

<style scoped>
.b-container {
    width: 1110px;
    height: 630px;
    position: relative;
    display: inline-block;
    content: "";
    top: 0;
    left: 0;
    z-index: 1;
    background-color: #C19EA8;
}

.b2-container {
    width: 400px;
    height: 580px;
    position: absolute;
    right: 20px;
    top: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 10px;
    padding: 10px;
    overflow-y: auto;
    background-color: #E5C5CF;
}

.it {
    width: 150px;
    height: auto;
    margin: 0 auto;
    padding-top: 0;
    object-fit: contain;

}

.room {
    width: 600px;
    height: auto;
    position: relative;
    left: 30px;
    top: 20px;
    overflow: hidden;
}

.room-img {
    width: 100%;
    height: auto;
}

.item {
    cursor: grab;
    background-color: transparent;
    width: 120px;
    height: auto;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    object-fit: contain;
}

.furniture {
    width: 100%;
    height: auto;
    object-fit: contain;
    background-color: transparent;
    opacity: 1;
    filter: none;
}


.furniture, .item, .dropped-item img {
    background: none !important;
    background-color: transparent !important;
    opacity: 1 !important;
    filter: none !important;
}


.dropped-item {
    position: absolute;
    width: 120px;
    height: auto;
    object-fit: contain;
    cursor: pointer;
}

.dropped-item img {
    object-fit: contain;
    width: 120px;
    height: auto;
}

.layer-controls {
    margin-top: 10px;
    display: flex;
    gap: 10px;
    margin-left: 5px;
    color: #87b3e0;
}
.layer-controls button {
    background-color: #A7828C;
    color: white;
    border: none;
    padding: 7px 12px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 5px;
    width: 50px;
}

.layer-controls button:hover {
    background-color: #493652;
}

.madeby{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 250px;

}
</style>