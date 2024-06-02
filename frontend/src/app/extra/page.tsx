export default async function ExtraPage() {
    // keeping this one as an example of a non protected page
    return (
        <h1 className="text-4xl text-center max-w-2xl leading-normal font-semibold text-white">
            Some Extra Page!,which is not protected yet but can be protected using the Middleware.
        </h1>
    );
}
