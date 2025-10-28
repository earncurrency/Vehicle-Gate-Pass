<template></template>
<script>
import Swal from "sweetalert2";

export default {
  methods: {
    showAlertModal({ swlTitle, swlText, swlIcon }) {
      return Swal.fire({
        title: swlTitle,
        text: swlText,
        icon: swlIcon,
        confirmButtonText: "ยืนยัน",
        buttonsStyling: false,
        backdrop: "rgba(0, 0, 0, 0.5)",
        customClass: {
          confirmButton:
            "cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500",
        },
      });
    },


    showDeleteModal({ swlTitle, swlText, swlIcon, onConfirm }) {
      Swal.fire({
        title: swlTitle,
        text: swlText,
        icon: swlIcon,
        showCancelButton: true,
        confirmButtonText: "ยืนยัน",
        cancelButtonText: "ยกเลิก",
        buttonsStyling: false,
        backdrop: "rgba(0, 0, 0, 0.5)",
        customClass: {
          confirmButton:
            "cursor-pointer mx-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500",
          cancelButton:
            "cursor-pointer mx-2 bg-gray-300 text-gray-800  px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300",
        },
      }).then((result) => {
        if (result.isConfirmed && typeof onConfirm === "function") {
          onConfirm();
        }
      });
    },
  },
};
</script>
