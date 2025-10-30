<template>
    <nav class="bg-white shadow-md border-b border-gray-300">
        <div class="lg:max-w-6xl mx-auto lg:px-8 px-4">
            <div class="flex justify-center items-center h-16 gap-3">

                <!-- โลโก้ -->
                <div class="flex items-center">
                    <a href="#" class="font-bold text-xl text-gray-800">
                        <img class="lg:h-12 md:h-12 h-10 w-auto object-contain" :src="`${imageIcon}icon.png`" alt="Logo" />
                    </a>
                </div>
                <div class="flex items-center pointer-events-none">
                    <h1 class="font-bold text-2xl text-gray-800">รายการรถขอออกจากโรงงาน</h1>
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
