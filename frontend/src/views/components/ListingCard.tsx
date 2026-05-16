import type { ListingAttributeData, ListingImage } from "../../types";
import MarketPlaceholder from "../../assets/MarketPlaceholder.png";

type Listing = {
  id: number;
  name: string;
  category_id: number;
  user_id: number;
  description: string;
};

export const ListingCard = ({ listing, listingsData, listingImages }: { listing: Listing;  listingsData: ListingAttributeData[]; listingImages : ListingImage[]; }) => {
  const listingImage = listingImages.find((img)=>{return img.listing_id === listing.id});
  const price = listingsData.find((prr)=>{return prr.attribute_id === 1 && prr.listing_id === listing.id})
  const condition = listingsData.find((con)=>{return con.attribute_id === 3 && con.listing_id === listing.id})
  const image = listingImage && listingImage.image_url ? listingImage.image_url : MarketPlaceholder
  return (
    <a href={`/listing/${listing.id}`}className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      
      <img src={image}></img>


      {/* Title */}
      <h2 className="text-lg font-semibold text-slate-900 group-hover:text-orange-500 transition">
        {listing.name}
      </h2>
      <p>{price?.value}</p>
      <p>{condition?.value}</p>
      {/* Description */}
      <p className="mt-2 text-sm text-slate-600 line-clamp-3">
        {listing.description || "No description provided."}
      </p>

      



      

    </a>
  );
};