<template>
    <navbar />

    <div
        class="lg:max-w-6xl flex justify-between lg:justify-center gap-3 mx-auto px-4 overflow-x-auto lg:overflow-x-visible py-4">
        <!-- คอลัมน์ 1: รถที่ได้รับอนุญาต -->
        <div
            class="lg:min-w-82 min-w-74 w-auto flex-shrink-0 bg-gray-100 rounded-lg shadow-md h-fit max-h-[calc(100vh-6rem)] overflow-y-auto scrollbar-hide">
            <div class="flex justify-between items-center sticky top-0 bg-gray-100 z-10 px-4 pt-6 pb-2">
                <h2 class="text-2xl font-bold text-gray-800">รถที่ได้รับอนุญาต</h2>
            </div>
            <div
                class="border-2 border-dashed border-gray-300 rounded-md m-3 h-fit max-h-[calc(100vh-12rem)] overflow-y-auto scrollbar-hide">
                <draggable v-model="authorizedCars" item-key="id"
                    :group="{ name: 'authorizedCars', pull: true, put: false }" class="min-h-[6rem] py-2 px-1 space-y-3"
                    :animation="200" :delay="200" :delay-on-touch-only="true"
                    @add="handleAdd($event, 'authorizedCars')"
                    @start="onDragStart"
                    @end="onDragEnd">
                    <!-- Items -->
                    <template #item="{ element: car }">
                        <div
                            class="car-item flex items-center gap-4 bg-white rounded-md shadow-sm hover:bg-gray-50 cursor-grab active:cursor-grabbing p-3 transition-all duration-200">
                            <div class="bg-blue-100 p-2 py-2.5 rounded-md flex items-center justify-center">
                                <i class="fa-solid fa-grip-vertical text-xl text-blue-500"></i>
                            </div>

                            <div class="">
                                <p class="font-medium text-xl text-gray-800">{{ car.licensePlate }}</p>
                            </div>
                        </div>
                    </template>
                </draggable>
            </div>

        </div>

        <!-- คอลัมน์ 2: ออกจากโรงงาน -->
        <div
            class="lg:min-w-82 min-w-74 w-auto flex-shrink-0 bg-gray-100 rounded-lg shadow-md h-fit max-h-[calc(100vh-6rem)] overflow-y-auto scrollbar-hide">
            <!-- Header -->
            <div class="flex justify-between items-center sticky top-0 bg-gray-100 z-10 px-4 pt-6 pb-2">
                <h2 class="text-2xl font-bold text-gray-800">ออกจากโรงงาน</h2>
            </div>

            <!-- Drag & Drop area -->
            <div
                class="border-2 border-dashed border-gray-300 rounded-md m-3 h-fit max-h-[calc(100vh-12rem)] overflow-y-auto scrollbar-hide">
                <draggable v-model="outgoingCars" item-key="id"
                    :group="{ name: 'outgoingCars', pull: true, put: ['authorizedCars'] }"
                    class="min-h-[6rem] py-2 px-1 space-y-3" :animation="200" :delay="200" :delay-on-touch-only="true"
                    @add="handleAdd($event, 'outgoingCars')"
                    @start="onDragStart"
                    @end="onDragEnd">
                    <!-- Items -->
                    <template #item="{ element: car }">
                        <div
                            class="car-item flex items-center gap-3 bg-white rounded-md shadow-sm hover:bg-gray-50 cursor-grab active:cursor-grabbing p-3 transition-all duration-200">
                            <div class="bg-blue-100 p-2 py-2.5 rounded-md flex items-center justify-center">
                                <i class="fa-solid fa-grip-vertical text-xl text-blue-500"></i>
                            </div>
                            <div class="">
                                <p class="font-medium text-xl text-gray-800">{{ car.licensePlate }}</p>
                                <p class="font-medium text-base text-gray-500">{{ car.dateTimeOut }}</p>
                            </div>
                        </div>
                    </template>

                </draggable>
            </div>
        </div>

        <!-- คอลัมน์ 3: กลับเข้าโรงงาน -->
        <div
            class="lg:min-w-82 min-w-74 w-auto flex-shrink-0 bg-gray-100 rounded-lg shadow-md h-fit max-h-[calc(100vh-6rem)] overflow-y-auto scrollbar-hide">
            <div class="flex justify-between items-center sticky top-0 bg-gray-100 z-10 px-4 pt-6 pb-2">
                <h2 class="text-2xl font-bold text-gray-800">กลับเข้าโรงงาน</h2>

            </div>
            <div
                class="border-2 border-dashed border-gray-300 rounded-md m-3 h-fit max-h-[calc(100vh-12rem)] overflow-y-auto scrollbar-hide">
                <draggable v-model="incomingCars" item-key="id"
                    :group="{ name: 'incomingCars', pull: false, put: ['outgoingCars'] }"
                    class="min-h-[6rem] py-2 px-1 space-y-3" :animation="200" :delay="200" :delay-on-touch-only="true"
                    @add="handleAdd($event, 'incomingCars')"
                    @start="onDragStart"
                    @end="onDragEnd">
                    <!-- Items -->
                    <template #item="{ element: car }">
                        <div
                            class="car-item flex items-center gap-3 bg-white rounded-md shadow-sm hover:bg-gray-50 cursor-grab active:cursor-grabbing p-3 transition-all duration-200">
                            <div class="bg-blue-100 p-2 py-2.5 rounded-md flex items-center justify-center">
                                <i class="fa-solid fa-grip-vertical text-xl text-blue-500"></i>
                            </div>
                            <div class="">
                                <p class="font-medium text-xl text-gray-800">{{ car.licensePlate }}</p>
                                <p class="font-medium text-base text-gray-500">{{ car.dateTimeIn }}</p>
                            </div>
                        </div>
                    </template>
                </draggable>
            </div>
        </div>

    </div>

    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <!-- กล่อง modal -->
        <div class="bg-white rounded-xl shadow-lg p-6 w-lg relative z-50">
            <h2 class="text-2xl font-semibold mb-4 text-gray-700">บันทึกข้อมูล</h2>

            <p class="text-xl text-gray-700 mb-2">
                หมายเลขทะเบียนรถ : <span class="font-medium">{{ tempCar.licensePlate }}</span>
            </p>

            <label class="block mb-2">
                <!-- <span class="text-lg text-gray-700">กรอกเลขไมล์</span> -->
                <input v-model="form.remark" ref="inputRemark" type="text" inputmode="numeric" pattern="[0-9]*"
                    @input="form.remark = form.remark.replace(/[^0-9]/g, '')" placeholder="กรอกเลขไมล์..."
                    class=" w-full mt-2 pl-3 pr-6 py-2 text-xl bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-3 focus:ring-gray-500/20 focus:border-gray-500 transition-all duration-300 hover:border-gray-300 placeholder-gray-400" />
            </label>

            <div class="text-xl flex justify-end space-x-3 mt-5">
                <button @click="cancelMove"
                    class="cursor-pointer px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100">
                    ยกเลิก
                </button>
                <button @click="confirmMove"
                    class="cursor-pointer px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">
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
                remark: '',
                dateTime: '',
            },
        }
    },
    computed: {

    },
    mounted() {
        this.getlistCar();
        this.updateCar();
        this.cleanOldVehicleIn();
        window.addEventListener('resize', this.checkOrientation)
        window.addEventListener('orientationchange', this.checkOrientation)

        this.timeout = setInterval(() => {
            this.getlistCar();
            this.updateCar();
            this.cleanOldVehicleIn();
        }, (1000 * 60));
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.checkOrientation)
        window.removeEventListener('orientationchange', this.checkOrientation)

        clearInterval(this.timeout);
    },
    methods: {

        onDragStart(event) {
            // เพิ่ม class สำหรับ animation
            event.item.classList.add('dragging');
        },

        onDragEnd(event) {
            // ลบ class เมื่อเลิกลาก
            event.item.classList.remove('dragging');
        },

        async getlistCar() {
            // localStorage.clear();
            try {
                const response = await axios.get(
                    `${this.apiUrl}hr/vehicleGatePass/?action=listDoc&tripStatus=ready`
                );
                const data = response.data;
                const newData = data.rows || [];
                // console.log("list car :", data.rows)

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
            // console.log("vehicleGatePassMain :", JSON.parse(localStorage.getItem("vehicleGatePassMain")))
            // console.log("vehicleGatePassOut :", JSON.parse(localStorage.getItem("vehicleGatePassOut")))
            // console.log("vehicleGatePassIn :", JSON.parse(localStorage.getItem("vehicleGatePassIn")))


        },

        handleAdd(event, target) {
            const movedItem = this[target][event.newIndex]

            // if (target === 'authorizedCars') return
            console.log('Moved car object:', movedItem.id)
            console.log('Target list:', target)

            this.tempCar = movedItem
            this.targetList = target
            this.showModal = true

            console.log("newIndex :", event.newIndex)
        },

        async confirmMove() {
            if (!this.form.remark) {
                this.$refs.inputRemark.focus();
                return
            }
            try {
                this.form.dateTime = this.getNow();
                const payload = {
                    action: "saveDoc",
                    docID: this.tempCar.id,
                    licensePlate: this.tempCar.licensePlate,
                };

                if (this.targetList === "incomingCars") {
                    payload.mileInNumber = this.form.remark;
                    payload.dateTimeIn = this.form.dateTime
                } else if (this.targetList === "outgoingCars") {
                    payload.mileOutNumber = this.form.remark;
                    payload.dateTimeOut = this.form.dateTime
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
                                const updateVehicle = { ...this.tempCar, updated: false, dateTimeOut: this.form.dateTime };
                                const updatedOut = [...storedOut, updateVehicle];
                                localStorage.setItem("vehicleGatePassOut", JSON.stringify(updatedOut));

                                // ลบรถคันนี้ออกจาก vehicleGatePassMain
                                const filteredMain = storedMain.filter(item => item.id !== this.tempCar.id);
                                localStorage.setItem("vehicleGatePassMain", JSON.stringify(filteredMain));

                                console.log("confirm Out :", JSON.parse(localStorage.getItem("vehicleGatePassOut")))

                            } else if (this.targetList === "incomingCars") {
                                // ดึงข้อมูลเก่า
                                const storedIn = JSON.parse(localStorage.getItem("vehicleGatePassIn")) || [];
                                const storedOut = JSON.parse(localStorage.getItem("vehicleGatePassOut")) || [];

                                // เพิ่มรถเข้า vehicleGatePassIn 
                                const updateVehicle = { ...this.tempCar, updated: false, dateTimeIn: this.form.dateTime };
                                const updatedIn = [...storedIn, updateVehicle];
                                localStorage.setItem("vehicleGatePassIn", JSON.stringify(updatedIn));

                                // ลบรถคันนี้ออกจาก vehicleGatePassOut
                                const filteredOut = storedOut.filter(item => item.id !== this.tempCar.id);
                                localStorage.setItem("vehicleGatePassOut", JSON.stringify(filteredOut));

                                console.log("confirm In :", JSON.parse(localStorage.getItem("vehicleGatePassIn")))
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
            this.getlistCar()
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

        async updateCar() {
            // console.log("updateCar")
            try {

                // id, licencePlate, mile ,dateTime, updated(,true,false)
                const storedOut = JSON.parse(localStorage.getItem("vehicleGatePassOut")) || [];
                const storedIn = JSON.parse(localStorage.getItem("vehicleGatePassIn")) || [];

                // ส่ง outgoingCars 
                for (const car of storedOut) {
                    if (car.updated === true) {
                        // console.log("car updated: ", car.licensePlate, " = ", car.updated);
                        continue;
                    } else {
                        // console.log("ยิง api")
                        const payloadOut = {
                            action: "saveDoc",
                            docID: car.id,
                            licensePlate: car.licensePlate,
                            mileOutNumber: car.mileOutNumber || null,
                            dateTimeOut: car.dateTimeOut,

                        };
                        // console.log("payloadOut :", payloadOut)
                        const responseOut = await axios.post(this.apiUrl + 'hr/vehicleGatePass', payloadOut);
                        if (responseOut.data.success === true) {
                            car.updated = true;
                            localStorage.setItem("vehicleGatePassOut", JSON.stringify(storedOut));
                            // console.log("อัปเดตสำเร็จ update storedOut:", storedOut)
                        } else {
                            console.error("เกิดข้อผิดพลาดกับ outgoingCar:", car, responseOut);
                        }
                    }

                }
                // ส่ง incomingCars 
                for (const car of storedIn) {
                    if (car.updated === true) {
                        // console.log("car updated: ", car.licensePlate, " = ", car.updated);
                        continue;
                    } else {
                        // console.log("ยิง api")
                        const payloadIn = {
                            action: "saveDoc",
                            docID: car.id,
                            licensePlate: car.licensePlate,
                            mileInNumber: car.mileInNumber || null,
                            dateTimeIn: car.dateTimeIn,
                        };
                        // console.log("payloadIn :", payloadIn)
                        const responseIn = await axios.post(this.apiUrl + 'hr/vehicleGatePass', payloadIn);
                        if (responseIn.data.success === true) {
                            car.updated = true;
                            localStorage.setItem("vehicleGatePassIn", JSON.stringify(storedIn));
                            // console.log("อัปเดตสำเร็จ update storedIn:", storedIn)
                        } else {
                            console.error("เกิดข้อผิดพลาดกับ incomingCar:", car, responseIn);
                        }
                    }

                }

            } catch (error) {
                console.error("เกิดข้อผิดพลาดในการบันทึก:", error);
            }
        },

        getNow() {
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        },

        cleanOldVehicleIn() {
            // console.log("เช็คข้อมูลรถเข้าที่เกิน 1 ชม.")
            const data = localStorage.getItem("vehicleGatePassIn");
            if (!data) return;

            let vehicles = JSON.parse(data);
            const now = new Date();
            const newVehicles = [];

            for (const car of vehicles) {
                if (!car.dateTimeIn) {
                    newVehicles.push(car);
                    continue;
                }

                // แปลงเป็นรูปแบบที่ Date อ่านได้
                const fixedDate = car.dateTimeIn.replace(" ", "T");
                const timeIn = new Date(fixedDate);

                // คำนวณชั่วโมงที่ผ่านไป
                const hours = (now - timeIn) / (1000 * 60 * 60);

                //  ถ้ายังไม่เกิน 1 ชั่วโมง ให้เก็บไว้
                if (hours < 1) {
                    newVehicles.push(car);
                }
            }

            localStorage.setItem("vehicleGatePassIn", JSON.stringify(newVehicles));
            
        }



    }
}
</script>

<style scoped>
/* Animation สำหรับตอนกดค้าง (delay period) */
.car-item:active {
  transform: scale(1.02);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

/* Animation สำหรับตอนลาก */
.car-item.dragging {
  transform: scale(1.05) rotate(2deg);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  opacity: 0.95;
}

/* Animation สำหรับ ghost element (ตัวที่ถูกลาก) */
:deep(.sortable-ghost) {
  opacity: 0.4;
  background: #e0f2fe !important;
  transform: scale(0.98);
}

/* Animation สำหรับ chosen element (ตัวที่กำลังจะลาก) */
:deep(.sortable-chosen) {
  transform: scale(1.02);
}

/* Hide scrollbar */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Smooth transition สำหรับทุก state */
.car-item {
  will-change: transform, box-shadow;
}
</style>