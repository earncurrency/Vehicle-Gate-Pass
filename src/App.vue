<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <div class="flex space-x-6 overflow-x-auto board-container">

      <!-- คอลัมน์ 1: รถที่ได้รับอนุญาต -->
      <div class="w-72 flex-shrink-0 bg-white rounded-lg shadow-md p-3 h-fit">
        <div class="flex justify-between items-center mb-3">
          <h2 class="text-base font-bold text-gray-700">รถที่ได้รับอนุญาต</h2>
          <button class="text-gray-400 hover:text-gray-600">
            <i class="fas fa-ellipsis-v"></i>
          </button>
        </div>

        <draggable
          v-model="authorizedCars"
          item-key="id"
          :group="{ name: 'kanban-trucks', pull: true, put: true }"
          class="space-y-3 min-h-[3rem]"
          :animation="200"
        >
          <template #item="{ element: car }">
            <div class="bg-white rounded-md shadow-sm hover:bg-gray-50 cursor-grab active:cursor-grabbing p-3">
              <p class="text-sm font-medium text-gray-700">{{ car.plate }}</p>
            </div>
          </template>
        </draggable>
      </div>

      <!-- คอลัมน์ 2: ออกจากโรงงาน -->
      <div class="w-72 flex-shrink-0 bg-white rounded-lg shadow-md p-3 h-fit">
        <div class="flex justify-between items-center mb-3">
          <h2 class="text-base font-bold text-gray-700">ออกจากโรงงาน</h2>
          <button class="text-gray-400 hover:text-gray-600">
            <i class="fas fa-ellipsis-v"></i>
          </button>
        </div>

        <draggable
          v-model="outgoingCars"
          item-key="id"
          :group="{ name: 'kanban-trucks', pull: true, put: true }"
          class="space-y-3 min-h-[3rem]"
          :animation="200"
        >
          <template #item="{ element: car }">
            <div class="bg-white rounded-md shadow-sm hover:bg-gray-50 cursor-grab active:cursor-grabbing p-3">
              <p class="text-sm font-medium text-gray-700">{{ car.plate }}</p>
              <div class="flex items-center text-xs text-gray-400">
                <i class="far fa-clock mr-1"></i>
                <span>{{ car.time }}</span>
              </div>
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

        <draggable
          v-model="incomingCars"
          item-key="id"
          :group="{ name: 'kanban-trucks', pull: true, put: true }"
          class="space-y-3 min-h-[3rem]"
          :animation="200"
        >
          <template #item="{ element: car }">
            <div class="bg-white rounded-md shadow-sm hover:bg-gray-50 cursor-grab active:cursor-grabbing p-3">
              <p class="text-sm font-medium text-gray-700">{{ car.plate }}</p>
              <div class="flex items-center text-xs text-gray-400">
                <i class="far fa-clock mr-1"></i>
                <span>{{ car.time }}</span>
              </div>
            </div>
          </template>
        </draggable>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import draggable from 'vuedraggable'
import '@fortawesome/fontawesome-free/css/all.css'

// ✅ ลูปเฉพาะรถที่ได้รับอนุญาต
const authorizedCars = ref([
  { id: 101, plate: 'กข 1122' },
  { id: 102, plate: 'คค 3344' },
  { id: 103, plate: 'จจ 5566' },
  { id: 104, plate: 'ฉช 7788' },
  { id: 105, plate: 'ชช 9900' },
])

// ✅ ส่วนอื่นเริ่มต้นว่าง
const outgoingCars = ref([])
const incomingCars = ref([])
</script>


