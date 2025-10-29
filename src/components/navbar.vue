<template>
    <nav class="bg-white shadow-md border-b border-gray-300">
        <div class="lg:max-w-6xl mx-auto px-8 relative">
            <div class="flex justify-between items-center h-18 relative">

                <div class="flex items-center absolute left-0">
                    <a href="#" class="font-bold text-xl text-gray-800">
                        <img class="w-auto h-12 object-cover" :src="`${imageIcon}asiaGray.png`" alt="Logo" />
                    </a>
                </div>

                <div class="absolute left-1/2 transform -translate-x-1/2 font-bold text-2xl text-gray-800">
                    รายการรถขอออกจากโรงงาน
                </div>
            </div>
        </div>

    </nav>
</template>

<script>
export default {
    data() {
        return {
            imageIcon: __IMG_ICON__,

        };
    },

    methods: {

    },
};
</script>

<style scoped>
/* CSS เพิ่มเติมหากต้องการ */
</style>
