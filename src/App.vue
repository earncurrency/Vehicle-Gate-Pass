<template>
  <div class="p-6 min-h-screen">
    <div class="flex space-x-6 overflow-x-auto py-8">

      <!-- คอลัมน์ 1: รถที่ได้รับอนุญาต -->
      <div class="w-72 flex-shrink-0 bg-white rounded-lg shadow-md h-fit max-h-[calc(100vh-7rem)] overflow-y-auto">
        <div class="flex justify-between items-center sticky top-0 bg-gray-100 z-10 pb-2 p-3 ">
          <h2 class="text-base font-bold text-gray-700">รถที่ได้รับอนุญาต</h2>
          <button class="text-gray-400 hover:text-gray-600">
            <i class="fas fa-ellipsis-v"></i>
          </button>
        </div>

        <draggable v-model="authorizedCars" item-key="id" :group="{ name: 'dragBox', pull: true, put: false }"
          class="p-2 space-y-2 min-h-[3rem] p-3 bg-gray-100" :animation="200" @add="handleAdd($event, 'authorizedCars')">
          <template #item="{ element: car }">
            <div class="bg-white rounded-md shadow-sm hover:bg-gray-50 cursor-grab active:cursor-grabbing p-3">
              <p class="text-sm font-medium text-gray-700">{{ car.plate }}</p>
            </div>
          </template>
        </draggable>

        <div class="py-2 flex justify-end text-sm sticky bottom-0 bg-gray-100 z-10 pt-2 p-4 ">
          <button @click="addNewItem"
            class="cursor-pointer text-base font-bold text-gray-700 bg-green-400 px-3 py-1 rounded-lg hover:text-gray-600">
            เพิ่ม
          </button>
        </div>
      </div>


      <!-- คอลัมน์ 2: ออกจากโรงงาน -->
      <div class="w-72 flex-shrink-0 bg-white rounded-lg shadow-md p-3 h-fit">
        <div class="flex justify-between items-center mb-3">
          <h2 class="text-base font-bold text-gray-700">ออกจากโรงงาน</h2>
          <button class="text-gray-400 hover:text-gray-600">
            <i class="fas fa-ellipsis-v"></i>
          </button>
        </div>

        <draggable v-model="outgoingCars" item-key="id" :group="{ name: 'dragBox', pull: true, put: true }"
          class="space-y-3 min-h-[3rem]" :animation="200" @add="handleAdd($event, 'outgoingCars')">
          <template #item="{ element: car }">
            <div class="bg-white rounded-md shadow-sm hover:bg-gray-50 cursor-grab active:cursor-grabbing p-3">
              <p class="text-sm font-medium text-gray-700">{{ car.plate }}</p>
            </div>
          </template>
        </draggable>
      </div>

      <!-- คอลัมน์ 3: กลับเข้าโรงงาน -->
      <div class="w-72 flex-shrink-0 bg-white rounded-lg shadow-md p-3 h-fit">
        <div class="flex justify-between items-center mb-3">
          <h2 class="text-base font-bold text-gray-700">กลับเข้าโรงงาน</h2>
          <button class="text-gray-400 hover:text-gray-600">
            <i class="fas fa-ellipsis-v"></i>
          </button>
        </div>

        <draggable v-model="incomingCars" item-key="id" :group="{ name: 'dragBox', pull: true, put: true }"
          class="space-y-3 min-h-[3rem]" :animation="200" @add="handleAdd($event, 'incomingCars')">
          <template #item="{ element: car }">
            <div class="bg-white rounded-md shadow-sm hover:bg-gray-50 cursor-grab active:cursor-grabbing p-3">
              <p class="text-sm font-medium text-gray-700">{{ car.plate }}</p>
            </div>
          </template>
        </draggable>
      </div>

    </div>

    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <!-- กล่อง modal -->
      <div class="bg-white rounded-xl shadow-lg p-6 w-96 relative z-50">
        <h2 class="text-lg font-semibold mb-4 text-gray-700">ยืนยันการย้ายรถ</h2>

        <p class="text-sm text-gray-600 mb-2">
          หมายเลขทะเบียน: <span class="font-medium">{{ tempCar?.plate }}</span>
        </p>

        <label class="block mb-3">
          <span class="text-sm text-gray-700">รายละเอียดเพิ่มเติม</span>
          <input v-model="form.remark" type="text" placeholder="กรอกข้อมูลเพิ่มเติม..."
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
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

  </div>
</template>

<script>
import draggable from 'vuedraggable'
import '@fortawesome/fontawesome-free/css/all.css'

export default {
  name: 'TruckBoard',
  components: { draggable },
  data() {
    return {
      authorizedCars: [
        { id: 101, plate: 'กข 1122' },
        { id: 102, plate: 'คค 3344' },
        { id: 103, plate: 'จจ 5566' },
        { id: 104, plate: 'ฉช 7788' },
        { id: 105, plate: 'ชช 9900' },
      ],
      outgoingCars: [],
      incomingCars: [],

      showModal: false,
      tempCar: null,
      targetList: '',
      form: { remark: '' },
    }
  },

  methods: {
    addNewItem() {
      // ✅ สร้าง id แบบสุ่ม (ไม่ซ้ำกับของเดิม)
      const newId = Math.floor(Math.random() * 100000)

      // ✅ สร้างเลขทะเบียนสุ่ม
      const thaiLetters = ['ก', 'ข', 'ค', 'ง', 'จ', 'ฉ', 'ช', 'ซ', 'ฌ', 'ญ']
      const plateLetters = thaiLetters[Math.floor(Math.random() * thaiLetters.length)] +
        thaiLetters[Math.floor(Math.random() * thaiLetters.length)]
      const plateNumbers = Math.floor(1000 + Math.random() * 9000)

      const newItem = {
        id: newId,
        plate: `${plateLetters} ${plateNumbers}`,
      }

      this.authorizedCars.push(newItem)
      console.log('เพิ่มรถใหม่:', newItem)
    },
    handleAdd(evt, target) {
      const movedItem = this[target][evt.newIndex]
      // ✅ ถ้าย้ายกลับไป authorizedCars — ไม่ต้องเปิด modal
      if (target === 'authorizedCars') return

      this.tempCar = movedItem
      this.targetList = target
      this.showModal = true
    },
    confirmMove() {
      this.showModal = false
      this.tempCar = null
      this.targetList = ''
      this.form.remark = ''
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
    }
  }
}
</script>
