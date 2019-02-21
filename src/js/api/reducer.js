const initialState = {
   data: {},
   refreshCount: 0,
};

const apiReducer = (state = initialState, action) => {
   switch (action.type) {
      case 'UPDATE_DATA':
         return {
            ...state,
            data: action.data,
            refreshCount: state.refreshCount + 1,
         };
      default:
         return state;
   }
};

export default apiReducer;
