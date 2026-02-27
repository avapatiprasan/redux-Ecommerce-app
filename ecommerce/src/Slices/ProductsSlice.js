import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"


export var fetchProducts = createAsyncThunk(
    "fetch/fetchproducts",
    async ()=>{
        var response = await fetch("https://dummyjson.com/products")
        var data = await response.json()
        return data 
    }
)


var productSlice = createSlice({
    name : "productSlice",
    initialState : {
        products : [],
        loading : false,
        error : null

    },
    reducers : {
    
    },
    extraReducers : (builder)=>{
        builder
        .addCase(fetchProducts.pending,(state)=>{
            state.loading = true
        })
        .addCase(fetchProducts.fulfilled,(state,action)=>{
            state.loading = false,
            state.products = action.payload.products
        })
        .addCase(fetchProducts.rejected,(state,action)=>{
            state.loading = false,
            state.error = "error" })
    }
})

export var {addToCart} = productSlice.actions

export default productSlice.reducer