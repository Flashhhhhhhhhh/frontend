const initialState = {
   viewStack: [{ name: 'MainView', props: {} }],
};

const viewReducer = (state = initialState, action) => {
   switch (action.type) {
      case 'PUSH_VIEW':
         return {
            ...state,
            viewStack: [...state.viewStack, action.view],
         }
      case 'POP_VIEW':
         return {
            ...state,
            viewStack: state.viewStack.slice(0, -1)
         }
      default:
         return state;
   }
};

export default viewReducer;
