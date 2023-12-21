import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  carImages: { type: String },
  carBrand: { type: String },
  carModel: { type: String },
  carRegisteredIn:{type:String},
  carColor: { type: String },
  carYear: { type: Number },
  carFuelType: { type: String },
  carBodyType: { type: String },
  carTransmissionType: { type: String },
  carMileage: { type: String },
  carAssembled: { type: String },
  carEngineCapacity: { type: String },

  carDocuments: { type: Boolean, default: false },
  carTaxPaid: { type: Boolean, default: false },

  carACandHeater: { type: Boolean, default: false },
  carRadio: { type: Boolean, default: false },
  carSpeaker: { type: Boolean, default: false },
  carCdPlayer: { type: Boolean, default: false },
  carPowerSteering: { type: Boolean, default: false },
  carPowerWindows: { type: Boolean, default: false },
  carAutoLocks: { type: Boolean, default: false },
  carAlloyRims: { type: Boolean, default: false },
  carRearCamera: { type: Boolean, default: false },
  carNavigation: { type: Boolean, default: false },
  carKeyLessEntry: { type: Boolean, default: false },
  carDvdPlayer: { type: Boolean, default: false },
});

const ProductModel = new mongoose.model("Car_ad", productSchema);

export default ProductModel;
