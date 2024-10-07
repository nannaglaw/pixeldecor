<script setup>
import Navbar from "../components/Navbar.vue";
import Card from "@/components/Card.vue";
</script>

<template>
    <Navbar/>
    <div class="d-flex justify-content-center p-2">
        <div class="border b-container border-mlilla border-5">


            <RouterLink to="/Decor" class="stretched-link">
                <img src="/images/background.webp" class="img-fluid" alt="Background photo">
            </RouterLink>

        </div>
    </div>
    <div class="container madeby">
        <div class="">
            <img src="/images/nanna.webp" class="img-fluid">
        </div>
    </div>
</template>

<style scoped>
.image-container {
    position: relative;
    width: 75%;
    height: auto;
}

.stretched-link {
    display: inline-block;
    position: relative;
}

.stretched-link::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
}
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
.madeby{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 250px;

}
</style>