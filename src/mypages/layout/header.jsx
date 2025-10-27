import { useAuth } from "@/mypages/AuthProvider";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Header = () => {

  const { user, loading, logout } = useAuth();

  return (
    <>
      <header className="h-16 flex items-center justify-center">
        <div className="w-full bg-white dark:bg-[#1E2028]">
          <div className="max-w-7xl w-full mx-auto px-6">
            <div className="flex items-center justify-between">
              {/* Logo Section */}

              <Link to="/" className="flex items-center space-x-3 cursor-pointer" id="logo-section">
                <img
                  src="https://dyqqilhexbdksxumpfpu.supabase.co/storage/v1/object/public/startupful-images/img/app_logo/512x512.png"
                  alt="Logo" className="w-8 h-8" />

                <span className="text-lg font-medium text-black dark:text-white">Logo Here</span>
              </Link>

              {/* Center Navigation */}
              <nav className="hidden md:flex items-center space-x-8">
                <Link to="/" className="text-black dark:text-white text-sm hover:text-indigo-500 dark:hover:text-indigo-400">
                  Home
                </Link>
                <Link to="/chat" className="text-gray-500 dark:text-gray-400 text-sm hover:text-indigo-500 dark:hover:text-indigo-400">
                  Chat
                </Link>
                <Link to="/about" className="text-gray-500 dark:text-gray-400 text-sm hover:text-indigo-500 dark:hover:text-indigo-400">
                  About
                </Link>
                <Link to="/users" className="text-gray-500 dark:text-gray-400 text-sm hover:text-indigo-500 dark:hover:text-indigo-400">
                  Users
                </Link>
              </nav>

              {/* Right Section */}
              <div className="flex items-center space-x-6">
                {/* Theme Toggle */}
                <button className="p-1.5 text-gray-500 hover:text-black dark:hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                </button>

                {/* Menu Button */}
                <button id="mobileMenuBtn"
                  className="md:hidden p-1.5 text-gray-500 hover:text-black dark:hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>

                {/* Sign In Button */}
                {!loading && (
                  user == null ? (
                    <Link to="auth/login"
                      className="hidden md:block px-5 py-2 text-sm text-white bg-indigo-500 rounded-full hover:bg-indigo-600 transition-colors">
                      Sign In
                    </Link>
                  ) : (
                    <>
                      <span>{user.name}</span>
                      <button id="logout_btn" onClick={() => { logout(); toast.success('Logout successfully'); }}
                        className="hidden md:block px-5 py-2 text-sm text-white bg-indigo-500 rounded-full hover:bg-indigo-600 transition-colors">
                        Logout
                      </button>
                    </>
                  )
                )}


              </div>
            </div>

            {/* Mobile Navigation Menu (Hidden by default) */}
            <div id="mobileMenu" className="hidden">
              <div className="py-4 space-y-4">
                <a href="#" className="block text-black dark:text-white text-sm hover:text-indigo-500 dark:hover:text-indigo-400">
                  Home
                </a>
                <a href="#"
                  className="block text-gray-500 dark:text-gray-400 text-sm hover:text-indigo-500 dark:hover:text-indigo-400">
                  Products
                </a>
                <a href="#"
                  className="block text-gray-500 dark:text-gray-400 text-sm hover:text-indigo-500 dark:hover:text-indigo-400">
                  About
                </a>
                <a href="#"
                  className="block text-gray-500 dark:text-gray-400 text-sm hover:text-indigo-500 dark:hover:text-indigo-400">
                  Contact
                </a>
                <a href="#"
                  className="inline-block px-5 py-2 text-sm text-white bg-indigo-500 rounded-full hover:bg-indigo-600 transition-colors">
                  Sign In
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* <script>
          $("#logo-section").on("click", function () {
            window.location.href = "/";
    });

          $("#mobileMenuBtn").on("click", function () {
            $("#mobileMenu").toggleclassName("hidden");
    });

          $("#logout_btn").on("click", function (e) {
            e.preventDefault();
          fetch('/auth/logout', {
            method: 'POST',
          headers: {
            'Content-Type': 'application/json'
        }
      }).then(response => {
        if (response.ok) {
          // console.log(response);
          return response.json();
        }
      }).then((body) => {
        // console.log(body);

        if (body.resultCode == "200") {
            window.location.href = "/"; // reload the page to reflect logout state
        } else {
            toastr.error("Logout failed. Please try again.");
        }
      }).catch(error => {
            console.error('Error:', error);
      });

    });
        </script> */}

      </header>
    </>
  );
};
export default Header;