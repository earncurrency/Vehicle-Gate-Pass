<template>
    <navbar />
    <div class="lg:max-w-6xl mx-auto p-8" :class="containerClass">

        <!-- คอลัมน์ 1: รถที่ได้รับอนุญาต -->
        <div
            class="min-w-72 w-auto flex-shrink-0 bg-gray-100 rounded-lg shadow-md h-fit max-h-[calc(100vh-7rem)] overflow-y-auto scrollbar-hide">
            <div class="flex justify-between items-center sticky top-0 bg-gray-100 z-10 px-4 pt-6 pb-2">
                <h2 class="text-lg font-bold text-gray-700">รถที่ได้รับอนุญาต</h2>
            </div>

            <draggable v-model="authorizedCars" item-key="id" :group="{ name: 'authorized', pull: true, put: false }"
                class="min-h-[4rem] p-3 m-3 border-2 border-dashed border-gray-300 rounded-md space-y-3"
                :animation="200" :delay="200" :delay-on-touch-only="true" @add="handleAdd($event, 'authorizedCars')">
                <!-- Items -->
                <template #item="{ element: car }">
                    <div
                        class="text-lg flex items-center gap-4 bg-white rounded-md shadow-sm hover:bg-gray-50 cursor-grab active:cursor-grabbing p-3">
                        <i class="fa-solid fa-grip-vertical"></i>
                        <p class="font-medium text-gray-700">{{ car.licensePlate }}</p>
                    </div>
                </template>
            </draggable>
        </div>


        <!-- คอลัมน์ 2: ออกจากโรงงาน -->
        <div
            class="min-w-72 w-auto flex-shrink-0 bg-gray-100 rounded-lg shadow-md h-fit max-h-[calc(100vh-7rem)] overflow-y-auto scrollbar-hide">
            <!-- Header -->
            <div class="flex justify-between items-center sticky top-0 bg-gray-100 z-10 px-4 pt-6 pb-2">
                <h2 class="text-lg font-bold text-gray-700">ออกจากโรงงาน</h2>
            </div>

            <!-- Drag & Drop area -->
            <draggable v-model="outgoingCars" item-key="id" :group="{ name: 'outgoing', pull: true, put: ['authorizedCars'] }"
                class="min-h-[4rem] p-3 m-3 border-2 border-dashed border-gray-300 rounded-md space-y-3"
                :animation="200" :delay="200" :delay-on-touch-only="true" @add="handleAdd($event, 'outgoingCars')">
                <!-- Items -->
                <template #item="{ element: car }">
                    <div
                        class="text-lg flex items-center gap-4 bg-white rounded-md shadow-sm hover:bg-gray-50 cursor-grab active:cursor-grabbing p-3">
                        <i class="fa-solid fa-grip-vertical"></i>
                        <p class="font-medium text-gray-700">{{ car.licensePlate }}</p>
                    </div>
                </template>

            </draggable>
        </div>

        <!-- คอลัมน์ 3: กลับเข้าโรงงาน -->
        <div
            class="min-w-72 w-auto flex-shrink-0 bg-gray-100 rounded-lg shadow-md h-fit max-h-[calc(100vh-7rem)] overflow-y-auto scrollbar-hide">
            <div class="flex justify-between items-center sticky top-0 bg-gray-100 z-10 px-4 pt-6 pb-2">
                <h2 class="text-lg font-bold text-gray-700">กลับเข้าโรงงาน</h2>

            </div>

            <draggable v-model="incomingCars" item-key="id" :group="{ name: 'incoming', pull: false, put: ['outgoingCars'] }"
                class="min-h-[4rem] p-3 m-3 border-2 border-dashed border-gray-300 rounded-md space-y-3"
                :animation="200" :delay="200" :delay-on-touch-only="true" @add="handleAdd($event, 'incomingCars')">
                <!-- Items -->
                <template #item="{ element: car }">
                    <div
                        class="text-lg flex items-center gap-4 bg-white rounded-md shadow-sm hover:bg-gray-50 cursor-grab active:cursor-grabbing p-3">
                        <i class="fa-solid fa-grip-vertical"></i>
                        <p class="font-medium text-gray-700">{{ car.licensePlate }}</p>
                    </div>
                </template>
            </draggable>
        </div>

    </div>

    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <!-- กล่อง modal -->
        <div class="bg-white rounded-xl shadow-lg p-6 w-lg relative z-50">
            <h2 class="text-2xl font-semibold mb-4 text-gray-700">บันทึกข้อมูล</h2>

            <p class="text-lg text-gray-600 mb-2">
                หมายเลขทะเบียนรถ : <span class="font-medium">{{ tempCar.licensePlate }}</span>
            </p>

            <label class="block mb-2">
                <!-- <span class="text-lg text-gray-700">กรอกเลขไมล์</span> -->
                <input v-model="form.remark" ref="inputRemark" type="text" inputmode="numeric" pattern="[0-9]*"
                    @input="form.remark = form.remark.replace(/[^0-9]/g, '')" placeholder="กรอกเลขไมล์..."
                    class="w-full mt-2 pl-3 pr-6 py-2 text-base bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-3 focus:ring-gray-500/20 focus:border-gray-500 transition-all duration-300 hover:border-gray-300 placeholder-gray-400" />
            </label>

            <div class="flex justify-end space-x-3 mt-5">
                <button @click="cancelMove"
                    class="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100">
                    ยกเลิก
                </button>
                <button @click="confirmMove" class="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">
                    ยืนยัน
                </button>
            </div>
        </div>
    </div>
    <swl_modal ref="swl_modal" />
</template>

<script>
import axios from "axios";
import navbar from "@/components/navbar.vue";
import draggable from 'vuedraggable';
import swl_modal from "@/components/swl_modal.vue";
import '@fortawesome/fontawesome-free/css/all.css';

export default {
    name: 'TruckBoard',
    components: { navbar, draggable, swl_modal },
    data() {
        return {
            apiUrl: __API_URL__,

            isPortrait: false,

            authorizedCars: [],
            outgoingCars: [],
            incomingCars: [],

            showModal: false,
            tempCar: null,
            targetList: '',
            form: {
                remark: ''
            },
        }
    },
    computed: {
        containerClass() {
            return this.isPortrait
                ? 'flex space-x-6 overflow-x-auto py-8'
                : 'grid grid-cols-3 gap-6 py-8'
        },
    },
    mounted() {
        this.getlistCar()
        this.checkOrientation()
        window.addEventListener('resize', this.checkOrientation)
        window.addEventListener('orientationchange', this.checkOrientation)

        this.timeout = setInterval(() => {
            this.getlistCar();
        }, (1000 * 60 * 3));
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.checkOrientation)
        window.removeEventListener('orientationchange', this.checkOrientation)

        clearInterval(this.timeout);
    },
    methods: {
        checkOrientation() {
            this.isPortrait = window.innerHeight > window.innerWidth
        },

        async getlistCar() {
            // localStorage.clear();
            try {
                const response = await axios.get(
                    `${this.apiUrl}hr/vehicleGatePass/?action=listDoc&tripStatus=ready`
                );
                const data = response.data;
                const newData = data.rows || [];
                console.log("list car :", data.rows)

                // เช็ค localStorge vehicleGatePassMain ว่ามีไหม
                const storedMain = JSON.parse(localStorage.getItem("vehicleGatePassMain"));
                if (!storedMain || storedMain.length === 0) {
                    // ไม่มีข้อมูลใน localStorage 
                    localStorage.setItem("vehicleGatePassMain", JSON.stringify(data.rows));
                } else {

                    const updatedData = [
                        ...storedMain.filter(item => newData.some(n => n.id === item.id)), // เก็บรถเก่ายังอยู่
                        ...newData.filter(item => !storedMain.some(s => s.id === item.id)) // เพิ่มรถใหม่
                    ];

                    // เซฟกลับไป localStorage
                    localStorage.setItem("vehicleGatePassMain", JSON.stringify(updatedData));

                }

            } catch (error) {
                console.error("เกิดข้อผิดพลาดในการแสดงข้อมูล :", error);
            }

            this.authorizedCars = JSON.parse(localStorage.getItem("vehicleGatePassMain")) || [];
            this.outgoingCars = JSON.parse(localStorage.getItem("vehicleGatePassOut")) || [];
            this.incomingCars = JSON.parse(localStorage.getItem("vehicleGatePassIn")) || [];
            console.log("vehicleGatePassMain :", JSON.parse(localStorage.getItem("vehicleGatePassMain")))
            console.log("vehicleGatePassOut :", JSON.parse(localStorage.getItem("vehicleGatePassOut")))
            console.log("vehicleGatePassIn :", JSON.parse(localStorage.getItem("vehicleGatePassIn")))


        },

        handleAdd(event, target) {
            const movedItem = this[target][event.newIndex]

            // if (target === 'authorizedCars') return
            console.log('Moved car object:', movedItem.id)
            console.log('Target list:', target)

            this.tempCar = movedItem
            this.targetList = target
            this.showModal = true
        },

        async confirmMove() {
            if (!this.form.remark) {
                this.$refs.inputRemark.focus();
                return
            }
            try {
                const payload = {
                    action: "saveDoc",
                    docID: this.tempCar.id,
                    licensePlate: this.tempCar.licensePlate,
                };

                if (this.targetList === "incomingCars") {
                    payload.mileInNumber = this.form.remark;
                } else if (this.targetList === "outgoingCars") {
                    payload.mileOutNumber = this.form.remark;
                }

                console.log("payload :", payload)

                const response = await axios.post(this.apiUrl + 'hr/vehicleGatePass', payload);
                if (response.data.success == true) {
                    this.$refs.swl_modal.showAlertModal({
                        swlIcon: "success",
                        swlTitle: "สำเร็จ",
                        swlText: "บันทึกข้อมูลสำเร็จ",
                    }).then((result) => {
                        if (result.isConfirmed) {

                            if (this.targetList === "outgoingCars") {
                                // ดึงข้อมูลเก่า
                                const storedOut = JSON.parse(localStorage.getItem("vehicleGatePassOut")) || [];
                                const storedMain = JSON.parse(localStorage.getItem("vehicleGatePassMain")) || [];

                                // เพิ่มรถเข้า vehicleGatePassOut
                                const updatedOut = [...storedOut, this.tempCar];
                                localStorage.setItem("vehicleGatePassOut", JSON.stringify(updatedOut));

                                // ลบรถคันนี้ออกจาก vehicleGatePassMain
                                const filteredMain = storedMain.filter(item => item.id !== this.tempCar.id);
                                localStorage.setItem("vehicleGatePassMain", JSON.stringify(filteredMain));


                            } else if (this.targetList === "incomingCars") {
                                // ดึงข้อมูลเก่า
                                const storedIn = JSON.parse(localStorage.getItem("vehicleGatePassIn")) || [];
                                const storedOut = JSON.parse(localStorage.getItem("vehicleGatePassOut")) || [];

                                // เพิ่มรถเข้า vehicleGatePassIn 
                                const updatedIn = [...storedIn, this.tempCar];
                                localStorage.setItem("vehicleGatePassIn", JSON.stringify(updatedIn));

                                // ลบรถคันนี้ออกจาก vehicleGatePassOut
                                const filteredOut = storedOut.filter(item => item.id !== this.tempCar.id);
                                localStorage.setItem("vehicleGatePassOut", JSON.stringify(filteredOut));
                            }

                            this.reset();
                        }
                    });
                } else {
                    this.$refs.swl_modal.showAlertModal({
                        swlIcon: "error",
                        swlTitle: "เกิดข้อผิดพลาด",
                        swlText: "เกิดข้อผิดพลาดในการบันทึก",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            this.reset();
                        }
                    });
                    console.error("เกิดข้อผิดพลาด:", response);
                }
            } catch (error) {
                this.$refs.swl_modal.showAlertModal({
                    swlIcon: "error",
                    swlTitle: "เกิดข้อผิดพลาด",
                    swlText: "เกิดข้อผิดพลาดในการบันทึก",
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.reset();
                    }
                });
                console.error("เกิดข้อผิดพลาดในการบันทึก:", error);
            }
        },
        cancelMove() {
            // ยกเลิก: ย้ายกลับไป authorizedCars
            if (this.tempCar && this.targetList) {
                const list = this[this.targetList]
                const index = list.findIndex(c => c.id === this.tempCar.id)
                if (index !== -1) {
                    list.splice(index, 1)
                    this.authorizedCars.push(this.tempCar)
                }
            }
            this.showModal = false
            this.tempCar = null
            this.targetList = ''
            this.form.remark = ''
        },
        reset() {
            this.getlistCar()
            this.showModal = false
            this.tempCar = null
            this.targetList = ''
            this.form.remark = ''
        },
    }
}
</script>
