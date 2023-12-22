import uploadOnCloudinary from "../Utils/cloudinary.middleware.js";
import ProductModel from "../models/productModel.js";
const productController = {
  addNewProduct: async (req, res) => {
    try {
      const localCarImages = req.files.carImages[0]?.path;
      if (!localCarImages) {
        return res.status(400).json({
          success: false,
          message: "Product Images are required",
        });
      }
      const carImages = await uploadOnCloudinary(localCarImages);
      if (!carImages) {
        console.log(`Error uploading to cloudinary`);
        return res.status(500).json({
          success: false,
          message: "There was an internal server error",
        });
      }
      const newCarProduct = new ProductModel({
        //Important Details
        carImages: carImages,
        carBrandMake: req.body.carBrandMake,
        carModel: req.body.carModel,
        carRegisteredIn: req.body.carRegisteredIn,
        carColor: req.body.carColor,
        carFuelType: req.body.carFuelType,
        carYearModel: req.body.carYearModel,
        carBodyType: req.body.carBodyType,
        carTransmissionType: req.body.carTransmissionType,
        carMileage: req.body.carMileage,
        carAssembled: req.body.carAssembled,
        carEngineCapacity: req.body.carEngineCapacity,

        //Product Authorization
        carDocuments: req.body.carDocuments,
        carTaxPaid: req.body.carTaxPaid,
        carCondition: req.body.carCondition,

        //Product Features
        carAirConditionerAndHeater: req.body.carAirConditionerAndHeater,
        carRadio: req.body.carRadio,
        carSpeaker: req.body.carSpeaker,
        carCdPlayer: req.body.carCdPlayer,
        carPowerSteering: req.body.carPowerSteering,
        carPowerWindows: req.body.carPowerWindows,
        carAutomaticDoors: req.body.carAutomaticDoors,
        carAlloyRims: req.body.carAlloyRims,
        carRearCamera: req.body.carRearCamera,
        carNavigation: req.body.carNavigation,
        carKeyLessEntry: req.body.carKeyLessEntry,
        carSunRoof: req.body.carSunRoof,
        carDvdPlayer: req.body.carDvdPlayer,
        carAppleCarPlay: req.body.carAppleCarPlay,
        carParkingSensors: req.body.carParkingSensors,
        carMobileWireLessCharging: req.body.carMobileWireLessCharging,
        carAutoPilot: req.body.carAutoPilot,

        //Extra Features
        carAllGenuine: req.body.carAllGenuine,
        carModified: req.body.carModified,

        //Featuring
        carIsFeatured: req.body.carIsFeatured,
        carIsPopularDeal: req.body.carIsPopularDeal,

        //Owner details
        carOwnerNumber: req.body.carRadio,
        carOwnerName: req.body.carOwnerName,
        carOwnerEmail: req.body.carOwnerEmail,
      });
      const productDetails = await newCarProduct.save();
      res.status(201).json({
        success: true,
        message: "Product listed successfully",
        productDetails: productDetails,
      });
    } catch (error) {
      console.log(`There was an error in addNewProduct controller: ${error}`);
      return res.status(500).json({
        success: false,
        message: "There was an internal server error",
      });
    }
  },
  //Find Single Product
  findOneProduct: async (req, res) => {
    try {
      const {searchQuery} = req.body;

      await ProductModel.updateMany({}, { $set: { search: searchQuery } });

      // Use Atlas Search
      const result = await ProductModel.find({ $text: { $search: searchQuery } })
      res.status(200).send({
        success:true,
        result:result,
      })
    } catch (error) {
      console.log(`There was an error in findOneProduct controller: ${error}`);
      return res.status(500).json({
        success: false,
        message: "There was an internal server error",
      });
    }
  },
};

export default productController;
