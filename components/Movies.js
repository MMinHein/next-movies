import Link from "next/link";

export default function Movies({ movies }) {
    const poster = "http://image.tmdb.org/t/p/w342";

    return (
        <>
            <div className="flex flex-wrap flex-grow gap-6 items-ceter justify-left">
                {movies.map(movie => {
                    return (
                        <div key={movie.id} className="w-[150px] text-center flex flex-col">
                            {movie.poster_path ? (
                                <Link href={`/movie/${movie.id}`}>
                                    <img src={poster + movie.poster_path}
                                        className="w-full hover:scale-105 transition-all " />
                                </Link>
                            ) : (
                                <div className="h-[300px]"></div>
                            )}
                            <div>
                                <h4 className="mt-2">{movie.title}</h4>
                                <span className="text-sm text-grap-500">
                                    {movie.release_date.split("-")[0]}
                                </span>
                                </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}