import {createSlice} from '@reduxjs/toolkit';

interface InterState {
    lang?: string
    dictionary?: any
}

const initialState:InterState = {};

const interSlice = createSlice({
    name: 'inter',
    initialState,
    reducers: {
        changeLang: (state, action) => {
            state.lang = action.payload;
        }

        // push: (state, action) => {
        //     const id = Date.now();
        //     state.options.push({...action.payload, id});
        // },
        // switchIconPosition: state => {
        //     state.iconPosition = state.iconPosition === 'left' ? 'right' : 'left';
        // },
        // selectOption: (state, action) => {
        //     state.options = state.options.map(option => {
        //         if(option.id === action.payload){
        //             return {...option, active: !option.active};
        //         }
        //         return option;
        //     });
        // },
        // unselectAll: state => {
        //     state.options = state.options.map(option => {
        //         return {...option, active: false};
        //     });
        // }
    }
});


// export const { push, switchIconPosition, selectOption, unselectAll } = interSlice.actions;
export default interSlice.reducer;