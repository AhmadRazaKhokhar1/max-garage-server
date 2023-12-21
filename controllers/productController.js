import ProductModel from "../models/productModel.js";
const productController = {
    addNewProduct:async(req, res)=>{
        try {
            const newCarProduct = new ProductModel({
                carImages:req.files,
                carBrand:req.body.carBrand,
                carModel:req.body.carModel,
                carRegisteredIn:req.body.carProvince,
                carColor:req.body.carColor,
                carFuelType:req.body.carFuelType,
                carBrand:req.body.carBrand,
                carBrand:req.body.carBrand,
                carBrand:req.body.carBrand,
                carBrand:req.body.carBrand,
                carBrand:req.body.carBrand,
                carBrand:req.body.carBrand,
                carBrand:req.body.carBrand,
                carBrand:req.body.carBrand,
                carBrand:req.body.carBrand,
            })
        } catch (error) {
            
        }
    }
}