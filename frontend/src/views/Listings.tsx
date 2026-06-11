import { useEffect, useState } from "react";
import { ListingCard } from "./components/ListingCard";
import type { Listing, ListingAttributeData, ListingImage } from "../types";
import { useFilters } from "../hooks/useFilter";
import Categories from "./Categories";
import { FilterBar } from "./components/FilterBar";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import Pagination from "./components/Pagination";



function Listings() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [listingsData, setListingsData] = useState<ListingAttributeData[]>([]);
  const [listingImages, setListingImages] = useState<ListingImage[]>([]);
  const { filters } = useFilters();
  const serializedFilters = JSON.stringify(filters);
  const [searchParams] = useSearchParams();
  const category_id = searchParams.get("category_id")
  const { userId } = useAuth();
  const [favorited, setFavorited] = useState<Boolean>(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const loadListings = async () => {
    const params = new URLSearchParams();
    params.set('filters', serializedFilters);
    params.set("page", String(page));
    params.set("page_size", "12");
    if (userId) {
      params.set("user_id", userId);
    }
    const res = await fetch(`${import.meta.env.VITE_API_URL}/listings?${params}`);
    const data = await res.json();
    setListings(data.items);
    setTotalPages(data.total_pages);
  };

  const loadListingData = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/listings_attribute_data`);
    const data = await res.json();
    setListingsData(data);
  };

  const loadListingImages = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/listing_images`);
    const data = await res.json();
    setListingImages(data);
  };

  useEffect(() => {
    loadListingImages();
    loadListingData();
  }, [searchParams]);

  useEffect(() => {
    setPage(1);
  }, [searchParams, serializedFilters]);

  useEffect(() => {
    loadListings();
    setFavorited(false)
  }, [searchParams, serializedFilters, userId, page, favorited]);

  return (
    <div className="mx-auto justify-center flex flex-col w-full min-h-screen bg-slate-100 px-4 py-8 md:px-8">
      <div className="mx-auto w-full max-w-368 mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Listings</h1>
        <p className="mt-2 text-sm text-slate-600">
          Browse all available listings in the marketplace.
        </p>
      </div>
      <div>
        <FilterBar categoryId={category_id || undefined}></FilterBar>
      </div>
      <div className="justify-center w-full flex flex-row">
        <div className="w-80">
          <Categories isListingsPage></Categories>
        </div>
        <div className="flex w-full max-w-6xl flex-col gap-6">
          {listings.length > 0 && (
          <div className="items-start w-full auto-rows-min grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {listings.map((listing) => (
              <ListingCard setFavorited={setFavorited} userId={userId} listingsData={listingsData} listingImages={listingImages} key={listing.id} listing={listing} />
            ))}
            
          </div>)}


          {listings.length === 0 && (
            <div className="w-full mt-10 rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
              No listings found.
            </div>
          )}

          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </div>
      </div>
    </div>
  );
}

export default Listings;
