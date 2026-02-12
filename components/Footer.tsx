export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-12 relative z-10">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent mb-4">
                        Nano Banana
                    </h3>
                    <p className="text-gray-400">
                        The future of freshness. Cold-pressed, HPP treated, and delivered straight to your door.
                    </p>
                </div>

                <div>
                    <h4 className="font-bold mb-4 text-gray-200">Shop</h4>
                    <ul className="space-y-2 text-gray-400">
                        <li className="hover:text-orange-500 transition-colors cursor-pointer">All Flavors</li>
                        <li className="hover:text-orange-500 transition-colors cursor-pointer">Bundles</li>
                        <li className="hover:text-orange-500 transition-colors cursor-pointer">Gift Cards</li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold mb-4 text-gray-200">Support</h4>
                    <ul className="space-y-2 text-gray-400">
                        <li className="hover:text-orange-500 transition-colors cursor-pointer">FAQ</li>
                        <li className="hover:text-orange-500 transition-colors cursor-pointer">Contact Us</li>
                        <li className="hover:text-orange-500 transition-colors cursor-pointer">Shipping & Returns</li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold mb-4 text-gray-200">Stay Fresh</h4>
                    <p className="text-gray-400 mb-4">Subscribe for exclusive drops and discounts.</p>
                    <div className="flex">
                        <input type="email" placeholder="Your email" className="bg-gray-800 text-white px-4 py-2 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-orange-500 flex-1" />
                        <button className="bg-orange-500 px-4 py-2 rounded-r-lg hover:bg-orange-600 transition-colors">Go</button>
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-6 mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} Nano Banana. All rights reserved.
            </div>
        </footer>
    );
}
