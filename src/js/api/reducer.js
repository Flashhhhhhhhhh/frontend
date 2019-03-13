const initialState = {
   data: {},
   refreshCount: 0,
   user: {
      isAdmin: false,
      username: 'admin'
   }
};

const apiReducer = (state = initialState, action) => {
   switch (action.type) {
      case 'UPDATE_DATA':
         return {
            ...state,
            data: action.data,
            refreshCount: state.refreshCount + 1,
         };
      case 'UPDATE_USER':
         return {
            ...state,
            user: action.user,
         }
      default:
         return state;
   }
};

export default apiReducer;
