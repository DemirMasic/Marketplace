import type { Listing, ListingAttributeData, ListingImage } from "../../types";
import MarketPlaceholder from "../../assets/MarketPlaceholder.png";
import empty_heart from "../../assets/empty_heart.png";
import full_heart from "../../assets/full_heart.png";

type ListingCardProps = {
  listing: Listing;
  listingsData: ListingAttributeData[];
  listingImages: ListingImage[];
  userId?: string;
  setFavorited?: React.Dispatch<React.SetStateAction<Boolean>>;
};

export const ListingCard = ({
  listing,
  listingsData,
  listingImages,
  userId,
  setFavorited
}: ListingCardProps) => {
  const listingImage = listingImages.find((img) => img.listing_id === listing.id);
  const price = listingsData.find(
    (data) => data.attribute_id === 1 && data.listing_id === listing.id,
  );
  const condition = listingsData.find(
    (data) => data.attribute_id === 3 && data.listing_id === listing.id,
  );
  const image = listingImage?.image_url || MarketPlaceholder;
  const priceValue = price?.value?.trim();
  const conditionValue = condition?.value?.trim();
  const description = listing.description?.trim() || "No description provided.";

  const addFavorite = async () => {
    await fetch(`${import.meta.env.VITE_API_URL}/add_favorite?user_id=${userId}&listing_id=${listing.id}`,{
        method: "POST"
      }); 
  };
  const deleteFavorite = async () => {
    await fetch(`${import.meta.env.VITE_API_URL}/delete_favorite?user_id=${userId}&listing_id=${listing.id}`,{
        method: "DELETE"
      }); 
  };

  const handleButtonClick = (e: any) => {
    e.stopPropagation();
    listing.favorited? deleteFavorite() : addFavorite()
    setFavorited&& setFavorited(true);
  };

  return (
    <div className="relative">
      {userId && (
          <button onClick={handleButtonClick} className="cursor-pointer z-10 absolute right-3 top-3 max-w-[calc(100%-1.5rem)] truncate rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur">
            <img
          src={listing.favorited? full_heart : empty_heart}
          alt={listing.name}
          className="size-4 hover:size-6 w-full object-cover transition duration-300 group-hover:scale-105"
            />
          </button>
        )}
    <a
      href={`/listing/${listing.id}`}
      className="group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:border-orange-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-2"
    >
      <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-100">
        <img
          src={image}
          alt={listing.name}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          loading="lazy"
        />
        {conditionValue && (
          <span className="absolute left-3 top-3 max-w-[calc(100%-1.5rem)] truncate rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur">
            {conditionValue}
          </span>
        )}
        
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="min-w-0">
          <h2 className="line-clamp-2 text-base font-semibold leading-snug text-slate-900 transition group-hover:text-orange-600 sm:text-lg">
            {listing.name}
          </h2>
          <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">
            {description}
          </p>
        </div>

        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Price
            </p>
            <p
              className={
                priceValue
                  ? "truncate text-lg font-bold text-slate-950"
                  : "truncate text-sm font-semibold text-slate-500"
              }
            >
              {priceValue || "Contact for price"}
            </p>
          </div>

          <span className="shrink-0 rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-600 transition group-hover:bg-orange-500 group-hover:text-white">
            View
          </span>
        </div>
      </div>
    </a>
    </div>
  );
};
