import Link from 'next/link'; // Import Link for navigation

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 p-4">
            <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
            <h2 className="text-3xl font-semibold mb-6">Page Not Found</h2>
            <p className="text-lg text-center mb-8">
                Oops! The page you're looking for doesn't exist.
            </p>
            <Link href="/" className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200">
                Go back to Home
            </Link>
        </div>
    );
}