const mongoose =require ("mongoose");
const schema =mongoose.Schema;

const listingSchema = new schema({
    title:{
       type : String,
       required: true,
    },
    description: String,
    image:{
      type: String,
       default:
         "https://unsplash.com/photos/body-of-water-under-cloudy-sky-during-sunset-HRX5WXFyB64", 
       set: (v)=> v===" "
       ? " https://unsplash.com/photos/body-of-water-under-cloudy-sky-during-sunset-HRX5WXFyB64" 
       : v,
    } ,
    price: Number,
location: String,
country: String,
reviews:[
  {
    type: schema.Types.ObjectId,
    ref: "Review",
  },
],
});

const listing = mongoose.model("listing", listingSchema);
module.exports = listing;
