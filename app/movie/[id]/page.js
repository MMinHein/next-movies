import Persons from "@/components/Persons";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const token = process.env.TMDB_TOKEN;

async function fetchMovies(id) {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return await res.json();
}

async function fetchMovieImages(id) {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/images`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return await res.json();
}

export default async function Movie({ params }) {
    const { id } = await params; // No need to await params
    const movie = await fetchMovies(id);
    const images = await fetchMovieImages(id);
    const cover = "http://image.tmdb.org/t/p/w1280";

    // Extract only the first 7 images from backdrops
    const imageList = images.backdrops.slice(0, 7);

    return (
        <>
            <h2 className="font-bold text-3xl">
                {movie.title}
                <span className="ml-1 text-xl">
                    {movie.release_date.split("-")[0]}
                </span>
            </h2>
            <div className="mb-4 mt-2">
                {movie.genres.map(genre => {
                    return (
                        <Badge key={genre.id} variant="outline" className="mr-2">
                            <Link href={`/genres/${genre.name}/${genre.id}`}>{genre.name}</Link>
                        </Badge>
                    );
                })}
            </div>

            <div className="relative">
                {movie.backdrop_path ? (<img
                    src={cover + movie.backdrop_path}
                    alt="movie backdrop"
                    className="w-full h-auto"
                />) : (<div className="h-[400px] w-full bg-gray-800 text-center flex items-center justify-center text-gray-400 text-xs">No Image</div>)}
                {/* Radial gradient overlay to dim the edges */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-60"></div>
                <p className="absolute bottom-0 left-0 w-full text-white text-base p-4 opacity-90">
                    {movie.overview}
                </p>
            </div>

            {/* Horizontal scroll container */}
            <div className="mt-5 overflow-x-auto flex space-x-2">
                {imageList.map((image, index) => (
                    <div key={index} className="flex-shrink-0">
                        <img
                            src={`http://image.tmdb.org/t/p/w500${image.file_path}`}
                            alt={`movie poster ${index + 1}`}
                            className="w-full h-[120px] object-cover"
                        />
                    </div>
                ))}
            </div>

            <div className="mt-5">
                <div className="section">
                    <h3 className="font-bold border-b mb-4 pb-2 w-full">Starring</h3> {/* Set width to full */}
                    <div className="w-full"> {/* Wrapper to set width of Persons */}
                        <Persons params={movie} />
                    </div>
                </div>
            </div>

        </>
    );
}
