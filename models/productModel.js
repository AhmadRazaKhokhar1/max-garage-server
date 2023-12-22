import mongoose from "mongoose";
import dotenv from 'dotenv'; dotenv.config();
const uri = process.env.MONGO_URI_MAX_GARAGE;

const productSchema = new mongoose.Schema(
  {
    //Important Details

    carImages: { type: String, required: true },
    carBrandMake: { type: String, required: true, text: true },
    carModel: { type: String, required: true, text: true },
    carRegisteredIn: { type: String, required: true, text: true },
    carColor: { type: String, required: true, text: true },
    carYearModel: { type: Number, text: true },
    carFuelType: {
      type: String,
      required: true,
      text: true,
    },
    carBodyType: { type: String, required: true, text: true },
    carTransmissionType: { type: String, required: true, text: true },
    carMileage: { type: Number },
    carAssembled: { type: String, text: true },
    carEngineCapacity: { type: Number, text: true },

    //Product Authorization
    carDocuments: { type: Boolean, default: false, text: true },
    carTaxPaid: { type: Boolean, default: false, text: true },
    carCondition: { type: String, text: true },

    //Product Features
    carAirConditionerAndHeater: { type: Boolean, default: false },
    carRadio: { type: Boolean, default: false },
    carSpeaker: { type: Boolean, default: false },
    carCdPlayer: { type: Boolean, default: false },
    carPowerSteering: { type: Boolean, default: false },
    carPowerWindows: { type: Boolean, default: false },
    carAutomaticDoors: { type: Boolean, default: false },
    carAlloyRims: { type: Boolean, default: false },
    carRearCamera: { type: Boolean, default: false },
    carNavigation: { type: Boolean, default: false },
    carKeyLessEntry: { type: Boolean, default: false },
    carSunRoof: { type: Boolean, default: false },
    carDvdPlayer: { type: Boolean, default: false },
    carAppleCarPlay: { type: Boolean, default: false },
    carParkingSensors: { type: Boolean, default: false },
    carMobileWireLessCharging: { type: Boolean, default: false },

    //Extra Features
    carAllGenuine: { type: Boolean, default: false },
    carModified: { type: Boolean, default: false },

    //Featuring
    carIsFeatured: { type: Boolean, default: false, text: true },
    carIsPopularDeal: { type: Boolean, default: false, text: true },

    //Owner details
    carOwnerNumber: { type: String },
    carOwnerName: { type: String },
    carOwnerEmail: { type: String },
  },
  {
    timestamps: true,
    bufferTimeoutMS: 50000,
  }
);
productSchema.index({
    name:"max_garage_users"
})
const ProductModel = new mongoose.model("Car_ad", productSchema);

export default ProductModel;
