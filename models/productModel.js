import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    //Important Details

    carImages: { type: String, required: true },
    carBrandMake: { type: String, required: true, text: true },
    carModel: { type: String, required: true, text: true },
    carRegisteredIn: { type: String, required: true, text: true },
    carColor: { type: String, required: true, text: true },
    carYearModel: { type: Number },
    carFuelType: {
      type: String,
      required: true,
      text: true,
    },
    carBodyType: { type: String, required: true, text: true },
    carTransmissionType: { type: String, required: true, text: true },
    carMileage: { type: Number },
    carAssembled: { type: String },
    carEngineCapacity: { type: Number },

    //Product Authorization
    carDocuments: { type: Boolean, default: false },
    carTaxPaid: { type: Boolean, default: false },
    carCondition: { type: String },

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
    carIsFeatured: { type: Boolean, default: false },
    carIsPopularDeal: { type: Boolean, default: false },

    //keywords
    carKeyWords: { type: String },
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

const ProductModel = new mongoose.model("Car_ad", productSchema);

export default ProductModel;
