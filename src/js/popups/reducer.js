const initialState = {
   popupStack: [],
};

const popupReducer = (state = initialState, action) => {
   switch (action.type) {
      case 'PUSH_POPUP':
      console.log(action);
         return {
            ...state,
            popupStack: [...state.popupStack, action.popup],
         }
      case 'POP_POPUP':
         return {
            ...state,
            popupStack: state.popupStack.slice(0, -1)
         }
      default:
         return state;
   }
};

export default popupReducer;
