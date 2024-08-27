import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const medicinesSlice = createSlice({
  name: "medicines",
  initialState: {
    medicines: JSON.parse(localStorage.getItem("medicineIntakeData")) || [],
  },
  reducers: {
    addMedicine: (state, action) => {
      const newMedicine = {
        id: uuidv4(),
        ...action.payload,
      };
      state.medicines.push(newMedicine);
      localStorage.setItem("medicineIntakeData", JSON.stringify(state.medicines));
    },
    editMedicine: (state, action) => {
      const { id, updatedData } = action.payload;
      const index = state.medicines.findIndex(medicine => medicine.id === id);
      if (index !== -1) {
        state.medicines[index] = { ...state.medicines[index], ...updatedData };
        localStorage.setItem("medicineIntakeData", JSON.stringify(state.medicines));
      }
    },
    deleteMedicine: (state, action) => {
      const id = action.payload;
      state.medicines = state.medicines.filter(medicine => medicine.id !== id);
      localStorage.setItem("medicineIntakeData", JSON.stringify(state.medicines));
    },
  },
});

export const { addMedicine, editMedicine, deleteMedicine } = medicinesSlice.actions;
export default medicinesSlice.reducer;
