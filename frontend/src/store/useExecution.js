import { create } from "zustand";
import { axiosInstance } from "../libs/axios.js";
import toast from "react-hot-toast";


export const useExecutionStore = create((set) => ({
    isExecuting: false,
    isSubmitting: false,
    submission: null,
    testResults: null,

    // Test code without creating submission
    testCode: async (source_code, language_id, stdin, expected_outputs) => {
        try {
            set({ isExecuting: true });
            console.log("Testing code:", JSON.stringify({
                source_code,
                language_id,
                stdin,
                expected_outputs
            }));
            
            const res = await axiosInstance.post("/execute-code/test", { 
                source_code, 
                language_id, 
                stdin, 
                expected_outputs 
            });

            set({ testResults: res.data });
            toast.success(res.data.message);
        } catch (error) {
            console.log("Error testing code", error);
            toast.error("Error testing code");
        } finally {
            set({ isExecuting: false });
        }
    },

    // Submit code and create submission
    executeCode: async (source_code, language_id, stdin, expected_outputs, problemId) => {
        try {
            set({ isSubmitting: true });
            console.log("Submitting code:", JSON.stringify({
                source_code,
                language_id,
                stdin,
                expected_outputs,
                problemId
            }));
            
            const res = await axiosInstance.post("/execute-code", { 
                source_code, 
                language_id, 
                stdin, 
                expected_outputs, 
                problemId 
            });

            set({ submission: res.data.submission });
            toast.success(res.data.message);
        } catch (error) {
            console.log("Error submitting code", error);
            toast.error("Error submitting code");
        } finally {
            set({ isSubmitting: false });
        }
    },

    // Clear test results
    clearTestResults: () => set({ testResults: null }),
    
    // Clear submission
    clearSubmission: () => set({ submission: null })
}));